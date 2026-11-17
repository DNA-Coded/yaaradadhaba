import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { itemById } from '../data/menu.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'ydd-cart-v1';

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    // Drop anything that is no longer on the menu.
    return Object.fromEntries(Object.entries(saved).filter(([id, qty]) => itemById[id] && qty > 0));
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart); // { [itemId]: qty }
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [lines]);

  const setQty = useCallback((id, qty) => {
    setLines((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 50);
      return next;
    });
  }, []);

  const add = useCallback((id) => {
    setLines((prev) => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, 50) }));
    setLastAdded(Date.now());
  }, []);

  const remove = useCallback((id) => {
    setLines((prev) => {
      const next = { ...prev };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }, []);

  const clear = useCallback(() => setLines({}), []);
  const replace = useCallback((next) => setLines(next), []);

  const value = useMemo(() => {
    const items = Object.entries(lines).map(([id, qty]) => ({ ...itemById[id], qty }));
    const count = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { lines, items, count, total, add, remove, setQty, clear, replace, open, setOpen, lastAdded };
  }, [lines, add, remove, setQty, clear, replace, open, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
