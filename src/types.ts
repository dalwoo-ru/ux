export interface Item { id: string; text: string }
export interface Img { id: string; src: string; caption?: string }

interface Base { id: string; title: string; description: string; required: boolean }
export interface QuestionBlock extends Base { type: 'question'; long: boolean }
export interface ChoiceBlock extends Base { type: 'choice'; multiple: boolean; options: Item[] }
export interface ScaleBlock extends Base { type: 'scale'; min: number; max: number; minLabel: string; maxLabel: string }
export interface MatrixBlock extends Base { type: 'matrix'; multiple: boolean; rows: Item[]; cols: Item[] }
export interface PreferenceBlock extends Base { type: 'preference'; images: Img[] }
export interface CardSortBlock extends Base { type: 'cardsort'; open: boolean; cards: Item[]; categories: Item[] }
export interface FiveSecBlock extends Base { type: 'fivesec'; image: { src: string }; seconds: number }

export type Block = QuestionBlock | ChoiceBlock | ScaleBlock | MatrixBlock | PreferenceBlock | CardSortBlock | FiveSecBlock;
export type BlockType = Block['type'];

/** Ответ респондента на блок: тип значения зависит от типа блока. */
export interface AnswerValues {
  question: string;
  choice: string[];
  scale: number;
  matrix: Record<string, string[]>;
  preference: string;
  cardsort: Record<string, string>;
  fivesec: string;
}
export type Answers = Record<string, unknown>;

export interface User { id: number; email: string; name: string }
export interface Folder { id: number; name: string }
export interface TestSummary {
  id: number; title: string; folder_id: number | null; published: boolean; share_token: string;
  created_at: number; updated_at: number; responses_count: number; started_count: number;
}
export interface Test { id: number; title: string; folder_id: number | null; published: boolean; share_token: string; blocks: Block[] }
export interface ResponseRow { id: number; answers: Answers; completed: boolean; started_at: number; finished_at: number | null }
