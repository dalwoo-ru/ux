import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { uid } from '../lib/util';
import type { BlockDef } from './definition';
import { Bars, FieldLabel, ImageEditor, NoAnswers } from './shared';
import s from './blocks.module.css';

export const preference: BlockDef<'preference'> = {
  label: 'Предпочтение', icon: 'Image01', desc: 'Сравните 2 или более изображений',
  create: () => ({
    title: 'Какой вариант вам нравится больше?', description: '', required: false,
    images: [{ id: 'i1', src: '', caption: 'Вариант A' }, { id: 'i2', src: '', caption: 'Вариант B' }],
  }),
  Editor: ({ block, update }) => (
    <div>
      <FieldLabel>Изображения (минимум 2)</FieldLabel>
      {block.images.map((im, i) => (
        <ImageEditor key={im.id} img={im} withCaption
          onChange={(patch) => update({ images: block.images.map((x) => (x.id === im.id ? { ...x, ...patch } : x)) })}
          onRemove={block.images.length > 2 ? () => update({ images: block.images.filter((_, j) => j !== i) }) : undefined} />
      ))}
      <Button variant="secondary" size="xsmall" startIcon={<Icon name="Plus" size={16} />} onClick={() => update({ images: [...block.images, { id: uid(), src: '', caption: '' }] })}>Добавить изображение</Button>
    </div>
  ),
  Respond: ({ block, value, onChange }) => (
    <div className={s.prefGrid}>
      {block.images.map((im) => (
        <button key={im.id} type="button" className={s.pref} aria-pressed={value === im.id} onClick={() => onChange(im.id)}>
          {im.src ? <img src={im.src} alt={im.caption || ''} /> : <div className={s.noImg}>Нет изображения</div>}
          {im.caption && <div className={s.prefCap}>{im.caption}</div>}
        </button>
      ))}
    </div>
  ),
  Results: ({ block, values }) => (values.length
    ? <Bars total={values.length} rows={block.images.map((im) => [
        <span key={im.id}>{im.src && <img className={s.thumb} src={im.src} alt="" />}{im.caption || '—'}</span>,
        values.filter((v) => v === im.id).length,
      ])} />
    : <NoAnswers />),
  answered: (_, v) => typeof v === 'string' && v !== '',
  exportValue: (b, v) => {
    const i = b.images.findIndex((im) => im.id === v);
    return i < 0 ? '' : b.images[i].caption || `Изображение ${i + 1}`;
  },
};
