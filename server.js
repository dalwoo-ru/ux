// Сервис UX-исследований: без внешних зависимостей (Node >= 22.13, node:sqlite)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, 'public');
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY = 20 * 1024 * 1024;
const SESSION_DAYS = 30;

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'ux.db'));
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS folders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  folder_id INTEGER REFERENCES folders(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  blocks TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 0,
  share_token TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  answers TEXT NOT NULL DEFAULT '{}',
  completed INTEGER NOT NULL DEFAULT 0,
  started_at INTEGER NOT NULL,
  finished_at INTEGER,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_tests_user ON tests(user_id);
CREATE INDEX IF NOT EXISTS idx_resp_test ON responses(test_id);
`);

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
  const isJson = typeof body === 'object' && !Buffer.isBuffer(body);
  const payload = isJson ? JSON.stringify(body) : body;
  res.writeHead(status, {
    'Content-Type': isJson ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
    ...headers,
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(new HttpError(413, 'Слишком большой запрос')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(new HttpError(400, 'Некорректный JSON')); }
    });
    req.on('error', reject);
  });
}

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function currentUser(req) {
  const sid = parseCookies(req).sid;
  if (!sid) return null;
  const row = db.prepare(
    `SELECT u.id, u.email, u.name FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > ?`).get(sid, now());
  return row || null;
}

function startSession(res, userId) {
  const token = rid(32);
  const expires = now() + SESSION_DAYS * 864e5;
  db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expires);
  return `sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`;
}

const str = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function testRow(t, extra = {}) {
  return {
    id: t.id, title: t.title, folder_id: t.folder_id, published: !!t.published,
    share_token: t.share_token, created_at: t.created_at, updated_at: t.updated_at, ...extra,
  };
}

function ownedTest(user, id) {
  const t = db.prepare('SELECT * FROM tests WHERE id = ? AND user_id = ?').get(Number(id), user.id);
  if (!t) throw new HttpError(404, 'Тест не найден');
  return t;
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
route('POST', '/api/register', async ({ body, res }) => {
  const email = str(body.email, 200).toLowerCase();
  const name = str(body.name, 100) || email.split('@')[0];
  const password = typeof body.password === 'string' ? body.password : '';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new HttpError(400, 'Укажите корректный email');
  if (password.length < 6) throw new HttpError(400, 'Пароль должен быть не короче 6 символов');
  if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) throw new HttpError(409, 'Этот email уже зарегистрирован');
  const r = db.prepare('INSERT INTO users (email, name, pass_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(email, name, hashPassword(password), now());
  const cookie = startSession(res, Number(r.lastInsertRowid));
  return [200, { user: { id: Number(r.lastInsertRowid), email, name } }, { 'Set-Cookie': cookie }];
}, { auth: false });

route('POST', '/api/login', async ({ body }) => {
  const email = str(body.email, 200).toLowerCase();
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!u || typeof body.password !== 'string' || !verifyPassword(body.password, u.pass_hash)) {
    throw new HttpError(401, 'Неверный email или пароль');
  }
  const cookie = startSession(null, u.id);
  return [200, { user: { id: u.id, email: u.email, name: u.name } }, { 'Set-Cookie': cookie }];
}, { auth: false });

route('POST', '/api/logout', async ({ req }) => {
  const sid = parseCookies(req).sid;
  if (sid) db.prepare('DELETE FROM sessions WHERE token = ?').run(sid);
  return [200, { ok: true }, { 'Set-Cookie': 'sid=; Path=/; HttpOnly; Max-Age=0' }];
}, { auth: false });

route('GET', '/api/me', async ({ user }) => ({ user }), { auth: false });

// folders
route('GET', '/api/folders', async ({ user }) => ({
  folders: db.prepare('SELECT id, name FROM folders WHERE user_id = ? ORDER BY name COLLATE NOCASE').all(user.id),
}));
route('POST', '/api/folders', async ({ user, body }) => {
  const name = str(body.name, 100);
  if (!name) throw new HttpError(400, 'Введите название папки');
  const r = db.prepare('INSERT INTO folders (user_id, name, created_at) VALUES (?, ?, ?)').run(user.id, name, now());
  return { folder: { id: Number(r.lastInsertRowid), name } };
});
route('PATCH', '/api/folders/:id', async ({ user, body, params }) => {
  const name = str(body.name, 100);
  if (!name) throw new HttpError(400, 'Введите название папки');
  const r = db.prepare('UPDATE folders SET name = ? WHERE id = ? AND user_id = ?').run(name, Number(params.id), user.id);
  if (!r.changes) throw new HttpError(404, 'Папка не найдена');
  return { ok: true };
});
route('DELETE', '/api/folders/:id', async ({ user, params }) => {
  const r = db.prepare('DELETE FROM folders WHERE id = ? AND user_id = ?').run(Number(params.id), user.id);
  if (!r.changes) throw new HttpError(404, 'Папка не найдена');
  return { ok: true }; // тесты остаются (folder_id → NULL)
});

// tests
route('GET', '/api/tests', async ({ user }) => ({
  tests: db.prepare(`
    SELECT t.*, (SELECT COUNT(*) FROM responses r WHERE r.test_id = t.id AND r.completed = 1) AS responses_count,
           (SELECT COUNT(*) FROM responses r WHERE r.test_id = t.id) AS started_count
    FROM tests t WHERE t.user_id = ? ORDER BY t.updated_at DESC`).all(user.id)
    .map((t) => testRow(t, { responses_count: t.responses_count, started_count: t.started_count })),
}));

route('POST', '/api/tests', async ({ user, body }) => {
  let folderId = null;
  if (body.folder_id != null) {
    const f = db.prepare('SELECT id FROM folders WHERE id = ? AND user_id = ?').get(Number(body.folder_id), user.id);
    if (!f) throw new HttpError(400, 'Папка не найдена');
    folderId = f.id;
  }
  const blocks = body.blocks ? sanitizeBlocks(body.blocks) : [];
  const t = now();
  const r = db.prepare(`INSERT INTO tests (user_id, folder_id, title, blocks, share_token, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(user.id, folderId, str(body.title, 200) || 'Новый тест', JSON.stringify(blocks), rid(9), t, t);
  return { id: Number(r.lastInsertRowid) };
});

route('GET', '/api/tests/:id', async ({ user, params }) => {
  const t = ownedTest(user, params.id);
  return { test: testRow(t, { blocks: JSON.parse(t.blocks) }) };
});

route('PUT', '/api/tests/:id', async ({ user, params, body }) => {
  const t = ownedTest(user, params.id);
  const title = body.title !== undefined ? (str(body.title, 200) || 'Без названия') : t.title;
  const blocks = body.blocks !== undefined ? JSON.stringify(sanitizeBlocks(body.blocks)) : t.blocks;
  const published = body.published !== undefined ? (body.published ? 1 : 0) : t.published;
  let folderId = t.folder_id;
  if (body.folder_id !== undefined) {
    if (body.folder_id === null) folderId = null;
    else {
      const f = db.prepare('SELECT id FROM folders WHERE id = ? AND user_id = ?').get(Number(body.folder_id), user.id);
      if (!f) throw new HttpError(400, 'Папка не найдена');
      folderId = f.id;
    }
  }
  db.prepare('UPDATE tests SET title = ?, blocks = ?, published = ?, folder_id = ?, updated_at = ? WHERE id = ?')
    .run(title, blocks, published, folderId, now(), t.id);
  return { ok: true };
});

route('POST', '/api/tests/:id/duplicate', async ({ user, params }) => {
  const t = ownedTest(user, params.id);
  const ts = now();
  const r = db.prepare(`INSERT INTO tests (user_id, folder_id, title, blocks, share_token, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(user.id, t.folder_id, `${t.title} (копия)`, t.blocks, rid(9), ts, ts);
  return { id: Number(r.lastInsertRowid) };
});

route('DELETE', '/api/tests/:id', async ({ user, params }) => {
  const t = ownedTest(user, params.id);
  db.prepare('DELETE FROM tests WHERE id = ?').run(t.id);
  return { ok: true };
});

route('GET', '/api/tests/:id/results', async ({ user, params }) => {
  const t = ownedTest(user, params.id);
  const responses = db.prepare('SELECT id, answers, completed, started_at, finished_at FROM responses WHERE test_id = ? ORDER BY started_at DESC').all(t.id)
    .map((r) => ({ ...r, completed: !!r.completed, answers: JSON.parse(r.answers) }));
  return { test: testRow(t, { blocks: JSON.parse(t.blocks) }), responses };
});

route('DELETE', '/api/tests/:id/responses/:rid', async ({ user, params }) => {
  const t = ownedTest(user, params.id);
  db.prepare('DELETE FROM responses WHERE id = ? AND test_id = ?').run(Number(params.rid), t.id);
  return { ok: true };
});

// respondent (public)
function publicTest(token, user, preview) {
  const t = db.prepare('SELECT * FROM tests WHERE share_token = ?').get(token);
  if (!t) throw new HttpError(404, 'Тест не найден');
  const isOwner = user && user.id === t.user_id;
  if (!t.published && !(preview && isOwner)) throw new HttpError(403, 'Тест сейчас закрыт для прохождения');
  return t;
}

route('GET', '/api/public/:token', async ({ params, user, url }) => {
  const t = publicTest(params.token, user, url.searchParams.get('preview') === '1');
  return { test: { title: t.title, blocks: JSON.parse(t.blocks) } };
}, { auth: false });

route('POST', '/api/public/:token/responses', async ({ params, req }) => {
  const t = publicTest(params.token, null, false);
  const token = rid(16);
  db.prepare('INSERT INTO responses (test_id, token, started_at, user_agent) VALUES (?, ?, ?, ?)')
    .run(t.id, token, now(), str(req.headers['user-agent'] || '', 300));
  return { response_token: token };
}, { auth: false });

route('PUT', '/api/public/:token/responses/:rtoken', async ({ params, body }) => {
  const t = publicTest(params.token, null, false);
  const r = db.prepare('SELECT * FROM responses WHERE token = ? AND test_id = ?').get(params.rtoken, t.id);
  if (!r) throw new HttpError(404, 'Прохождение не найдено');
  if (r.completed) throw new HttpError(409, 'Прохождение уже завершено');
  if (!body.answers || typeof body.answers !== 'object' || Array.isArray(body.answers)) {
    throw new HttpError(400, 'answers должен быть объектом');
  }
  const validIds = new Set(JSON.parse(t.blocks).map((b) => b.id));
  const answers = {};
  for (const [k, v] of Object.entries(body.answers)) if (validIds.has(k)) answers[k] = v;
  const done = body.completed ? 1 : 0;
  db.prepare('UPDATE responses SET answers = ?, completed = ?, finished_at = ? WHERE id = ?')
    .run(JSON.stringify(answers), done, done ? now() : null, r.id);
  return { ok: true };
}, { auth: false });

// ---------- static ----------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json',
};
function serveStatic(res, pathname) {
  let file = path.normalize(path.join(PUBLIC, pathname));
  if (!file.startsWith(PUBLIC + path.sep) && file !== PUBLIC) return send(res, 403, 'Forbidden');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(PUBLIC, 'index.html');
  const ext = path.extname(file);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (!url.pathname.startsWith('/api/')) {
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method Not Allowed');
      return serveStatic(res, decodeURIComponent(url.pathname));
    }
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = r.re.exec(url.pathname);
      if (!m) continue;
      const params = {};
      r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      const user = currentUser(req);
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
});

server.listen(PORT, () => console.log(`UX-исследования: http://localhost:${PORT}`));
