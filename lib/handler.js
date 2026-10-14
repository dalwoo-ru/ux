// Бэкенд: Node-обработчик запросов (работает и как Vercel-функция, и локально)
import crypto from 'node:crypto';
import pg from 'pg';

const MAX_BODY = 4 * 1024 * 1024; // лимит Vercel на тело запроса — 4.5 МБ
const SESSION_DAYS = 30;

// bigint (timestamps, COUNT) -> number
pg.types.setTypeParser(20, (v) => Number(v));

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
let pool;
function getPool() {
  if (!pool) {
    if (!DATABASE_URL) throw new Error('Не задана переменная окружения DATABASE_URL (строка подключения к Postgres)');
    const local = /localhost|127\.0\.0\.1/.test(DATABASE_URL);
    pool = new pg.Pool({ connectionString: DATABASE_URL, max: 3, idleTimeoutMillis: 10000,
      ssl: local ? false : { rejectUnauthorized: false } });
  }
  return pool;
}
const query = async (sql, params = []) => (await getPool().query(sql, params)).rows;
const one = async (sql, params = []) => (await query(sql, params))[0] || null;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  created_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS folders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  folder_id INTEGER REFERENCES folders(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  blocks TEXT NOT NULL DEFAULT '[]',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  share_token TEXT NOT NULL UNIQUE,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS responses (
  id SERIAL PRIMARY KEY,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  answers TEXT NOT NULL DEFAULT '{}',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  started_at BIGINT NOT NULL,
  finished_at BIGINT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_tests_user ON tests(user_id);
CREATE INDEX IF NOT EXISTS idx_resp_test ON responses(test_id);
`;
let schemaReady;
const ensureSchema = () => (schemaReady ||= getPool().query(SCHEMA).catch((e) => { schemaReady = null; throw e; }));

// ---------- helpers ----------
const now = () => Date.now();
const rid = (n = 16) => crypto.randomBytes(n).toString('base64url');

function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(pw, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}
function verifyPassword(pw, stored) {
  const [saltHex, hashHex] = stored.split(':');
  const hash = crypto.scryptSync(pw, Buffer.from(saltHex, 'hex'), 64);
  return crypto.timingSafeEqual(hash, Buffer.from(hashHex, 'hex'));
}

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  // Vercel может уже разобрать тело в req.body
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw;
  if (typeof req.body === 'string') raw = req.body;
  else if (Buffer.isBuffer(req.body)) raw = req.body.toString('utf8');
  else {
    const chunks = [];
    let size = 0;
    for await (const c of req) {
      size += c.length;
      if (size > MAX_BODY) throw new HttpError(413, 'Слишком большой запрос (максимум 4 МБ). Уменьшите изображения.');
      chunks.push(c);
    }
    raw = Buffer.concat(chunks).toString('utf8');
  }
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw new HttpError(400, 'Некорректный JSON'); }
}

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

async function currentUser(req) {
  const sid = parseCookies(req).sid;
  if (!sid) return null;
  return one(`SELECT u.id, u.email, u.name FROM sessions s JOIN users u ON u.id = s.user_id
              WHERE s.token = $1 AND s.expires_at > $2`, [sid, now()]);
}

const isHttps = (req) => (req.headers['x-forwarded-proto'] || '').split(',')[0] === 'https';
const cookieFlags = (req) => `Path=/; HttpOnly; SameSite=Lax${isHttps(req) ? '; Secure' : ''}`;

async function startSession(req, userId) {
  const token = rid(32);
  await query('INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)', [token, userId, now() + SESSION_DAYS * 864e5]);
  return `sid=${token}; ${cookieFlags(req)}; Max-Age=${SESSION_DAYS * 86400}`;
}

const str = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const testRow = (t, extra = {}) => ({
  id: t.id, title: t.title, folder_id: t.folder_id, published: !!t.published,
  share_token: t.share_token, created_at: t.created_at, updated_at: t.updated_at, ...extra,
});

async function ownedTest(user, id) {
  const t = Number.isInteger(Number(id)) ? await one('SELECT * FROM tests WHERE id = $1 AND user_id = $2', [Number(id), user.id]) : null;
  if (!t) throw new HttpError(404, 'Тест не найден');
  return t;
}

async function ownedFolderId(user, id) {
  const f = await one('SELECT id FROM folders WHERE id = $1 AND user_id = $2', [Number(id), user.id]);
  if (!f) throw new HttpError(400, 'Папка не найдена');
  return f.id;
}

function sanitizeBlocks(blocks) {
  if (!Array.isArray(blocks)) throw new HttpError(400, 'blocks должен быть массивом');
  if (blocks.length > 200) throw new HttpError(400, 'Слишком много блоков');
  return blocks.map((b) => {
    if (!b || typeof b !== 'object' || typeof b.type !== 'string' || typeof b.id !== 'string') {
      throw new HttpError(400, 'Некорректный блок');
    }
    return b;
  });
}

// ---------- routes ----------
const routes = [];
const route = (method, pattern, handler, opts = {}) => {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
  routes.push({ method, re, keys, handler, auth: opts.auth !== false });
};

// auth
route('POST', '/api/register', async ({ body, req }) => {
  const email = str(body.email, 200).toLowerCase();
  const name = str(body.name, 100) || email.split('@')[0];
  const password = typeof body.password === 'string' ? body.password : '';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new HttpError(400, 'Укажите корректный email');
  if (password.length < 6) throw new HttpError(400, 'Пароль должен быть не короче 6 символов');
  const row = await one(`INSERT INTO users (email, name, pass_hash, created_at) VALUES ($1, $2, $3, $4)
                         ON CONFLICT (email) DO NOTHING RETURNING id`, [email, name, hashPassword(password), now()]);
  if (!row) throw new HttpError(409, 'Этот email уже зарегистрирован');
  const cookie = await startSession(req, row.id);
  return [200, { user: { id: row.id, email, name } }, { 'Set-Cookie': cookie }];
}, { auth: false });

route('POST', '/api/login', async ({ body, req }) => {
  const email = str(body.email, 200).toLowerCase();
  const u = await one('SELECT * FROM users WHERE email = $1', [email]);
  if (!u || typeof body.password !== 'string' || !verifyPassword(body.password, u.pass_hash)) {
    throw new HttpError(401, 'Неверный email или пароль');
  }
  const cookie = await startSession(req, u.id);
  return [200, { user: { id: u.id, email: u.email, name: u.name } }, { 'Set-Cookie': cookie }];
}, { auth: false });

route('POST', '/api/logout', async ({ req }) => {
  const sid = parseCookies(req).sid;
  if (sid) await query('DELETE FROM sessions WHERE token = $1', [sid]);
  return [200, { ok: true }, { 'Set-Cookie': `sid=; ${cookieFlags(req)}; Max-Age=0` }];
}, { auth: false });

route('GET', '/api/me', async ({ user }) => ({ user }), { auth: false });

// folders
route('GET', '/api/folders', async ({ user }) => ({
  folders: await query('SELECT id, name FROM folders WHERE user_id = $1 ORDER BY lower(name)', [user.id]),
}));
route('POST', '/api/folders', async ({ user, body }) => {
  const name = str(body.name, 100);
  if (!name) throw new HttpError(400, 'Введите название папки');
  const f = await one('INSERT INTO folders (user_id, name, created_at) VALUES ($1, $2, $3) RETURNING id', [user.id, name, now()]);
  return { folder: { id: f.id, name } };
});
route('PATCH', '/api/folders/:id', async ({ user, body, params }) => {
  const name = str(body.name, 100);
  if (!name) throw new HttpError(400, 'Введите название папки');
  const r = await getPool().query('UPDATE folders SET name = $1 WHERE id = $2 AND user_id = $3', [name, Number(params.id) || 0, user.id]);
  if (!r.rowCount) throw new HttpError(404, 'Папка не найдена');
  return { ok: true };
});
route('DELETE', '/api/folders/:id', async ({ user, params }) => {
  const r = await getPool().query('DELETE FROM folders WHERE id = $1 AND user_id = $2', [Number(params.id) || 0, user.id]);
  if (!r.rowCount) throw new HttpError(404, 'Папка не найдена');
  return { ok: true }; // тесты остаются (folder_id → NULL)
});

// tests
route('GET', '/api/tests', async ({ user }) => ({
  tests: (await query(`
    SELECT t.*, (SELECT COUNT(*) FROM responses r WHERE r.test_id = t.id AND r.completed) AS responses_count,
           (SELECT COUNT(*) FROM responses r WHERE r.test_id = t.id) AS started_count
    FROM tests t WHERE t.user_id = $1 ORDER BY t.updated_at DESC`, [user.id]))
    .map((t) => testRow(t, { responses_count: t.responses_count, started_count: t.started_count })),
}));

route('POST', '/api/tests', async ({ user, body }) => {
  const folderId = body.folder_id != null ? await ownedFolderId(user, body.folder_id) : null;
  const blocks = body.blocks ? sanitizeBlocks(body.blocks) : [];
  const t = now();
  const r = await one(`INSERT INTO tests (user_id, folder_id, title, blocks, share_token, created_at, updated_at)
                       VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING id`,
    [user.id, folderId, str(body.title, 200) || 'Новый тест', JSON.stringify(blocks), rid(9), t]);
  return { id: r.id };
});

route('GET', '/api/tests/:id', async ({ user, params }) => {
  const t = await ownedTest(user, params.id);
  return { test: testRow(t, { blocks: JSON.parse(t.blocks) }) };
});

route('PUT', '/api/tests/:id', async ({ user, params, body }) => {
  const t = await ownedTest(user, params.id);
  const title = body.title !== undefined ? (str(body.title, 200) || 'Без названия') : t.title;
  const blocks = body.blocks !== undefined ? JSON.stringify(sanitizeBlocks(body.blocks)) : t.blocks;
  const published = body.published !== undefined ? !!body.published : t.published;
  let folderId = t.folder_id;
  if (body.folder_id !== undefined) folderId = body.folder_id === null ? null : await ownedFolderId(user, body.folder_id);
  await query('UPDATE tests SET title = $1, blocks = $2, published = $3, folder_id = $4, updated_at = $5 WHERE id = $6',
    [title, blocks, published, folderId, now(), t.id]);
  return { ok: true };
});

route('POST', '/api/tests/:id/duplicate', async ({ user, params }) => {
  const t = await ownedTest(user, params.id);
  const ts = now();
  const r = await one(`INSERT INTO tests (user_id, folder_id, title, blocks, share_token, created_at, updated_at)
                       VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING id`,
    [user.id, t.folder_id, `${t.title} (копия)`, t.blocks, rid(9), ts]);
  return { id: r.id };
});

route('DELETE', '/api/tests/:id', async ({ user, params }) => {
  const t = await ownedTest(user, params.id);
  await query('DELETE FROM tests WHERE id = $1', [t.id]);
  return { ok: true };
});

route('GET', '/api/tests/:id/results', async ({ user, params }) => {
  const t = await ownedTest(user, params.id);
  const responses = (await query('SELECT id, answers, completed, started_at, finished_at FROM responses WHERE test_id = $1 ORDER BY started_at DESC', [t.id]))
    .map((r) => ({ ...r, completed: !!r.completed, answers: JSON.parse(r.answers) }));
  return { test: testRow(t, { blocks: JSON.parse(t.blocks) }), responses };
});

route('DELETE', '/api/tests/:id/responses/:rid', async ({ user, params }) => {
  const t = await ownedTest(user, params.id);
  await query('DELETE FROM responses WHERE id = $1 AND test_id = $2', [Number(params.rid) || 0, t.id]);
  return { ok: true };
});

// respondent (public)
async function publicTest(token, user, preview) {
  const t = await one('SELECT * FROM tests WHERE share_token = $1', [token]);
  if (!t) throw new HttpError(404, 'Тест не найден');
  const isOwner = user && user.id === t.user_id;
  if (!t.published && !(preview && isOwner)) throw new HttpError(403, 'Тест сейчас закрыт для прохождения');
  return t;
}

route('GET', '/api/public/:token', async ({ params, user, url }) => {
  const t = await publicTest(params.token, user, url.searchParams.get('preview') === '1');
  return { test: { title: t.title, blocks: JSON.parse(t.blocks) } };
}, { auth: false });

route('POST', '/api/public/:token/responses', async ({ params, req }) => {
  const t = await publicTest(params.token, null, false);
  const token = rid(16);
  await query('INSERT INTO responses (test_id, token, started_at, user_agent) VALUES ($1, $2, $3, $4)',
    [t.id, token, now(), str(req.headers['user-agent'] || '', 300)]);
  return { response_token: token };
}, { auth: false });

route('PUT', '/api/public/:token/responses/:rtoken', async ({ params, body }) => {
  const t = await publicTest(params.token, null, false);
  const r = await one('SELECT * FROM responses WHERE token = $1 AND test_id = $2', [params.rtoken, t.id]);
  if (!r) throw new HttpError(404, 'Прохождение не найдено');
  if (r.completed) throw new HttpError(409, 'Прохождение уже завершено');
  if (!body.answers || typeof body.answers !== 'object' || Array.isArray(body.answers)) {
    throw new HttpError(400, 'answers должен быть объектом');
  }
  const validIds = new Set(JSON.parse(t.blocks).map((b) => b.id));
  const answers = {};
  for (const [k, v] of Object.entries(body.answers)) if (validIds.has(k)) answers[k] = v;
  const done = !!body.completed;
  await query('UPDATE responses SET answers = $1, completed = $2, finished_at = $3 WHERE id = $4',
    [JSON.stringify(answers), done, done ? now() : null, r.id]);
  return { ok: true };
}, { auth: false });

// ---------- вход для сервера / Vercel ----------
export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  try {
    await ensureSchema();
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = r.re.exec(url.pathname);
      if (!m) continue;
      const params = {};
      r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      const user = await currentUser(req);
      if (r.auth && !user) throw new HttpError(401, 'Требуется вход');
      const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await readBody(req) : {};
      const out = await r.handler({ req, res, url, params, body, user });
      if (Array.isArray(out)) return send(res, out[0], out[1], out[2]);
      return send(res, 200, out);
    }
    throw new HttpError(404, 'Не найдено');
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.message });
    console.error(e);
    send(res, 500, { error: 'Внутренняя ошибка сервера' });
  }
}
