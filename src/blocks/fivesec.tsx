import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { NumberField, TextField } from '../ui/Field';
import type { BlockDef } from './definition';
import { FieldLabel, ImageEditor, NoAnswers } from './shared';
import type { FiveSecBlock } from '../types';
import s from './blocks.module.css';

function FiveSecRespond({ block, value, onChange }: { block: FiveSecBlock; value: string | undefined; onChange: (v: string) => void }) {
  const [stage, setStage] = useState<'intro' | 'show' | 'ask'>(value !== undefined ? 'ask' : 'intro');
  const [left, setLeft] = useState(block.seconds);

  useEffect(() => {
    if (stage !== 'show') return;
    setLeft(block.seconds);
    const t = window.setInterval(() => {
      setLeft((n) => {
        if (n <= 1) { window.clearInterval(t); setStage('ask'); onChange(value ?? ''); return 0; }
        return n - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  if (stage === 'intro') {
    return (
      <div className={s.stage}>
        <p className="muted">Изображение будет показано {block.seconds} сек.</p>
        <Button variant="primary" onClick={() => setStage('show')}>Начать</Button>
      </div>
    );
  }
  if (stage === 'show') {
    return (
      <div className={s.stage}>
        <div className={s.countdown}>{left}</div>
        {block.image.src ? <img src={block.image.src} alt="" /> : <p className="muted">Изображение не задано</p>}
      </div>
    );
  }
  return (
    <div>
      <h2 style={{ font: 'var(--baseui-Typography-Text-20-Semi-Bold)', marginBottom: 'var(--baseui-spacing-12)' }}>{block.title}</h2>
      <TextField label="Ваш ответ" multiline minRows={4} value={value ?? ''} onChange={onChange} autoFocus />
    </div>
  );
}

export const fivesec: BlockDef<'fivesec'> = {
  label: 'Пять секунд', icon: 'Clock', desc: 'Покажите изображение на ограниченный промежуток времени',
  titleLabel: 'Вопрос после показа', hideTitle: true,
  create: () => ({
    title: 'Что вы запомнили?',
    description: 'Сейчас вы увидите изображение на несколько секунд. Постарайтесь запомнить как можно больше.',
    required: false, image: { src: '' }, seconds: 5,
  }),
  Editor: ({ block, update }) => (
    <>
      <NumberField label="Секунд показа" value={block.seconds} min={1} max={60} onChange={(seconds) => update({ seconds })} />
      <div className={s.group}>
        <FieldLabel>Изображение</FieldLabel>
        <ImageEditor img={block.image} onChange={(patch) => update({ image: { src: patch.src ?? block.image.src } })} />
      </div>
      <p className={s.hint}>Заголовок блока — вопрос, который респондент увидит после показа изображения. Описание показывается перед просмотром.</p>
    </>
  ),
  Respond: FiveSecRespond,
  Results: ({ block, values }) => (values.some((v) => v.trim())
    ? (
      <div>
        {block.image.src && <img className={s.thumb} src={block.image.src} alt="" style={{ width: 120, height: 80, marginBottom: 8 }} />}
        <div className={s.textAnswers}>{values.filter((v) => v.trim()).map((v, i) => <div key={i}>{v}</div>)}</div>
      </div>
    )
    : <NoAnswers />),
  answered: (_, v) => !!v && v.trim() !== '',
  exportValue: (_, v) => v,
};
