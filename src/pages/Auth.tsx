import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../lib/auth';
import { Button } from '../ui/Button';
import { TextField } from '../ui/Field';
import { Logo } from './Layout';
import s from './pages.module.css';

export function AuthPage({ register }: { register?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      const { user } = register ? await api.register({ email, password, name }) : await api.login({ email, password });
      setUser(user);
      nav('/', { replace: true });
    } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className={s.authWrap}>
      <form className={s.authCard} onSubmit={submit}>
        <div style={{ marginBottom: 'var(--baseui-Space-L)' }}><Logo /></div>
        <h1>{register ? 'Регистрация' : 'Вход'}</h1>
        <p className="muted" style={{ margin: '4px 0 var(--baseui-Space-L)' }}>{register ? 'Создайте аккаунт, чтобы собирать тесты' : 'Войдите, чтобы продолжить'}</p>
        <div className={s.authForm}>
        {register && <TextField label="Имя" value={name} onChange={setName} autoComplete="name" />}
        <TextField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <TextField label="Пароль" type="password" value={password} onChange={setPassword} caption={register ? 'Минимум 6 символов' : undefined} autoComplete={register ? 'new-password' : 'current-password'} actionLabel="Показать/скрыть пароль" />
        {error && <div className="error" role="alert">{error}</div>}
        <Button type="submit" variant="primary" size="medium" fullWidth disabled={busy} loading={busy}>{register ? 'Зарегистрироваться' : 'Войти'}</Button>
        </div>
        <p className="muted" style={{ textAlign: 'center', marginTop: 'var(--baseui-Space-M)' }}>
          {register ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <Link to={register ? '/login' : '/register'}>{register ? 'Войти' : 'Зарегистрироваться'}</Link>
        </p>
      </form>
    </div>
  );
}
