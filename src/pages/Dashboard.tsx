import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { waitForSaves } from '../lib/save';
import { fmtDate } from '../lib/util';
import { Button, IconButton } from '../ui/Button';
import { useUi } from '../ui/Feedback';
import { Icon } from '../ui/Icon';
import { Badge, Card, EmptyState, List, ListItem, Modal, Select, Skeleton } from '../ui/baseui';
import type { Folder, TestSummary } from '../types';
import { Topbar } from './Layout';
import s from './pages.module.css';

const NO_FOLDER = '0';

export function Dashboard() {
  const { folderId: folderParam } = useParams();
  const folderId = folderParam ? Number(folderParam) : null;
  const nav = useNavigate();
  const { prompt, confirm, toast } = useUi();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tests, setTests] = useState<TestSummary[] | null>(null);
  const [moving, setMoving] = useState<TestSummary | null>(null);
  const [target, setTarget] = useState(NO_FOLDER);
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
  const openMove = (t: TestSummary) => { setTarget(String(t.folder_id ?? NO_FOLDER)); setMoving(t); };

  if (error) return <div className={s.page}><Topbar /><p className="error" style={{ padding: 24 }}>{error}</p></div>;

  return (
    <div className={s.page}>
      <Topbar />
      <div className={s.layout}>
        <aside className={s.sidebar}>
          <List>
            <ListItem icon={<Icon name="Folder" size={24} />} details={tests?.length ?? ''} active={folderId === null} onClick={() => nav('/')}>Все тесты</ListItem>
          </List>
          <List title="Папки">
            {folders.map((f) => (
              <ListItem key={f.id} icon={<Icon name="Folder" size={24} />} active={f.id === folderId} onClick={() => nav(`/folder/${f.id}`)}
                details={countIn(f.id)}
                control={(
                  <span className="row" style={{ gap: 0 }}>
                    <IconButton label="Переименовать папку" variant="ghost" size="xsm" icon={<Icon name="Edit01" size={18} />} onClick={async () => {
                      const name = await prompt('Новое название', f.name);
                      if (name) { await api.renameFolder(f.id, name); await load(); }
                    }} />
                    <IconButton label="Удалить папку" variant="ghost" size="xsm" icon={<Icon name="Trash01" size={18} />} onClick={async () => {
                      if (await confirm(`Удалить папку «${f.name}»? Тесты внутри останутся в разделе «Все тесты».`)) {
                        await api.deleteFolder(f.id);
                        if (folderId === f.id) nav('/'); else await load();
                      }
                    }} />
                  </span>
                )}>{f.name}</ListItem>
            ))}
          </List>
          <div className={s.sideAction}>
            <Button size="sm" width="100%" icon={<Icon name="FolderPlus" size={20} />} onClick={createFolder}>Новая папка</Button>
          </div>
        </aside>

        <main className={s.main}>
          <div className={s.pageHead}>
            <h2>{folder ? folder.name : 'Все тесты'}</h2>
            <Button variant="primary" size="sm" icon={<Icon name="Plus" size={20} />} onClick={createTest}>Создать тест</Button>
          </div>
          {tests === null ? <Skeleton variant="rect" height={72} /> : list.length ? (
            <Card padding={8}>
              <List>
                {list.map((t) => (
                  <ListItem key={t.id} icon={<Icon name="CheckSquare" size={24} />} onClick={() => nav(`/tests/${t.id}`)}
                    subtitle={`Прохождений: ${t.responses_count} · ${fmtDate(t.updated_at)}${folderId === null && t.folder_id ? ` · ${folders.find((f) => f.id === t.folder_id)?.name ?? ''}` : ''}`}
                    details={<Badge variant={t.published ? 'success' : 'neutral'} label={t.published ? 'Опубликован' : 'Черновик'} />}
                    control={(
                      <span className="row" style={{ gap: 0 }}>
                        <IconButton label="Переместить в папку" variant="ghost" size="xsm" icon={<Icon name="Folder" size={18} />} onClick={() => openMove(t)} />
                        <IconButton label="Сделать копию" variant="ghost" size="xsm" icon={<Icon name="Copy01" size={18} />} onClick={async () => { const r = await api.duplicateTest(t.id); toast('Копия создана'); nav(`/tests/${r.id}`); }} />
                        <IconButton label="Удалить тест" variant="ghost" size="xsm" icon={<Icon name="Trash01" size={18} />} onClick={async () => {
                          if (await confirm(`Удалить тест «${t.title}» вместе со всеми результатами?`)) { await api.deleteTest(t.id); await load(); }
                        }} />
                      </span>
                    )}>{t.title}</ListItem>
                ))}
              </List>
            </Card>
          ) : (
            <EmptyState icon={<Icon name="ClipboardCheck" size={40} />} title="Здесь пока нет тестов" description="Создайте тест, добавьте блоки и поделитесь ссылкой с респондентами"
              action={<Button variant="primary" onClick={createTest}>Создать первый тест</Button>} />
          )}
        </main>
      </div>

      {moving && (
        <Modal open onOpenChange={(o) => { if (!o) setMoving(null); }} title="Переместить в папку" subtitle={moving.title}
          primaryAction={<Button variant="primary" onClick={async () => {
            await api.updateTest(moving.id, { folder_id: target === NO_FOLDER ? null : Number(target) });
            setMoving(null); await load();
          }}>Переместить</Button>}
          secondaryAction={<Button onClick={() => setMoving(null)}>Отмена</Button>}>
          <Select label="Папка" value={target} onValueChange={(v) => setTarget(v ?? NO_FOLDER)}
            options={[{ value: NO_FOLDER, label: 'Без папки' }, ...folders.map((f) => ({ value: String(f.id), label: f.name }))]} />
        </Modal>
      )}
    </div>
  );
}
