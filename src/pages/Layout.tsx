import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../lib/auth';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/baseui';
import s from './pages.module.css';

export function Logo() {
  return <span className={s.logo}><i />UX-исследования</span>;
}

export function Topbar({ children, left }: { children?: ReactNode; left?: ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className={s.topbar}>
      <Link to="/"><Logo /></Link>
      {left}
      <div className="grow" />
      {children}
      {user && <Avatar name={user.name} size="sm" />}
      {user && <span className={s.userName}>{user.name}</span>}
      {user && <Button size="xsm" onClick={async () => { await logout(); nav('/login'); }}>Выйти</Button>}
    </header>
  );
}
