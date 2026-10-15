import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../lib/auth';
import { Button } from '../ui/Button';
import s from './pages.module.css';

export function Logo() {
  return <span className={s.logo}><i />UX-исследования</span>;
}

export function Topbar({ children }: { children?: ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className={s.topbar}>
      <Link to="/"><Logo /></Link>
      <div className="grow" />
      {children}
      {user && <span className="muted">{user.name}</span>}
      {user && <Button size="xs" onClick={async () => { await logout(); nav('/login'); }}>Выйти</Button>}
    </header>
  );
}
