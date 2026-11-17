import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { VegMark, formatPrice } from './ui.jsx';
import { AddButton } from '../cart/Cart.jsx';
import { allItems, favourites } from '../data/menu.js';

const pages = [
  { to: '/menu', title: 'Menu and prices', words: 'menu prices dishes food order list' },
  { to: '/contact', title: 'Contact and location', words: 'contact address phone call map directions location hours timing whatsapp' },
  { to: '/contact#faq', title: 'Questions and answers', words: 'faq questions delivery cancel veg vegetarian seating hours help' },
  { to: '/gallery', title: 'Photo gallery', words: 'gallery photos pictures kitchen images shop' },
  { to: '/reviews', title: 'Customer reviews', words: 'reviews rating google feedback customers' },
  { to: '/about', title: 'About the dhaba', words: 'about story who we are' },
  { to: '/shipping-policy', title: 'Delivery policy', words: 'delivery shipping fee time riders' },
  { to: '/refund-cancellation', title: 'Refund and cancellation', words: 'refund cancel cancellation money back' },
  { to: '/privacy-policy', title: 'Privacy policy', words: 'privacy data cookies' },
  { to: '/terms-conditions', title: 'Terms and conditions', words: 'terms conditions rules' },
];

// Search across dishes and pages. Opens from the header or with "/".
export default function SearchDialog({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    setQ('');
    const prev = document.activeElement;
    document.body.classList.add('no-scroll');
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('button, input, a[href]');
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
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const query = q.trim().toLowerCase();
  const dishMatches = query
    ? allItems.filter((i) => i.name.toLowerCase().includes(query) || i.category.toLowerCase().includes(query))
    : favourites;
  const dishes = dishMatches.slice(0, 8);
  const pageHits = query ? pages.filter((p) => `${p.title} ${p.words}`.toLowerCase().includes(query)) : pages.slice(0, 4);
  const go = (to) => {
    onClose();
    navigate(to);
  };

  // Portal to <body>: the header can carry a transform, which would trap a
  // position:fixed dialog inside it.
  return createPortal(
    <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search" ref={dialogRef} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-panel">
        <div className="search-bar">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dishes or pages"
            aria-label="Search dishes or pages"
            enterKeyHint="search"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query) go(`/menu?q=${encodeURIComponent(q.trim())}`);
            }}
          />
          <button type="button" className="search-close" onClick={onClose}>Close</button>
        </div>

        <div className="search-results">
          {dishes.length > 0 && (
            <section>
              <h2 className="search-heading">{query ? 'Dishes' : 'Popular dishes'}</h2>
              <ul>
                {dishes.map((d) => (
                  <li key={d.id} className="search-dish">
                    <VegMark veg={d.v} />
                    <button type="button" className="search-dish-name" onClick={() => go(`/menu#${d.categoryId}`)}>
                      <span>{d.name}</span>
                      <small>{d.category}</small>
                    </button>
                    <span className="price">{formatPrice(d.price)}</span>
                    <AddButton item={d} compact />
                  </li>
                ))}
              </ul>
              {query && dishMatches.length > dishes.length && (
                <button type="button" className="text-link search-more" onClick={() => go(`/menu?q=${encodeURIComponent(q.trim())}`)}>
                  See all {dishMatches.length} dishes on the menu
                </button>
              )}
            </section>
          )}
          {pageHits.length > 0 && (
            <section>
              <h2 className="search-heading">Pages</h2>
              <ul>
                {pageHits.map((p) => (
                  <li key={p.to}>
                    <button type="button" className="search-page" onClick={() => go(p.to)}>{p.title}</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {query && dishes.length === 0 && pageHits.length === 0 && (
            <div className="search-empty">
              <p>No dishes or pages match “{q.trim()}”.</p>
              <p>Try a shorter word like “roll”, “chow” or “delivery”.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
