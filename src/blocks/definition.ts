import type { ComponentType } from 'react';
import type { IconName } from '../ui/Icon';
import type { AnswerValues, Block, BlockType } from '../types';

type Of<K extends BlockType> = Extract<Block, { type: K }>;

/**
 * Контракт блока конструктора. Чтобы добавить новый блок: описать тип в types.ts,
 * создать файл с BlockDef и зарегистрировать его в registry.ts.
 */
export interface BlockDef<K extends BlockType> {
  label: string;
  icon: IconName;
  desc: string;
  /** значения по умолчанию (без id и type) */
  create: () => Omit<Of<K>, 'id' | 'type'>;
  /** специфичные поля редактора (общие — заголовок, описание, «обязательный» — рисует конструктор) */
  Editor: ComponentType<{ block: Of<K>; update: (patch: Partial<Of<K>>) => void }>;
  Respond: ComponentType<{ block: Of<K>; value: AnswerValues[K] | undefined; onChange: (v: AnswerValues[K]) => void }>;
  Results: ComponentType<{ block: Of<K>; values: Array<AnswerValues[K]> }>;
  answered: (b: Of<K>, v: AnswerValues[K] | undefined) => boolean;
  exportValue: (b: Of<K>, v: AnswerValues[K]) => string;
  /** заголовок блока рисуется самим блоком, а не карточкой прохождения */
  hideTitle?: boolean;
  /** подпись поля заголовка в редакторе */
  titleLabel?: string;
}

export const textOf = (list: Array<{ id: string; text: string }>, id: string) => list.find((x) => x.id === id)?.text || '—';
