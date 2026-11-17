import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import Icon from '../components/Icon.jsx';
import { VegMark, formatPrice } from '../components/ui.jsx';
import { site, whatsappLink } from '../data/site.js';
import { ConfirmDialog, useToast } from '../components/feedback.jsx';
import { attributionLabel } from '../utils/attribution.js';

// "Add" button that turns into a - qty + stepper once the dish is in the order.
// A tiny vibration confirms the tap on phones that support it.
const haptic = () => {
  try {
    navigator.vibrate?.(8);
  } catch {
    /* not supported */
  }
};

export function AddButton({ item, compact = false }) {
  const { lines, add: addItem, remove, setOpen } = useCart();
  const toast = useToast();
  const qty = lines[item.id] || 0;
  const add = (id) => {
    haptic();
    addItem(id);
    if (!qty) toast(`${item.name} added to your order`, { action: { label: 'View order', onClick: () => setOpen(true) } });
  };

  if (!qty) {
    return (
      <button type="button" className={`add-btn ${compact ? 'is-compact' : ''}`} onClick={() => add(item.id)} aria-label={`Add ${item.name} to order`}>
        <Icon name="plus" size={16} />
        Add
      </button>
    );
  }
  return (
    <div className={`stepper ${compact ? 'is-compact' : ''}`} role="group" aria-label={`${item.name} quantity`}>
      <button type="button" onClick={() => remove(item.id)} aria-label={`Remove one ${item.name}`}>
        <Icon name="minus" size={16} />
      </button>
      <span className="stepper-qty" aria-live="polite">{qty}</span>
      <button type="button" onClick={() => add(item.id)} aria-label={`Add one more ${item.name}`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

// Floating bar shown whenever the order has something in it.
export function CartBar() {
  const { count, total, setOpen, lastAdded, open } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!lastAdded) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [lastAdded]);

  return (
    <div className={`cart-bar ${count > 0 && !open ? 'is-visible' : ''}`} aria-hidden={count === 0 || open}>
      <button type="button" className={`cart-bar-btn ${bump ? 'is-bump' : ''}`} onClick={() => setOpen(true)} tabIndex={count > 0 && !open ? 0 : -1}>
        <span className="cart-bar-count">
          <Icon name="bag" size={18} />
          {count} {count === 1 ? 'item' : 'items'}
        </span>
        <span className="cart-bar-total">{formatPrice(total)}</span>
        <span className="cart-bar-cta">View order</span>
      </button>
    </div>
  );
}

function buildMessage(items, total, details) {
  const lines = items.map((i) => `${i.qty} x ${i.name} = ₹${i.qty * i.price}`);
  const out = [`Hello ${site.name}, I would like to order:`, '', ...lines, '', `Total: ₹${total}`];
  out.push(`Order type: ${details.mode === 'delivery' ? 'Delivery' : 'Pickup'}`);
  if (details.name.trim()) out.push(`Name: ${details.name.trim()}`);
  if (details.mode === 'delivery' && details.address.trim()) out.push(`Address: ${details.address.trim()}`);
  if (details.note.trim()) out.push(`Note: ${details.note.trim()}`);
  const via = attributionLabel();
  if (via) out.push(`Found you via: ${via}`);
  out.push('', 'Please confirm availability and time.');
  return out.join('\n');
}

export function CartDrawer() {
  const { items, lines, total, count, add, remove, setQty, clear, replace, open, setOpen } = useCart();
  const toast = useToast();
  const [details, setDetails] = useState({ name: '', mode: 'pickup', address: '', note: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const lastUrl = useRef('');
  const panelRef = useRef(null);
  const returnFocus = useRef(null);
  const drag = useRef(null);

  // Bottom sheet on phones: drag the handle down to close.
  const onDragStart = (e) => {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    drag.current = { y: e.touches[0].clientY, dy: 0 };
    panelRef.current.style.transition = 'none';
  };
  const onDragMove = (e) => {
    if (!drag.current) return;
    const dy = Math.max(0, e.touches[0].clientY - drag.current.y);
    drag.current.dy = dy;
    panelRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onDragEnd = () => {
    if (!drag.current) return;
    const { dy } = drag.current;
    drag.current = null;
    panelRef.current.style.transition = '';
    panelRef.current.style.transform = '';
    if (dy > 90) setOpen(false);
  };
  const location = useLocation();

  // Close the drawer when the route changes; reset the sent screen on close.
  useEffect(() => setOpen(false), [location.pathname, setOpen]);
  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    document.body.classList.add('no-scroll');
    const t = setTimeout(() => panelRef.current?.querySelector('button, input, textarea')?.focus(), 60);
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('button:not([disabled]), input, textarea, a[href]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, setOpen]);

  const send = () => {
    if (details.mode === 'delivery' && !details.address.trim()) {
      setError('Add a delivery address so we know where to bring your food.');
      panelRef.current?.querySelector('textarea')?.focus();
      return;
    }
    setError('');
    const url = whatsappLink(buildMessage(items, total, details));
    lastUrl.current = url;
    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
    } else {
      // Pop-up blocked: open WhatsApp in this tab instead. The order is saved.
      toast('Opening WhatsApp in this tab. Your order is saved if you come back.', { type: 'error' });
      window.location.href = url;
      return;
    }
    setSent(true);
  };

  const doClear = () => {
    const snapshot = { ...lines };
    clear();
    setConfirmClear(false);
    setOpen(false);
    toast('Order cleared', { action: { label: 'Undo', onClick: () => replace(snapshot) } });
  };

  const update = (key) => (e) => setDetails((d) => ({ ...d, [key]: e.target.value }));

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={panelRef} inert={open ? undefined : ''}>
        <header className="drawer-head" onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}>
          <h2 id="drawer-title">Your order</h2>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close order">
            <Icon name="close" />
          </button>
        </header>

        {sent ? (
          <div className="drawer-sent">
            <span className="sent-icon"><Icon name="check" size={34} /></span>
            <h3>Your order is ready in WhatsApp</h3>
            <p>Check the message and tap <strong>Send</strong> in WhatsApp to place it. We will reply to confirm the time.</p>
            <a className="btn btn-whatsapp btn-block" href={lastUrl.current} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> Open WhatsApp again
            </a>
            <button type="button" className="btn btn-outline btn-block" onClick={() => setSent(false)}>Edit order</button>
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                clear();
                setOpen(false);
                toast('Thanks for ordering! Your basket is empty again.');
              }}
            >
              Done, start a new order
            </button>
          </div>
        ) : count === 0 ? (
          <div className="drawer-empty">
            <p>Your order is empty. Add dishes from the menu and they will show up here.</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>Back to menu</button>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {items.map((i) => (
                <li key={i.id} className="drawer-line">
                  <VegMark veg={i.v} />
                  <div className="drawer-line-main">
                    <span className="drawer-line-name">{i.name}</span>
                    <span className="drawer-line-price">{formatPrice(i.price)} each</span>
                  </div>
                  <div className="stepper is-compact" role="group" aria-label={`${i.name} quantity`}>
                    <button type="button" onClick={() => remove(i.id)} aria-label={`Remove one ${i.name}`}><Icon name="minus" size={14} /></button>
                    <span className="stepper-qty">{i.qty}</span>
                    <button type="button" onClick={() => add(i.id)} aria-label={`Add one more ${i.name}`}><Icon name="plus" size={14} /></button>
                  </div>
                  <span className="drawer-line-total">{formatPrice(i.qty * i.price)}</span>
                  <button type="button" className="icon-btn is-quiet" onClick={() => setQty(i.id, 0)} aria-label={`Remove ${i.name} from order`}>
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="drawer-form">
              <fieldset className="segmented">
                <legend className="sr-only">Order type</legend>
                {['pickup', 'delivery'].map((m) => (
                  <label key={m} className={details.mode === m ? 'is-active' : ''}>
                    <input type="radio" name="mode" value={m} checked={details.mode === m} onChange={update('mode')} />
                    {m === 'pickup' ? 'Pickup' : 'Delivery'}
                  </label>
                ))}
              </fieldset>
              <label className="field">
                <span>Your name <em>(optional)</em></span>
                <input type="text" value={details.name} onChange={update('name')} autoComplete="name" maxLength={60} />
              </label>
              {details.mode === 'delivery' && (
                <label className="field">
                  <span>Delivery address</span>
                  <textarea rows={2} value={details.address} onChange={update('address')} autoComplete="street-address" maxLength={240} />
                </label>
              )}
              <label className="field">
                <span>Anything we should know? <em>(optional)</em></span>
                <input type="text" value={details.note} onChange={update('note')} placeholder="Less spicy, extra onion…" maxLength={140} />
              </label>
              {error && <p className="field-error" role="alert">{error}</p>}
            </div>

            <footer className="drawer-foot">
              <div className="drawer-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button type="button" className="btn btn-whatsapp btn-block" onClick={send}>
                <Icon name="whatsapp" />
                Send order on WhatsApp
              </button>
              <p className="drawer-hint">
                Opens WhatsApp with your order filled in. Prefer to call? <a href={`tel:${site.phonePrimary}`}>{site.phonePrimaryLabel}</a>
              </p>
              <button type="button" className="link-btn" onClick={() => setConfirmClear(true)}>Clear order</button>
            </footer>
          </>
        )}
        <ConfirmDialog
          open={confirmClear}
          title="Clear your order?"
          body={`This removes all ${count} ${count === 1 ? 'item' : 'items'} from your order.`}
          confirmLabel="Clear order"
          onConfirm={doClear}
          onCancel={() => setConfirmClear(false)}
        />
      </aside>
    </div>
  );
}
