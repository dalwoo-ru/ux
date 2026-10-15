import { h, api, toast, modal, prompt, confirmDialog, fmtDate } from './util.js';
import { TYPES, PALETTE, createBlock } from './blocks.js';

const app = document.getElementById('app');

// переключатель темы (токены baseui: data-theme="light|dark")
const themeBtn = document.createElement('button');
themeBtn.className = 'theme-toggle';
themeBtn.title = 'Сменить тему';
const paintTheme = () => { themeBtn.textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '☾'; };
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
  paintTheme();
});
document.body.append(themeBtn);
paintTheme();
const state = { user: null };

// ---------- роутер ----------
let beforeLeave = null; // сохранение редактора перед уходом
export async function go(path, replace = false) {
  if (beforeLeave) { await beforeLeave(); beforeLeave = null; }
  history[replace ? 'replaceState' : 'pushState']({}, '', path);
  render();
}
window.addEventListener('popstate', () => { beforeLeave = null; render(); });
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-link]');
  if (a) { e.preventDefault(); go(a.getAttribute('href')); }
});
const link = (href, ...c) => h('a', { href, 'data-link': '' }, ...c);

async function render() {
  const p = location.pathname;
  app.replaceChildren();
  try {
    let m;
    if ((m = p.match(/^\/t\/([^/]+)$/))) return respondentView(m[1]);
    if (!state.user) {
      const { user } = await api('GET', '/api/me');
      state.user = user;
    }
    if (!state.user) {
      if (p === '/register') return authView(true);
      if (p !== '/login') return go('/login', true);
      return authView(false);
    }
    if (p === '/login' || p === '/register') return go('/', true);
    if ((m = p.match(/^\/tests\/(\d+)$/))) return testView(Number(m[1]));
    if ((m = p.match(/^\/folder\/(\d+)$/))) return dashboard(Number(m[1]));
    return dashboard(null);
  } catch (e) {
    app.replaceChildren(h('div', { class: 'auth-wrap' }, h('div', { class: 'auth-card' },
      h('h1', {}, 'Ошибка'), h('p', { class: 'muted' }, e.message), link('/', 'На главную'))));
  }
}

const topbar = (...right) => h('div', { class: 'topbar' },
  link('/', h('span', { class: 'logo' }, h('i'), 'UX-исследования')), h('div', { class: 'grow' }), ...right,
  state.user && h('span', { class: 'muted' }, state.user.name),
  state.user && h('button', { class: 'btn sm', onclick: async () => { await api('POST', '/api/logout'); state.user = null; go('/login'); } }, 'Выйти'));

// ---------- вход / регистрация ----------
function authView(isRegister) {
  const name = h('input', { type: 'text', placeholder: 'Как вас зовут' });
  const email = h('input', { type: 'email', placeholder: 'you@example.com', autocomplete: 'email' });
  const pass = h('input', { type: 'password', placeholder: 'Минимум 6 символов', autocomplete: isRegister ? 'new-password' : 'current-password' });
  const err = h('div', { class: 'error', hidden: true });
  const submit = async (e) => {
    e.preventDefault();
    err.hidden = true;
    try {
      const { user } = await api('POST', isRegister ? '/api/register' : '/api/login',
        { email: email.value, password: pass.value, ...(isRegister ? { name: name.value } : {}) });
      state.user = user;
      go('/', true);
    } catch (ex) { err.textContent = ex.message; err.hidden = false; }
  };
  app.replaceChildren(h('div', { class: 'auth-wrap' }, h('form', { class: 'auth-card', onsubmit: submit },
    h('div', { class: 'logo', style: { marginBottom: '18px' } }, h('i'), 'UX-исследования'),
    h('h1', {}, isRegister ? 'Регистрация' : 'Вход'),
    h('p', { class: 'muted', style: { marginTop: 0, marginBottom: '18px' } }, isRegister ? 'Создайте аккаунт, чтобы собирать тесты' : 'Войдите, чтобы продолжить'),
    isRegister && h('label', { class: 'field' }, h('span', {}, 'Имя'), name),
    h('label', { class: 'field' }, h('span', {}, 'Email'), email),
    h('label', { class: 'field' }, h('span', {}, 'Пароль'), pass),
    err,
    h('button', { class: 'btn primary', style: { width: '100%', justifyContent: 'center' } }, isRegister ? 'Зарегистрироваться' : 'Войти'),
    h('p', { class: 'muted', style: { textAlign: 'center', marginBottom: 0 } },
      isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? ', link(isRegister ? '/login' : '/register', isRegister ? 'Войти' : 'Зарегистрироваться')))));
}

// ---------- дашборд: папки и тесты ----------
async function dashboard(folderId) {
  const [{ folders }, { tests }] = await Promise.all([api('GET', '/api/folders'), api('GET', '/api/tests')]);
  const unfiled = tests.filter((t) => !t.folder_id).length;
  const list = folderId === null ? tests : tests.filter((t) => t.folder_id === folderId);
  const folder = folders.find((f) => f.id === folderId);
  if (folderId !== null && !folder) return go('/', true);

  const nav = (href, active, label, count, acts) => h('div', { class: 'nav-item' + (active ? ' active' : ''), onclick: () => go(href) },
    '📁 ', h('span', {}, label), h('span', { class: 'count' }, count), acts);

  const sidebar = h('aside', { class: 'sidebar' },
    nav('/', folderId === null, 'Все тесты', tests.length),
    h('h4', {}, 'Папки', h('button', { class: 'icon-btn', title: 'Новая папка', onclick: async () => {
      const name = await prompt('Название папки');
      if (name) { await api('POST', '/api/folders', { name }); render(); }
    } }, '＋')),
    folders.map((f) => nav(`/folder/${f.id}`, f.id === folderId, f.name, tests.filter((t) => t.folder_id === f.id).length,
      h('span', { class: 'acts' },
        h('button', { class: 'icon-btn', title: 'Переименовать', onclick: async (e) => {
          e.stopPropagation();
          const name = await prompt('Новое название', f.name);
          if (name) { await api('PATCH', `/api/folders/${f.id}`, { name }); render(); }
        } }, '✎'),
        h('button', { class: 'icon-btn', title: 'Удалить', onclick: async (e) => {
          e.stopPropagation();
          if (await confirmDialog(`Удалить папку «${f.name}»? Тесты внутри останутся в разделе «Все тесты».`)) {
            await api('DELETE', `/api/folders/${f.id}`);
            go(folderId === f.id ? '/' : location.pathname, true);
          }
        } }, '🗑'))),
    ),
    !folders.length && h('p', { class: 'muted', style: { padding: '0 10px', fontSize: '13px' } }, 'Папок пока нет'),
    unfiled !== tests.length && h('p', { class: 'muted', style: { padding: '0 10px', fontSize: '12px' } }, `Без папки: ${unfiled}`));

  const createTest = async () => {
    const title = await prompt('Название теста', 'Новый тест');
    if (!title) return;
    const { id } = await api('POST', '/api/tests', { title, folder_id: folderId });
    go(`/tests/${id}`);
  };

  const card = (t) => h('div', { class: 'test-card', onclick: () => go(`/tests/${t.id}`) },
    h('div', { class: 'row' }, h('h3', { class: 'grow' }, t.title),
      h('span', { class: 'badge' + (t.published ? ' ok' : '') }, t.published ? 'Опубликован' : 'Черновик')),
    h('div', { class: 'meta' }, h('span', {}, `Прохождений: ${t.responses_count}`), h('span', {}, '·'), h('span', {}, fmtDate(t.updated_at)),
      !folderId && t.folder_id && h('span', {}, `· 📁 ${(folders.find((f) => f.id === t.folder_id) || {}).name || ''}`)),
    h('div', { class: 'row', onclick: (e) => e.stopPropagation() },
      h('button', { class: 'btn sm', onclick: () => moveTest(t, folders) }, 'В папку'),
      h('button', { class: 'btn sm', onclick: async () => { const r = await api('POST', `/api/tests/${t.id}/duplicate`); toast('Копия создана'); go(`/tests/${r.id}`); } }, 'Копия'),
      h('button', { class: 'btn sm danger', onclick: async () => {
        if (await confirmDialog(`Удалить тест «${t.title}» вместе со всеми результатами?`)) { await api('DELETE', `/api/tests/${t.id}`); render(); }
      } }, 'Удалить')));

  app.replaceChildren(topbar(), h('div', { class: 'layout' }, sidebar, h('main', { class: 'main' },
    h('div', { class: 'page-head' }, h('h2', {}, folder ? `📁 ${folder.name}` : 'Все тесты'),
      h('button', { class: 'btn primary', onclick: createTest }, '＋ Создать тест')),
    list.length ? h('div', { class: 'test-grid' }, list.map(card))
      : h('div', { class: 'empty' }, h('p', {}, 'Здесь пока нет тестов'), h('button', { class: 'btn primary', onclick: createTest }, 'Создать первый тест')))));
}

function moveTest(t, folders) {
  modal((close) => h('div', {},
    h('h3', { style: { marginBottom: '12px' } }, 'Переместить в папку'),
    [{ id: null, name: 'Без папки' }, ...folders].map((f) => h('div', { class: 'nav-item' + (f.id === t.folder_id ? ' active' : ''), onclick: async () => {
      await api('PUT', `/api/tests/${t.id}`, { folder_id: f.id });
      close(); render();
    } }, f.id === null ? '—' : '📁', ' ', f.name))), { small: true });
}

// ---------- страница теста: конструктор / результаты / шеринг ----------
async function testView(id) {
  const { test } = await api('GET', `/api/tests/${id}`);
  const tab = new URLSearchParams(location.search).get('tab') || 'build';

  // автосохранение
  let timer = null, saving = Promise.resolve();
  const status = h('span', { class: 'muted', style: { fontSize: '13px' } }, 'Сохранено');
  const save = () => {
    clearTimeout(timer); timer = null;
    status.textContent = 'Сохранение…';
    saving = saving.then(() => api('PUT', `/api/tests/${id}`, { title: test.title, blocks: test.blocks }))
      .then(() => { status.textContent = 'Сохранено'; })
      .catch((e) => { status.textContent = 'Ошибка сохранения'; toast(e.message); });
    return saving;
  };
  const changed = () => { status.textContent = 'Есть изменения…'; clearTimeout(timer); timer = setTimeout(save, 600); };
  beforeLeave = async () => { if (timer) await save(); else await saving; };

  const tabBtn = (key, label) => h('button', { class: 'tab' + (tab === key ? ' active' : ''), onclick: () => go(`/tests/${id}${key === 'build' ? '' : `?tab=${key}`}`) }, label);
  const bar = topbar(status,
    h('div', { class: 'tabs' }, tabBtn('build', 'Конструктор'), tabBtn('results', 'Результаты'), tabBtn('share', 'Поделиться')));
  bar.insertBefore(h('a', { href: '/', 'data-link': '', class: 'btn sm ghost' }, '← Тесты'), bar.children[1]);

  const body = h('div');
  app.replaceChildren(bar, body);
  if (tab === 'results') return resultsTab(body, test);
  if (tab === 'share') return shareTab(body, test);
  builderTab(body, test, changed);
}

function builderTab(body, test, changed) {
  const openIds = new Set(test.blocks.length === 1 ? [test.blocks[0].id] : []);
  const title = h('input', { type: 'text', class: 'title-input', value: test.title, placeholder: 'Название теста' });
  title.addEventListener('input', () => { test.title = title.value; changed(); });
  const list = h('div');

  const drawBlock = (b, i) => {
    const T = TYPES[b.type];
    const open = openIds.has(b.id);
    const ttl = h('div', { class: 'ttl' }, b.title || 'Без названия');
    const move = (d) => (e) => {
      e.stopPropagation();
      const j = i + d;
      if (j < 0 || j >= test.blocks.length) return;
      [test.blocks[i], test.blocks[j]] = [test.blocks[j], test.blocks[i]];
      changed(); draw();
    };
    const head = h('div', { class: 'block-head', onclick: () => { open ? openIds.delete(b.id) : openIds.add(b.id); draw(); } },
      h('div', { class: 'bico' }, T.icon), h('div', { class: 'num' }, i + 1), ttl,
      h('span', { class: 'muted', style: { fontSize: '13px' } }, T.label),
      h('button', { class: 'icon-btn', title: 'Вверх', onclick: move(-1) }, '↑'),
      h('button', { class: 'icon-btn', title: 'Вниз', onclick: move(1) }, '↓'),
      h('button', { class: 'icon-btn', title: 'Дублировать', onclick: (e) => {
        e.stopPropagation();
        const copy = JSON.parse(JSON.stringify(b));
        const remap = (o) => { if (Array.isArray(o)) o.forEach(remap); else if (o && typeof o === 'object') { if (o.id) o.id = Math.random().toString(36).slice(2, 10); Object.values(o).forEach(remap); } };
        remap(copy);
        test.blocks.splice(i + 1, 0, copy); openIds.add(copy.id); changed(); draw();
      } }, '⧉'),
      h('button', { class: 'icon-btn', title: 'Удалить', onclick: async (e) => {
        e.stopPropagation();
        if (await confirmDialog('Удалить блок?')) { test.blocks.splice(i, 1); changed(); draw(); }
      } }, '🗑'));

    const el = h('div', { class: 'block' + (open ? ' open' : '') }, head);
    if (open) {
      const bodyEl = h('div', { class: 'block-body' });
      const ctx = {
        change: () => { ttl.textContent = b.title || 'Без названия'; changed(); },
        refresh: () => fill(),
      };
      const fill = () => {
        const common = [];
        const mk = (label, key, multiline) => {
          const input = h(multiline ? 'textarea' : 'input', { type: 'text', value: b[key] || '', rows: 2 });
          input.addEventListener('input', () => { b[key] = input.value; ctx.change(); });
          return h('label', { class: 'field' }, h('span', {}, label), input);
        };
        common.push(mk(b.type === 'fivesec' ? 'Вопрос после показа' : 'Вопрос / заголовок', 'title'));
        common.push(mk('Описание (необязательно)', 'description', true));
        const req = h('input', { type: 'checkbox', checked: !!b.required });
        req.addEventListener('change', () => { b.required = req.checked; changed(); });
        common.push(h('label', { class: 'check', style: { marginBottom: '12px' } }, req, 'Обязательный блок'));
        bodyEl.replaceChildren(...common, ...T.editor(b, ctx).filter(Boolean));
      };
      fill();
      el.append(bodyEl);
    }
    return el;
  };

  const draw = () => {
    list.replaceChildren(...test.blocks.map(drawBlock));
    if (!test.blocks.length) list.append(h('div', { class: 'empty' }, 'Добавьте первый блок, чтобы начать собирать тест'));
  };
  draw();

  const addBtn = h('div', { class: 'add-block' }, h('button', { class: 'btn primary', onclick: () => openPalette((type) => {
    const b = createBlock(type);
    test.blocks.push(b); openIds.clear(); openIds.add(b.id); changed(); draw();
    list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }) }, '＋ Добавить блок'));
  body.append(h('div', { class: 'editor' }, title,
    h('p', { class: 'muted', style: { marginTop: 0 } }, 'Респонденты увидят блоки в том порядке, в котором они расположены.'), list, addBtn));
}

function openPalette(onPick) {
  modal((close) => h('div', {},
    h('div', { class: 'row', style: { marginBottom: '14px' } }, h('h3', { class: 'grow' }, 'Добавить блок'), h('button', { class: 'icon-btn', onclick: close }, '✕')),
    h('div', { class: 'palette' }, PALETTE.map((col) => h('div', {}, h('h4', {}, col.group),
      col.items.map((it) => {
        if (it.type) {
          const T = TYPES[it.type];
          return h('div', { class: 'pal-item', onclick: () => { close(); onPick(it.type); } },
            h('div', { class: 't' }, h('span', { class: 'bico' }, T.icon), T.label), h('div', { class: 'd' }, T.desc));
        }
        return h('div', { class: 'pal-item locked', title: 'Скоро будет доступно', onclick: () => toast('Этот блок скоро появится') },
          h('div', { class: 't' }, h('span', { class: 'bico' }, it.icon), it.label, ' 🔒'), h('div', { class: 'd' }, it.desc));
      }))))));
}

// ---------- шеринг ----------
function shareTab(body, test) {
  const url = `${location.origin}/t/${test.share_token}`;
  const sw = h('input', { type: 'checkbox', checked: test.published });
  const hint = h('p', { class: 'muted' });
  const upd = () => { hint.textContent = test.published ? 'Любой, у кого есть ссылка, может пройти тест. Регистрация не нужна.' : 'Тест в черновике: по ссылке респонденты увидят, что он закрыт. Вы можете открыть его в режиме предпросмотра.'; };
  sw.addEventListener('change', async () => {
    try { await api('PUT', `/api/tests/${test.id}`, { published: sw.checked }); test.published = sw.checked; upd(); toast(sw.checked ? 'Тест опубликован' : 'Тест снят с публикации'); }
    catch (e) { sw.checked = !sw.checked; toast(e.message); }
  });
  upd();
  const input = h('input', { type: 'text', value: url, readonly: true, onfocus: (e) => e.target.select() });
  body.append(h('div', { class: 'share-box' },
    h('h2', { style: { marginBottom: '14px' } }, 'Поделиться тестом'),
    h('label', { class: 'switch' }, sw, h('b', {}, 'Опубликован')), hint,
    h('div', { class: 'link-row' }, input, h('button', { class: 'btn primary', onclick: async () => {
      try { await navigator.clipboard.writeText(url); } catch { input.select(); document.execCommand('copy'); }
      toast('Ссылка скопирована');
    } }, 'Копировать')),
    h('a', { class: 'btn', href: `/t/${test.share_token}?preview=1`, target: '_blank' }, 'Предпросмотр (ответы не сохраняются)')));
}

// ---------- результаты ----------
async function resultsTab(body, test) {
  const { responses } = await api('GET', `/api/tests/${test.id}/results`);
  const done = responses.filter((r) => r.completed);
  const times = done.map((r) => r.finished_at - r.started_at).sort((a, b) => a - b);
  const median = times.length ? times[Math.floor(times.length / 2)] : null;
  const fmtDur = (ms) => (ms < 60000 ? `${Math.round(ms / 1000)} с` : `${Math.floor(ms / 60000)} мин ${Math.round((ms % 60000) / 1000)} с`);

  const exportCsv = () => {
    const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
    const head = ['ID', 'Начато', 'Завершено', 'Статус', ...test.blocks.map((b, i) => `${i + 1}. ${b.title}`)];
    const rows = responses.map((r) => [r.id, new Date(r.started_at).toISOString(), r.finished_at ? new Date(r.finished_at).toISOString() : '', r.completed ? 'Завершено' : 'Не завершено',
      ...test.blocks.map((b) => (b.id in r.answers ? TYPES[b.type].exportValue(b, r.answers[b.id]) : ''))]);
    const csv = '﻿' + [head, ...rows].map((r) => r.map(esc).join(';')).join('\r\n');
    const a = h('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: `${test.title}.csv` });
    document.body.append(a); a.click(); a.remove();
  };

  const blocksRes = test.blocks.map((b, i) => {
    const vals = responses.filter((r) => r.answers[b.id] !== undefined && r.answers[b.id] !== null).map((r) => r.answers[b.id]);
    return h('div', { class: 'res-block' },
      h('div', { class: 'row', style: { marginBottom: '8px' } }, h('span', { class: 'bico' }, TYPES[b.type].icon),
        h('div', { class: 'grow' }, h('h3', {}, `${i + 1}. ${b.title}`), h('span', { class: 'muted', style: { fontSize: '13px' } }, `${TYPES[b.type].label} · ответов: ${vals.length}`))),
      TYPES[b.type].results(b, vals));
  });

  const respTable = h('div', { class: 'res-block' }, h('h3', { style: { marginBottom: '10px' } }, 'Все прохождения'),
    responses.length ? h('div', { class: 'matrix-wrap' }, h('table', { class: 'res' },
      h('thead', {}, h('tr', {}, ['#', 'Начато', 'Статус', 'Время', ''].map((t) => h('th', {}, t)))),
      h('tbody', {}, responses.map((r) => h('tr', {}, h('td', {}, r.id), h('td', {}, fmtDate(r.started_at)),
        h('td', {}, r.completed ? '✅ Завершено' : '⏳ Не завершено'), h('td', {}, r.finished_at ? fmtDur(r.finished_at - r.started_at) : '—'),
        h('td', {}, h('button', { class: 'icon-btn', title: 'Удалить', onclick: async () => {
          if (await confirmDialog('Удалить это прохождение?')) { await api('DELETE', `/api/tests/${test.id}/responses/${r.id}`); render(); }
        } }, '🗑'))))))) : h('p', { class: 'muted' }, 'Пока никто не проходил тест'));

  body.append(h('div', { class: 'results' },
    h('div', { class: 'page-head' }, h('h2', {}, test.title),
      h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => render() }, '↻ Обновить'), h('button', { class: 'btn', onclick: exportCsv, disabled: !responses.length }, '⬇ CSV'))),
    h('div', { class: 'stats' },
      h('div', { class: 'stat' }, h('b', {}, responses.length), 'начали'),
      h('div', { class: 'stat' }, h('b', {}, done.length), 'завершили'),
      h('div', { class: 'stat' }, h('b', {}, responses.length ? Math.round((done.length / responses.length) * 100) + '%' : '—'), 'доходимость'),
      h('div', { class: 'stat' }, h('b', {}, median ? fmtDur(median) : '—'), 'медианное время')),
    blocksRes, respTable));
}

// ---------- респондент ----------
async function respondentView(token) {
  const preview = new URLSearchParams(location.search).get('preview') === '1';
  let test;
  try { ({ test } = await api('GET', `/api/public/${token}${preview ? '?preview=1' : ''}`)); }
  catch (e) {
    return app.replaceChildren(h('div', { class: 'resp-wrap' }, h('div', { class: 'resp-card' }, h('h2', {}, e.status === 404 ? 'Тест не найден' : 'Тест недоступен'), h('p', { class: 'muted' }, e.message))));
  }
  const blocks = test.blocks;
  const answers = {};
  let step = -1, responseToken = null, finished = false;

  const wrap = h('div', { class: 'resp-wrap' });
  app.replaceChildren(wrap);

  const persist = async (completed) => {
    if (preview) return;
    try {
      if (!responseToken) ({ response_token: responseToken } = await api('POST', `/api/public/${token}/responses`));
      await api('PUT', `/api/public/${token}/responses/${responseToken}`, { answers, completed });
    } catch (e) { toast(e.message); throw e; }
  };

  const draw = () => {
    wrap.replaceChildren();
    if (preview) wrap.append(h('div', { class: 'preview-bar' }, 'Режим предпросмотра — ответы не сохраняются'));
    if (finished) {
      return wrap.append(h('div', { class: 'resp-card', style: { textAlign: 'center' } },
        h('div', { style: { fontSize: '44px' } }, '🎉'), h('h1', {}, 'Спасибо!'), h('p', { class: 'muted' }, 'Ваши ответы сохранены. Можно закрыть страницу.')));
    }
    if (step === -1) {
      return wrap.append(h('div', { class: 'resp-card' }, h('h1', {}, test.title),
        h('p', { class: 'desc' }, blocks.length ? `Вопросов: ${blocks.length}. Это займёт пару минут.` : 'В этом тесте пока нет блоков.'),
        blocks.length > 0 && h('button', { class: 'btn primary', onclick: async () => { try { await persist(false); } catch { return; } step = 0; draw(); } }, 'Начать')));
    }
    const b = blocks[step];
    const T = TYPES[b.type];
    wrap.append(h('div', { class: 'progress' }, h('div', { style: { width: `${(step / blocks.length) * 100}%` } })));
    const next = h('button', { class: 'btn primary' }, step === blocks.length - 1 ? 'Завершить' : 'Далее');
    const err = h('div', { class: 'error', hidden: true });
    const sync = () => { err.hidden = true; };
    const content = T.respond(b, answers[b.id], (v) => { answers[b.id] = v; sync(); });
    next.addEventListener('click', async () => {
      if (b.required && !T.answered(b, answers[b.id])) { err.textContent = 'Этот блок обязателен — ответьте, пожалуйста'; err.hidden = false; return; }
      next.disabled = true;
      const last = step === blocks.length - 1;
      try { await persist(last); } catch { next.disabled = false; return; }
      if (last) finished = true; else step += 1;
      draw(); window.scrollTo(0, 0);
    });
    wrap.append(h('div', { class: 'resp-card' },
      !T.hideTitle && h('h2', {}, b.title), b.description && h('p', { class: 'desc' }, b.description),
      T.hideTitle && b.description && null, content, err,
      h('div', { class: 'resp-actions' },
        h('button', { class: 'btn', disabled: step === 0, onclick: () => { step -= 1; draw(); } }, '← Назад'), next)));
  };
  draw();
}

render();
