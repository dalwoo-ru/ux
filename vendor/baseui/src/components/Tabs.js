import { h, cx, useId, useRef, createContext, useContext, useControllable } from '../react.js';
import { describe } from '../doc.js';

const TabsContext = createContext(null);
const useTabs = () => useContext(TabsContext);

export function Tabs({ value, defaultValue, onValueChange, children, className, ...rest }) {
  const [current, setCurrent] = useControllable(value, defaultValue, onValueChange);
  const uid = useId();
  return h(TabsContext.Provider, { value: { current, setCurrent, uid } }, h('div', { className: cx('bui-tabs', className), ...rest }, children));
}
describe(Tabs, 'Switches between related views.', {
  value: ['string', null, 'Selected tab'],
  defaultValue: ['string', null, 'Initially selected tab'],
  onValueChange: ['(value: string) => void', null, 'Called when the selected tab changes'],
});

export function TabList({ variant = 'underline', label, children, className, ...rest }) {
  const { current, setCurrent } = useTabs();
  const ref = useRef(null);
  const onKeyDown = (e) => {
    const tabs = [...ref.current.querySelectorAll('[role="tab"]:not(:disabled)')];
    const i = tabs.indexOf(document.activeElement);
    let next;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    e.preventDefault();
    next.focus();
    setCurrent(next.dataset.value);
  };
  return h('div', { role: 'tablist', 'aria-label': label, ref, onKeyDown, className: cx('bui-tablist', `bui-tablist--${variant}`, className), ...rest }, children);
}
describe(TabList, 'The row of tabs.', {
  variant: ["'underline' | 'pill'", "'underline'", 'Visual style of the list'],
  label: ['string', null, 'Accessible name'],
});

export function Tab({ value, disabled = false, children, className, ...rest }) {
  const { current, setCurrent, uid } = useTabs();
  const selected = current === value;
  return h('button', {
    type: 'button', role: 'tab', id: `${uid}-t-${value}`, 'data-value': value, 'aria-selected': selected, 'aria-controls': `${uid}-p-${value}`,
    tabIndex: selected ? 0 : -1, disabled, className: cx('bui-tab', className), onClick: () => setCurrent(value), ...rest,
  }, children);
}
describe(Tab, 'A tab button.', {
  value: ['string', null, 'Identifier matching a `TabPanel`'],
  disabled: ['boolean', 'false', 'Disable the tab'],
});

export function TabPanel({ value, children, className, ...rest }) {
  const { current, uid } = useTabs();
  if (current !== value) return null;
  return h('div', { role: 'tabpanel', id: `${uid}-p-${value}`, 'aria-labelledby': `${uid}-t-${value}`, tabIndex: 0, className: cx('bui-tabpanel', className), ...rest }, children);
}
describe(TabPanel, 'The content of a tab.', { value: ['string', null, 'Identifier of its `Tab`.'] });
