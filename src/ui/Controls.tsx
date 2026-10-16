import type { ReactNode } from 'react';
import { Checkbox as DsCheckbox, Switch as DsSwitch } from './baseui';

/** Checkbox baseui: label справа. */
export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode }) {
  return <DsCheckbox checked={checked} onCheckedChange={(v) => onChange(v)} label={children} />;
}

/** Switch baseui: label справа. */
export function Switch({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode }) {
  return <DsSwitch checked={checked} onCheckedChange={(v) => onChange(v)} label={children} />;
}

export { RadioGroup, CheckboxGroup } from './baseui';
