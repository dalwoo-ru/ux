import { h, cx } from '../react.js';
import { describe } from '../doc.js';

export function MetadataList({ items, orientation = 'horizontal', className, ...rest }) {
  return h('dl', { className: cx('bui-meta', `bui-meta--${orientation}`, className), ...rest },
    items.map((it) => h('div', { key: it.label, className: 'bui-meta__item' }, h('dt', null, it.label), h('dd', null, it.value))));
}
describe(MetadataList, 'Label and value pairs.', {
  items: ['Array<{ label: ReactNode; value: ReactNode }>', null, 'Label and value pairs'],
  orientation: ["'horizontal' | 'vertical'", "'horizontal'", 'Label beside the value, or above it'],
});
