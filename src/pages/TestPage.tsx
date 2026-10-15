import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { BASIC_BLOCKS, BLOCKS, LOCKED_GROUPS, createBlock, defOf } from '../blocks/registry';
import { trackSave } from '../lib/save';
import { fmtDate, fmtDuration, uid } from '../lib/util';
import { Button, IconButton, buttonClass } from '../ui/Button';
import { Checkbox, Switch } from '../ui/Controls';
import { Modal, useUi } from '../ui/Feedback';
import { TextField } from '../ui/Field';
import { Icon } from '../ui/Icon';
import { Tabs } from '../ui/Tabs';
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

  return (
    <div className={s.page}>
      <Topbar>
        <span className="muted small">{SAVE_TEXT[save]}</span>
        <Link to="/" className={buttonClass({ variant: 'ghost', size: 'xs' })}><Icon name="ArrowLeft" size={16} />Тесты</Link>
        <Tabs value={tab} onChange={(v) => { void flush(); setParams(v === 'build' ? {} : { tab: v }); }}
          items={[{ value: 'build', label: 'Конструктор' }, { value: 'results', label: 'Результаты' }, { value: 'share', label: 'Поделиться' }]} />
      </Topbar>
      {tab === 'build' && <Builder test={test} edit={edit} />}
      {tab === 'results' && <Results test={test} />}
      {tab === 'share' && <Share test={test} onPublished={(published) => setTest({ ...test, published })} />}
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
      <input className={s.titleInput} value={test.title} placeholder="Название теста" aria-label="Название теста" onChange={(e) => edit({ title: e.target.value })} />
      <p className="muted" style={{ marginBottom: 'var(--baseui-Space-S)' }}>Респонденты увидят блоки в том порядке, в котором они расположены.</p>

      {blocks.map((b, i) => {
        const def = defOf(b.type);
        const open = openId === b.id;
        return (
          <section key={b.id} className={cx(s.block, open && s.blockOpen)} data-testid="block">
            <div className={s.blockHead} role="button" tabIndex={0} aria-expanded={open}
              onClick={() => setOpenId(open ? null : b.id)}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); setOpenId(open ? null : b.id); } }}>
              <span className={s.bico}><Icon name={def.icon} size={18} /></span>
              <span className={cx(s.num, 'muted small')}>{i + 1}</span>
              <span className={s.blockTitle}>{b.title || 'Без названия'}</span>
              <span className="muted small">{def.label}</span>
              <span className="row" style={{ gap: 0 }} onClick={(e) => e.stopPropagation()}>
                <IconButton aria-label="Вверх" disabled={i === 0} onClick={() => move(i, -1)}><Icon name="ArrowUp" size={18} /></IconButton>
                <IconButton aria-label="Вниз" disabled={i === blocks.length - 1} onClick={() => move(i, 1)}><Icon name="ArrowDown" size={18} /></IconButton>
                <IconButton aria-label="Дублировать" onClick={() => duplicate(i)}><Icon name="Copy01" size={18} /></IconButton>
                <IconButton aria-label="Удалить блок" onClick={async () => { if (await confirm('Удалить блок?')) edit({ blocks: blocks.filter((x) => x.id !== b.id) }); }}><Icon name="Trash01" size={18} /></IconButton>
              </span>
            </div>
            {open && (
              <div className={s.blockBody}>
                <TextField label={def.titleLabel ?? 'Вопрос / заголовок'} value={b.title} onChange={(title) => patch(b.id, { title })} />
                <TextField label="Описание (необязательно)" multiline rows={2} value={b.description} onChange={(description) => patch(b.id, { description })} />
                <div style={{ marginBottom: 'var(--baseui-Space-M)' }}><Checkbox checked={b.required} onChange={(required) => patch(b.id, { required })}>Обязательный блок</Checkbox></div>
                <def.Editor block={b} update={(p: Partial<Block>) => patch(b.id, p)} />
              </div>
            )}
          </section>
        );
      })}
      {!blocks.length && <div className={s.empty}>Добавьте первый блок, чтобы начать собирать тест</div>}
      <div ref={endRef} className={s.addBlock}><Button variant="primary" onClick={() => setPalette(true)}><Icon name="Plus" size={18} />Добавить блок</Button></div>

      <Modal open={palette} onClose={() => setPalette(false)} title="Добавить блок" wide>
        <div className={s.palette}>
          <div>
            <h4>Базовые блоки</h4>
            {BASIC_BLOCKS.map((t) => (
              <button key={t} type="button" className={s.palItem} onClick={() => add(t)}>
                <span className={s.palTitle}><span className={s.bico}><Icon name={BLOCKS[t].icon} size={18} /></span>{BLOCKS[t].label}</span>
                <span className={cx(s.palDesc, 'muted small')}>{BLOCKS[t].desc}</span>
              </button>
            ))}
          </div>
          {LOCKED_GROUPS.map((g) => (
            <div key={g.group}>
              <h4>{g.group}</h4>
              {g.items.map((it) => (
                <div key={it.label} className={cx(s.palItem, s.palLocked)} title="Скоро будет доступно">
                  <span className={s.palTitle}><span className={s.bico}><Icon name={it.icon} size={18} /></span>{it.label}<Icon name="Lock01" size={16} /></span>
                  <span className={cx(s.palDesc, 'muted small')}>{it.desc}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
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
    <div className={s.shareBox}>
      <h2 style={{ marginBottom: 'var(--baseui-Space-M)' }}>Поделиться тестом</h2>
      <Switch checked={test.published} onChange={toggle}><b>Опубликован</b></Switch>
      <p className="muted" style={{ margin: 'var(--baseui-Space-S) 0' }}>
        {test.published
          ? 'Любой, у кого есть ссылка, может пройти тест. Регистрация не нужна.'
          : 'Тест в черновике: по ссылке респонденты увидят, что он закрыт. Вы можете открыть его в режиме предпросмотра.'}
      </p>
      <div className="row" style={{ margin: 'var(--baseui-Space-S) 0 var(--baseui-Space-M)', alignItems: 'flex-start' }}>
        <div className="grow"><TextField value={url} readOnly aria-label="Ссылка" className={s.noMargin} onFocus={(e) => e.target.select()} /></div>
        <Button variant="primary" size="md" onClick={async () => {
          try { await navigator.clipboard.writeText(url); toast('Ссылка скопирована'); } catch { toast('Скопируйте ссылку вручную'); }
        }}><Icon name="Link01" size={18} />Копировать</Button>
      </div>
      <a className={buttonClass({ size: 'sm' })} href={`/t/${test.share_token}?preview=1`} target="_blank" rel="noreferrer">
        <Icon name="Eye" size={18} />Предпросмотр (ответы не сохраняются)
      </a>
    </div>
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
          <Button onClick={load}><Icon name="RefreshCw01" size={18} />Обновить</Button>
          <Button onClick={exportCsv} disabled={!responses.length}><Icon name="Download01" size={18} />CSV</Button>
        </div>
      </div>
      <div className={s.stats}>
        <div className={s.stat}><b>{responses.length}</b>начали</div>
        <div className={s.stat}><b>{done.length}</b>завершили</div>
        <div className={s.stat}><b>{responses.length ? `${Math.round((done.length / responses.length) * 100)}%` : '—'}</b>доходимость</div>
        <div className={s.stat}><b>{median ? fmtDuration(median) : '—'}</b>медианное время</div>
      </div>

      {blocks.map((b, i) => {
        const def = defOf(b.type);
        const vals = responses.map((r) => r.answers[b.id]).filter((v) => v !== undefined && v !== null);
        return (
          <section className={s.resBlock} key={b.id}>
            <div className="row" style={{ marginBottom: 'var(--baseui-Space-S)' }}>
              <span className={s.bico}><Icon name={def.icon} size={18} /></span>
              <div className="grow"><h3>{i + 1}. {b.title}</h3><span className="muted small">{def.label} · ответов: {vals.length}</span></div>
            </div>
            <def.Results block={b} values={vals} />
          </section>
        );
      })}

      <section className={s.resBlock}>
        <h3 style={{ marginBottom: 'var(--baseui-Space-S)' }}>Все прохождения</h3>
        {responses.length ? (
          <div style={{ overflowX: 'auto' }}>
            <table className={s.table}>
              <thead><tr>{['#', 'Начато', 'Статус', 'Время', ''].map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
              <tbody>
                {responses.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td><td>{fmtDate(r.started_at)}</td>
                    <td>{r.completed ? 'Завершено' : 'Не завершено'}</td>
                    <td>{r.finished_at ? fmtDuration(r.finished_at - r.started_at) : '—'}</td>
                    <td><IconButton aria-label="Удалить прохождение" onClick={async () => {
                      if (await confirm('Удалить это прохождение?')) { await api.deleteResponse(test.id, r.id); load(); }
                    }}><Icon name="Trash01" size={18} /></IconButton></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="muted">Пока никто не проходил тест</p>}
      </section>
    </div>
  );
}
