import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dhaba-footer">
      <div className="container">
        <div className="dhaba-footer-grid">
          {/* Column 1: Logo & Tagline */}
          <div className="dhaba-footer-col">
            <div className="dhaba-footer-logo-text">YAARA DA DHABA</div>
            <p className="dhaba-footer-logo-desc">
              Serving delicious, fresh, and affordable Chinese, Biryani, Dosa, Momo, and more since years. Made fresh daily for everyone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="dhaba-footer-col">
            <h4>Quick Links</h4>
            <ul className="dhaba-footer-links">
              <li><Link to="/" className="dhaba-footer-link">Home</Link></li>
              <li><Link to="/menu" className="dhaba-footer-link">Menu</Link></li>
              <li><Link to="/gallery" className="dhaba-footer-link">Gallery</Link></li>
              <li><Link to="/reviews" className="dhaba-footer-link">Reviews</Link></li>
              <li><Link to="/about" className="dhaba-footer-link">About Us</Link></li>
              <li><Link to="/contact" className="dhaba-footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Policy Links */}
          <div className="dhaba-footer-col">
            <h4>Our Policies</h4>
            <ul className="dhaba-footer-links">
              <li><Link to="/privacy-policy" className="dhaba-footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="dhaba-footer-link">Terms & Conditions</Link></li>
              <li><Link to="/refund-cancellation" className="dhaba-footer-link">Refund & Cancellation</Link></li>
              <li><Link to="/shipping-policy" className="dhaba-footer-link">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="dhaba-footer-col">
            <h4>Contact Details</h4>
            <p className="dhaba-footer-info" style={{ wordBreak: 'break-word' }}>
              Address: 81, Nilgunj Road, Panjavila, Jagarata Pally, Deshpriya Nagar, Agarpara, Kolkata, West Bengal 700109
            </p>
            <p className="dhaba-footer-info">
              Phone: <a href="tel:+919903005932">+91 9903005932</a><br />
              Secondary: <a href="tel:+919875521685">+91 9875521685</a>
            </p>
            <p className="dhaba-footer-info" style={{ marginTop: '15px' }}>
              <strong>Opening Hours:</strong><br />
              Mon - Sun: 10:00 AM - 10:00 PM
            </p>
          </div>
        </div>

        {/* Footer Bottom: Copyright */}
        <div className="dhaba-footer-bottom">
          <p className="dhaba-footer-copyright">
            Copyright © {currentYear} <strong>YAARA DA DHABA</strong>. All Rights Reserved. Designed & Developed by{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">DNA Coded</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
