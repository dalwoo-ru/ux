# UX Research

Сервис для UX-исследований: регистрация, папки и тесты, конструктор из блоков, публичная ссылка для респондентов, сохранение и просмотр результатов.

**Стек:** TypeScript · Next.js (App Router, server actions) · shadcn/ui (new-york, исходники из shadcn 4.22.1) · Tailwind 4 · Neon Postgres (`@neondatabase/serverless`).

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Нужна переменная окружения `DATABASE_URL` (или `POSTGRES_URL`) — строка подключения Neon. На Vercel её выставляет интеграция Neon. Таблицы создаются автоматически при первом запросе.

## Блоки

Вопрос, Выбор, Шкала, Матрица, Предпочтение, Сортировка карточек, Пять секунд, Контекст. Добавить новый блок: тип и дефолты в `lib/blocks.ts`, поля в `components/builder.tsx`, отображение в `components/runner.tsx`, сводка в `components/results.tsx`.

## Структура

- `lib/db.ts` — подключение к Neon и схема · `lib/auth.ts` — пароли (scrypt) и сессии (cookie) · `lib/actions.ts` — server actions
- `app/dashboard` — папки и тесты · `app/tests/[id]` — конструктор и результаты · `app/t/[shareId]` — прохождение респондентом
