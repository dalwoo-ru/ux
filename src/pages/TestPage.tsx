import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { BASIC_BLOCKS, BLOCKS, LOCKED_GROUPS, createBlock, defOf } from '../blocks/registry';
import { trackSave } from '../lib/save';
import { fmtDate, fmtDuration, uid } from '../lib/util';
import { AnchorButton, Button, IconButton } from '../ui/Button';
import { Checkbox, Switch } from '../ui/Controls';
import { useUi } from '../ui/Feedback';
import { TextField } from '../ui/Field';
import { Icon } from '../ui/Icon';
import { Badge, Breadcrumbs, Card, EmptyState, List, ListItem, Modal, Tab, TabList, TabPanel, Table, Tabs } from '../ui/baseui';
import { cx } from '../ui/cx';
import type { Block, BlockType, ResponseRow, Test } from '../types';
import { Topbar } from './Layout';
import s from './pages.module.css';

type Tab = 'build' | 'results' | 'share';
type SaveState = 'saved' | 'dirty' | 'saving' | 'error';
const SAVE_TEXT: Record<SaveState, string> = { saved: 'Сохранено', dirty: 'Есть изменения…', saving: 'Сохранение…', error: 'Ошибка сохранения' };

export function TestPage() {
  const id = Number(useParams().id);
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab) || 'build';
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState('');
  const [save, setSave] = useState<SaveState>('saved');
  const latest = useRef<Test | null>(null);
  const dirty = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const { toast } = useUi();

  useEffect(() => {
    api.test(id).then((r) => { setTest(r.test); latest.current = r.test; }).catch((e) => setError(e.message));
  }, [id]);

  const flush = useCallback(() => {
    window.clearTimeout(timer.current);
    const t = latest.current;
    if (!t || !dirty.current) return Promise.resolve();
    dirty.current = false;
    setSave('saving');
    return trackSave(api.updateTest(t.id, { title: t.title, blocks: t.blocks })
      .then(() => setSave((x) => (dirty.current ? x : 'saved')))
      .catch((e) => { dirty.current = true; setSave('error'); toast((e as Error).message); }));
  }, [toast]);

  // сохраняем несохранённое при уходе со страницы
  useEffect(() => () => { void flush(); }, [flush]);

  const edit = useCallback((patch: Partial<Pick<Test, 'title' | 'blocks'>>) => {
    setTest((t) => {
      if (!t) return t;
      const next = { ...t, ...patch };
      latest.current = next;
      return next;
    });
    dirty.current = true;
    setSave('dirty');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { void flush(); }, 600);
  }, [flush]);

  if (error) return <div><Topbar /><p className="error" style={{ padding: 24 }}>{error}</p></div>;
  if (!test) return <div><Topbar /></div>;

  const go = (v: string) => { void flush(); setParams(v === 'build' ? {} : { tab: v }); };

  return (
    <Tabs value={tab} onValueChange={go}>
      <div className={s.page}>
        <Topbar left={<TestCrumbs title={test.title} />}>
          <span className="muted small">{SAVE_TEXT[save]}</span>
          <TabList variant="pill" label="Разделы теста">
            <Tab value="build">Конструктор</Tab>
            <Tab value="results">Результаты</Tab>
            <Tab value="share">Поделиться</Tab>
          </TabList>
        </Topbar>
        <TabPanel value="build"><Builder test={test} edit={edit} /></TabPanel>
        <TabPanel value="results"><Results test={test} /></TabPanel>
        <TabPanel value="share"><Share test={test} onPublished={(published) => setTest({ ...test, published })} /></TabPanel>
      </div>
    </Tabs>
  );
}

/** «Тесты / Название» — хлебные крошки baseui вместо кнопки «назад». */
function TestCrumbs({ title }: { title: string }) {
  const nav = useNavigate();
  return (
    <div className={s.crumbs}>
      <Breadcrumbs items={[{ label: 'Тесты', href: '/', onClick: (e) => { e.preventDefault(); nav('/'); } }, { label: title || 'Без названия' }]} />
    </div>
  );
}

/* ---------------- конструктор ---------------- */

function Builder({ test, edit }: { test: Test; edit: (p: Partial<Pick<Test, 'title' | 'blocks'>>) => void }) {
  const { confirm } = useUi();
  const [openId, setOpenId] = useState<string | null>(test.blocks.length === 1 ? test.blocks[0].id : null);
  const [palette, setPalette] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const blocks = test.blocks;

  const patch = (id: string, p: Partial<Block>) => edit({ blocks: blocks.map((b) => (b.id === id ? ({ ...b, ...p } as Block) : b)) });
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    edit({ blocks: next });
  };
  const duplicate = (i: number) => {
    const remap = (o: unknown): unknown => {
      if (Array.isArray(o)) return o.map(remap);
      if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, k === 'id' ? uid() : remap(v)]));
      return o;
    };
    const copy = remap(blocks[i]) as Block;
    edit({ blocks: [...blocks.slice(0, i + 1), copy, ...blocks.slice(i + 1)] });
    setOpenId(copy.id);
  };
  const add = (type: BlockType) => {
    const b = createBlock(type);
    edit({ blocks: [...blocks, b] });
    setOpenId(b.id);
    setPalette(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };

  return (
    <div className={s.editor}>
      <TextField variant="standard" label="Название теста" value={test.title} onChange={(title) => edit({ title })} />
      <p className="muted" style={{ marginBottom: 'var(--baseui-spacing-12)' }}>Респонденты увидят блоки в том порядке, в котором они расположены.</p>

      {blocks.map((b, i) => {
        const def = defOf(b.type);
        const open = openId === b.id;
        return (
          <Card key={b.id} variant="muted" padding={0} className={cx(s.block, open && s.blockOpen)} data-testid="block">
            <div className={s.blockHead} role="button" tabIndex={0} aria-expanded={open}
              onClick={() => setOpenId(open ? null : b.id)}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); setOpenId(open ? null : b.id); } }}>
              <span className={s.bico}><Icon name={def.icon} size={18} /></span>
              <span className={cx(s.num, 'muted small')}>{i + 1}</span>
              <span className={s.blockTitle}>{b.title || 'Без названия'}</span>
              <span className="muted small">{def.label}</span>
              <span className="row" style={{ gap: 0 }} onClick={(e) => e.stopPropagation()}>
                <IconButton label="Вверх" variant="ghost" size="xsm" isDisabled={i === 0} icon={<Icon name="ArrowUp" size={18} />} onClick={() => move(i, -1)} />
                <IconButton label="Вниз" variant="ghost" size="xsm" isDisabled={i === blocks.length - 1} icon={<Icon name="ArrowDown" size={18} />} onClick={() => move(i, 1)} />
                <IconButton label="Дублировать" variant="ghost" size="xsm" icon={<Icon name="Copy01" size={18} />} onClick={() => duplicate(i)} />
                <IconButton label="Удалить блок" variant="ghost" size="xsm" icon={<Icon name="Trash01" size={18} />} onClick={async () => { if (await confirm('Удалить блок?')) edit({ blocks: blocks.filter((x) => x.id !== b.id) }); }} />
              </span>
            </div>
            {open && (
              <div className={s.blockBody}>
                <TextField label={def.titleLabel ?? 'Вопрос / заголовок'} value={b.title} onChange={(title) => patch(b.id, { title })} />
                <TextField label="Описание (необязательно)" multiline minRows={2} value={b.description} onChange={(description) => patch(b.id, { description })} />
                <div style={{ marginBottom: 'var(--baseui-spacing-16)' }}><Checkbox checked={b.required} onChange={(required) => patch(b.id, { required })}>Обязательный блок</Checkbox></div>
                <def.Editor block={b} update={(p: Partial<Block>) => patch(b.id, p)} />
              </div>
            )}
          </Card>
        );
      })}
      {!blocks.length && <EmptyState icon={<Icon name="Plus" size={40} />} title="Добавьте первый блок" description="Блоки — это вопросы и задания, которые увидит респондент" />}
      <div ref={endRef} className={s.addBlock}><Button variant="primary" size="sm" icon={<Icon name="Plus" size={20} />} onClick={() => setPalette(true)}>Добавить блок</Button></div>

      <Modal open={palette} onOpenChange={setPalette} title="Добавить блок">
        <List title="Базовые блоки" divider>
          {BASIC_BLOCKS.map((t) => (
            <ListItem key={t} icon={<Icon name={BLOCKS[t].icon} size={24} />} subtitle={BLOCKS[t].desc} onClick={() => add(t)}>{BLOCKS[t].label}</ListItem>
          ))}
        </List>
        {LOCKED_GROUPS.map((g, gi) => (
          <List key={g.group} title={g.group} divider={gi < LOCKED_GROUPS.length - 1}>
            {g.items.map((it) => (
              <ListItem key={it.label} disabled icon={<Icon name={it.icon} size={24} />} subtitle={it.desc} details={<Icon name="Lock01" size={20} />}>{it.label}</ListItem>
            ))}
          </List>
        ))}
      </Modal>
    </div>
  );
}

/* ---------------- шеринг ---------------- */

function Share({ test, onPublished }: { test: Test; onPublished: (p: boolean) => void }) {
  const { toast } = useUi();
  const url = `${location.origin}/t/${test.share_token}`;
  const toggle = async (published: boolean) => {
    try {
      await api.updateTest(test.id, { published });
      onPublished(published);
      toast(published ? 'Тест опубликован' : 'Тест снят с публикации');
    } catch (e) { toast((e as Error).message); }
  };
  return (
    <Card variant="muted" padding={24} className={s.shareBox}><div className={s.shareStack}>
      <h2 style={{ marginBottom: 'var(--baseui-spacing-16)' }}>Поделиться тестом</h2>
      <Switch checked={test.published} onChange={toggle}><b>Опубликован</b></Switch>
      <p className="muted" style={{ margin: 'var(--baseui-spacing-12) 0' }}>
        {test.published
          ? 'Любой, у кого есть ссылка, может пройти тест. Регистрация не нужна.'
          : 'Тест в черновике: по ссылке респонденты увидят, что он закрыт. Вы можете открыть его в режиме предпросмотра.'}
      </p>
      <div className="row" style={{ margin: 'var(--baseui-spacing-12) 0 var(--baseui-spacing-16)', alignItems: 'flex-start' }}>
        <div className="grow"><TextField label="Ссылка на тест" value={url} readOnly onFocus={(e) => e.target.select()} /></div>
        <Button variant="primary" size="md" icon={<Icon name="Link01" size={20} />} onClick={async () => {
          try { await navigator.clipboard.writeText(url); toast('Ссылка скопирована'); } catch { toast('Скопируйте ссылку вручную'); }
        }}>Копировать</Button>
      </div>
      <AnchorButton size="sm" href={`/t/${test.share_token}?preview=1`} icon={<Icon name="Eye" size={20} />}>
        Предпросмотр (ответы не сохраняются)
      </AnchorButton>
    </div></Card>
  );
}

/* ---------------- результаты ---------------- */

function Results({ test }: { test: Test }) {
  const { confirm } = useUi();
  const [data, setData] = useState<{ test: Test; responses: ResponseRow[] } | null>(null);
  const [error, setError] = useState('');
  const load = useCallback(() => { api.results(test.id).then(setData).catch((e) => setError(e.message)); }, [test.id]);
  useEffect(load, [load]);

  if (error) return <p className="error" style={{ padding: 24 }}>{error}</p>;
  if (!data) return null;
  const { responses } = data;
  const blocks = data.test.blocks;
  const done = responses.filter((r) => r.completed);
  const times = done.map((r) => (r.finished_at ?? r.started_at) - r.started_at).sort((a, b) => a - b);
  const median = times.length ? times[Math.floor(times.length / 2)] : null;

  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['ID', 'Начато', 'Завершено', 'Статус', ...blocks.map((b, i) => `${i + 1}. ${b.title}`)];
    const rows = responses.map((r) => [
      r.id, new Date(r.started_at).toISOString(), r.finished_at ? new Date(r.finished_at).toISOString() : '', r.completed ? 'Завершено' : 'Не завершено',
      ...blocks.map((b) => (b.id in r.answers ? defOf(b.type).exportValue(b, r.answers[b.id]) : '')),
    ]);
    const csv = '﻿' + [head, ...rows].map((r) => r.map(esc).join(';')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `${test.title}.csv`;
    document.body.append(a); a.click(); a.remove();
  };

  return (
    <div className={s.results}>
      <div className={s.pageHead}>
        <h2>{test.title}</h2>
        <div className="row">
          <Button size="sm" icon={<Icon name="RefreshCw01" size={20} />} onClick={load}>Обновить</Button>
          <Button size="sm" icon={<Icon name="Download01" size={20} />} onClick={exportCsv} isDisabled={!responses.length}>CSV</Button>
        </div>
      </div>
      <div className={s.stats}>
        {[
          [responses.length, 'начали'], [done.length, 'завершили'],
          [responses.length ? `${Math.round((done.length / responses.length) * 100)}%` : '—', 'доходимость'], [median ? fmtDuration(median) : '—', 'медианное время'],
        ].map(([v, l]) => <Card key={l} padding={16} className={s.stat}><b>{v}</b>{l}</Card>)}
      </div>

      {blocks.map((b, i) => {
        const def = defOf(b.type);
        const vals = responses.map((r) => r.answers[b.id]).filter((v) => v !== undefined && v !== null);
        return (
          <Card variant="muted" padding={20} className={s.resBlock} key={b.id}>
            <div className="row" style={{ marginBottom: 'var(--baseui-spacing-12)' }}>
              <span className={s.bico}><Icon name={def.icon} size={18} /></span>
              <div className="grow"><h3>{i + 1}. {b.title}</h3><span className="muted small">{def.label} · ответов: {vals.length}</span></div>
            </div>
            <def.Results block={b} values={vals} />
          </Card>
        );
      })}

      <Card variant="muted" padding={20} className={s.resBlock}>
        <h3 style={{ marginBottom: 'var(--baseui-spacing-12)' }}>Все прохождения</h3>
        <Table<ResponseRow>
          data={responses} rowKey="id" caption="Все прохождения" density="compact"
          emptyState="Пока никто не проходил тест"
          columns={[
            { key: 'id', header: '#', width: 64 },
            { key: 'started_at', header: 'Начато', renderCell: (r) => fmtDate(r.started_at) },
            { key: 'completed', header: 'Статус', renderCell: (r) => <Badge variant={r.completed ? 'success' : 'neutral'} label={r.completed ? 'Завершено' : 'Не завершено'} /> },
            { key: 'time', header: 'Время', renderCell: (r) => (r.finished_at ? fmtDuration(r.finished_at - r.started_at) : '—') },
            { key: 'actions', header: '', align: 'end', renderCell: (r) => (
              <IconButton label="Удалить прохождение" variant="ghost" size="xsm" icon={<Icon name="Trash01" size={18} />} onClick={async () => {
                if (await confirm('Удалить это прохождение?')) { await api.deleteResponse(test.id, r.id); load(); }
              }} />
            ) },
          ]} />
      </Card>
    </div>
  );
}
