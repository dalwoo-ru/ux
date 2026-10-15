import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import s from './Tabs.module.css';

/** Табы на Base UI (стиль Chip: активный = InversePrimary). */
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: Array<{ value: T; label: string }> }) {
  return (
    <BaseTabs.Root value={value} onValueChange={(v) => onChange(v as T)}>
      <BaseTabs.List className={s.list}>
        {items.map((it) => <BaseTabs.Tab key={it.value} value={it.value} className={s.tab}>{it.label}</BaseTabs.Tab>)}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
