# UX-исследования

Сервис для проведения UX-исследований: регистрация, папки и тесты, конструктор из блоков, публичная ссылка для респондентов и сохранение результатов.

## Стек

| Слой | Технологии |
|---|---|
| Фронтенд | React 19 + TypeScript + Vite, React Router, CSS Modules |
| UI | [Base UI](https://base-ui.com) (`@base-ui/react`, безголовые доступные примитивы) + токены дизайн-системы [baseui](https://github.com/dalwoo-ru/baseui) (`src/styles/tokens.css`, шрифт Geist), светлая/тёмная тема |
| Бэкенд | Node-обработчик `lib/handler.js` (без фреймворка), Postgres (`pg`) |
| Деплой | Vercel: статика из `dist/`, API — функция `api/index.js` |

## Структура

```
src/
  main.tsx, App.tsx        вход и маршруты
  api.ts, types.ts         клиент API и общие типы
  styles/                  tokens.css (baseui), шрифты, global.css
  ui/                      обёртки над Base UI в стиле baseui: Button, TextField, Checkbox/Radio/Switch,
                           Modal, Tabs, Tag, Icon (иконки baseui), ThemeToggle
  blocks/                  блоки конструктора: по файлу на тип + registry.ts и контракт definition.ts
  pages/                   Auth, Dashboard, TestPage (конструктор/шеринг/результаты), Respondent
api/index.js, lib/handler.js   бэкенд (Vercel-функция и локальный сервер)
scripts/extract-icons.mjs      выгрузка иконок baseui в src/ui/icons.generated.ts
```

### Как добавить блок

1. Описать тип в `src/types.ts` (интерфейс блока + тип ответа в `AnswerValues`).
2. Создать `src/blocks/<имя>.tsx` с `BlockDef` (`create`, `Editor`, `Respond`, `Results`, `answered`, `exportValue`).
3. Зарегистрировать в `src/blocks/registry.ts` (и в `BASIC_BLOCKS`, если он должен быть в палитре).

### Смена дизайн-системы

Все компоненты интерфейса собраны в `src/ui/` и используют только токены `--baseui-*`. Чтобы перейти на другую дизайн-систему, достаточно заменить `tokens.css` и реализацию обёрток из `src/ui/` (страницы и блоки обращаются только к ним). Иконки: `BASEUI_DIR=/путь/к/baseui npm run icons`.

## Разработка

Нужны Node.js ≥ 20 и Postgres.

```bash
npm install
export DATABASE_URL=postgres://user:pass@localhost:5432/ux
npm run dev:api     # API на :3000
npm run dev         # Vite на :5173 (проксирует /api на :3000)
```

Прод-сборка и запуск одним процессом: `npm run build && npm start` (http://localhost:3000).
Таблицы создаются автоматически при первом запросе.

## Деплой на Vercel

1. **Storage → Create Database → Neon (Postgres)** и подключить базу к проекту — Vercel добавит `DATABASE_URL`.
2. Redeploy. Сборка: `npm run build` → `dist/`, пути вроде `/t/...` отдают `index.html`.

## Возможности

- Регистрация и вход (scrypt, HttpOnly-сессии).
- Папки и тесты: создать, копия, переместить, удалить.
- Конструктор с автосохранением. Базовые блоки: Вопрос, Выбор, Шкала, Матрица, Предпочтение, Сортировка карточек, Пять секунд; остальные блоки палитры показаны заблокированными.
- Шеринг: переключатель «Опубликован», ссылка `/t/<токен>`, предпросмотр без сохранения ответов.
- Респондент проходит тест без регистрации, ответы сохраняются по ходу прохождения.
- Результаты: сводки по блокам, список прохождений, экспорт в CSV.
