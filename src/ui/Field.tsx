import { Field } from '@base-ui/react/field';
import { cx } from './cx';
import s from './Field.module.css';

type Common = { label?: string; placeholder?: string; className?: string; autoFocus?: boolean; readOnly?: boolean; onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void };

/** TextField (filled, radius M) на Base UI Field: label связан с полем автоматически. */
export function TextField({ label, value, onChange, type = 'text', multiline, rows = 3, className, ...rest }:
  Common & { value: string; onChange?: (v: string) => void; type?: 'text' | 'email' | 'password'; multiline?: boolean; rows?: number }) {
  return (
    <Field.Root className={cx(s.field, className)}>
      {label && <Field.Label className={s.label}>{label}</Field.Label>}
      {multiline
        ? <Field.Control render={<textarea rows={rows} />} className={cx(s.control, s.multiline)} value={value}
            onChange={(e) => onChange?.((e.target as HTMLInputElement).value)} placeholder={rest.placeholder} />
        : <Field.Control type={type} className={s.control} value={value} onChange={(e) => onChange?.(e.target.value)} {...rest} />}
    </Field.Root>
  );
}

export function NumberField({ label, value, onChange, min, max, className }:
  { label?: string; value: number; onChange: (v: number) => void; min: number; max: number; className?: string }) {
  return (
    <Field.Root className={cx(s.field, className)}>
      {label && <Field.Label className={s.label}>{label}</Field.Label>}
      <Field.Control type="number" min={min} max={max} className={s.control} value={value}
        onChange={(e) => { const v = Number(e.target.value); if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, Math.round(v)))); }} />
    </Field.Root>
  );
}
