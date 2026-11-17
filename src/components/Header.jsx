import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { OpenBadge } from './ui.jsx';
import { useCart } from '../cart/CartContext.jsx';
import { site, whatsappLink, GREETING } from '../data/site.js';
import SearchDialog from './SearchDialog.jsx';
import useTheme from '../hooks/useTheme.js';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

// Fixed header. Row 1: logo + name and actions. Page links sit inline on wide
// screens and become a swipeable row of tabs underneath on phones and tablets.
export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const { count, setOpen: openCart } = useCart();
  const location = useLocation();
  const tabsRef = useRef(null);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => setMoreOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the current page's tab in view on small screens.
  useEffect(() => {
    const bar = tabsRef.current;
    const active = bar?.querySelector('.is-active');
    if (bar && active && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: active.offsetLeft - bar.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // "/" opens search (desktop keyboards), unless the visitor is typing.
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      const typing = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!moreOpen) return undefined;
    document.body.classList.add('no-scroll-mobile');
    const onKey = (e) => e.key === 'Escape' && setMoreOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll-mobile');
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${moreOpen ? 'is-menu-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Yaara Da Dhaba, home">
          <picture>
            <source srcSet="/img/logo.webp" type="image/webp" />
            <img src="/img/logo.png" alt="" width="360" height="343" className="brand-logo" />
          </picture>
          <span className="brand-text">
            <span className="brand-name">
              <span className="bn-1">Yaara</span> <span className="bn-2">Da</span> <span className="bn-3">Dhaba</span>
            </span>
            <span className="brand-place">Agarpara, Kolkata</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul ref={tabsRef}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href={`tel:${site.phonePrimary}`} className="header-phone">
            <Icon name="phone" size={18} /> {site.phonePrimaryLabel}
          </a>
          <button type="button" className="icon-btn header-icon" onClick={() => setSearchOpen(true)} aria-label="Search dishes and pages" title="Search ( / )">
            <Icon name="search" />
          </button>
          <button
            type="button"
            className="icon-btn header-icon header-theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          {count > 0 && (
            <button type="button" className="header-cart" onClick={() => openCart(true)} aria-label={`View order, ${count} items`}>
              <Icon name="bag" />
              <span className="header-cart-count">{count}</span>
            </button>
          )}
          <Link to="/menu" className="btn btn-primary btn-sm header-cta">Order now</Link>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMoreOpen((o) => !o)}
            aria-expanded={moreOpen}
            aria-controls="more-panel"
            aria-label={moreOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="menu-toggle-bars" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>

      <div id="more-panel" className="more-panel" inert={moreOpen ? undefined : ''}>
        <div className="container more-inner">
          <ul className="more-links">
            {links.map((l, i) => (
              <li key={l.to} style={{ '--i': i }}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => `more-link ${isActive ? 'is-active' : ''}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="more-extra">
            <OpenBadge />
            <p>{site.hoursLabel}</p>
            <p className="more-address">{site.addressFull}</p>
            <div className="more-actions">
              <a href={`tel:${site.phonePrimary}`} className="btn btn-primary">
                <Icon name="phone" /> Call
              </a>
              <a href={whatsappLink(GREETING)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp
              </a>
            </div>
            <button type="button" className="theme-row" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
              {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
          </div>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
