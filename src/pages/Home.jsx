import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';

// Best sellers data with actual Kolkata prices, diet tags, and popularity badges
const bestSellers = [
  {
    name: "Chicken Biryani",
    image: "/images/yaara_da_dhaba/chicken_biryani.png",
    price: 110,
    isVeg: false,
    isPopular: true
  },
  {
    name: "Chicken Chow",
    image: "/images/yaara_da_dhaba/chicken_chowmein.png",
    price: 90,
    isVeg: false,
    isPopular: true
  },
  {
    name: "Chicken Fried Rice",
    image: "/images/yaara_da_dhaba/chicken_fried_rice.png",
    price: 110,
    isVeg: false,
    isPopular: true
  },
  {
    name: "Masala Dosa",
    image: "/images/yaara_da_dhaba/masala_dosa.png",
    price: 70,
    isVeg: true,
    isPopular: false
  },
  {
    name: "Chicken Roll",
    image: "/images/yaara_da_dhaba/chicken_roll.png",
    price: 70,
    isVeg: false,
    isPopular: false
  },
  {
    name: "Chicken Kasa",
    image: "/images/yaara_da_dhaba/chicken_kasa.png",
    price: 160,
    isVeg: false,
    isPopular: false
  }
];

// Helper to render Golden Star rating
function StarRating() {
  return (
    <div className="dhaba-review-stars" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="dhaba-star-icon-svg" style={{ width: '20px', height: '20px', fill: '#D4A017' }}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: "Yaara Da Dhaba | Fresh Food & Affordable Dining",
    description: "Welcome to Yaara Da Dhaba in Agarpara, Kolkata. We serve delicious, fresh, and affordable Chinese, Biryani, Dosa, Momo, and Rolls. Dine-in or order online!"
  });

  return (
    <>
      {/* SECTION 2 — HERO */}
      <section className="dhaba-hero">
        <div className="container">
          {/* Hero Left: Text & CTAs */}
          <div className="dhaba-hero-left">
            <span className="dhaba-hero-subtitle">YAARA DA DHABA</span>
            <h1 className="dhaba-hero-title">
              Fresh Food.<br />
              Great Taste.<br />
              <span>Affordable Prices.</span>
            </h1>
            <p className="dhaba-hero-tagline">
              Serving Chinese, Biryani, Momo, Rolls, South Indian and more.
            </p>
            
            <div className="dhaba-hero-buttons">
              <Link to="/menu" className="dhaba-btn-primary" aria-label="View Menu">
                View Menu
              </Link>
              <a href="tel:+919903005932" className="dhaba-btn-secondary" aria-label="Call to Order">
                Call Now
              </a>
            </div>

            <div className="dhaba-hero-features">
              <span className="dhaba-hero-feature-item">
                <span className="dhaba-hero-feature-check">✓</span> Freshly Prepared
              </span>
              <span className="dhaba-hero-feature-item">
                <span className="dhaba-hero-feature-check">✓</span> Affordable Pricing
              </span>
              <span className="dhaba-hero-feature-item">
                <span className="dhaba-hero-feature-check">✓</span> Fast Service
              </span>
            </div>
          </div>

          {/* Hero Right: Collage */}
          <div className="dhaba-hero-right">
            <div className="dhaba-hero-collage">
              <div className="dhaba-collage-img-wrapper">
                <img 
                  src="/images/yaara_da_dhaba/chicken_biryani.png" 
                  alt="Chicken Biryani" 
                  className="dhaba-collage-img" 
                  loading="eager"
                />
              </div>
              <div className="dhaba-collage-img-wrapper">
                <img 
                  src="/images/yaara_da_dhaba/chicken_chowmein.png" 
                  alt="Chicken Chowmein" 
                  className="dhaba-collage-img" 
                  loading="eager"
                />
              </div>
              <div className="dhaba-collage-img-wrapper">
                <img 
                  src="/images/yaara_da_dhaba/chicken_fried_rice.png" 
                  alt="Chicken Fried Rice" 
                  className="dhaba-collage-img" 
                  loading="eager"
                />
              </div>
              <div className="dhaba-collage-img-wrapper">
                <img 
                  src="/images/yaara_da_dhaba/masala_dosa.png" 
                  alt="Masala Dosa" 
                  className="dhaba-collage-img" 
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — POPULAR CATEGORIES */}
      <section className="dhaba-section-alt">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">Explore Our Menu</h2>
            <p className="dhaba-section-subtitle">Something for every craving.</p>
          </div>

          <div className="dhaba-category-grid">
            {/* 1. Chinese */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/chicken_chowmein.png" alt="Chinese Food Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.97 3.64 9.1 8.44 9.87.1.02.2.03.31.03.11 0 .22-.01.32-.03C15.89 21.2 19.5 17.07 19.5 12h1.5c.55 0 1-.45 1-1s-.45-1-1-1h-1.55c-.24-2.88-1.78-5.38-4-6.93V2c0-.55-.45-1-1-1s-1 .45-1 1v.09C12.44 2.03 12.22 2 12 2zm-7 10h14c0 3.86-3.14 7-7 7s-7-3.14-7-7z" />
                </svg>
                Chinese
              </div>
            </div>

            {/* 2. Biryani */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/chicken_biryani.png" alt="Biryani Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M22 13c0-3.31-2.69-6-6-6H8c-3.31 0-6 2.69-6 6 0 1.95 1.05 3.63 2.61 4.58C4.24 18.91 4 20.43 4 22c0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-1.57-.24-3.09-.61-4.42C20.95 16.63 22 14.95 22 13zM6 21c.21-1.39.75-2.68 1.54-3.76C8.84 17.5 10.34 17 12 17s3.16.5 4.46.24c.79 1.08 1.33 2.37 1.54 3.76H6zm14-8c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4s1.79-4 4-4h8c2.21 0 4 1.79 4 4z" />
                </svg>
                Biryani
              </div>
            </div>

            {/* 3. Momo */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/steamed_momo.png" alt="Momo Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-9c.83 0 1.5-.67 1.5-1.5S8.83 6 8 6s-1.5.67-1.5 1.5S7.17 11 8 11zm8 0c.83 0 1.5-.67 1.5-1.5S16.83 6 16 6s-1.5.67-1.5 1.5S15.17 11 16 11zm-8 4h8c0-2.21-1.79-4-4-4s-4 1.79-4 4z" />
                </svg>
                Momo
              </div>
            </div>

            {/* 4. South Indian */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/masala_dosa.png" alt="South Indian Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" />
                </svg>
                South Indian
              </div>
            </div>

            {/* 5. Rolls */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/chicken_roll.png" alt="Rolls Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M17 2H7c-1.65 0-3 1.35-3 3v14c0 1.65 1.35 3 3 3h10c1.65 0 3-1.35 3-3V5c0-1.65-1.35-3-3-3zm-1 18H8V4h8v16zM10 6h4v2h-4zm0 4h4v2h-4z" />
                </svg>
                Rolls
              </div>
            </div>

            {/* 6. Meals */}
            <div className="dhaba-category-card">
              <div className="dhaba-category-img-wrapper">
                <img src="/images/yaara_da_dhaba/indian_thali_meals.png" alt="Meals Category" className="dhaba-category-img" loading="lazy" />
              </div>
              <div className="dhaba-category-name">
                <svg viewBox="0 0 24 24" className="dhaba-category-icon-svg" aria-hidden="true">
                  <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-6-9c.83 0 1.5-.67 1.5-1.5S6.83 10 6 10s-1.5.67-1.5 1.5S5.17 13 6 13zm12 0c.83 0 1.5-.67 1.5-1.5S18.83 10 18 10s-1.5.67-1.5 1.5S17.17 13 18 13zm-6-4c.83 0 1.5-.67 1.5-1.5S12.83 6 12 6s-1.5.67-1.5 1.5S11.17 9 12 9zm0 8c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
                </svg>
                Meals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BEST SELLERS */}
      <section className="dhaba-section">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">Customer Favorites</h2>
            <p className="dhaba-section-subtitle">Our best-selling dishes, prepared fresh just for you.</p>
          </div>

          <div className="dhaba-bestseller-grid">
            {bestSellers.map((item, idx) => (
              <div className="dhaba-food-card" key={idx}>
                {/* Badges Container */}
                <div className="dhaba-card-badges">
                  {/* Veg/Non-Veg Indicator */}
                  <div className="dhaba-badge-diet" title={item.isVeg ? "Veg" : "Non-Veg"}>
                    <div className={`dhaba-diet-box ${item.isVeg ? 'veg' : 'nonveg'}`}>
                      <div className="dhaba-diet-dot" />
                    </div>
                  </div>
                  
                  {/* Popular / Best Seller Badge */}
                  {item.isPopular && (
                    <div className="dhaba-badge-popular">
                      ⭐ Best Seller
                    </div>
                  )}
                </div>

                <div className="dhaba-food-img-wrapper">
                  <img src={item.image} alt={item.name} className="dhaba-food-img" loading="lazy" />
                </div>
                
                <div className="dhaba-food-content">
                  <h3 className="dhaba-food-title">{item.name}</h3>
                  <div className="dhaba-food-footer">
                    <span className="dhaba-food-price">₹{item.price}</span>
                    <div className="dhaba-food-actions">
                      <a href="/onlineorder/index.html" className="dhaba-food-btn-order" aria-label={`Order ${item.name} online`}>
                        Order
                      </a>
                      <a 
                        href={`https://wa.me/919903005932?text=Hello%20Yaara%20Da%20Dhaba,%20I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}`}
                        className="dhaba-btn-sm-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order ${item.name} on WhatsApp`}
                      >
                        <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: '#ffffff' }}>
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.817 9.817 0 0 0 12.04 2zm0 1.66c2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.84c0 4.54-3.7 8.24-8.24 8.24-1.54 0-3.05-.43-4.36-1.24l-.31-.18-3.24.85.87-3.15-.2-.32A8.179 8.179 0 0 1 3.73 11.9c0-4.53 3.7-8.24 8.24-8.24h.07zm-2.02 3.16c-.22 0-.46.06-.65.26-.2.2-.77.75-.77 1.83s.78 2.13.9 2.29c.11.16 1.54 2.35 3.74 3.3.52.22.93.36 1.25.46.52.17 1 .14 1.37.09.42-.06 1.28-.52 1.46-1.03.18-.52.18-.96.12-1.06-.06-.1-.22-.16-.46-.28-.24-.12-1.46-.72-1.68-.8-.22-.08-.37-.12-.53.12-.16.24-.61.76-.75.92-.14.16-.27.18-.51.06a6.49 6.49 0 0 1-1.91-1.18 7.214 7.214 0 0 1-1.32-1.64c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.48-.38-.41-.53-.42-.14 0-.3-.01-.46-.01z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY PEOPLE CHOOSE US */}
      <section className="dhaba-section-alt">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">Why Choose Us</h2>
            <p className="dhaba-section-subtitle">We serve quality food with local love.</p>
          </div>

          <div className="dhaba-choose-grid">
            {/* Card 1: Fresh Ingredients */}
            <div className="dhaba-choose-card">
              <div className="dhaba-choose-icon-wrapper">
                <svg viewBox="0 0 24 24" className="dhaba-choose-icon-svg" aria-hidden="true">
                  <path d="M12 3C6.5 3 2 6.5 2 12c0 3.58 2.5 6.58 6 7.5v2.5h8v-2.5c3.5-.92 6-3.92 6-7.5 0-5.5-4.5-9-10-9zm1 13.5h-2v-2h2v2zm0-3.5h-2V7h2v6z" />
                </svg>
              </div>
              <h3 className="dhaba-choose-title">Fresh Ingredients</h3>
              <p className="dhaba-choose-desc">Made fresh daily with quality, locally-sourced ingredients.</p>
            </div>

            {/* Card 2: Affordable Pricing */}
            <div className="dhaba-choose-card">
              <div className="dhaba-choose-icon-wrapper">
                <svg viewBox="0 0 24 24" className="dhaba-choose-icon-svg" aria-hidden="true">
                  <path d="M5 3h6l10 10-8 8L3 11V5c0-1.1.9-2 2-2zm2.5 4c-.83 0-1.5.67-1.5 1.5S6.67 10 7.5 10s1.5-.67 1.5-1.5S8.33 7 7.5 7z" />
                </svg>
              </div>
              <h3 className="dhaba-choose-title">Affordable Pricing</h3>
              <p className="dhaba-choose-desc">Delicious and generous portions at budget-friendly prices.</p>
            </div>

            {/* Card 3: Quick Service */}
            <div className="dhaba-choose-card">
              <div className="dhaba-choose-icon-wrapper">
                <svg viewBox="0 0 24 24" className="dhaba-choose-icon-svg" aria-hidden="true">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12.5-3.5H17V9h2.5l2 2.5H18.5v3.5zm-3 3.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
              <h3 className="dhaba-choose-title">Quick Service</h3>
              <p className="dhaba-choose-desc">Piping hot food prepared quickly and served with love.</p>
            </div>

            {/* Card 4: Wide Variety */}
            <div className="dhaba-choose-card">
              <div className="dhaba-choose-icon-wrapper">
                <svg viewBox="0 0 24 24" className="dhaba-choose-icon-svg" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm3 13H9v-1h6v1zm0-2H9v-1h6v1zm1.25-3H7.75c-.41 0-.75-.34-.75-.75S7.34 8.5 7.75 8.5h8.5c.41 0 .75.34 1.75.75s-.34.75-.75.75z" />
                </svg>
              </div>
              <h3 className="dhaba-choose-title">Wide Variety</h3>
              <p className="dhaba-choose-desc">From rolls to South Indian and Chinese platters, we satisfy every hunger craving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CUSTOMER REVIEWS */}
      <section className="dhaba-section">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">What Our Customers Say</h2>
            <p className="dhaba-section-subtitle">Honest reviews from our regular foodies.</p>
          </div>

          <div className="dhaba-reviews-grid">
            {/* Review 1 */}
            <div className="dhaba-review-card">
              <StarRating />
              <p className="dhaba-review-text">
                "Amazing food and taste! Chicken Biryani is aromatic and full of flavour, and the Chicken Roll is highly recommended. Fast service and pocket-friendly."
              </p>
              <h4 className="dhaba-review-author">— Kunal Rao</h4>
            </div>

            {/* Review 2 */}
            <div className="dhaba-review-card">
              <StarRating />
              <p className="dhaba-review-text">
                "Absolutely loved the Masala Dosa and Chicken Chowmein. Portions are generous, ingredients are fresh, and the staff is very welcoming. A regular spot for us!"
              </p>
              <h4 className="dhaba-review-author">— Naman Jain</h4>
            </div>

            {/* Review 3 */}
            <div className="dhaba-review-card">
              <StarRating />
              <p className="dhaba-review-text">
                "Best local dhaba in Agarpara! The rolls are super delicious and very filling. The pricing is unbeatable for the high quality of food served here."
              </p>
              <h4 className="dhaba-review-author">— Kamal Chauhan</h4>
            </div>
          </div>

          <div className="dhaba-center-btn-wrap" style={{ marginTop: '40px' }}>
            <Link to="/reviews" className="dhaba-btn-primary" aria-label="View All Reviews">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PHOTO GALLERY PREVIEW */}
      <section className="dhaba-section-alt">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">Our Food Gallery</h2>
            <p className="dhaba-section-subtitle">Take a visual tour of our culinary creations.</p>
          </div>

          <div className="dhaba-gallery-grid">
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/chicken_biryani.png" alt="Biryani dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/masala_dosa.png" alt="Dosa dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/chicken_chowmein.png" alt="Chowmein dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/chicken_roll.png" alt="Rolls dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/steamed_momo.png" alt="Momo dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
            <div className="dhaba-gallery-item-wrapper">
              <img src="/images/yaara_da_dhaba/chicken_fried_rice.png" alt="Fried Rice dish" className="dhaba-gallery-preview-img" loading="lazy" />
            </div>
          </div>

          <div className="dhaba-center-btn-wrap">
            <Link to="/gallery" className="dhaba-btn-primary" aria-label="View Full Gallery">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — LOCATION & CONTACT */}
      <section className="dhaba-section">
        <div className="container">
          <div className="dhaba-section-title-wrap">
            <h2 className="dhaba-section-title">Find & Contact Us</h2>
            <p className="dhaba-section-subtitle">Drop by or give us a ring for hot food delivery.</p>
          </div>

          <div className="dhaba-contact-split">
            {/* Contact details */}
            <div className="dhaba-contact-info">
              <div>
                <div className="dhaba-info-section">
                  <h3 className="dhaba-info-title">
                    <svg viewBox="0 0 24 24" className="dhaba-info-icon-svg" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Address
                  </h3>
                  <p className="dhaba-info-content">
                    81, Nilgunj Road, Panjavila, Jagarata Pally, Deshpriya Nagar, Agarpara, Kolkata, West Bengal 700109
                  </p>
                </div>

                <div className="dhaba-info-section">
                  <h3 className="dhaba-info-title">
                    <svg viewBox="0 0 24 24" className="dhaba-info-icon-svg" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    Phone Numbers
                  </h3>
                  <p className="dhaba-info-content">
                    Mobile: <a href="tel:+919903005932" aria-label="Call +91 9903005932">+91 9903005932</a><br />
                    Secondary: <a href="tel:+919875521685" aria-label="Call +91 9875521685">+91 9875521685</a>
                  </p>
                </div>

                <div className="dhaba-info-section">
                  <h3 className="dhaba-info-title">
                    <svg viewBox="0 0 24 24" className="dhaba-info-icon-svg" aria-hidden="true">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    Opening Hours
                  </h3>
                  <p className="dhaba-info-content">
                    Monday - Sunday: 10:00 AM - 10:00 PM
                  </p>
                </div>
              </div>

              <div className="dhaba-contact-buttons">
                <a href="tel:+919903005932" className="dhaba-btn-primary" aria-label="Call Yaara Da Dhaba now">
                  📞 Call Now
                </a>
                <a 
                  href="https://wa.me/919903005932?text=Hello%20Yaara%20Da%20Dhaba,%20I%20would%20like%20to%20order%20some%20food!" 
                  className="dhaba-btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order via WhatsApp"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Google Map Iframe Container */}
            <div className="dhaba-map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.355106192837!2d88.37583767523912!3d22.691456179427613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d4600000001%3A0x6b84089e5746b198!2sYaara%20Da%20Dhaba!5e0!3m2!1sen!2sin!4v1719744578923!5m2!1sen!2sin" 
                className="dhaba-map-iframe"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Yaara da Dhaba Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="dhaba-final-cta">
        <div className="dhaba-final-cta-container">
          <h2>Hungry?</h2>
          <p>Order Your Favourite Food Today.</p>
          <div className="dhaba-final-cta-buttons">
            <Link to="/menu" className="dhaba-btn-primary" aria-label="View Full Menu">
              View Menu
            </Link>
            <a href="tel:+919903005932" className="dhaba-btn-secondary" aria-label="Call Now to order">
              Call Now
            </a>
            <a 
              href="https://wa.me/919903005932?text=Hello%20Yaara%20Da%20Dhaba,%20I%20would%20like%20to%20order%20some%20food!" 
              className="dhaba-btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order via WhatsApp"
              style={{ padding: '14px 28px', borderRadius: '8px', fontSize: '16px', fontWeight: '800' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
