import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="dhaba-navbar">
      <div className="container">
        {/* Left Side: Logo */}
        <Link to="/" className="dhaba-logo-link">
          <img src="/images/logo.png" alt="Yaara da Dhaba" className="dhaba-logo-img" />
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <button 
          className="dhaba-hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Right Side: Navigation & CTA */}
        <nav className={`dhaba-nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`dhaba-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`dhaba-nav-link ${location.pathname === '/menu' ? 'active' : ''}`}
          >
            Menu
          </Link>
          <Link 
            to="/gallery" 
            className={`dhaba-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          >
            Gallery
          </Link>
          <Link 
            to="/reviews" 
            className={`dhaba-nav-link ${location.pathname === '/reviews' ? 'active' : ''}`}
          >
            Reviews
          </Link>
          <Link 
            to="/about" 
            className={`dhaba-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`dhaba-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
          
          {/* Mobile CTA inside menu list */}
          <li className="dhaba-navbar-cta">
            <a href="/onlineorder/index.html" className="dhaba-btn-primary">
              Order Now
            </a>
          </li>
        </nav>
      </div>
    </header>
  );
}
