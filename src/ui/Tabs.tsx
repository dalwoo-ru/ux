import { ChipGroup } from './baseui.generated';

/** Переключатель разделов: ChipGroup baseui в режиме одиночного выбора. */
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: Array<{ value: T; label: string }> }) {
  return (
    <ChipGroup size="small" variant="filled" options={items} value={[value]}
      onValueChange={(v) => { const next = v.find((x) => x !== value) ?? v[0]; if (next) onChange(next as T); }} />
  );
}
