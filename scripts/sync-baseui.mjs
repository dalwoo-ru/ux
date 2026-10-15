// Синхронизирует дизайн-систему baseui в vendor/baseui и перегенерирует:
//   src/ui/baseui.generated.ts — реэкспорт компонентов baseui
//   src/ui/icons.generated.ts  — иконки baseui в виде статической SVG-разметки
// Запуск: BASEUI_DIR=/path/to/baseui npm run baseui   (по умолчанию ../baseui)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const src = path.resolve(process.env.BASEUI_DIR || '../baseui');
const out = path.resolve('vendor/baseui');
if (!fs.existsSync(path.join(src, 'tokens.css'))) throw new Error(`Не найден baseui в ${src} (задайте BASEUI_DIR)`);

// slug в манифесте baseui -> имя экспорта
const COMPONENTS = {
  button: 'Button', textfield: 'TextField', checkbox: 'Checkbox', checkboxgroup: 'CheckboxGroup', radio: 'Radio',
  radiogroup: 'RadioGroup', switch: 'Switch', modal: 'Modal', tag: 'Tag', chip: 'Chip', chipgroup: 'ChipGroup',
  list: 'List', listitem: 'ListItem', avatar: 'Avatar', badge: 'Badge', select: 'Select',
};
const ICONS = [
  'MessageChatCircle', 'CheckSquare', 'BarChart01', 'Grid01', 'Image01', 'Columns01', 'Clock',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'Copy01', 'Trash01', 'XClose', 'Plus', 'Folder', 'FolderPlus',
  'Edit01', 'Lock01', 'Moon01', 'Sun', 'Download01', 'RefreshCw01', 'Check', 'Link01', 'Eye', 'Share01',
  'Figma', 'Globe01', 'Code01', 'CursorClick01', 'Dataflow01', 'SwitchVertical01', 'TrendUp01',
  'Stars01', 'Sliders01', 'Users01', 'GitBranch01', 'Shuffle02', 'File01', 'Edit03', 'InfoCircle',
];

const manifest = (await import(pathToFileURL(path.join(src, 'site/manifest.js')).href)).default;
const storyOf = (slug) => {
  const e = manifest.find((c) => c.slug === slug);
  if (!e) throw new Error(`В манифесте baseui нет компонента ${slug}`);
  return path.basename(e.file);
};
const used = new Set(Object.keys(COMPONENTS).map(storyOf));

// 1. копируем артефакты. Наборы иконок (line/solid) и их каталог не нужны — иконки выгружаем ниже.
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'lib'), { recursive: true });
fs.cpSync(path.join(src, 'fonts'), path.join(out, 'fonts'), { recursive: true });
fs.copyFileSync(path.join(src, 'tokens.css'), path.join(out, 'tokens.css'));
for (const f of fs.readdirSync(path.join(src, 'lib'))) {
  if (/^(line|solid|duotone|duocolor)-/.test(f)) continue;
  if (/\.stories-/.test(f) && !used.has(f)) continue;
  fs.copyFileSync(path.join(src, 'lib', f), path.join(out, 'lib', f));
}

// 2. реэкспорт компонентов — как сайт документации baseui: компонент берётся из default-экспорта story-модуля
const lines = Object.entries(COMPONENTS).map(([slug, name]) => `import ${name}Story from '../../vendor/baseui/lib/${storyOf(slug)}';`);
lines.push('', ...Object.values(COMPONENTS).map((name) => `export const ${name}: BaseuiComponent<${name}Props> = ${name}Story.component;`));
fs.writeFileSync(path.resolve('src/ui/baseui.generated.ts'),
  `// Сгенерировано scripts/sync-baseui.mjs. Не править вручную.\nimport type { BaseuiComponent } from './baseui-types';\nimport type { ${Object.values(COMPONENTS).map((n) => `${n}Props`).join(', ')} } from './baseui-types';\n${lines.join('\n')}\n`);

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
console.log(`baseui: ${Object.keys(COMPONENTS).length} компонентов, ${Object.keys(icons).length} иконок, lib → ${out}`);
