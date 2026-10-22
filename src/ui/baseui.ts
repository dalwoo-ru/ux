// Компоненты дизайн-системы baseui (vendor/baseui/src/index.js) с типами пропсов.
// Обновить дизайн-систему: `npm run baseui`.
import type { ComponentType, ReactElement } from 'react';
import * as DS from '../../vendor/baseui/src/index.js';
import type * as T from './baseui-types';

const c = <P,>(component: unknown) => component as ComponentType<P>;

export const Button = c<T.ButtonProps>(DS.Button);
export const IconButton = c<T.IconButtonProps>(DS.IconButton);
export const TextField = c<T.TextFieldProps>(DS.TextField);
export const NumberInput = c<T.NumberInputProps>(DS.NumberInput);
export const Checkbox = c<T.CheckboxProps>(DS.Checkbox);
export const CheckboxGroup = c<T.CheckboxGroupProps>(DS.CheckboxGroup);
export const Radio = c<T.RadioProps>(DS.Radio);
export const RadioGroup = c<T.RadioGroupProps>(DS.RadioGroup);
export const Switch = c<T.SwitchProps>(DS.Switch);
export const Select = c<T.SelectProps>(DS.Select);
export const Modal = c<T.ModalProps>(DS.Modal);
export const AlertDialog = c<T.AlertDialogProps>(DS.AlertDialog);
export const Badge = c<T.BadgeProps>(DS.Badge);
export const Avatar = c<T.AvatarProps>(DS.Avatar);
export const Banner = c<T.BannerProps>(DS.Banner);
export const ProgressBar = c<T.ProgressBarProps>(DS.ProgressBar);
export const Card = c<T.CardProps>(DS.Card);
export const ClickableCard = c<T.ClickableCardProps>(DS.ClickableCard);
export const SelectableCard = c<T.SelectableCardProps>(DS.SelectableCard);
export const SegmentedControl = c<T.SegmentedControlProps>(DS.SegmentedControl);
export const Tabs = c<T.TabsProps>(DS.Tabs);
export const TabList = c<T.TabListProps>(DS.TabList);
export const Tab = c<T.TabProps>(DS.Tab);
export const TabPanel = c<T.TabPanelProps>(DS.TabPanel);
export const Status = c<T.StatusProps>(DS.Status);
export const Breadcrumbs = c<T.BreadcrumbsProps>(DS.Breadcrumbs);
export const Table = DS.Table as unknown as <R>(props: T.TableProps<R>) => ReactElement;
export const List = c<T.ListProps>(DS.List);
export const ListItem = c<T.ListItemProps>(DS.ListItem);
export const Chip = c<T.ChipProps>(DS.Chip);
export const Divider = c<T.DividerProps>(DS.Divider);
export const Link = c<T.LinkProps>(DS.Link);
export const Stack = c<T.StackProps>(DS.Stack);
export const HStack = c<T.StackShorthandProps>(DS.HStack);
export const VStack = c<T.StackShorthandProps>(DS.VStack);
export const Spinner = c<T.SpinnerProps>(DS.Spinner);
export const Skeleton = c<T.SkeletonProps>(DS.Skeleton);
export const Tooltip = c<T.TooltipProps>(DS.Tooltip);
export const ToastProvider = c<T.ToastProviderProps>(DS.ToastProvider);
export const useToast = DS.useToast as T.UseToast;
export type { ToastOptions } from './baseui-types';
