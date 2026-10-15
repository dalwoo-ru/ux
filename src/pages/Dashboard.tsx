import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { waitForSaves } from '../lib/save';
import { fmtDate } from '../lib/util';
import { cx } from '../ui/cx';
import { Button, IconButton } from '../ui/Button';
import { useUi, Modal } from '../ui/Feedback';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Tag';
import type { Folder, TestSummary } from '../types';
import { Topbar } from './Layout';
import s from './pages.module.css';

export function Dashboard() {
  const { folderId: folderParam } = useParams();
  const folderId = folderParam ? Number(folderParam) : null;
  const nav = useNavigate();
  const { prompt, confirm, toast } = useUi();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tests, setTests] = useState<TestSummary[] | null>(null);
  const [moving, setMoving] = useState<TestSummary | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      await waitForSaves();
      const [f, t] = await Promise.all([api.folders(), api.tests()]);
      setFolders(f.folders); setTests(t.tests);
    } catch (e) { setError((e as Error).message); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const folder = folders.find((f) => f.id === folderId);
  useEffect(() => { if (tests && folderId !== null && !folder) nav('/', { replace: true }); }, [tests, folderId, folder, nav]);

  const list = (tests ?? []).filter((t) => folderId === null || t.folder_id === folderId);
  const countIn = (id: number) => (tests ?? []).filter((t) => t.folder_id === id).length;

  const createTest = async () => {
    const title = await prompt('Название теста', 'Новый тест');
    if (!title) return;
    const { id } = await api.createTest({ title, folder_id: folderId });
    nav(`/tests/${id}`);
  };
  const createFolder = async () => {
    const name = await prompt('Название папки');
    if (name) { await api.createFolder(name); await load(); }
  };

  if (error) return <div className={s.page}><Topbar /><p className="error" style={{ padding: 24 }}>{error}</p></div>;

  return (
    <div className={s.page}>
      <Topbar />
      <div className={s.layout}>
        <aside className={s.sidebar}>
          <Link to="/" className={cx(s.nav, folderId === null && s.navActive)}>
            <Icon name="Folder" size={20} /><span>Все тесты</span><span className={s.count}>{tests?.length ?? ''}</span>
          </Link>
          <h4 className={s.sideHead}>Папки <IconButton aria-label="Новая папка" onClick={createFolder}><Icon name="FolderPlus" size={18} /></IconButton></h4>
          {folders.map((f) => (
            <div key={f.id} className={cx(s.nav, f.id === folderId && s.navActive)}>
              <Link to={`/folder/${f.id}`} className={s.navLink}><Icon name="Folder" size={20} /><span>{f.name}</span></Link>
              <span className={s.count}>{countIn(f.id)}</span>
              <span className={s.acts}>
                <IconButton aria-label="Переименовать" onClick={async () => {
                  const name = await prompt('Новое название', f.name);
                  if (name) { await api.renameFolder(f.id, name); await load(); }
                }}><Icon name="Edit01" size={16} /></IconButton>
                <IconButton aria-label="Удалить папку" onClick={async () => {
                  if (await confirm(`Удалить папку «${f.name}»? Тесты внутри останутся в разделе «Все тесты».`)) {
                    await api.deleteFolder(f.id);
                    if (folderId === f.id) nav('/'); else await load();
                  }
                }}><Icon name="Trash01" size={16} /></IconButton>
              </span>
            </div>
          ))}
          {!folders.length && <p className="muted small" style={{ padding: '0 var(--baseui-Space-S)' }}>Папок пока нет</p>}
        </aside>

        <main className={s.main}>
          <div className={s.pageHead}>
            <h2>{folder ? folder.name : 'Все тесты'}</h2>
            <Button variant="primary" onClick={createTest}><Icon name="Plus" size={18} />Создать тест</Button>
          </div>
          {tests === null ? null : list.length ? (
            <div className={s.grid}>
              {list.map((t) => (
                <div key={t.id} className={s.card} role="link" tabIndex={0} onClick={() => nav(`/tests/${t.id}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && e.target === e.currentTarget) nav(`/tests/${t.id}`); }}>
                  <div className="row"><h3 className="grow">{t.title}</h3><Tag tone={t.published ? 'success' : 'secondary'}>{t.published ? 'Опубликован' : 'Черновик'}</Tag></div>
                  <div className={cx(s.meta, 'muted small')}>
                    <span>Прохождений: {t.responses_count}</span><span>·</span><span>{fmtDate(t.updated_at)}</span>
                    {folderId === null && t.folder_id && <span>· {folders.find((f) => f.id === t.folder_id)?.name}</span>}
                  </div>
                  <div className="row" onClick={(e) => e.stopPropagation()}>
                    <Button size="xs" onClick={() => setMoving(t)}>В папку</Button>
                    <Button size="xs" onClick={async () => { const r = await api.duplicateTest(t.id); toast('Копия создана'); nav(`/tests/${r.id}`); }}>Копия</Button>
                    <Button size="xs" danger onClick={async () => {
                      if (await confirm(`Удалить тест «${t.title}» вместе со всеми результатами?`)) { await api.deleteTest(t.id); await load(); }
                    }}>Удалить</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={s.empty}><p>Здесь пока нет тестов</p><Button variant="primary" onClick={createTest}>Создать первый тест</Button></div>
          )}
        </main>
      </div>

      <Modal open={!!moving} onClose={() => setMoving(null)} title="Переместить в папку">
        {[{ id: null as number | null, name: 'Без папки' }, ...folders].map((f) => (
          <button key={f.id ?? 'none'} type="button" className={cx(s.nav, f.id === moving?.folder_id && s.navActive)} style={{ width: '100%', border: 0, background: 'none' }}
            onClick={async () => { if (moving) { await api.updateTest(moving.id, { folder_id: f.id }); setMoving(null); await load(); } }}>
            <Icon name="Folder" size={20} />{f.name}
          </button>
        ))}
      </Modal>
    </div>
  );
}
