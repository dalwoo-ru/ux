import { Checkbox as BaseuiCheckbox, RadioGroup } from '../ui/baseui.generated';
import { Checkbox } from '../ui/Controls';
import type { BlockDef } from './definition';
import { textOf } from './definition';
import { HeatTable, ListEditor, NoAnswers } from './shared';
import s from './blocks.module.css';

export const matrix: BlockDef<'matrix'> = {
  label: 'Матрица', icon: 'Grid01', desc: 'Задавайте вопросы с мультивыбором в виде сетки строк и столбцов',
  create: () => ({
    title: 'Оцените каждый пункт', description: '', required: false, multiple: false,
    rows: [{ id: 'r1', text: 'Строка 1' }, { id: 'r2', text: 'Строка 2' }],
    cols: [{ id: 'c1', text: 'Столбец 1' }, { id: 'c2', text: 'Столбец 2' }, { id: 'c3', text: 'Столбец 3' }],
  }),
  Editor: ({ block, update }) => (
    <>
      <div className={s.group}><Checkbox checked={block.multiple} onChange={(multiple) => update({ multiple })}>Несколько ответов в строке</Checkbox></div>
      <ListEditor label="Строки" items={block.rows} onChange={(rows) => update({ rows })} addLabel="Добавить строку" placeholder="Строка" />
      <ListEditor label="Столбцы" items={block.cols} onChange={(cols) => update({ cols })} addLabel="Добавить столбец" min={2} placeholder="Столбец" />
    </>
  ),
  Respond: ({ block, value, onChange }) => {
    const ans = value ?? {};
    return (
      <div className={s.scroll}>
        <table className={s.matrix}>
          <thead><tr><th />{block.cols.map((c) => <th key={c.id}>{c.text}</th>)}</tr></thead>
          <tbody>
            {block.rows.map((r) => (
              <tr key={r.id}>
                <td>{r.text}</td>
                {block.cols.map((c) => {
                  const cur = ans[r.id] ?? [];
                  return (
                    <td key={c.id}>
                      {block.multiple
                        ? <BaseuiCheckbox aria-label={`${r.text}: ${c.text}`} checked={cur.includes(c.id)}
                            onCheckedChange={(on) => onChange({ ...ans, [r.id]: on ? [...cur, c.id] : cur.filter((x) => x !== c.id) })} />
                        // у Radio baseui нет собственного checked — отмеченность задаёт группа; одна ячейка = группа из одной опции
                        : <RadioGroup options={[{ value: c.id, label: '' }]} value={cur[0] === c.id ? c.id : null}
                            onValueChange={() => onChange({ ...ans, [r.id]: [c.id] })} />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  Results: ({ block, values }) => (values.length
    ? <HeatTable rows={block.rows.map((r) => r.text)} cols={block.cols.map((c) => c.text)} total={values.length}
        count={(ri, ci) => values.filter((v) => (v[block.rows[ri].id] ?? []).includes(block.cols[ci].id)).length} />
    : <NoAnswers />),
  answered: (b, v) => !!v && b.rows.every((r) => (v[r.id] ?? []).length > 0),
  exportValue: (b, v) => b.rows.map((r) => `${r.text}: ${(v[r.id] ?? []).map((id) => textOf(b.cols, id)).join(', ')}`).join('; '),
};
