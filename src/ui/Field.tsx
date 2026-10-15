import { TextField as BaseuiTextField } from './baseui.generated';
import type { TextFieldProps } from './baseui-types';

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & { value: string; onChange?: (v: string) => void };

/** TextField baseui (filled, floating label); значение отдаётся строкой. */
export function TextField({ onChange, ...props }: Props) {
  return <BaseuiTextField {...props} onChange={onChange ? (e) => onChange(e.target.value) : undefined} />;
}

export function NumberField({ value, onChange, min, max, label }: { value: number; onChange: (v: number) => void; min: number; max: number; label: string }) {
  return (
    <BaseuiTextField label={label} type="number" inputMode="numeric" min={min} max={max} value={String(value)}
      onChange={(e) => { const v = Number(e.target.value); if (e.target.value !== '' && Number.isFinite(v)) onChange(Math.min(max, Math.max(min, Math.round(v)))); }} />
  );
}
