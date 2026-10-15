# UX-исследования

Сервис для проведения UX-исследований: регистрация, папки и тесты, конструктор из блоков, публичная ссылка для респондентов и сохранение результатов.

## Стек

| Слой | Технологии |
|---|---|
| Фронтенд | React 19 + TypeScript + Vite, React Router, CSS Modules |
| UI | **Компоненты дизайн-системы [baseui](https://github.com/dalwoo-ru/baseui)** (Button, TextField, Checkbox/CheckboxGroup, RadioGroup, Switch, Modal, ChipGroup, Tag, List/ListItem, Avatar, Select) + токены `--baseui-*` + шрифт Geist, светлая/тёмная тема (`data-theme`) |
| Бэкенд | Node-обработчик `lib/handler.js` (без фреймворка), Postgres (`pg`) |
| Деплой | Vercel: статика из `dist/`, API — функция `api/index.js` |

## Структура

```
vendor/baseui/             скомпилированная дизайн-система baseui (tokens.css, fonts, lib/*) — не править руками
src/
  main.tsx, App.tsx        вход и маршруты
  api.ts, types.ts         клиент API и общие типы
  styles/global.css        подключает токены и CSS компонентов baseui + базовые утилиты
  ui/                      тонкий слой над baseui: baseui.generated.ts (реэкспорт компонентов), baseui-types.ts (типы пропсов),
                           обёртки с удобным API (Button, TextField, Checkbox, Switch, Modal, Tabs…), Icon, ThemeToggle
  blocks/                  блоки конструктора: по файлу на тип + registry.ts и контракт definition.ts
  pages/                   Auth, Dashboard, TestPage (конструктор/шеринг/результаты), Respondent
api/index.js, lib/handler.js   бэкенд (Vercel-функция и локальный сервер)
scripts/sync-baseui.mjs        синхронизация baseui → vendor/ + генерация реэкспорта и иконок
```

### Как подключён baseui

baseui поставляется скомпилированным (исходных `.tsx` нет), поэтому он лежит в `vendor/baseui` и подключается так же, как это делает его сайт документации: компонент берётся из `meta.component` story-модуля. В baseui зашит собственный чанк React, поэтому `vite.config.ts` подменяет его на npm-React приложения — иначе у приложения и компонентов были бы две копии React и сломались бы хуки. Иконки baseui выгружаются скриптом в статическую SVG-разметку (`src/ui/icons.generated.ts`).

Обновить дизайн-систему:

```bash
git clone https://github.com/dalwoo-ru/baseui ../baseui      # или git pull
npm run baseui                                                # BASEUI_DIR=/путь/к/baseui, если лежит не рядом
```

Какие компоненты и иконки подключены — список `COMPONENTS` и `ICONS` в `scripts/sync-baseui.mjs`. Типы пропсов новых компонентов нужно добавить в `src/ui/baseui-types.ts` (они берутся из `component.__docgenInfo`). Чего в baseui нет (карточки блоков, прогресс, тепловые таблицы, тост), собрано на токенах `--baseui-*` без собственных цветов.

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
