import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api, ApiError } from '../api';
import { defOf } from '../blocks/registry';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useUi } from '../ui/Feedback';
import { Banner, Card, ProgressBar, Spinner } from '../ui/baseui';
import type { Answers, Block } from '../types';
import s from './pages.module.css';

const CARD = { variant: 'transparent', padding: 32, elevation: 'low', maxWidth: 700, width: '100%', className: s.surface } as const;

export function Respondent() {
  const { token = '' } = useParams();
  const preview = useSearchParams()[0].get('preview') === '1';
  const { toast } = useUi();
  const [test, setTest] = useState<{ title: string; blocks: Block[] } | null>(null);
  const [failure, setFailure] = useState<{ status: number; message: string } | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const responseToken = useRef<string | null>(null);

  useEffect(() => {
    api.publicTest(token, preview).then((r) => setTest(r.test))
      .catch((e: ApiError) => setFailure({ status: e.status, message: e.message }));
  }, [token, preview]);

  if (failure) {
    return (
      <div className={s.respWrap}><Card {...CARD}>
        <h2 className={s.h2}>{failure.status === 404 ? 'Тест не найден' : 'Тест недоступен'}</h2><p className="muted">{failure.message}</p>
      </Card></div>
    );
  }
  if (!test) return <div className={s.respWrap}><Spinner label="Загрузка теста" /></div>;
  const blocks = test.blocks;

  const persist = async (completed: boolean, data: Answers) => {
    if (preview) return;
    if (!responseToken.current) responseToken.current = (await api.startResponse(token)).response_token;
    await api.saveResponse(token, responseToken.current, data, completed);
  };
  const guard = async (fn: () => Promise<void>) => {
    setBusy(true);
    try { await fn(); } catch (e) { toast((e as Error).message); } finally { setBusy(false); }
  };

  const bar = preview && (
    <div className={s.previewBar}><Banner status="warning">Режим предпросмотра — ответы не сохраняются</Banner></div>
  );

  if (finished) {
    return (
      <div className={s.respWrap}>{bar}
        <Card {...CARD} className={`${s.surface} ${s.center}`}>
          <div className={s.doneIcon}><Icon name="Check" size={32} /></div>
          <h1 className={s.h1}>Спасибо!</h1><p className="muted" style={{ marginTop: 8 }}>Ваши ответы сохранены. Можно закрыть страницу.</p>
        </Card>
      </div>
    );
  }

  if (step === -1) {
    return (
      <div className={s.respWrap}>{bar}
        <Card {...CARD}>
          <h1 className={s.h1}>{test.title}</h1>
          <p className={s.desc}>{blocks.length ? `Вопросов: ${blocks.length}. Это займёт пару минут.` : 'В этом тесте пока нет блоков.'}</p>
          {blocks.length > 0 && <Button variant="primary" size="md" isLoading={busy} onClick={() => guard(async () => { await persist(false, answers); setStep(0); })}>Начать</Button>}
        </Card>
      </div>
    );
  }

  const b = blocks[step];
  const def = defOf(b.type);
  const last = step === blocks.length - 1;
  const value = answers[b.id];

  const next = () => {
    if (b.required && !def.answered(b, value)) { setError('Этот блок обязателен — ответьте, пожалуйста'); return; }
    void guard(async () => {
      await persist(last, answers);
      if (last) setFinished(true); else setStep(step + 1);
      window.scrollTo(0, 0);
    });
  };

  return (
    <div className={s.respWrap}>{bar}
      <div className={s.progress}><ProgressBar size="sm" value={(step / blocks.length) * 100} aria-label={`Блок ${step + 1} из ${blocks.length}`} /></div>
      <Card {...CARD}>
        {!def.hideTitle && <h2 className={s.h2}>{b.title}</h2>}
        {b.description && <p className={s.desc}>{b.description}</p>}
        <def.Respond key={b.id} block={b} value={value} onChange={(v: unknown) => { setError(''); setAnswers((a) => ({ ...a, [b.id]: v })); }} />
        {error && <div className="error" role="alert">{error}</div>}
        <div className={s.respActions}>
          <Button size="md" isDisabled={step === 0 || busy} icon={<Icon name="ArrowLeft" size={20} />} onClick={() => { setError(''); setStep(step - 1); }}>Назад</Button>
          <Button variant="primary" size="md" isLoading={busy} onClick={next}>{last ? 'Завершить' : 'Далее'}</Button>
        </div>
      </Card>
    </div>
  );
}
