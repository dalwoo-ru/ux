import { Dialog } from '@base-ui/react/dialog';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Button, IconButton } from './Button';
import { Icon } from './Icon';
import { TextField } from './Field';
import s from './Feedback.module.css';

/** Модальное окно (Dialog) в стилистике baseui Modal. */
export function Modal({ open, onClose, title, children, wide, footer }:
  { open: boolean; onClose: () => void; title?: string; children: ReactNode; wide?: boolean; footer?: ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className={s.backdrop} />
        <Dialog.Viewport className={s.viewport}>
          <Dialog.Popup className={wide ? s.popupWide : s.popup}>
            <div className={s.header}>
              {title ? <Dialog.Title className={s.title}>{title}</Dialog.Title> : <span />}
              <IconButton aria-label="Закрыть" onClick={onClose}><Icon name="XClose" /></IconButton>
            </div>
            <div className={s.body}>{children}</div>
            {footer && <div className={s.footer}>{footer}</div>}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
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

function PromptBody({ ask, onDone }: { ask: Extract<Ask, { kind: 'prompt' }>; onDone: () => void }) {
  const [v, setV] = useState(ask.initial);
  const finish = (val: string | null) => { ask.resolve(val); onDone(); };
  return (
    <form onSubmit={(e) => { e.preventDefault(); finish(v.trim() || null); }}>
      <TextField value={v} onChange={setV} autoFocus />
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <Button type="button" onClick={() => finish(null)}>Отмена</Button>
        <Button type="submit" variant="primary">Готово</Button>
      </div>
    </form>
  );
}

/** Провайдер тостов и промис-диалогов (prompt / confirm). */
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

  const dismiss = () => {
    if (ask?.kind === 'prompt') ask.resolve(null);
    if (ask?.kind === 'confirm') ask.resolve(false);
    setAsk(null);
  };
  const confirmAsk = ask?.kind === 'confirm' ? ask : null;

  return (
    <Ctx.Provider value={api}>
      {children}
      <Modal open={!!ask} onClose={dismiss} title={ask?.kind === 'prompt' ? ask.title : undefined}
        footer={confirmAsk && (
          <>
            <Button onClick={dismiss}>Отмена</Button>
            <Button variant="primary" onClick={() => { confirmAsk.resolve(true); setAsk(null); }}>{confirmAsk.ok}</Button>
          </>
        )}>
        {ask?.kind === 'prompt' && <PromptBody key={ask.title + ask.initial} ask={ask} onDone={() => setAsk(null)} />}
        {confirmAsk && <p>{confirmAsk.text}</p>}
      </Modal>
      {msg && <div className={s.toast} role="status">{msg}</div>}
    </Ctx.Provider>
  );
}
