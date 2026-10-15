import { Link, type LinkProps } from 'react-router-dom';
import type { ComponentProps, ReactNode } from 'react';
import { Button as BaseuiButton } from './baseui.generated';

/** Кнопка baseui (variant: primary | secondary | text; size: large | medium | small | xsmall). */
export const Button = BaseuiButton;
export type ButtonProps = ComponentProps<typeof BaseuiButton>;

/** Иконочная кнопка: baseui Button variant="text" только с иконкой. Подпись — обязательно (aria-label). */
export function IconButton({ label, children, ...props }: Omit<ButtonProps, 'children' | 'aria-label'> & { label: string; children: ReactNode }) {
  return <BaseuiButton variant="text" size="xsmall" aria-label={label} title={label} {...props}>{children}</BaseuiButton>;
}

/** Кнопка baseui как ссылка роутера (Base UI `render`). */
export function LinkButton({ to, ...props }: Omit<ButtonProps, 'render' | 'nativeButton'> & { to: LinkProps['to'] }) {
  return <BaseuiButton {...props} nativeButton={false} render={<Link to={to} />} />;
}

/** Кнопка baseui как внешняя ссылка. */
export function AnchorButton({ href, ...props }: Omit<ButtonProps, 'render' | 'nativeButton'> & { href: string }) {
  return <BaseuiButton {...props} nativeButton={false} render={<a href={href} target="_blank" rel="noreferrer" />} />;
}
