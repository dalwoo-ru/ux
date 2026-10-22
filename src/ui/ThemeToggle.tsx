import { useEffect, useState } from 'react';
import { IconButton } from './baseui';
import { Icon } from './Icon';

type Theme = 'light' | 'dark';
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/** Переключатель темы: токены baseui реагируют на data-theme="light|dark" у <html>. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 'var(--baseui-z-index-200)' as unknown as number, boxShadow: 'var(--baseui-shadow-low)', borderRadius: 'var(--baseui-radius-12)' }}>
      <IconButton label="Сменить тему" tooltip={false} icon={<Icon name={theme === 'dark' ? 'Sun' : 'Moon01'} size={24} />}
        onClick={() => {
          const next = theme === 'dark' ? 'light' : 'dark';
          try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
          setTheme(next);
        }} />
    </div>
  );
}
