import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../lib/auth';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/baseui.generated';
import s from './pages.module.css';

export function Logo() {
  return <span className={s.logo}><i />UX-исследования</span>;
}

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';

export function Topbar({ children }: { children?: ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className={s.topbar}>
      <Link to="/"><Logo /></Link>
      <div className="grow" />
      {children}
      {user && <Avatar type="letters" size="xsmall" initials={initials(user.name)} alt={user.name} />}
      {user && <span className={s.userName}>{user.name}</span>}
      {user && <Button variant="secondary" size="xsmall" onClick={async () => { await logout(); nav('/login'); }}>Выйти</Button>}
    </header>
  );
}
