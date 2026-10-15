import { useRef, type ReactNode } from 'react';
import { Button, IconButton } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { TextField } from '../ui/Field';
import { useUi } from '../ui/Feedback';
import { readImage, pct, uid } from '../lib/util';
import type { Img, Item } from '../types';
import s from './blocks.module.css';

export function FieldLabel({ children }: { children: ReactNode }) {
  return <div className={s.fieldLabel}>{children}</div>;
}

/** Редактор списка текстовых элементов (варианты, строки, столбцы, карточки). */
export function ListEditor({ label, items, onChange, addLabel, min = 1, placeholder = 'Текст' }:
  { label: string; items: Item[]; onChange: (items: Item[]) => void; addLabel: string; min?: number; placeholder?: string }) {
  return (
    <div className={s.group}>
      <FieldLabel>{label}</FieldLabel>
      <div className="stack" style={{ gap: 'var(--baseui-Space-XS)', marginBottom: 'var(--baseui-Space-XS)' }}>
        {items.map((it, i) => (
          <div className="row" key={it.id}>
            <div className="grow">
              <TextField label={`${placeholder} ${i + 1}`} value={it.text} size="small"
                onChange={(text) => onChange(items.map((x) => (x.id === it.id ? { ...x, text } : x)))} />
            </div>
            <IconButton label="Удалить" disabled={items.length <= min} onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Icon name="XClose" size={20} />
            </IconButton>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="xsmall" startIcon={<Icon name="Plus" size={16} />} onClick={() => onChange([...items, { id: uid(), text: '' }])}>{addLabel}</Button>
    </div>
  );
}

/** Изображение по ссылке или загрузкой файла (ужимается на клиенте). */
export function ImageEditor({ img, onChange, withCaption, onRemove }:
  { img: { src: string; caption?: string }; onChange: (patch: Partial<Img>) => void; withCaption?: boolean; onRemove?: () => void }) {
  const { toast } = useUi();
  const file = useRef<HTMLInputElement>(null);
  return (
    <div className={s.imgEdit}>
      {img.src ? <img src={img.src} alt="" /> : <div className={s.imgPlaceholder}><Icon name="Image01" /></div>}
      <div className="grow stack" style={{ gap: 'var(--baseui-Space-XS)' }}>
        <TextField label="Ссылка на изображение" size="small" value={img.src.startsWith('data:') ? '' : img.src} onChange={(src) => onChange({ src: src.trim() })} />
        {withCaption && <TextField label="Подпись (необязательно)" size="small" value={img.caption || ''} onChange={(caption) => onChange({ caption })} />}
        <div className="row">
          <Button variant="secondary" size="xsmall" startIcon={<Icon name="Image01" size={16} />} onClick={() => file.current?.click()}>Загрузить файл</Button>
          <input ref={file} type="file" accept="image/*" hidden onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = '';
            if (!f) return;
            try { onChange({ src: await readImage(f) }); } catch (err) { toast((err as Error).message); }
          }} />
          {onRemove && <Button variant="text" size="xsmall" onClick={onRemove} startIcon={<Icon name="Trash01" size={16} />}>Удалить</Button>}
        </div>
      </div>
    </div>
  );
}

export const NoAnswers = () => <p className="muted">Пока нет ответов</p>;

export function Bars({ rows, total }: { rows: Array<[ReactNode, number]>; total: number }) {
  return (
    <div>
      {rows.map(([label, n], i) => (
        <div className={s.barRow} key={i}>
          <div>{label}</div>
          <div className={s.bar}><div style={{ width: `${pct(n, total)}%` }} /></div>
          <div className="muted">{n} · {pct(n, total)}%</div>
        </div>
      ))}
    </div>
  );
}

export function HeatTable({ rows, cols, count, total }: { rows: string[]; cols: string[]; count: (r: number, c: number) => number; total: number }) {
  return (
    <div className={s.scroll}>
      <table className={s.res}>
        <thead><tr><th />{cols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              <td>{r}</td>
              {cols.map((_, ci) => {
                const n = count(ri, ci);
                const a = total ? n / total : 0;
                return <td key={ci} className={s.heat} style={{ background: `color-mix(in srgb, var(--baseui-Background-Accent) ${Math.round(a * 75)}%, transparent)`, color: a > 0.55 ? 'var(--baseui-Text-and-Icon-OnColor)' : 'inherit' }}>{n || ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
