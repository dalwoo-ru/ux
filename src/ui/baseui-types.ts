// Типы пропсов компонентов baseui (src/index.js — обычный JS без типов).
// Источник: описания props в самих компонентах (`Component.__docgenInfo`, см. vendor/baseui/src/doc.js).
import type { CSSProperties, ElementType, HTMLAttributes, MouseEvent, ReactElement, ReactNode, Ref } from 'react';

type Size4 = 'xsm' | 'sm' | 'md' | 'lg';
type Size5 = Size4 | 'xl';
type Aria = { 'aria-label'?: string; 'aria-labelledby'?: string; 'data-testid'?: string; id?: string; className?: string; style?: CSSProperties };

export type ButtonProps = Aria & {
  label?: string; children?: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'; size?: Size4;
  isDisabled?: boolean; isLoading?: boolean; icon?: ReactNode; endContent?: ReactNode; isIconOnly?: boolean;
  width?: number | string; tooltip?: string | false; shape?: 'rounded' | 'circle'; href?: string; target?: string; rel?: string; type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLElement>) => void; clickAction?: (e: MouseEvent<HTMLElement>) => void | Promise<void>; ref?: Ref<HTMLElement>;
};
export type IconButtonProps = Omit<ButtonProps, 'isIconOnly' | 'children' | 'label'> & { icon: ReactNode; label: string };

export type FieldStatus = 'none' | 'error' | 'warning' | 'success';
export type TextFieldProps = Aria & {
  value?: string; defaultValue?: string; onChange?: (e: { target: { value: string } }) => void;
  variant?: 'filled' | 'standard'; size?: 'md' | 'sm'; label?: ReactNode; floatingLabel?: boolean; caption?: ReactNode; status?: FieldStatus;
  loading?: boolean; clearable?: boolean; onClear?: () => void; startIcon?: ReactNode; action?: ReactNode; actionLabel?: string;
  prefix?: ReactNode; suffix?: ReactNode; multiline?: boolean; minRows?: number; maxRows?: number;
  type?: string; placeholder?: string; readOnly?: boolean; disabled?: boolean; autoFocus?: boolean; autoComplete?: string; name?: string;
  inputMode?: 'text' | 'numeric' | 'decimal'; onFocus?: (e: { target: HTMLInputElement & HTMLTextAreaElement }) => void; ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
};
export type NumberInputProps = Aria & {
  value?: number | string; defaultValue?: number; onValueChange?: (v: number | string) => void;
  min?: number; max?: number; step?: number; label?: string; size?: 'sm' | 'md';
};

export type CheckboxProps = Aria & {
  label?: ReactNode; error?: ReactNode; checked?: boolean; defaultChecked?: boolean; indeterminate?: boolean; disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void; name?: string; value?: string;
};
export interface Option { value: string; label: ReactNode; disabled?: boolean }
export type CheckboxGroupProps = Aria & {
  title?: ReactNode; options: Option[]; value?: string[]; defaultValue?: string[]; onValueChange?: (v: string[]) => void;
  parent?: ReactNode; caption?: ReactNode; error?: ReactNode; disabled?: boolean;
};
export type RadioProps = Aria & { label?: ReactNode; value: string; disabled?: boolean };
export type RadioGroupProps = Aria & {
  title?: ReactNode; options: Option[]; value?: string | null; defaultValue?: string; onValueChange?: (v: string) => void;
  caption?: ReactNode; error?: ReactNode; disabled?: boolean;
};
export type SwitchProps = Aria & {
  label?: ReactNode; size?: 'sm' | 'md' | 'lg'; error?: ReactNode; checked?: boolean; defaultChecked?: boolean; disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
export type SelectProps = Aria & {
  label?: ReactNode; floatingLabel?: boolean; variant?: 'filled' | 'standard'; size?: 'md' | 'sm'; caption?: ReactNode; status?: FieldStatus;
  loading?: boolean; disabled?: boolean; prefix?: ReactNode; suffix?: ReactNode; startIcon?: ReactNode; trigger?: ReactNode; placeholder?: string;
  options: Array<Option & { details?: ReactNode }>; value?: string | null; defaultValue?: string; onValueChange?: (v: string | null) => void;
};

export type ModalProps = Aria & {
  open?: boolean; onOpenChange?: (open: boolean) => void; title?: ReactNode; subtitle?: ReactNode;
  header?: 'close' | 'close-and-back' | 'title-only' | false; height?: 'content' | 'viewport'; children?: ReactNode;
  primaryAction?: ReactNode; secondaryAction?: ReactNode; onBack?: () => void; closeLabel?: string; backLabel?: string;
};
export type AlertDialogProps = {
  open?: boolean; onOpenChange?: (open: boolean) => void; title?: ReactNode; description?: ReactNode; confirmLabel?: string;
  cancelLabel?: string; onConfirm?: () => void; destructive?: boolean;
};

export type BadgeProps = Aria & {
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'blue' | 'blue-light' | 'green' | 'green-light' | 'orange' | 'pink' | 'red';
  size?: 'sm' | 'md' | 'lg'; type?: 'label' | 'counter' | 'dot'; max?: number; disabled?: boolean; label?: ReactNode; icon?: ReactNode;
};
export type AvatarProps = Aria & {
  name?: string; src?: string; fallbackSrc?: string; alt?: string; size?: Size5 | number; shape?: 'circle' | 'rounded' | 'square';
  status?: ReactNode; tooltip?: string | boolean; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void;
};
export type BannerProps = Aria & { status?: 'info' | 'success' | 'warning' | 'error'; title?: ReactNode; children?: ReactNode; onClose?: () => void; closeLabel?: string };
export type ProgressBarProps = Aria & { value?: number; size?: 'sm' | 'md'; label?: ReactNode; showValue?: boolean };
export type CardVariant = 'default' | 'transparent' | 'muted' | 'blue' | 'green' | 'orange' | 'pink' | 'red';
type CardBase = Aria & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & { variant?: CardVariant; padding?: number; elevation?: 'none' | 'low' | 'med' | 'high'; width?: number | string; height?: number | string; maxWidth?: number | string; children?: ReactNode };
export type CardProps = CardBase;
export type ClickableCardProps = CardBase & { label: string; onClick?: (e: MouseEvent<HTMLElement>) => void; href?: string; isDisabled?: boolean };
export type SelectableCardProps = CardBase & { label: string; isSelected?: boolean; onChange?: (isSelected: boolean) => void; isDisabled?: boolean };
export type SegmentedControlProps = Aria & {
  items: Array<{ value: string; label: string; icon?: ReactNode; counter?: number | string; badge?: ReactNode | string; disabled?: boolean }>;
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void; size?: 'sm' | 'md'; fullWidth?: boolean; iconOnly?: boolean; label?: string;
};
export type TabsProps = { value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children?: ReactNode };
export type TabListProps = { size?: 'sm' | 'md' | 'lg' | 'xl'; fullWidth?: boolean; label?: string; children?: ReactNode };
export type TabProps = { value: string; disabled?: boolean; children?: ReactNode };
export type TabPanelProps = { value: string; children?: ReactNode };
export type StatusProps = Aria & {
  status?: 'neutral' | 'accent' | 'success' | 'warning' | 'error'; icon?: ReactNode; title?: ReactNode; description?: ReactNode; action?: ReactNode;
  actionLabel?: string; actionVariant?: 'primary' | 'secondary'; onAction?: () => void;
};
export type BreadcrumbsProps = Aria & { items: Array<{ label: ReactNode; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void }>; label?: string };
export type TableProps<T> = Aria & {
  data?: T[]; columns?: Array<{ key: string; header?: ReactNode; width?: number | unknown; align?: 'start' | 'center' | 'end'; sortable?: boolean; sortValue?: (row: T) => unknown; renderCell?: (row: T) => ReactNode }>;
  rowKey?: string | ((row: T) => string); caption?: string; density?: 'compact' | 'balanced' | 'spacious'; dividers?: 'rows' | 'columns' | 'grid' | 'none';
  isStriped?: boolean; hasHover?: boolean; onRowClick?: (row: T) => void; isLoading?: boolean; emptyState?: ReactNode; maxHeight?: number | string;
};

export type ListProps = Aria & { size?: 'md' | 'sm'; spacing?: 'sm' | 'md' | 'lg'; title?: ReactNode; divider?: boolean; children?: ReactNode };
export type ListItemProps = Aria & {
  size?: 'md' | 'sm'; children?: ReactNode; subtitle?: ReactNode; overline?: ReactNode; details?: ReactNode; icon?: ReactNode; avatar?: ReactNode; control?: ReactNode;
  items?: ReactNode; subitem?: boolean; active?: boolean; disabled?: boolean; onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
export type ChipProps = Aria & {
  size?: 'md' | 'sm'; status?: 'error' | 'success'; icon?: ReactNode; avatar?: ReactNode; counter?: ReactNode; action?: boolean | 'press'; onAction?: () => void;
  children?: ReactNode; pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; disabled?: boolean; onClick?: (e: MouseEvent<HTMLElement>) => void;
};
export type DividerProps = { orientation?: 'horizontal' | 'vertical'; label?: ReactNode; className?: string };
export type LinkProps = Aria & { href: string; external?: boolean; underline?: 'hover' | 'always' | 'none'; children?: ReactNode; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void };
export type StackProps = Aria & {
  direction?: 'row' | 'column'; gap?: number; align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'; wrap?: boolean; as?: ElementType; children?: ReactNode;
};
export type StackShorthandProps = Omit<StackProps, 'direction'>;
export type SpinnerProps = { size?: 'xsm' | 'sm' | 'md' | 'lg' | number; color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'on-color' | 'inherit' };
export type SkeletonProps = { variant?: 'text' | 'rect' | 'circle'; width?: number | string; height?: number | string; lines?: number };
export type TooltipProps = { content: ReactNode; placement?: 'top' | 'bottom' | 'left' | 'right'; delay?: number; children: ReactElement };
export type ToastProviderProps = { placement?: 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center'; limit?: number; children?: ReactNode };
export interface ToastOptions { message: ReactNode; variant?: 'base' | 'inverse'; status?: 'neutral' | 'success' | 'error' | 'info'; icon?: ReactNode; action?: { label: string; onClick?: () => void }; duration?: number }
export type UseToast = () => { toast: (o: ToastOptions) => string | number; dismiss: (id: string | number) => void; update: (id: string | number, o: Partial<ToastOptions>) => void };
