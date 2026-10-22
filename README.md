# UX-исследования

Сервис для проведения UX-исследований: регистрация, папки и тесты, конструктор из блоков, публичная ссылка для респондентов и сохранение результатов.

## Стек

| Слой | Технологии |
|---|---|
| Фронтенд | React 19 + TypeScript + Vite, React Router, CSS Modules |
| UI | **Дизайн-система [baseui](https://github.com/dalwoo-ru/baseui)**: Button, IconButton, TextField, NumberInput, Checkbox/CheckboxGroup, RadioGroup, Switch, Select, Modal, AlertDialog, Tabs, SegmentedControl, Card/SelectableCard, Table, List/ListItem, Badge, Avatar, Banner, ProgressBar, Status, Breadcrumbs, Toast и др. + токены `--baseui-*` + шрифт Geist, светлая/тёмная тема (`data-theme`) |
| Бэкенд | Node-обработчик `lib/handler.js` (без фреймворка), Postgres (`pg`) |
| Деплой | Vercel: статика из `dist/`, API — функция `api/index.js` |

## Структура

```
vendor/baseui/             дизайн-система baseui (tokens.css, fonts, lib/*, src/*) — не править руками
src/
  main.tsx, App.tsx        вход и маршруты
  api.ts, types.ts         клиент API и общие типы
  styles/global.css        подключает токены и CSS baseui + базовые утилиты
  ui/baseui.ts             компоненты baseui с типами (реэкспорт vendor/baseui/src/index.js)
  ui/baseui-types.ts       типы пропсов компонентов (по описаниям props самого baseui)
  ui/                      тонкие обёртки с удобным API (Button/LinkButton, TextField, Checkbox, Switch, Feedback), Icon, ThemeToggle
  blocks/                  блоки конструктора: по файлу на тип + registry.ts и контракт definition.ts
  pages/                   Auth, Dashboard, TestPage (конструктор/шеринг/результаты), Respondent
api/index.js, lib/handler.js   бэкенд (Vercel-функция и локальный сервер)
scripts/sync-baseui.mjs        синхронизация baseui → vendor/ + генерация списка экспортов и иконок
```

### Как подключён baseui

baseui — набор React-компонентов: часть написана модулями в `src/` (Button, Card, Tabs, Table, Toast…), часть — скомпилированная (`lib/`: TextField, Checkbox, Switch, Select, Modal, List…). Всё это лежит в `vendor/baseui` и импортируется через `src/ui/baseui.ts`.

В baseui есть собственный чанк React, поэтому `vite.config.ts` содержит два плагина:

- `baseuiSharedReact` — подменяет чанки React внутри baseui на npm-React приложения (иначе было бы две копии React и сломались бы хуки);
- `baseuiStaticImports` — `src/base.js` подгружает скомпилированные компоненты через `import(`../lib/${file}`)`, что бандлер не разрешит; плагин заменяет это на `import.meta.glob`.

Цели сборки — `es2022` (в baseui есть top-level await).

Обновить дизайн-систему:

```bash
git clone https://github.com/dalwoo-ru/baseui ../baseui      # или git pull
npm run baseui                                                # BASEUI_DIR=/путь/к/baseui, если лежит не рядом
npm run build                                                 # tsc покажет, что изменилось в API компонентов
```

Новые токены называются `--baseui-spacing-N`, `--baseui-radius-N`, `--baseui-shadow-{low,med,high}`; props — `isDisabled`/`isLoading`, размеры `xsm · sm · md · lg · xl`. Если у компонента изменились props — поправьте типы в `src/ui/baseui-types.ts`. Чего в baseui нет (шапка, сайдбар, карточки блоков конструктора, тепловые таблицы результатов), собрано на токенах без собственных цветов.

### Как добавить блок

1. Описать тип в `src/types.ts` (интерфейс блока + тип ответа в `AnswerValues`).
2. Создать `src/blocks/<имя>.tsx` с `BlockDef` (`create`, `Editor`, `Respond`, `Results`, `answered`, `exportValue`).
3. Зарегистрировать в `src/blocks/registry.ts` (и в `BASIC_BLOCKS`, если он должен быть в палитре).

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
