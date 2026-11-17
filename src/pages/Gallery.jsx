import { useCallback, useEffect, useRef, useState } from 'react';
import useSEO from '../hooks/useSEO.js';
import Icon from '../components/Icon.jsx';
import { PageHero } from '../components/ui.jsx';
import { gallery, galleryFilters, galleryImg } from '../data/gallery.js';

function Lightbox({ items, index, onClose, onIndex, returnFocusTo }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const item = items[index];

  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    const returnTo = returnFocusTo?.current || document.activeElement;
    document.body.classList.add('no-scroll');
    dialogRef.current?.querySelector('.lightbox-close')?.focus();
    return () => {
      document.body.classList.remove('no-scroll');
      returnTo?.focus?.();
    };
  }, [returnFocusTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Tab') {
        const f = dialogRef.current.querySelectorAll('button');
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
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  // Preload neighbours so arrows feel instant.
  useEffect(() => {
    [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach((it) => {
      const img = new Image();
      img.src = galleryImg(it.file, 1400);
    });
  }, [index, items]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox-close icon-btn" onClick={onClose} aria-label="Close photo">
        <Icon name="close" size={24} />
      </button>
      <button type="button" className="lightbox-nav is-prev icon-btn" onClick={prev} aria-label="Previous photo">
        <Icon name="chevronLeft" size={30} />
      </button>
      <figure className="lightbox-figure" key={item.file}>
        <img src={galleryImg(item.file, 1400)} alt={item.title} width={item.w} height={item.h} />
        <figcaption>
          <span>{item.title}</span>
          <span className="lightbox-count">{index + 1} of {items.length}</span>
        </figcaption>
      </figure>
      <button type="button" className="lightbox-nav is-next icon-btn" onClick={next} aria-label="Next photo">
        <Icon name="chevronRight" size={30} />
      </button>
    </div>
  );
}

export default function Gallery() {
  useSEO({
    title: 'Photo Gallery | Yaara Da Dhaba, Agarpara',
    description: 'Real photos from Yaara Da Dhaba: the kitchen, the big tawa, fresh pakora, chowmein and our seating on Nilgunj Road, Agarpara.',
  });

  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const trigger = useRef(null);
  const items = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <PageHero
        title="Gallery"
        intro="No stock photos here. The kitchen, the counter and the food, as it looks on a normal day at the dhaba."
        image={galleryImg('evening-counter', 1400)}
      />

      <div className="container gallery-body">
        <div className="filter-row" role="group" aria-label="Filter photos">
          {galleryFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              className={`chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="chip-count">{f === 'All' ? gallery.length : gallery.filter((g) => g.category === f).length}</span>
            </button>
          ))}
        </div>

        <ul className="masonry" key={filter}>
          {items.map((item, i) => (
            <li key={item.file} className="masonry-item" style={{ '--i': i }}>
              <button type="button" className="photo-btn" onClick={(e) => { trigger.current = e.currentTarget; setOpen(i); }} aria-label={`Open photo: ${item.title}`}>
                <img
                  src={galleryImg(item.file, 640)}
                  alt={item.title}
                  width={item.w}
                  height={item.h}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="photo-caption">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && items[open] && (
        <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} returnFocusTo={trigger} />
      )}
    </>
  );
}
