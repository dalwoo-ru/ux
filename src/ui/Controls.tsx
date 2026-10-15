import type { ReactNode } from 'react';
import { Checkbox as BaseuiCheckbox, Switch as BaseuiSwitch } from './baseui.generated';

/** Checkbox baseui: label справа. */
export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode }) {
  return <BaseuiCheckbox checked={checked} onCheckedChange={(v) => onChange(v)} label={children} />;
}

/** Switch baseui: label справа. */
export function Switch({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode }) {
  return <BaseuiSwitch checked={checked} onCheckedChange={(v) => onChange(v)} label={children} />;
}

// Группы baseui отдаём как есть: value — выбранные значения, options — список опций.
export { RadioGroup, CheckboxGroup, ChipGroup } from './baseui.generated';
