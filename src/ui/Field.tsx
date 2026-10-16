import { NumberInput, TextField as DsTextField } from './baseui';
import type { TextFieldProps } from './baseui-types';

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & { value: string; onChange?: (v: string) => void };

/** TextField baseui (filled, floating label); значение отдаётся строкой. */
export function TextField({ onChange, ...props }: Props) {
  return <DsTextField {...props} onChange={onChange ? (e) => onChange(e.target.value) : undefined} />;
}

/** NumberInput baseui с ограничением диапазона. */
export function NumberField({ value, onChange, min, max, label }: { value: number; onChange: (v: number) => void; min: number; max: number; label: string }) {
  return (
    <NumberInput label={label} min={min} max={max} value={value}
      onValueChange={(v) => { const n = Number(v); if (v !== '' && Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n)))); }} />
  );
}
