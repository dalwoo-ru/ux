import { h, cx } from '../react.js';
import { Icon } from '../icons.js';
import { describe } from '../doc.js';

export function Stepper({ steps, current = 0, orientation = 'horizontal', label = 'Progress', className, ...rest }) {
  return h('ol', { 'aria-label': label, className: cx('bui-stepper', `bui-stepper--${orientation}`, className), ...rest },
    steps.map((s, i) => {
      const state = i < current ? 'done' : i === current ? 'current' : 'todo';
      return h('li', { key: i, className: 'bui-step', 'data-state': state, 'aria-current': state === 'current' ? 'step' : undefined },
        h('span', { className: 'bui-step__marker' }, state === 'done' ? h(Icon, { name: 'success', size: 16, style: { strokeWidth: 3 } }) : i + 1),
        h('span', { className: 'bui-step__text' },
          h('span', { className: 'bui-step__title' }, s.title),
          s.description && h('span', { className: 'bui-step__desc' }, s.description)));
    }));
}
describe(Stepper, 'Shows progress through a multi-step flow.', {
  steps: ['Array<{ title: ReactNode; description?: ReactNode }>', null, 'Steps'],
  current: ['number', '0', 'Index of the current step'],
  orientation: ["'horizontal' | 'vertical'", "'horizontal'", 'Layout'],
  label: ['string', "'Progress'", 'Accessible name'],
});
