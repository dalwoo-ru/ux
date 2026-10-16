import { Button } from '../ui/Button';
import { SelectableCard } from '../ui/baseui';
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
      <Button size="xsm" icon={<Icon name="Plus" size={16} />} onClick={() => update({ images: [...block.images, { id: uid(), src: '', caption: '' }] })}>Добавить изображение</Button>
    </div>
  ),
  Respond: ({ block, value, onChange }) => (
    <div className={s.prefGrid}>
      {block.images.map((im, i) => (
        // вариант — SelectableCard baseui
        <SelectableCard key={im.id} label={im.caption || `Вариант ${i + 1}`} padding={8} isSelected={value === im.id}
          onChange={(sel) => { if (sel) onChange(im.id); }}>
          {im.src ? <img src={im.src} alt="" className={s.prefImg} /> : <div className={s.noImg}>Нет изображения</div>}
          {im.caption && <div className={s.prefCap}>{im.caption}</div>}
        </SelectableCard>
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
