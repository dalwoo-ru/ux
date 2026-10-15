import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

type Theme = 'light' | 'dark';
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/** Переключатель темы: токены baseui реагируют на data-theme="light|dark" у <html>. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 900, boxShadow: 'var(--baseui-Shadow-S)', borderRadius: 'var(--baseui-Radius-S)' }}>
      <Button variant="secondary" size="small" aria-label="Сменить тему" title="Сменить тему"
        onClick={() => {
          const next = theme === 'dark' ? 'light' : 'dark';
          try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
          setTheme(next);
        }}>
        <Icon name={theme === 'dark' ? 'Sun' : 'Moon01'} />
      </Button>
    </div>
  );
}
