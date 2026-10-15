import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps } from 'react';
import { cx } from './cx';
import s from './Button.module.css';

type Look = { variant?: 'primary' | 'secondary' | 'ghost'; size?: 'xs' | 'sm' | 'md'; danger?: boolean };

/** Классы кнопки — чтобы стилизовать и <Link>/<a> так же, как <Button>. */
export const buttonClass = ({ variant = 'secondary', size = 'sm', danger }: Look = {}, extra?: string) =>
  cx(s.button, s[variant], s[size], danger && s.danger, extra);

export function Button({ variant, size, danger, className, ...props }: Look & ComponentProps<typeof BaseButton>) {
  return <BaseButton {...props} className={buttonClass({ variant, size, danger }, className as string | undefined)} />;
}

export function IconButton({ className, ...props }: ComponentProps<typeof BaseButton>) {
  return <BaseButton {...props} className={cx(s.iconButton, className as string | undefined)} />;
}
