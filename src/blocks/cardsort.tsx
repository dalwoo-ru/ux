import { useState } from 'react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Controls';
import { Card, Chip } from '../ui/baseui';
import { TextField } from '../ui/Field';
import { cx } from '../ui/cx';
import type { BlockDef } from './definition';
import { HeatTable, ListEditor, NoAnswers } from './shared';
import type { CardSortBlock } from '../types';
import s from './blocks.module.css';

function CardSortRespond({ block, value, onChange }: { block: CardSortBlock; value: Record<string, string> | undefined; onChange: (v: Record<string, string>) => void }) {
  const ans = value ?? {}; // cardId -> имя категории
  const [extra, setExtra] = useState<string[]>([]); // новые категории (открытая сортировка)
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const cats = block.open
    ? [...new Set([...Object.values(ans), ...extra])]
    : block.categories.map((c) => c.text || '—');

  const place = (cardId: string, cat: string | null) => {
    const next = { ...ans };
    if (cat === null) delete next[cardId]; else next[cardId] = cat;
    setSelected(null);
    onChange(next);
  };
  const chip = (id: string, text: string) => (
    // карточка — Chip baseui (нажатие выбирает карточку, перетаскивание — нативный drag&drop)
    <div key={id} className={s.chipWrap} draggable
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', id); setSelected(id); }}
      onClick={(e) => e.stopPropagation()}>
      <Chip size="sm" pressed={selected === id} onPressedChange={(on) => setSelected(on ? id : null)}>{text || '—'}</Chip>
    </div>
  );
  const zone = (title: string | null, cat: string | null, content: React.ReactNode) => (
    <Card variant="muted" padding={12} className={cx(s.zone, selected && cat !== null && s.zoneTarget)} key={cat ?? '__pool'}
      onClick={() => { if (selected) place(selected, cat); }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) place(id, cat); }}>
      {title && <h4>{title}</h4>}{content}
    </Card>
  );
  const addCat = () => {
    const n = draft.trim();
    if (n && !cats.includes(n)) setExtra([...extra, n]);
    setDraft('');
  };
  const pool = block.cards.filter((c) => !(c.id in ans));

  return (
    <div className={s.sortLayout}>
      {zone('Карточки', null, <>{pool.map((c) => chip(c.id, c.text))}{!pool.length && <div className="muted">Все карточки разложены</div>}</>)}
      <div className={s.sortCats}>
        {cats.map((cat) => zone(cat, cat, block.cards.filter((c) => ans[c.id] === cat).map((c) => chip(c.id, c.text))))}
        {block.open && (
          <form className="row" onSubmit={(e) => { e.preventDefault(); addCat(); }}>
            <div className="grow"><TextField label="Название новой категории" size="sm" value={draft} onChange={setDraft} /></div>
            <Button type="submit" size="sm">Добавить</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export const cardsort: BlockDef<'cardsort'> = {
  label: 'Сортировка карточек', icon: 'Columns01', desc: 'Попросите респондентов сгруппировать идеи по категориям',
  create: () => ({
    title: 'Разложите карточки по категориям',
    description: 'Перетащите карточку в подходящую категорию (или нажмите на неё, затем на категорию).',
    required: false, open: false,
    cards: [{ id: 'k1', text: 'Карточка 1' }, { id: 'k2', text: 'Карточка 2' }, { id: 'k3', text: 'Карточка 3' }],
    categories: [{ id: 'g1', text: 'Категория A' }, { id: 'g2', text: 'Категория B' }],
  }),
  Editor: ({ block, update }) => (
    <>
      <div className={s.group}><Checkbox checked={block.open} onChange={(open) => update({ open })}>Открытая сортировка (респонденты сами создают категории)</Checkbox></div>
      <ListEditor label="Карточки" items={block.cards} onChange={(cards) => update({ cards })} addLabel="Добавить карточку" min={2} placeholder="Карточка" />
      {!block.open && <ListEditor label="Категории" items={block.categories} onChange={(categories) => update({ categories })} addLabel="Добавить категорию" min={2} placeholder="Категория" />}
    </>
  ),
  Respond: CardSortRespond,
  Results: ({ block, values }) => {
    if (!values.length) return <NoAnswers />;
    const cats = block.open ? [...new Set(values.flatMap((v) => Object.values(v)))] : block.categories.map((c) => c.text || '—');
    return <HeatTable rows={block.cards.map((c) => c.text)} cols={cats} total={values.length}
      count={(ri, ci) => values.filter((v) => v[block.cards[ri].id] === cats[ci]).length} />;
  },
  answered: (b, v) => !!v && b.cards.every((c) => c.id in v),
  exportValue: (b, v) => b.cards.filter((c) => c.id in v).map((c) => `${c.text} → ${v[c.id]}`).join('; '),
};
