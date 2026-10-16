import { h, cx } from '../react.js';
import { Icon } from '../icons.js';
import { describe } from '../doc.js';

function range(page, total, siblings) {
  const set = new Set([1, total, page]);
  for (let i = 1; i <= siblings; i++) { set.add(page - i); set.add(page + i); }
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => { if (i && n - nums[i - 1] > 1) out.push(n - nums[i - 1] === 2 ? n - 1 : '…'); out.push(n); });
  return out;
}

export function Pagination({ page, total, onPageChange, siblings = 1, label = 'Pagination', className, ...rest }) {
  const go = (p) => p >= 1 && p <= total && p !== page && onPageChange(p);
  return h('nav', { 'aria-label': label, className: cx('bui-pagination', className), ...rest },
    h('button', { type: 'button', className: 'bui-page', 'aria-label': 'Previous page', disabled: page <= 1, onClick: () => go(page - 1) }, h(Icon, { name: 'chevronDown', size: 18, style: { transform: 'rotate(90deg)' } })),
    range(page, total, siblings).map((p, i) => p === '…'
      ? h('span', { key: 'e' + i, className: 'bui-page bui-page--gap', 'aria-hidden': 'true' }, '…')
      : h('button', { key: p, type: 'button', className: 'bui-page', 'aria-current': p === page ? 'page' : undefined, 'aria-label': `Page ${p}`, onClick: () => go(p) }, p)),
    h('button', { type: 'button', className: 'bui-page', 'aria-label': 'Next page', disabled: page >= total, onClick: () => go(page + 1) }, h(Icon, { name: 'chevronRight', size: 18 })));
}
describe(Pagination, 'Navigation between pages.', {
  page: ['number', null, 'Current page (1-based)'],
  total: ['number', null, 'Number of pages'],
  onPageChange: ['(page: number) => void', null, 'Called with the new page'],
  siblings: ['number', '1', 'Pages shown on each side of the current one'],
  label: ['string', "'Pagination'", 'Accessible name'],
});
