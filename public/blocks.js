// Блоки конструктора: редактор, прохождение респондентом, результаты, экспорт
import { h, uid, readImage, toast } from './util.js';

const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0);
const textOf = (list, id) => (list.find((x) => x.id === id) || {}).text || '—';

// ---- общие элементы редактора ----
function field(label, input) { return h('label', { class: 'field' }, h('span', {}, label), input); }
function textField(label, obj, key, ctx, { multiline = false, placeholder = '' } = {}) {
  const el = h(multiline ? 'textarea' : 'input', { type: 'text', value: obj[key] || '', placeholder, rows: 2 });
  el.addEventListener('input', () => { obj[key] = el.value; ctx.change(); });
  return field(label, el);
}
function numField(label, obj, key, ctx, min, max) {
  const el = h('input', { type: 'number', value: obj[key], min, max });
  el.addEventListener('input', () => {
    let v = Number(el.value);
    if (Number.isFinite(v)) { obj[key] = Math.min(max, Math.max(min, Math.round(v))); ctx.change(); }
  });
  return field(label, el);
}
function checkField(label, obj, key, ctx, refresh = false) {
  const el = h('input', { type: 'checkbox', checked: !!obj[key] });
  el.addEventListener('change', () => { obj[key] = el.checked; ctx.change(); if (refresh) ctx.refresh(); });
  return h('label', { class: 'check', style: { marginBottom: '10px' } }, el, label);
}
function listEditor(label, list, ctx, { addLabel = '+ Добавить', min = 1, placeholder = 'Текст' } = {}) {
  const wrap = h('div', { class: 'field' }, h('span', { style: { display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' } }, label));
  list.forEach((item, i) => {
    const input = h('input', { type: 'text', value: item.text, placeholder });
    input.addEventListener('input', () => { item.text = input.value; ctx.change(); });
    wrap.append(h('div', { class: 'opt-row' }, input,
      h('button', { class: 'icon-btn', title: 'Удалить', disabled: list.length <= min, onclick: () => { list.splice(i, 1); ctx.change(); ctx.refresh(); } }, '✕')));
  });
  wrap.append(h('button', { class: 'btn sm', onclick: () => { list.push({ id: uid(), text: '' }); ctx.change(); ctx.refresh(); } }, addLabel));
  return wrap;
}
function imageEditor(item, ctx, { withCaption = false, onRemove } = {}) {
  const url = h('input', { type: 'text', placeholder: 'Ссылка на изображение или загрузите файл', value: item.src && !item.src.startsWith('data:') ? item.src : '' });
  const img = h('img', { src: item.src || '', alt: '' });
  const setSrc = (s) => { item.src = s; img.src = s; ctx.change(); };
  url.addEventListener('change', () => setSrc(url.value.trim()));
  const file = h('input', { type: 'file', accept: 'image/*', hidden: true });
  file.addEventListener('change', async () => {
    if (!file.files[0]) return;
    try { setSrc(await readImage(file.files[0])); url.value = ''; } catch (e) { toast(e.message); }
  });
  const cap = withCaption ? h('input', { type: 'text', placeholder: 'Подпись (необязательно)', value: item.caption || '' }) : null;
  if (cap) cap.addEventListener('input', () => { item.caption = cap.value; ctx.change(); });
  return h('div', { class: 'img-edit' }, img,
    h('div', { class: 'grow', style: { display: 'grid', gap: '6px' } }, url, cap,
      h('div', { class: 'row' }, h('button', { class: 'btn sm', onclick: () => file.click() }, 'Загрузить файл'), file,
        onRemove && h('button', { class: 'btn sm danger', onclick: onRemove }, 'Удалить'))));
}

// ---- результаты: общие помощники ----
function bars(rows, total) {
  return h('div', {}, rows.map(([label, n]) =>
    h('div', { class: 'bar-row' }, h('div', {}, label),
      h('div', { class: 'bar' }, h('div', { style: { width: pct(n, total) + '%' } })),
      h('div', { class: 'muted' }, `${n} · ${pct(n, total)}%`))));
}
function heatTable(rowsLabels, colLabels, getCount, total) {
  return h('div', { class: 'matrix-wrap' }, h('table', { class: 'res' },
    h('thead', {}, h('tr', {}, h('th', {}), colLabels.map((c) => h('th', {}, c)))),
    h('tbody', {}, rowsLabels.map((r, ri) => h('tr', {}, h('td', {}, r),
      colLabels.map((_, ci) => {
        const n = getCount(ri, ci);
        const a = total ? n / total : 0;
        return h('td', { class: 'heat', style: { background: `rgba(87,93,246,${(a * 0.7).toFixed(2)})`, color: a > 0.55 ? '#fff' : 'inherit' } }, n || '');
      }))))));
}
const noAnswers = () => h('p', { class: 'muted' }, 'Пока нет ответов');

// ================= ТИПЫ БЛОКОВ =================
export const TYPES = {
  question: {
    label: 'Вопрос', icon: '💬', desc: 'Задавайте открытые вопросы и уточняйте ответы с помощью AI',
    create: () => ({ title: 'Расскажите о вашем опыте', description: '', required: false, long: true }),
    editor(b, ctx) {
      return [checkField('Развёрнутый ответ (многострочное поле)', b, 'long', ctx)];
    },
    respond(b, value, set) {
      const el = b.long
        ? h('textarea', { rows: 4, placeholder: 'Ваш ответ…' })
        : h('input', { type: 'text', placeholder: 'Ваш ответ…' });
      el.value = value || '';
      el.addEventListener('input', () => set(el.value));
      return el;
    },
    answered: (b, v) => typeof v === 'string' && v.trim() !== '',
    results(b, vals) {
      if (!vals.length) return noAnswers();
      return h('div', { class: 'text-answers' }, vals.map((v) => h('div', {}, v)));
    },
    exportValue: (b, v) => v || '',
  },

  choice: {
    label: 'Выбор', icon: '☑️', desc: 'Задавайте вопросы с выбором или мультивыбором',
    create: () => ({ title: 'Выберите вариант', description: '', required: false, multiple: false,
      options: [{ id: uid(), text: 'Вариант 1' }, { id: uid(), text: 'Вариант 2' }] }),
    editor(b, ctx) {
      return [checkField('Можно выбрать несколько', b, 'multiple', ctx), listEditor('Варианты ответа', b.options, ctx, { addLabel: '+ Добавить вариант', min: 2, placeholder: 'Вариант' })];
    },
    respond(b, value, set) {
      let sel = Array.isArray(value) ? [...value] : [];
      const wrap = h('div');
      const draw = () => {
        wrap.replaceChildren(...b.options.map((o) => {
          const input = h('input', { type: b.multiple ? 'checkbox' : 'radio', name: b.id, checked: sel.includes(o.id) });
          const row = h('label', { class: 'choice' + (sel.includes(o.id) ? ' sel' : '') }, input, o.text || '—');
          input.addEventListener('change', () => {
            if (b.multiple) sel = input.checked ? [...sel, o.id] : sel.filter((x) => x !== o.id);
            else sel = [o.id];
            set(sel); draw();
          });
          return row;
        }));
      };
      draw();
      return wrap;
    },
    answered: (b, v) => Array.isArray(v) && v.length > 0,
    results(b, vals) {
      if (!vals.length) return noAnswers();
      return bars(b.options.map((o) => [o.text || '—', vals.filter((v) => v.includes(o.id)).length]), vals.length);
    },
    exportValue: (b, v) => (v || []).map((id) => textOf(b.options, id)).join('; '),
  },

  scale: {
    label: 'Шкала', icon: '📊', desc: 'Попросите респондентов оценить что-либо по шкале',
    create: () => ({ title: 'Оцените по шкале', description: '', required: false, min: 1, max: 5, minLabel: 'Совсем не нравится', maxLabel: 'Очень нравится' }),
    editor(b, ctx) {
      return [h('div', { class: 'row' },
        h('div', { class: 'grow' }, numField('От', b, 'min', ctx, 0, 1)),
        h('div', { class: 'grow' }, numField('До', b, 'max', ctx, 3, 10))),
        h('div', { class: 'row' },
          h('div', { class: 'grow' }, textField('Подпись слева', b, 'minLabel', ctx)),
          h('div', { class: 'grow' }, textField('Подпись справа', b, 'maxLabel', ctx)))];
    },
    respond(b, value, set) {
      const wrap = h('div');
      const draw = () => {
        const btns = [];
        for (let i = b.min; i <= b.max; i++) {
          btns.push(h('button', { type: 'button', class: value === i ? 'sel' : '', onclick: () => { value = i; set(i); draw(); } }, i));
        }
        wrap.replaceChildren(h('div', { class: 'scale' }, btns),
          h('div', { class: 'scale-labels' }, h('span', {}, b.minLabel), h('span', {}, b.maxLabel)));
      };
      draw();
      return wrap;
    },
    answered: (b, v) => typeof v === 'number',
    results(b, vals) {
      if (!vals.length) return noAnswers();
      const avg = (vals.reduce((a, c) => a + c, 0) / vals.length).toFixed(2);
      const rows = [];
      for (let i = b.min; i <= b.max; i++) rows.push([String(i), vals.filter((v) => v === i).length]);
      return h('div', {}, h('p', {}, 'Среднее: ', h('b', {}, avg)), bars(rows, vals.length));
    },
    exportValue: (b, v) => (v ?? ''),
  },

  matrix: {
    label: 'Матрица', icon: '▦', desc: 'Задавайте вопросы с мультивыбором в виде сетки строк и столбцов',
    create: () => ({ title: 'Оцените каждый пункт', description: '', required: false, multiple: false,
      rows: [{ id: uid(), text: 'Строка 1' }, { id: uid(), text: 'Строка 2' }],
      cols: [{ id: uid(), text: 'Столбец 1' }, { id: uid(), text: 'Столбец 2' }, { id: uid(), text: 'Столбец 3' }] }),
    editor(b, ctx) {
      return [checkField('Несколько ответов в строке', b, 'multiple', ctx),
        listEditor('Строки', b.rows, ctx, { addLabel: '+ Добавить строку', min: 1, placeholder: 'Строка' }),
        listEditor('Столбцы', b.cols, ctx, { addLabel: '+ Добавить столбец', min: 2, placeholder: 'Столбец' })];
    },
    respond(b, value, set) {
      const ans = {};
      for (const [k, v] of Object.entries(value || {})) ans[k] = [...v];
      const tbl = h('table', { class: 'matrix' },
        h('thead', {}, h('tr', {}, h('th'), b.cols.map((c) => h('th', {}, c.text)))),
        h('tbody', {}, b.rows.map((r) => h('tr', {}, h('td', {}, r.text),
          b.cols.map((c) => {
            const input = h('input', { type: b.multiple ? 'checkbox' : 'radio', name: `${b.id}-${r.id}`, checked: (ans[r.id] || []).includes(c.id) });
            input.addEventListener('change', () => {
              const cur = ans[r.id] || [];
              ans[r.id] = b.multiple ? (input.checked ? [...cur, c.id] : cur.filter((x) => x !== c.id)) : [c.id];
              set(JSON.parse(JSON.stringify(ans)));
            });
            return h('td', {}, input);
          })))));
      return h('div', { class: 'matrix-wrap' }, tbl);
    },
    answered: (b, v) => !!v && b.rows.every((r) => (v[r.id] || []).length > 0),
    results(b, vals) {
      if (!vals.length) return noAnswers();
      return heatTable(b.rows.map((r) => r.text), b.cols.map((c) => c.text),
        (ri, ci) => vals.filter((v) => (v[b.rows[ri].id] || []).includes(b.cols[ci].id)).length, vals.length);
    },
    exportValue: (b, v) => b.rows.map((r) => `${r.text}: ${((v || {})[r.id] || []).map((id) => textOf(b.cols, id)).join(', ')}`).join('; '),
  },

  preference: {
    label: 'Предпочтение', icon: '🖼️', desc: 'Сравните 2 или более изображений',
    create: () => ({ title: 'Какой вариант вам нравится больше?', description: '', required: false,
      images: [{ id: uid(), src: '', caption: 'Вариант A' }, { id: uid(), src: '', caption: 'Вариант B' }] }),
    editor(b, ctx) {
      const wrap = h('div', { class: 'field' }, h('span', { style: { display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' } }, 'Изображения (минимум 2)'));
      b.images.forEach((im, i) => wrap.append(imageEditor(im, ctx, {
        withCaption: true,
        onRemove: b.images.length > 2 ? () => { b.images.splice(i, 1); ctx.change(); ctx.refresh(); } : null,
      })));
      wrap.append(h('button', { class: 'btn sm', onclick: () => { b.images.push({ id: uid(), src: '', caption: '' }); ctx.change(); ctx.refresh(); } }, '+ Добавить изображение'));
      return [wrap];
    },
    respond(b, value, set) {
      const wrap = h('div', { class: 'pref-grid' });
      const draw = () => wrap.replaceChildren(...b.images.map((im) =>
        h('div', { class: 'pref-item' + (value === im.id ? ' sel' : ''), onclick: () => { value = im.id; set(im.id); draw(); } },
          im.src ? h('img', { src: im.src, alt: im.caption || '' }) : h('div', { class: 'muted', style: { padding: '40px 0' } }, 'Нет изображения'),
          im.caption && h('div', {}, im.caption))));
      draw();
      return wrap;
    },
    answered: (b, v) => typeof v === 'string',
    results(b, vals) {
      if (!vals.length) return noAnswers();
      const rows = b.images.map((im) => [h('span', {}, im.src && h('img', { class: 'thumb', src: im.src }), im.caption || '—'), vals.filter((v) => v === im.id).length]);
      return bars(rows, vals.length);
    },
    exportValue: (b, v) => { const i = b.images.findIndex((im) => im.id === v); return i < 0 ? '' : (b.images[i].caption || `Изображение ${i + 1}`); },
  },

  cardsort: {
    label: 'Сортировка карточек', icon: '🗂️', desc: 'Попросите респондентов сгруппировать идеи по категориям',
    create: () => ({ title: 'Разложите карточки по категориям', description: 'Перетащите карточку в подходящую категорию (или нажмите на неё, затем на категорию).', required: false, open: false,
      cards: [{ id: uid(), text: 'Карточка 1' }, { id: uid(), text: 'Карточка 2' }, { id: uid(), text: 'Карточка 3' }],
      categories: [{ id: uid(), text: 'Категория A' }, { id: uid(), text: 'Категория B' }] }),
    editor(b, ctx) {
      return [checkField('Открытая сортировка (респонденты сами создают категории)', b, 'open', ctx, true),
        listEditor('Карточки', b.cards, ctx, { addLabel: '+ Добавить карточку', min: 2, placeholder: 'Карточка' }),
        !b.open && listEditor('Категории', b.categories, ctx, { addLabel: '+ Добавить категорию', min: 2, placeholder: 'Категория' })];
    },
    respond(b, value, set) {
      const ans = { ...(value || {}) }; // cardId -> имя категории
      const cats = b.open ? [...new Set(Object.values(ans))] : b.categories.map((c) => c.text || '—');
      let selected = null;
      const wrap = h('div');
      const place = (cardId, cat) => {
        if (cat === null) delete ans[cardId]; else ans[cardId] = cat;
        selected = null; set({ ...ans }); draw();
      };
      const chip = (c) => h('div', { class: 'card-chip' + (selected === c.id ? ' sel' : ''), draggable: true,
        ondragstart: (e) => { e.dataTransfer.setData('text/plain', c.id); selected = c.id; },
        onclick: (e) => { e.stopPropagation(); selected = selected === c.id ? null : c.id; draw(); } }, c.text || '—');
      const zone = (title, cat, cards, extra) => {
        const z = h('div', { class: 'sort-cat' + (selected ? ' target' : ''), onclick: () => { if (selected) place(selected, cat); },
          ondragover: (e) => e.preventDefault(),
          ondrop: (e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) place(id, cat); } },
        title && h('h4', {}, title), cards.map(chip), extra);
        return z;
      };
      const draw = () => {
        const pool = b.cards.filter((c) => !(c.id in ans));
        const newCat = b.open && h('div', { class: 'row' }, (() => {
          const inp = h('input', { type: 'text', placeholder: 'Название новой категории' });
          const add = () => { const n = inp.value.trim(); if (n && !cats.includes(n)) { cats.push(n); draw(); } };
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
          return [inp, h('button', { class: 'btn', onclick: add }, '+')];
        })());
        const poolEl = zone('Карточки', null, pool, !pool.length && h('div', { class: 'muted' }, 'Все карточки разложены'));
        poolEl.classList.remove('target');
        wrap.replaceChildren(h('div', { class: 'sort-layout' }, poolEl,
          h('div', { class: 'sort-cats' }, cats.map((cat) => zone(cat, cat, b.cards.filter((c) => ans[c.id] === cat))), newCat)));
      };
      draw();
      return wrap;
    },
    answered: (b, v) => !!v && b.cards.every((c) => c.id in v),
    results(b, vals) {
      if (!vals.length) return noAnswers();
      const cats = b.open ? [...new Set(vals.flatMap((v) => Object.values(v)))] : b.categories.map((c) => c.text || '—');
      return heatTable(b.cards.map((c) => c.text), cats, (ri, ci) => vals.filter((v) => v[b.cards[ri].id] === cats[ci]).length, vals.length);
    },
    exportValue: (b, v) => b.cards.filter((c) => v && c.id in v).map((c) => `${c.text} → ${v[c.id]}`).join('; '),
  },

  fivesec: {
    label: 'Пять секунд', icon: '⏱️', desc: 'Покажите изображение на ограниченный промежуток времени',
    create: () => ({ title: 'Что вы запомнили?', description: 'Сейчас вы увидите изображение на несколько секунд. Постарайтесь запомнить как можно больше.', required: false, image: { src: '' }, seconds: 5 }),
    editor(b, ctx) {
      return [numField('Секунд показа', b, 'seconds', ctx, 1, 60),
        h('div', { class: 'field' }, h('span', { style: { display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' } }, 'Изображение'), imageEditor(b.image, ctx)),
        h('p', { class: 'muted', style: { fontSize: '13px' } }, 'Заголовок блока — это вопрос, который увидит респондент после показа изображения. Описание показывается перед просмотром.')];
    },
    respond(b, value, set) {
      const wrap = h('div');
      let seen = typeof value === 'string';
      const question = () => {
        const ta = h('textarea', { rows: 4, placeholder: 'Ваш ответ…' });
        ta.value = value || '';
        ta.addEventListener('input', () => { value = ta.value; set(ta.value); });
        wrap.replaceChildren(h('h2', { style: { fontSize: '17px', marginBottom: '8px' } }, b.title), ta);
        setTimeout(() => ta.focus(), 0);
      };
      const show = () => {
        let left = b.seconds;
        const count = h('div', { class: 'countdown' }, left);
        wrap.replaceChildren(h('div', { class: 'fivesec-stage' }, count, b.image.src ? h('img', { src: b.image.src, alt: '' }) : h('p', { class: 'muted' }, 'Изображение не задано')));
        const timer = setInterval(() => {
          left -= 1; count.textContent = left;
          if (left <= 0) { clearInterval(timer); seen = true; set(value || ''); question(); }
        }, 1000);
      };
      if (seen) question();
      else wrap.replaceChildren(h('div', { class: 'fivesec-stage' },
        h('p', { class: 'muted' }, `Изображение будет показано ${b.seconds} сек.`),
        h('button', { class: 'btn primary', onclick: show }, 'Начать')));
      return wrap;
    },
    hideTitle: true,
    answered: (b, v) => typeof v === 'string' && v.trim() !== '',
    results(b, vals) {
      if (!vals.length) return noAnswers();
      return h('div', {}, b.image.src && h('img', { class: 'thumb', src: b.image.src, style: { width: '120px', height: '80px', marginBottom: '8px' } }),
        h('div', { class: 'text-answers' }, vals.filter((v) => v.trim()).map((v) => h('div', {}, v))));
    },
    exportValue: (b, v) => v || '',
  },
};

// Палитра как на макете: 4 колонки, доступны только «базовые»
export const PALETTE = [
  { group: 'Базовые блоки', items: ['question', 'choice', 'scale', 'matrix', 'preference', 'cardsort', 'fivesec'].map((t) => ({ type: t })) },
  { group: 'UX-исследования', items: [
    { icon: '🎨', label: 'Figma', desc: 'Протестируйте прототип Figma' },
    { icon: '🌐', label: 'Сайт', desc: 'Протестируйте любой сайт' },
    { icon: '🧩', label: 'HTML / Website', desc: 'Test a website or HTML prototype' },
    { icon: '👆', label: 'Первый клик', desc: 'Попросите респондентов кликнуть по изображению для выполнения задания' },
    { icon: '🌳', label: 'Тестирование дерева', desc: 'Протестируйте информационную архитектуру вашего сайта' }] },
  { group: 'Маркетинг и CX', items: [
    { icon: '↕️', label: 'Ранжирование', desc: 'Попросите респондентов расставить опции по приоритету' },
    { icon: '📈', label: 'NPS®', desc: 'Измеряйте индекс лояльности клиентов (Net Promoter Score®)' },
    { icon: '📐', label: 'Модель Кано', desc: 'Узнайте, какие функции в продукте наиболее критичны для пользователей' },
    { icon: '⚖️', label: 'MaxDiff', desc: 'Понимайте приоритеты, задав вопросы о том, какие варианты важны больше всего и меньше всего' }] },
  { group: 'Другое', items: [
    { icon: '🧑‍💻', label: 'Скрининг', desc: 'Скрининг респондентов с вопросами для прохождения исследования' },
    { icon: '🔀', label: 'Сплит-блок', desc: 'Равномерно распределите респондентов между группами блоков' },
    { icon: '🎲', label: 'Рандомизация', desc: 'Показывайте набор блоков в случайном порядке' },
    { icon: '📄', label: 'Страница', desc: 'Группируйте несколько блоков на одной странице' },
    { icon: '✍️', label: 'Соглашение', desc: 'Попросите респондентов принять условия перед участием в исследовании' },
    { icon: 'ℹ️', label: 'Контекст', desc: 'Добавьте инструкцию или дополнительную информацию' }] },
];

export function createBlock(type) {
  return { id: uid(), type, ...TYPES[type].create() };
}
