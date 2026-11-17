import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { formatPrice } from './ui.jsx';
import { useCart } from '../cart/CartContext.jsx';
import { site } from '../data/site.js';

// Thumb-reach tab bar shown on phones and tablets.
export default function BottomNav() {
  const { count, total, setOpen, lastAdded } = useCart();
  const navigate = useNavigate();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!lastAdded) return undefined;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [lastAdded]);

  // Hide the tab bar while the on-screen keyboard is open. The visual viewport
  // shrinks when the keyboard shows; focus alone is unreliable (Android keeps
  // focus in a field after the keyboard is dismissed).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const onResize = () => document.documentElement.toggleAttribute('data-keyboard', window.innerHeight - vv.height > 150);
    vv.addEventListener('resize', onResize);
    return () => {
      vv.removeEventListener('resize', onResize);
      document.documentElement.removeAttribute('data-keyboard');
    };
  }, []);

  const item = ({ isActive }) => `bnav-item ${isActive ? 'is-active' : ''}`;

  return (
    <nav className="bottom-nav" aria-label="Quick actions">
      <NavLink to="/" end className={item}>
        <Icon name="home" size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/menu" className={item}>
        <Icon name="dish" size={24} />
        <span>Menu</span>
      </NavLink>
      <button
        type="button"
        className={`bnav-item bnav-order ${bump ? 'is-bump' : ''}`}
        onClick={() => (count ? setOpen(true) : navigate('/menu'))}
        aria-label={count ? `View order, ${count} ${count === 1 ? 'item' : 'items'}, ${formatPrice(total)}` : 'Start an order'}
      >
        <span className="bnav-order-icon">
          <Icon name="bag" size={24} />
          {count > 0 && <span className="bnav-badge">{count}</span>}
        </span>
        <span className="bnav-label">{count ? formatPrice(total) : 'Order'}</span>
      </button>
      <a href={`tel:${site.phonePrimary}`} className="bnav-item">
        <Icon name="phone" size={24} />
        <span>Call</span>
      </a>
      <NavLink to="/contact" className={item}>
        <Icon name="pin" size={24} />
        <span>Find us</span>
      </NavLink>
    </nav>
  );
}
