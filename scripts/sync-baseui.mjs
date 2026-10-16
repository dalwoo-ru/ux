// Синхронизирует дизайн-систему baseui в vendor/baseui и перегенерирует:
//   src/ui/baseui-modules.d.ts      — имена экспортов vendor/baseui/src/index.js для TypeScript
// Типы пропсов (src/ui/baseui-types.ts) и реэкспорт (src/ui/baseui.ts) ведутся вручную.
//   src/ui/icons.generated.ts       — иконки baseui в виде статической SVG-разметки
// Запуск: BASEUI_DIR=/path/to/baseui npm run baseui   (по умолчанию ../baseui)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const src = path.resolve(process.env.BASEUI_DIR || '../baseui');
const out = path.resolve('vendor/baseui');
if (!fs.existsSync(path.join(src, 'src/index.js'))) throw new Error(`Не найден baseui (src/index.js) в ${src} — задайте BASEUI_DIR`);

const ICONS = [
  'MessageChatCircle', 'CheckSquare', 'BarChart01', 'Grid01', 'Image01', 'Columns01', 'Clock',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'Copy01', 'Trash01', 'XClose', 'Plus', 'Folder', 'FolderPlus',
  'Edit01', 'Lock01', 'Moon01', 'Sun', 'Download01', 'RefreshCw01', 'Check', 'Link01', 'Eye', 'Share01',
  'Figma', 'Globe01', 'Code01', 'CursorClick01', 'Dataflow01', 'SwitchVertical01', 'TrendUp01',
  'Stars01', 'Sliders01', 'Users01', 'GitBranch01', 'Shuffle02', 'File01', 'Edit03', 'InfoCircle', 'ClipboardCheck', 'LogOut01',
];

// 1. копируем артефакты. Наборы иконок (line/solid) не нужны — иконки выгружаем ниже; из stories берём только те,
//    из которых src/base.js достаёт скомпилированные компоненты.
const baseJs = fs.readFileSync(path.join(src, 'src/base.js'), 'utf8');
const neededStories = new Set([...baseJs.matchAll(/component\('([^']+\.stories-[^']+\.js)'\)/g)].map((m) => m[1]));
if (!neededStories.size) throw new Error('Не удалось найти story-модули в src/base.js — формат baseui изменился');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'lib'), { recursive: true });
fs.mkdirSync(path.join(out, 'src'), { recursive: true });
fs.cpSync(path.join(src, 'fonts'), path.join(out, 'fonts'), { recursive: true });
fs.copyFileSync(path.join(src, 'tokens.css'), path.join(out, 'tokens.css'));
for (const f of fs.readdirSync(path.join(src, 'lib'))) {
  if (/^(line|solid|duotone|duocolor)-/.test(f) || /^Icons\.stories-/.test(f)) continue;
  if (/\.stories-/.test(f) && !neededStories.has(f)) continue;
  fs.copyFileSync(path.join(src, 'lib', f), path.join(out, 'lib', f));
}
fs.cpSync(path.join(src, 'src/components'), path.join(out, 'src/components'), { recursive: true });
for (const f of ['base.js', 'react.js', 'doc.js', 'icons.js', 'index.js', 'components.css']) fs.copyFileSync(path.join(src, 'src', f), path.join(out, 'src', f));
fs.copyFileSync(path.join(src, 'CHANGELOG.md'), path.join(out, 'CHANGELOG.md'));

// 2. список экспортов для TypeScript
const lib = await import(pathToFileURL(path.join(src, 'src/index.js')).href);
const names = Object.keys(lib).sort();
fs.writeFileSync(path.resolve('src/ui/baseui-modules.d.ts'),
  `// Сгенерировано scripts/sync-baseui.mjs. Не править вручную.\n// Типы экспортов baseui (скомпилированный JS) — точные пропсы заданы в baseui-types.ts.\n` +
  `declare module '*/vendor/baseui/src/index.js' {\n  import type { ComponentType } from 'react';\n${names.map((n) => (/^[A-Z]/.test(n) || n === 'useToast' || n === 'pixel' || n === 'proportional' ? `  export const ${n}: ${/^[A-Z]/.test(n) ? 'ComponentType<any>' : 'any'};` : '')).filter(Boolean).join('\n')}\n}\n`);

// 3. иконки: компоненты baseui — это React-компоненты с одним <svg>; рендерим их в статическую разметку
const lineFile = fs.readdirSync(path.join(src, 'lib')).find((f) => /^line-.*\.js$/.test(f));
const mod = await import(pathToFileURL(path.join(src, 'lib', lineFile)).href);
const comps = new Map(Object.values(mod).filter((f) => typeof f === 'function' && f.displayName).map((f) => [f.displayName, f]));
const kebab = (k) => ({ fillRule: 'fill-rule', clipRule: 'clip-rule', strokeWidth: 'stroke-width', strokeLinecap: 'stroke-linecap', strokeLinejoin: 'stroke-linejoin' })[k] || k;
function serialize(el) {
  if (el == null || typeof el === 'string') return el ?? '';
  const { children, ...props } = el.props || {};
  const attrs = Object.entries(props).filter(([, v]) => v != null && typeof v !== 'object' && typeof v !== 'function')
    .map(([k, v]) => `${kebab(k)}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
  const kids = [].concat(children ?? []).map(serialize).join('');
  return kids ? `<${el.type} ${attrs}>${kids}</${el.type}>` : `<${el.type} ${attrs}/>`;
}
const icons = {};
for (const name of ICONS) {
  const C = comps.get(name);
  if (!C) { console.warn('нет иконки', name); continue; }
  icons[name] = [].concat(C({ size: 24 }).props.children).map(serialize).join('');
}
fs.writeFileSync(path.resolve('src/ui/icons.generated.ts'),
  `// Сгенерировано scripts/sync-baseui.mjs из набора line дизайн-системы baseui. Не править вручную.\nexport const icons = ${JSON.stringify(icons, null, 2)} as const;\nexport type IconName = keyof typeof icons;\n`);
console.log(`baseui: ${names.length} экспортов, ${Object.keys(icons).length} иконок, ${neededStories.size} скомпилированных компонентов → ${out}`);
