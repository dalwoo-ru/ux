import { Checkbox, CheckboxGroup, RadioGroup } from '../ui/Controls';
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
    const options = block.options.map((o) => ({ value: o.id, label: o.text || '—' }));
    const sel = value ?? [];
    return block.multiple
      ? <CheckboxGroup options={options} value={sel} onValueChange={onChange} />
      : <RadioGroup options={options} value={sel[0] ?? null} onValueChange={(v) => onChange([v])} />;
  },
  Results: ({ block, values }) => (values.length
    ? <Bars rows={block.options.map((o) => [o.text || '—', values.filter((v) => v.includes(o.id)).length])} total={values.length} />
    : <NoAnswers />),
  answered: (_, v) => !!v && v.length > 0,
  exportValue: (b, v) => v.map((id) => textOf(b.options, id)).join('; '),
};
