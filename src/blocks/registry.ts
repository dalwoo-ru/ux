import type { Block, BlockType } from '../types';
import { uid } from '../lib/util';
import type { BlockDef } from './definition';
import { cardsort } from './cardsort';
import { choice } from './choice';
import { fivesec } from './fivesec';
import { matrix } from './matrix';
import { preference } from './preference';
import { question } from './question';
import { scale } from './scale';
import type { IconName } from '../ui/Icon';

export const BLOCKS: { [K in BlockType]: BlockDef<K> } = { question, choice, scale, matrix, preference, cardsort, fivesec };

/** Порядок «базовых блоков» в палитре. */
export const BASIC_BLOCKS: BlockType[] = ['question', 'choice', 'scale', 'matrix', 'preference', 'cardsort', 'fivesec'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defOf = (type: BlockType) => BLOCKS[type] as BlockDef<any>;

export function createBlock(type: BlockType): Block {
  return { id: uid(), type, ...BLOCKS[type].create() } as Block;
}

/** Блоки макета, пока недоступные (показываются в палитре с замком). */
export const LOCKED_GROUPS: Array<{ group: string; items: Array<{ icon: IconName; label: string; desc: string }> }> = [
  { group: 'UX-исследования', items: [
    { icon: 'Figma', label: 'Figma', desc: 'Протестируйте прототип Figma' },
    { icon: 'Globe01', label: 'Сайт', desc: 'Протестируйте любой сайт' },
    { icon: 'Code01', label: 'HTML / Website', desc: 'Test a website or HTML prototype' },
    { icon: 'CursorClick01', label: 'Первый клик', desc: 'Попросите респондентов кликнуть по изображению для выполнения задания' },
    { icon: 'Dataflow01', label: 'Тестирование дерева', desc: 'Протестируйте информационную архитектуру вашего сайта' },
  ] },
  { group: 'Маркетинг и CX', items: [
    { icon: 'SwitchVertical01', label: 'Ранжирование', desc: 'Попросите респондентов расставить опции по приоритету' },
    { icon: 'TrendUp01', label: 'NPS®', desc: 'Измеряйте индекс лояльности клиентов (Net Promoter Score®)' },
    { icon: 'Stars01', label: 'Модель Кано', desc: 'Узнайте, какие функции в продукте наиболее критичны для пользователей' },
    { icon: 'Sliders01', label: 'MaxDiff', desc: 'Понимайте приоритеты, задав вопросы о том, какие варианты важны больше всего и меньше всего' },
  ] },
  { group: 'Другое', items: [
    { icon: 'Users01', label: 'Скрининг', desc: 'Скрининг респондентов с вопросами для прохождения исследования' },
    { icon: 'GitBranch01', label: 'Сплит-блок', desc: 'Равномерно распределите респондентов между группами блоков' },
    { icon: 'Shuffle02', label: 'Рандомизация', desc: 'Показывайте набор блоков в случайном порядке' },
    { icon: 'File01', label: 'Страница', desc: 'Группируйте несколько блоков на одной странице' },
    { icon: 'Edit03', label: 'Соглашение', desc: 'Попросите респондентов принять условия перед участием в исследовании' },
    { icon: 'InfoCircle', label: 'Контекст', desc: 'Добавьте инструкцию или дополнительную информацию' },
  ] },
];
