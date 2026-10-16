import { useNavigate, type To } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { Button, IconButton } from './baseui';
import type { ButtonProps } from './baseui-types';

export { Button, IconButton };

/** Кнопка baseui как ссылка роутера: настоящий <a href>, переход без перезагрузки. */
export function LinkButton({ to, ...props }: Omit<ButtonProps, 'href' | 'onClick'> & { to: To & string }) {
  const nav = useNavigate();
  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // «открыть в новой вкладке» работает как обычно
    e.preventDefault();
    nav(to);
  };
  return <Button {...props} href={to} onClick={onClick} />;
}

/** Кнопка baseui как внешняя ссылка (новая вкладка). */
export function AnchorButton(props: Omit<ButtonProps, 'target' | 'rel'> & { href: string }) {
  return <Button {...props} target="_blank" rel="noreferrer" />;
}
