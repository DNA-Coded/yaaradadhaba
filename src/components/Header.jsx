import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { OpenBadge } from './ui.jsx';
import { useCart } from '../cart/CartContext.jsx';
import { site, whatsappLink, GREETING } from '../data/site.js';
import SearchDialog from './SearchDialog.jsx';
import useTheme from '../hooks/useTheme.js';

// "Home" is left out on purpose: the logo already links home, and phones have
// a Home tab in the bottom bar.
const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const MOBILE = '(max-width: 900px)';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const { count, setOpen: openCart } = useCart();
  const closeSearch = useCallback(() => setSearchOpen(false), []);

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
    setOpen(false);
    setHidden(false);
  }, [location.pathname]);

  // On phones the header slides away while scrolling down and returns on the
  // way up, so the screen is used for food rather than chrome.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        if (window.matchMedia(MOBILE).matches) {
          if (y > 160 && y > lastY + 6) setHidden(true);
          else if (y < lastY - 6 || y <= 160) setHidden(false);
        } else {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-header-hidden', hidden && !open);
  }, [hidden, open]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('no-scroll-mobile');
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll-mobile');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Yaara Da Dhaba home">
          <picture>
            <source srcSet="/img/logo.webp" type="image/webp" />
            <img src="/img/logo.png" alt="Yaara Da Dhaba" width="360" height="343" className="brand-logo" />
          </picture>
        </Link>

        <nav id="site-nav" className="site-nav" aria-label="Main">
          <ul>
            {links.map((l, i) => (
              <li key={l.to} style={{ '--i': i }}>
                <NavLink to={l.to} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-extra">
            <button type="button" className="theme-row" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
              {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
            <OpenBadge />
            <p>{site.hoursLabel}</p>
            <div className="nav-extra-actions">
              <a href={`tel:${site.phonePrimary}`} className="btn btn-primary">
                <Icon name="phone" /> Call
              </a>
              <a href={whatsappLink(GREETING)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        </nav>

        <div className="header-actions">
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
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="menu-toggle-bars" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
