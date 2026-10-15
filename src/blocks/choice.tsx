import { Checkbox, Radio, RadioGroup } from '../ui/Controls';
import { cx } from '../ui/cx';
import type { BlockDef } from './definition';
import { textOf } from './definition';
import { Bars, ListEditor, NoAnswers } from './shared';
import s from './blocks.module.css';

export const choice: BlockDef<'choice'> = {
  label: 'Выбор', icon: 'CheckSquare', desc: 'Задавайте вопросы с выбором или мультивыбором',
  create: () => ({
    title: 'Выберите вариант', description: '', required: false, multiple: false,
    options: [{ id: 'o1', text: 'Вариант 1' }, { id: 'o2', text: 'Вариант 2' }],
  }),
  Editor: ({ block, update }) => (
    <>
      <div className={s.group}><Checkbox checked={block.multiple} onChange={(multiple) => update({ multiple })}>Можно выбрать несколько</Checkbox></div>
      <ListEditor label="Варианты ответа" items={block.options} onChange={(options) => update({ options })} addLabel="Добавить вариант" min={2} placeholder="Вариант" />
    </>
  ),
  Respond: ({ block, value, onChange }) => {
    const sel = value ?? [];
    if (block.multiple) {
      return (
        <div>
          {block.options.map((o) => (
            <Checkbox key={o.id} checked={sel.includes(o.id)} className={cx(s.choice, sel.includes(o.id) && s.choiceSel)}
              onChange={(on) => onChange(on ? [...sel, o.id] : sel.filter((x) => x !== o.id))}>{o.text || '—'}</Checkbox>
          ))}
        </div>
      );
    }
    return (
      <RadioGroup value={sel[0] ?? ''} onChange={(v) => onChange([v])}>
        {block.options.map((o) => <Radio key={o.id} value={o.id} className={cx(s.choice, sel[0] === o.id && s.choiceSel)}>{o.text || '—'}</Radio>)}
      </RadioGroup>
    );
  },
  Results: ({ block, values }) => (values.length
    ? <Bars rows={block.options.map((o) => [o.text || '—', values.filter((v) => v.includes(o.id)).length])} total={values.length} />
    : <NoAnswers />),
  answered: (_, v) => !!v && v.length > 0,
  exportValue: (b, v) => v.map((id) => textOf(b.options, id)).join('; '),
};
