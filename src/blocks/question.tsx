import { Checkbox } from '../ui/Controls';
import { TextField } from '../ui/Field';
import type { BlockDef } from './definition';
import { NoAnswers } from './shared';
import s from './blocks.module.css';

export const question: BlockDef<'question'> = {
  label: 'Вопрос', icon: 'MessageChatCircle', desc: 'Задавайте открытые вопросы и уточняйте ответы с помощью AI',
  create: () => ({ title: 'Расскажите о вашем опыте', description: '', required: false, long: true }),
  Editor: ({ block, update }) => <Checkbox checked={block.long} onChange={(long) => update({ long })}>Развёрнутый ответ (многострочное поле)</Checkbox>,
  Respond: ({ block, value, onChange }) => (
    <TextField multiline={block.long} rows={4} placeholder="Ваш ответ…" value={value ?? ''} onChange={onChange} />
  ),
  Results: ({ values }) => (values.length
    ? <div className={s.textAnswers}>{values.map((v, i) => <div key={i}>{v}</div>)}</div>
    : <NoAnswers />),
  answered: (_, v) => !!v && v.trim() !== '',
  exportValue: (_, v) => v,
};
