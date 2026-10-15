import { NumberField, TextField } from '../ui/Field';
import type { BlockDef } from './definition';
import { Bars, NoAnswers } from './shared';
import s from './blocks.module.css';

export const scale: BlockDef<'scale'> = {
  label: 'Шкала', icon: 'BarChart01', desc: 'Попросите респондентов оценить что-либо по шкале',
  create: () => ({ title: 'Оцените по шкале', description: '', required: false, min: 1, max: 5, minLabel: 'Совсем не нравится', maxLabel: 'Очень нравится' }),
  Editor: ({ block, update }) => (
    <>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <NumberField label="От" value={block.min} min={0} max={1} onChange={(min) => update({ min })} />
        <NumberField label="До" value={block.max} min={3} max={10} onChange={(max) => update({ max })} />
      </div>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <TextField label="Подпись слева" value={block.minLabel} onChange={(minLabel) => update({ minLabel })} />
        <TextField label="Подпись справа" value={block.maxLabel} onChange={(maxLabel) => update({ maxLabel })} />
      </div>
    </>
  ),
  Respond: ({ block, value, onChange }) => {
    const nums = Array.from({ length: block.max - block.min + 1 }, (_, i) => block.min + i);
    return (
      <div>
        <div className={s.scale}>
          {nums.map((n) => <button key={n} type="button" className={s.scaleBtn} aria-pressed={value === n} onClick={() => onChange(n)}>{n}</button>)}
        </div>
        <div className={s.scaleLabels}><span>{block.minLabel}</span><span>{block.maxLabel}</span></div>
      </div>
    );
  },
  Results: ({ block, values }) => {
    if (!values.length) return <NoAnswers />;
    const avg = (values.reduce((a, c) => a + c, 0) / values.length).toFixed(2);
    const rows: Array<[string, number]> = [];
    for (let i = block.min; i <= block.max; i++) rows.push([String(i), values.filter((v) => v === i).length]);
    return <div><p style={{ marginBottom: 'var(--baseui-Space-S)' }}>Среднее: <b>{avg}</b></p><Bars rows={rows} total={values.length} /></div>;
  },
  answered: (_, v) => typeof v === 'number',
  exportValue: (_, v) => String(v),
};
