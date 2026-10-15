import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import s from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/** Переключатель темы: токены baseui реагируют на data-theme="light|dark" у <html>. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <button type="button" className={s.toggle} title="Сменить тему" aria-label="Сменить тему"
      onClick={() => {
        const next = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
        setTheme(next);
      }}>
      <Icon name={theme === 'dark' ? 'Sun' : 'Moon01'} />
    </button>
  );
}
