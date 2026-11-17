import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { whatsappLink, GREETING } from '../data/site.js';

// Back-to-top button (all screens) and an always-there WhatsApp button
// (desktop; phones have the Call tab in the bottom bar).
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 900);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <div className="fab-stack">
      <button
        type="button"
        className={`fab fab-top ${showTop ? 'is-visible' : ''}`}
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <Icon name="arrowUp" size={22} />
      </button>
      <a className="fab fab-wa" href={whatsappLink(GREETING)} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
        <Icon name="whatsapp" size={28} />
      </a>
    </div>
  );
}
