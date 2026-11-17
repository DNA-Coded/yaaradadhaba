import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { OpenBadge } from './ui.jsx';
import { site, whatsappLink, GREETING } from '../data/site.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-badge">
            <img src="/img/logo.png" alt="Yaara Da Dhaba" width="120" height="114" loading="lazy" />
          </span>
          <p>Rolls, chow, biryani and dosa, cooked fresh every day for the people of Agarpara.</p>
          <OpenBadge className="on-dark" />
        </div>

        <div>
          <h2 className="footer-title">Explore</h2>
          <ul className="footer-links">
            <li><Link to="/menu">Menu and prices</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact#faq">Questions and answers</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Visit</h2>
          <address className="footer-address">
            {site.addressLines.map((l) => <span key={l}>{l}</span>)}
          </address>
          <p className="footer-hours">{site.hoursLabel}</p>
          <a className="footer-inline-link" href={site.directionsLink} target="_blank" rel="noopener noreferrer">
            <Icon name="directions" size={16} /> Get directions
          </a>
        </div>

        <div>
          <h2 className="footer-title">Order</h2>
          <ul className="footer-links">
            <li><a href={`tel:${site.phonePrimary}`}><Icon name="phone" size={16} /> {site.phonePrimaryLabel}</a></li>
            <li><a href={`tel:${site.phoneSecondary}`}><Icon name="phone" size={16} /> {site.phoneSecondaryLabel}</a></li>
            <li><a href={whatsappLink(GREETING)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} /> WhatsApp us</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} Yaara Da Dhaba. All rights reserved.</p>
        <ul className="footer-legal">
          <li><Link to="/privacy-policy">Privacy</Link></li>
          <li><Link to="/terms-conditions">Terms</Link></li>
          <li><Link to="/refund-cancellation">Refunds</Link></li>
          <li><Link to="/shipping-policy">Delivery</Link></li>
        </ul>
        <p className="footer-credit">Website by DNA Coded</p>
      </div>
    </footer>
  );
}
