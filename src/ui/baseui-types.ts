// Типы пропсов компонентов baseui (скомпилированных, без исходников). Собраны по docgen-метаданным
// самих компонентов (`component.__docgenInfo`) и типам Base UI, на которых они построены.
import type { ComponentType, CSSProperties, MouseEventHandler, ReactElement, ReactNode, Ref } from 'react';
import type { Checkbox } from '@base-ui/react/checkbox';
import type { Dialog } from '@base-ui/react/dialog';
import type { Radio } from '@base-ui/react/radio';
import type { Switch } from '@base-ui/react/switch';
import type { Button as BaseButton } from '@base-ui/react/button';
import type { Input } from '@base-ui/react/input';

export type BaseuiComponent<P> = ComponentType<P>;
type Omitted<T, K extends string> = Omit<T, K | 'ref' | 'render' | 'className' | 'style'>;

export type FieldStatus = 'none' | 'error' | 'warning' | 'success';

export type ButtonProps = Omitted<BaseButton.Props, 'children'> & {
  variant?: 'primary' | 'secondary' | 'custom' | 'text';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean; fullWidth?: boolean; startIcon?: ReactNode; endIcon?: ReactNode; children?: ReactNode;
  className?: string; style?: CSSProperties; customBackground?: string; customColor?: string; ref?: Ref<HTMLButtonElement>;
  render?: ReactElement; nativeButton?: boolean;
};

export type TextFieldProps = Omitted<Input.Props, 'prefix' | 'size' | 'onChange' | 'value' | 'defaultValue'> & {
  value?: string; defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  variant?: 'filled' | 'standard'; size?: 'medium' | 'small'; label?: ReactNode; floatingLabel?: boolean;
  caption?: ReactNode; status?: FieldStatus; loading?: boolean; clearable?: boolean; onClear?: () => void;
  startIcon?: ReactNode; action?: ReactNode; actionLabel?: string; prefix?: ReactNode; suffix?: ReactNode;
  multiline?: boolean; minRows?: number; maxRows?: number; className?: string;
  type?: string; placeholder?: string; readOnly?: boolean; autoFocus?: boolean; inputMode?: 'text' | 'numeric' | 'decimal';
  min?: number; max?: number; autoComplete?: string; name?: string; id?: string;
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
};

export type CheckboxProps = Omitted<Checkbox.Root.Props, 'children'> & { label?: ReactNode; error?: ReactNode; className?: string; ref?: Ref<HTMLElement> };
export interface CheckboxGroupOption { value: string; label: ReactNode; disabled?: boolean }
export interface CheckboxGroupProps {
  title?: ReactNode; options: CheckboxGroupOption[]; value?: string[]; defaultValue?: string[];
  onValueChange?: (value: string[]) => void; caption?: ReactNode; error?: ReactNode; className?: string; disabled?: boolean;
}

export type RadioProps = Omitted<Radio.Root.Props, 'children'> & { label?: ReactNode; value: string; className?: string; ref?: Ref<HTMLElement> };
export interface RadioGroupOption { value: string; label: ReactNode; disabled?: boolean }
export interface RadioGroupProps {
  title?: ReactNode; options: RadioGroupOption[]; value?: string | null; defaultValue?: string;
  onValueChange?: (value: string) => void; caption?: ReactNode; error?: ReactNode; className?: string; disabled?: boolean;
}

export type SwitchProps = Omitted<Switch.Root.Props, 'children'> & { label?: ReactNode; size?: 'medium' | 'large'; error?: ReactNode; className?: string; ref?: Ref<HTMLElement> };

export type ModalProps = Omitted<Dialog.Root.Props, 'children' | 'modal' | 'defaultOpen'> & {
  title?: ReactNode; subtitle?: ReactNode; header?: 'close' | 'close-and-back' | 'title-only' | false;
  height?: 'content' | 'viewport'; children?: ReactNode; primaryAction?: ReactNode; secondaryAction?: ReactNode;
  onBack?: () => void; closeLabel?: string; backLabel?: string; className?: string; contentClassName?: string;
  open?: boolean; onOpenChange?: (open: boolean) => void;
};

export interface TagProps {
  variant?: 'filled' | 'solid' | 'outlined'; color?: 'base' | 'secondary' | 'accent' | 'brand' | 'error' | 'warning' | 'disabled';
  size?: 'small' | 'xsmall'; startIcon?: ReactNode; avatar?: ReactNode; counter?: string | number; hint?: boolean;
  children?: ReactNode; className?: string;
}

export interface ChipProps {
  variant?: 'filled' | 'outlined'; size?: 'medium' | 'small'; status?: 'error' | 'success'; icon?: ReactNode; avatar?: ReactNode;
  counter?: ReactNode; action?: boolean; onAction?: () => void; actionLabel?: string; children?: ReactNode; style?: CSSProperties;
  className?: string; pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; disabled?: boolean; value?: string;
}
export interface ChipGroupOption { value: string; label: ReactNode; disabled?: boolean }
export interface ChipGroupProps {
  title?: ReactNode; options?: ChipGroupOption[]; children?: ReactNode; size?: 'medium' | 'small'; variant?: 'filled' | 'outlined';
  multiple?: boolean; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void;
  caption?: ReactNode; error?: ReactNode; className?: string;
}

export interface ListProps { title?: ReactNode; divider?: boolean; children?: ReactNode; className?: string }
export interface ListItemProps {
  children?: ReactNode; subtitle?: ReactNode; details?: ReactNode; icon?: ReactNode; avatar?: ReactNode; control?: ReactNode;
  items?: ReactNode; expanded?: boolean; defaultExpanded?: boolean; onExpandedChange?: (e: boolean) => void;
  subitem?: boolean; active?: boolean; disabled?: boolean; onClick?: MouseEventHandler<HTMLButtonElement>; className?: string;
}

export interface AvatarProps {
  type?: 'image' | 'letters' | 'icon'; size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall'; variant?: 'circle' | 'rounded';
  disabled?: boolean; badge?: boolean; src?: string; alt?: string; initials?: ReactNode; icon?: ReactNode; className?: string; customBackground?: string;
}
export interface BadgeProps {
  type?: 'dot-small' | 'dot-medium' | 'dot-large' | 'text' | 'number'; color?: 'primary' | 'brand' | 'error' | 'warning';
  disabled?: boolean; count?: number; max?: number; children?: ReactNode; className?: string;
}

export interface SelectOption { value: string; label: ReactNode; details?: ReactNode; disabled?: boolean }
export interface SelectProps {
  label?: ReactNode; placeholder?: string; floatingLabel?: boolean; caption?: ReactNode; status?: FieldStatus; disabled?: boolean;
  options: SelectOption[]; value?: string | null; defaultValue?: string; onValueChange?: (value: string | null) => void;
  startIcon?: ReactNode; className?: string;
}
