import { h, cx, React, useControllable, useRef, useState } from '../react.js';
import { describe } from '../doc.js';
import { Badge } from './Badge.js';

export function SegmentedControl({ items, value, defaultValue, onValueChange, size = 'md', fullWidth = false, iconOnly = false, label, className, ...rest }) {
  const [current, setCurrent] = useControllable(value, defaultValue ?? items.find((i) => !i.disabled)?.value, onValueChange);
  const ref = useRef(null);
  const [thumb, setThumb] = useState(null);
  const [ready, setReady] = useState(false);
  const enabled = items.filter((i) => !i.disabled);

  // The thumb slides to the selected item; it is measured again when the control is resized.
  React.useLayoutEffect(() => {
    const root = ref.current;
    const measure = () => {
      const el = root.querySelector('[aria-checked="true"]');
      setThumb(el ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [current, items, size, fullWidth, iconOnly]);
  React.useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id); }, []);

  const onKeyDown = (e) => {
    const i = enabled.findIndex((x) => x.value === current);
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? enabled[(i + 1) % enabled.length]
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? enabled[(i - 1 + enabled.length) % enabled.length] : null;
    if (!next) return;
    e.preventDefault();
    setCurrent(next.value);
    ref.current.querySelector(`[data-value="${CSS.escape(String(next.value))}"]`)?.focus();
  };
  return h('div', { role: 'radiogroup', 'aria-label': label, ref, onKeyDown, className: cx('bui-segmented', `bui-segmented--${size}`, fullWidth && 'bui-segmented--full', iconOnly && 'bui-segmented--icons', ready && 'bui-segmented--ready', className), ...rest },
    thumb && h('span', { className: 'bui-segmented__thumb', 'aria-hidden': 'true', style: { width: thumb.w, height: thumb.h, transform: `translate(${thumb.x}px, ${thumb.y}px)` } }),
    items.map((it) => h('button', {
      key: it.value, type: 'button', role: 'radio', 'data-value': it.value, 'aria-checked': it.value === current, tabIndex: it.value === current ? 0 : -1,
      disabled: it.disabled, title: iconOnly ? it.label : undefined, 'aria-label': iconOnly ? it.label : undefined, className: 'bui-segmented__item', onClick: () => setCurrent(it.value),
    },
    it.icon && h('span', { className: 'bui-segmented__icon', 'aria-hidden': 'true' }, it.icon),
    !iconOnly && h('span', { className: 'bui-segmented__label' }, it.label),
    !iconOnly && it.counter != null && h('span', { className: 'bui-segmented__counter' }, it.counter),
    !iconOnly && it.badge != null && (typeof it.badge === 'object' ? it.badge : h(Badge, { label: it.badge })))));
}
describe(SegmentedControl, 'A control for switching between a few exclusive options.', {
  items: ['Array<{ value: string; label: string; icon?: ReactNode; counter?: number | string; badge?: ReactNode | string; disabled?: boolean }>', null, 'Segments'],
  value: ['string', null, 'Selected value'],
  defaultValue: ['string', null, 'Initial value (first enabled)'],
  onValueChange: ['(value: string) => void', null, 'Called when the selection changes'],
  size: ["'sm' | 'md'", "'md'", 'Control height'],
  fullWidth: ['boolean', 'false', 'Fill the container width; segments are equal'],
  iconOnly: ['boolean', 'false', 'Show only icons; `label` becomes the accessible name'],
  label: ['string', null, 'Accessible name'],
});
