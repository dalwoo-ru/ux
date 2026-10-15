import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ReactElement, ReactNode } from 'react';
import { cx } from './cx';
import s from './Controls.module.css';

/** Чекбокс 24px baseui (Border-Accent → checked = Primary). */
export function Checkbox({ checked, onChange, children, className }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode; className?: string }) {
  return (
    <label className={cx(s.label, className)}>
      <BaseCheckbox.Root checked={checked} onCheckedChange={onChange} className={s.checkbox}>
        <BaseCheckbox.Indicator className={s.check} />
      </BaseCheckbox.Root>
      {children}
    </label>
  );
}

export function Switch({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode }) {
  return (
    <label className={s.label}>
      <BaseSwitch.Root checked={checked} onCheckedChange={onChange} className={s.track}>
        <BaseSwitch.Thumb className={s.thumb} />
      </BaseSwitch.Root>
      {children}
    </label>
  );
}

/** Радио-группа; items отрисовываются через <Radio value>. */
export function RadioGroup({ value, onChange, children, className, render }: { value: string; onChange: (v: string) => void; children: ReactNode; className?: string; render?: ReactElement }) {
  return <BaseRadioGroup value={value} onValueChange={(v) => onChange(v as string)} className={className} render={render}>{children}</BaseRadioGroup>;
}

export function Radio({ value, children, className }: { value: string; children?: ReactNode; className?: string }) {
  return (
    <label className={cx(s.label, className)}>
      <BaseRadio.Root value={value} className={s.radio}>
        <BaseRadio.Indicator className={s.dot} />
      </BaseRadio.Root>
      {children}
    </label>
  );
}
