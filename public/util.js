// Мини-хелперы: DOM, API, уведомления, модальные окна
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (['value', 'checked', 'disabled', 'selected', 'hidden', 'draggable'].includes(k)) el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  const add = (c) => {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) return c.forEach(add);
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  };
  children.forEach(add);
  return el;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch { /* пустой ответ */ }
  if (!res.ok) {
    const err = new Error(data.error || `Ошибка ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

let toastTimer;
export function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
}

export function modal(contentFn, { small = false } = {}) {
  const close = () => back.remove();
  const box = h('div', { class: 'modal' + (small ? ' small' : '') });
  const back = h('div', { class: 'modal-back', onclick: (e) => { if (e.target === back) close(); } }, box);
  box.append(contentFn(close));
  document.body.append(back);
  return close;
}

export function prompt(title, initial = '') {
  return new Promise((resolve) => {
    modal((close) => {
      const input = h('input', { type: 'text', value: initial });
      const done = (v) => { close(); resolve(v); };
      setTimeout(() => { input.focus(); input.select(); }, 0);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') done(input.value.trim() || null); if (e.key === 'Escape') done(null); });
      return h('div', {},
        h('h3', { style: { marginBottom: '12px' } }, title), input,
        h('div', { class: 'row', style: { justifyContent: 'flex-end', marginTop: '14px' } },
          h('button', { class: 'btn', onclick: () => done(null) }, 'Отмена'),
          h('button', { class: 'btn primary', onclick: () => done(input.value.trim() || null) }, 'Готово')));
    }, { small: true });
  });
}

export function confirmDialog(text, okLabel = 'Удалить') {
  return new Promise((resolve) => {
    modal((close) => {
      const done = (v) => { close(); resolve(v); };
      return h('div', {},
        h('p', { style: { marginTop: 0 } }, text),
        h('div', { class: 'row', style: { justifyContent: 'flex-end' } },
          h('button', { class: 'btn', onclick: () => done(false) }, 'Отмена'),
          h('button', { class: 'btn primary', onclick: () => done(true) }, okLabel)));
    }, { small: true });
  });
}

export const fmtDate = (ts) => new Date(ts).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });

export function readImage(file, maxSide = 1400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, maxSide / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Не удалось прочитать изображение')); };
    img.src = url;
  });
}
