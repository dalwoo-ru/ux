import { h, cx } from '../react.js';
import { describe } from '../doc.js';

export function EmptyState({ icon, title, description, action, className, ...rest }) {
  return h('div', { className: cx('bui-empty', className), ...rest },
    icon && h('div', { className: 'bui-empty__icon', 'aria-hidden': 'true' }, icon),
    title && h('div', { className: 'bui-empty__title' }, title),
    description && h('p', { className: 'bui-empty__text' }, description),
    action && h('div', { className: 'bui-empty__action' }, action));
}

describe(EmptyState, 'Shown when there is nothing to display.', {
  icon: ['ReactNode', null, 'Icon or illustration'],
  title: ['ReactNode', null, 'Heading'],
  description: ['ReactNode', null, 'Explanation and what to do next'],
  action: ['ReactNode', null, 'Primary action (usually a Button)'],
});
