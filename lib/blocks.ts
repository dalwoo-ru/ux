export type BlockType =
  | "context"
  | "question"
  | "choice"
  | "scale"
  | "matrix"
  | "preference"
  | "cardsort"
  | "fivesecond"

type Base = { id: string; title: string; required: boolean }

export type Block =
  | (Base & { type: "context"; text: string })
  | (Base & { type: "question"; description: string })
  | (Base & { type: "choice"; options: string[]; multiple: boolean })
  | (Base & { type: "scale"; min: number; max: number; minLabel: string; maxLabel: string })
  | (Base & { type: "matrix"; rows: string[]; cols: string[]; multiple: boolean })
  | (Base & { type: "preference"; images: string[] })
  | (Base & { type: "cardsort"; cards: string[]; categories: string[] })
  | (Base & { type: "fivesecond"; imageUrl: string; seconds: number; question: string })

export type Answer = string | number | string[] | Record<string, string | string[]>
export type Answers = Record<string, Answer>

export const CATALOG: { type: BlockType; label: string; hint: string }[] = [
  { type: "question", label: "Вопрос", hint: "Открытый вопрос со свободным ответом" },
  { type: "choice", label: "Выбор", hint: "Выбор одного или нескольких вариантов" },
  { type: "scale", label: "Шкала", hint: "Оценка по числовой шкале" },
  { type: "matrix", label: "Матрица", hint: "Вопросы в виде сетки строк и столбцов" },
  { type: "preference", label: "Предпочтение", hint: "Сравнение 2 или более изображений" },
  { type: "cardsort", label: "Сортировка карточек", hint: "Группировка идей по категориям" },
  { type: "fivesecond", label: "Пять секунд", hint: "Изображение на ограниченное время" },
  { type: "context", label: "Контекст", hint: "Инструкция или дополнительная информация" },
]

export const LABELS = Object.fromEntries(CATALOG.map((c) => [c.type, c.label])) as Record<BlockType, string>

export function newBlock(type: BlockType): Block {
  const id = crypto.randomUUID().slice(0, 8)
  const b = { id, title: "", required: false }
  switch (type) {
    case "context":
      return { ...b, type, title: "Добро пожаловать", text: "" }
    case "question":
      return { ...b, type, description: "", title: "Ваш вопрос" }
    case "choice":
      return { ...b, type, title: "Выберите вариант", options: ["Вариант 1", "Вариант 2"], multiple: false }
    case "scale":
      return { ...b, type, title: "Оцените по шкале", min: 1, max: 5, minLabel: "Плохо", maxLabel: "Отлично" }
    case "matrix":
      return { ...b, type, title: "Оцените каждый пункт", rows: ["Строка 1", "Строка 2"], cols: ["Столбец 1", "Столбец 2"], multiple: false }
    case "preference":
      return { ...b, type, title: "Какой вариант вам больше нравится?", images: ["", ""] }
    case "cardsort":
      return { ...b, type, title: "Разложите карточки по категориям", cards: ["Карточка 1", "Карточка 2"], categories: ["Категория 1", "Категория 2"] }
    case "fivesecond":
      return { ...b, type, title: "Посмотрите на изображение", imageUrl: "", seconds: 5, question: "Что вы запомнили?" }
  }
}

/** Server-side check that a submitted answer matches the block. Returns cleaned answer or null if empty. */
export function cleanAnswer(block: Block, raw: unknown): Answer | null {
  const str = (v: unknown, n = 5000) => (typeof v === "string" ? v.slice(0, n) : "")
  switch (block.type) {
    case "context":
      return null
    case "question":
    case "fivesecond": {
      const s = str(raw).trim()
      return s || null
    }
    case "choice": {
      const arr = (Array.isArray(raw) ? raw : [raw]).filter((v) => typeof v === "string" && block.options.includes(v)) as string[]
      if (!arr.length) return null
      return block.multiple ? arr : arr[0]
    }
    case "scale": {
      const n = Number(raw)
      return Number.isInteger(n) && n >= block.min && n <= block.max ? n : null
    }
    case "preference": {
      const n = Number(raw)
      return Number.isInteger(n) && n >= 0 && n < block.images.length ? n : null
    }
    case "matrix": {
      if (!raw || typeof raw !== "object") return null
      const out: Record<string, string | string[]> = {}
      for (const row of block.rows) {
        const v = (raw as Record<string, unknown>)[row]
        const arr = (Array.isArray(v) ? v : [v]).filter((x) => typeof x === "string" && block.cols.includes(x)) as string[]
        if (arr.length) out[row] = block.multiple ? arr : arr[0]
      }
      if (block.required && Object.keys(out).length < block.rows.length) return null
      return Object.keys(out).length ? out : null
    }
    case "cardsort": {
      if (!raw || typeof raw !== "object") return null
      const out: Record<string, string> = {}
      for (const card of block.cards) {
        const v = (raw as Record<string, unknown>)[card]
        if (typeof v === "string" && block.categories.includes(v)) out[card] = v
      }
      if (block.required && Object.keys(out).length < block.cards.length) return null
      return Object.keys(out).length ? out : null
    }
  }
}
