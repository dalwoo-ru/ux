# UX Research

Сервис для UX-исследований: регистрация, папки и тесты, конструктор из блоков, публичная ссылка для респондентов, сохранение и просмотр результатов.

**Стек:** TypeScript · Next.js (App Router, server actions) · shadcn/ui (new-york, исходники из shadcn 4.22.1) · Tailwind 4 · SQLite (встроенный `node:sqlite`, без нативных зависимостей).

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Требуется Node ≥ 22.13. База создаётся автоматически в `data/ux.db` (путь меняется через `DATABASE_PATH`).

## Блоки

Вопрос, Выбор, Шкала, Матрица, Предпочтение, Сортировка карточек, Пять секунд, Контекст. Добавить новый блок: тип и дефолты в `lib/blocks.ts`, поля в `components/builder.tsx`, отображение в `components/runner.tsx`, сводка в `components/results.tsx`.

## Структура

- `lib/db.ts` — схема SQLite · `lib/auth.ts` — пароли (scrypt) и сессии (cookie) · `lib/actions.ts` — server actions
- `app/dashboard` — папки и тесты · `app/tests/[id]` — конструктор и результаты · `app/t/[shareId]` — прохождение респондентом
