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
        {register && <TextField label="Имя" value={name} onChange={setName} placeholder="Как вас зовут" />}
        <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <TextField label="Пароль" type="password" value={password} onChange={setPassword} placeholder="Минимум 6 символов" />
        {error && <div className="error" role="alert">{error}</div>}
        <Button type="submit" variant="primary" size="md" disabled={busy} style={{ width: '100%' }}>{register ? 'Зарегистрироваться' : 'Войти'}</Button>
        <p className="muted" style={{ textAlign: 'center', marginTop: 'var(--baseui-Space-M)' }}>
          {register ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <Link to={register ? '/login' : '/register'}>{register ? 'Войти' : 'Зарегистрироваться'}</Link>
        </p>
      </form>
    </div>
  );
}
