import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../lib/auth';
import { Button } from '../ui/Button';
import { Card, VStack } from '../ui/baseui';
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
      <Card variant="transparent" className={s.surface} padding={32} elevation="med" maxWidth={400} width="100%"><form onSubmit={submit}>
        <div style={{ marginBottom: 'var(--baseui-spacing-20)' }}><Logo /></div>
        <h1>{register ? 'Регистрация' : 'Вход'}</h1>
        <p className="muted" style={{ margin: '4px 0 var(--baseui-spacing-20)' }}>{register ? 'Создайте аккаунт, чтобы собирать тесты' : 'Войдите, чтобы продолжить'}</p>
        <VStack gap={12}>
        {register && <TextField label="Имя" value={name} onChange={setName} autoComplete="name" />}
        <TextField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <TextField label="Пароль" type="password" value={password} onChange={setPassword} caption={register ? 'Минимум 6 символов' : undefined} autoComplete={register ? 'new-password' : 'current-password'} actionLabel="Показать/скрыть пароль" />
        {error && <div className="error" role="alert">{error}</div>}
        <Button type="submit" variant="primary" width="100%" isLoading={busy}>{register ? 'Зарегистрироваться' : 'Войти'}</Button>
        </VStack>
        <p className="muted" style={{ textAlign: 'center', marginTop: 'var(--baseui-spacing-16)' }}>
          {register ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <Link to={register ? '/login' : '/register'}>{register ? 'Войти' : 'Зарегистрироваться'}</Link>
        </p>
      </form></Card>
    </div>
  );
}
