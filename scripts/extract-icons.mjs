// Выгружает нужные иконки из набора line дизайн-системы baseui в src/ui/icons.generated.ts.
// Иконки baseui — React-компоненты с одним <svg>; здесь мы рендерим их в статическую разметку,
// чтобы приложение не зависело от скомпилированного бандла baseui.
// Запуск: BASEUI_DIR=/path/to/baseui npm run icons   (по умолчанию ../baseui)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve(process.env.BASEUI_DIR || '../baseui');
const WANTED = [
  // блоки
  'MessageChatCircle', 'CheckSquare', 'BarChart01', 'Grid01', 'Image01', 'Columns01', 'Clock',
  // интерфейс
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'Copy01', 'Trash01', 'XClose', 'Plus', 'Folder', 'FolderPlus',
  'Edit01', 'Lock01', 'Moon01', 'Sun', 'Download01', 'RefreshCw01', 'Check', 'Link01', 'Eye',
  // заблокированные блоки палитры
  'Figma', 'Globe01', 'Code01', 'CursorClick01', 'Dataflow01', 'SwitchVertical01', 'TrendUp01',
  'Stars01', 'Sliders01', 'Users01', 'GitBranch01', 'Shuffle02', 'File01', 'Edit03', 'InfoCircle',
];
const kebab = (k) => ({ fillRule: 'fill-rule', clipRule: 'clip-rule', strokeWidth: 'stroke-width', strokeLinecap: 'stroke-linecap', strokeLinejoin: 'stroke-linejoin' })[k] || k;
const esc = (v) => String(v).replace(/"/g, '&quot;');

function serialize(el) {
  if (el == null || typeof el === 'string') return el ?? '';
  const { children, ...props } = el.props || {};
  const attrs = Object.entries(props).filter(([, v]) => v != null && typeof v !== 'object' && typeof v !== 'function')
    .map(([k, v]) => `${kebab(k)}="${esc(v)}"`).join(' ');
  const kids = [].concat(children ?? []).map(serialize).join('');
  return kids ? `<${el.type} ${attrs}>${kids}</${el.type}>` : `<${el.type} ${attrs}/>`;
}

const mod = await import(pathToFileURL(path.join(dir, 'lib', fs.readdirSync(path.join(dir, 'lib')).find((f) => /^line-.*\.js$/.test(f)))).href);
const comps = new Map(Object.values(mod).filter((f) => typeof f === 'function' && f.displayName).map((f) => [f.displayName, f]));
const out = {};
for (const name of WANTED) {
  const C = comps.get(name);
  if (!C) { console.warn('нет иконки', name); continue; }
  const svg = C({ size: 24 });
  out[name] = [].concat(svg.props.children).map(serialize).join('');
}
const file = path.resolve('src/ui/icons.generated.ts');
fs.writeFileSync(file, `// Сгенерировано scripts/extract-icons.mjs из baseui (line). Не править вручную.\nexport const icons = ${JSON.stringify(out, null, 2)} as const;\nexport type IconName = keyof typeof icons;\n`);
console.log(`${Object.keys(out).length} иконок → ${file}`);
