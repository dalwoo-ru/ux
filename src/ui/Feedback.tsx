import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { AlertDialog, Modal, ToastProvider, useToast } from './baseui';
import { Button } from './Button';
import { TextField } from './Field';

type Ask =
  | { kind: 'prompt'; title: string; initial: string; resolve: (v: string | null) => void }
  | { kind: 'confirm'; text: string; ok: string; resolve: (v: boolean) => void };

interface UiApi {
  toast: (msg: string) => void;
  prompt: (title: string, initial?: string) => Promise<string | null>;
  confirm: (text: string, okLabel?: string) => Promise<boolean>;
}
const Ctx = createContext<UiApi | null>(null);
export const useUi = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('UiProvider отсутствует');
  return c;
};

function PromptModal({ ask, done }: { ask: Extract<Ask, { kind: 'prompt' }>; done: (v: string | null) => void }) {
  const [v, setV] = useState(ask.initial);
  return (
    <Modal open onOpenChange={(o) => { if (!o) done(null); }} title={ask.title}
      primaryAction={<Button variant="primary" onClick={() => done(v.trim() || null)}>Готово</Button>}
      secondaryAction={<Button onClick={() => done(null)}>Отмена</Button>}>
      <form onSubmit={(e) => { e.preventDefault(); done(v.trim() || null); }}>
        <TextField label="Название" value={v} onChange={setV} autoFocus />
      </form>
    </Modal>
  );
}

function Dialogs({ children }: { children: ReactNode }) {
  const { toast: showToast } = useToast();
  const [ask, setAsk] = useState<Ask | null>(null);

  const api = useMemo<UiApi>(() => ({
    toast: (message) => { showToast({ message }); },
    prompt: (title, initial = '') => new Promise((resolve) => setAsk({ kind: 'prompt', title, initial, resolve })),
    confirm: (text, ok = 'Удалить') => new Promise((resolve) => setAsk({ kind: 'confirm', text, ok, resolve })),
  }), [showToast]);

  const finish = (v: string | boolean | null) => {
    if (ask) (ask.resolve as (x: string | boolean | null) => void)(v);
    setAsk(null);
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      {ask?.kind === 'prompt' && <PromptModal key={ask.title + ask.initial} ask={ask} done={finish} />}
      {ask?.kind === 'confirm' && (
        <AlertDialog open onOpenChange={(o) => { if (!o) finish(false); }} title={ask.text} confirmLabel={ask.ok} cancelLabel="Отмена"
          destructive={ask.ok === 'Удалить'} onConfirm={() => finish(true)} />
      )}
    </Ctx.Provider>
  );
}

/** Провайдер уведомлений (Toast baseui) и промис-диалогов: prompt — Modal, confirm — AlertDialog. */
export function UiProvider({ children }: { children: ReactNode }) {
  return <ToastProvider placement="bottom-center"><Dialogs>{children}</Dialogs></ToastProvider>;
}
