import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

/* ---------- Toasts: short success / error messages ---------- */

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const show = useCallback((message, { type = 'success', action, duration } = {}) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, type, action });
    timer.current = setTimeout(() => setToast(null), duration || (action ? 5000 : 2600));
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-region" aria-live={toast?.type === 'error' ? 'assertive' : 'polite'} role="status">
        {toast && (
          <div key={toast.id} className={`toast is-${toast.type}`}>
            <Icon name={toast.type === 'error' ? 'alert' : 'check'} size={18} />
            <span className="toast-msg">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="toast-action"
                onClick={() => {
                  toast.action.onClick();
                  setToast(null);
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

/* ---------- Confirmation dialog for destructive actions ---------- */

export function ConfirmDialog({ open, title, body, confirmLabel, cancelLabel = 'Keep it', onConfirm, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    ref.current?.querySelector('.confirm-cancel')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCancel();
      } else if (e.key === 'Tab') {
        const b = ref.current.querySelectorAll('button');
        if (e.shiftKey && document.activeElement === b[0]) {
          e.preventDefault();
          b[b.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === b[b.length - 1]) {
          e.preventDefault();
          b[0].focus();
        }
        e.stopPropagation();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      prev?.focus?.();
    };
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="confirm-scrim" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="confirm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-body" ref={ref}>
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-body">{body}</p>
        <div className="confirm-actions">
          <button type="button" className="btn btn-outline confirm-cancel" onClick={onCancel}>{cancelLabel}</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Copy to clipboard with a toast ---------- */

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

// The Clipboard API can stay pending on some browsers (for example when the
// page isn't focused), so give it a second, then fall back to the older method.
export function useCopy() {
  const toast = useToast();
  return useCallback(
    async (text, label) => {
      let ok = false;
      if (navigator.clipboard?.writeText) {
        ok = await Promise.race([
          navigator.clipboard.writeText(text).then(() => true, () => false),
          new Promise((r) => setTimeout(() => r(false), 1000)),
        ]);
      }
      if (!ok) ok = legacyCopy(text);
      if (ok) toast(`${label} copied`);
      else toast(`Couldn't copy the ${label.toLowerCase()}. Press and hold the text to copy it instead.`, { type: 'error' });
    },
    [toast]
  );
}
