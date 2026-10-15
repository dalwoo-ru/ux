import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Button } from './Button';
import { TextField } from './Field';
import { Modal as BaseuiModal } from './baseui.generated';

/** Modal baseui: title/subtitle, primaryAction/secondaryAction — готовые кнопки. */
export function Modal({ open, onClose, title, subtitle, children, primary, secondary }:
  { open: boolean; onClose: () => void; title?: string; subtitle?: string; children?: ReactNode; primary?: ReactNode; secondary?: ReactNode }) {
  return (
    <BaseuiModal open={open} onOpenChange={(o) => { if (!o) onClose(); }} title={title} subtitle={subtitle} header={title ? 'close' : 'close'}
      primaryAction={primary} secondaryAction={secondary}>
      {children}
    </BaseuiModal>
  );
}

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
    <Modal open onClose={() => done(null)} title={ask.title}
      primary={<Button onClick={() => done(v.trim() || null)}>Готово</Button>}
      secondary={<Button variant="secondary" onClick={() => done(null)}>Отмена</Button>}>
      <form onSubmit={(e) => { e.preventDefault(); done(v.trim() || null); }}>
        <TextField label="Название" value={v} onChange={setV} autoFocus />
      </form>
    </Modal>
  );
}

/** Провайдер тостов и промис-диалогов (prompt / confirm) на baseui Modal. */
export function UiProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [ask, setAsk] = useState<Ask | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 2400);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const api = useMemo<UiApi>(() => ({
    toast,
    prompt: (title, initial = '') => new Promise((resolve) => setAsk({ kind: 'prompt', title, initial, resolve })),
    confirm: (text, ok = 'Удалить') => new Promise((resolve) => setAsk({ kind: 'confirm', text, ok, resolve })),
  }), [toast]);

  const finish = (v: string | boolean | null) => {
    if (ask) (ask.resolve as (x: string | boolean | null) => void)(v);
    setAsk(null);
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      {ask?.kind === 'prompt' && <PromptModal key={ask.title + ask.initial} ask={ask} done={finish} />}
      {ask?.kind === 'confirm' && (
        <Modal open onClose={() => finish(false)} title={ask.text}
          primary={<Button onClick={() => finish(true)}>{ask.ok}</Button>}
          secondary={<Button variant="secondary" onClick={() => finish(false)}>Отмена</Button>} />
      )}
      {msg && <div role="status" style={toastStyle}>{msg}</div>}
    </Ctx.Provider>
  );
}

// В baseui нет компонента Toast — собран из токенов.
const toastStyle: React.CSSProperties = {
  position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2000,
  background: 'var(--baseui-Extensions-Background-InversePrimary)', color: 'var(--baseui-Text-and-Icon-OnColor)',
  padding: '12px 20px', borderRadius: 'var(--baseui-Radius-S)', boxShadow: 'var(--baseui-Shadow-M)', font: 'var(--baseui-Typography-Text-14-Semi-Bold)',
};
