import React from 'react';
import useSEO from '../hooks/useSEO.js';

const reviewsData = [
  {
    name: "Kunal Rao",
    rating: 5,
    text: "Amazing food and taste! Chicken Biryani is aromatic and full of flavour, and the Chicken Roll is highly recommended. Fast service and pocket-friendly."
  },
  {
    name: "Naman Jain",
    rating: 4,
    text: "Absolutely loved the Masala Dosa and Chicken Chowmein. Portions are generous, ingredients are fresh, and the staff is very welcoming. A regular spot for us!"
  },
  {
    name: "Kamal Chauhan",
    rating: 5,
    text: "Best local dhaba in Agarpara! The rolls are super delicious and very filling. The pricing is unbeatable for the high quality of food served here."
  },
  {
    name: "Sudipto Sen",
    rating: 5,
    text: "The Chinese food here is excellent. Veg chowmein and chicken fried rice are very tasty. Service is extremely quick. Highly recommended!"
  },
  {
    name: "Priya Das",
    rating: 4,
    text: "If you are looking for tasty and affordable food in Agarpara, this is the place. Aloo Biryani is just ₹70 and tastes very good."
  },
  {
    name: "Rahul Banerjee",
    rating: 5,
    text: "Masala Dosa is very crisp and the sambar is super tasty. Clean place and good service. Pocket-friendly prices."
  }
];

const ratingFeatures = [
  { text: "Affordable Pricing", icon: "₹" },
  { text: "Fresh Food", icon: "✓" },
  { text: "Fast Service", icon: "⚡" },
  { text: "Family Friendly", icon: "👪" }
];

const reviewThemes = [
  "Fresh Food",
  "Affordable Prices",
  "Good Quality",
  "Quick Service",
  "Family Friendly",
  "Great Taste"
];

export default function Reviews() {
  useSEO({
    title: "Yaara Da Dhaba Reviews | Customer Testimonials & Feedback",
    description: "Read real testimonials and reviews from customers who have dined at Yaara Da Dhaba in Agarpara, Kolkata. See why we've earned a 4.3 Google rating."
  });

  return (
    <>
      {/* PAGE HERO */}
      <section className="dhaba-reviews-hero">
        <div className="dhaba-reviews-hero-container">
          <h1 className="dhaba-reviews-hero-title">What Our Customers Say</h1>
          <p className="dhaba-reviews-hero-subtitle">
            Real experiences from customers who have enjoyed food at Yaara Da Dhaba.
          </p>
        </div>
      </section>

      {/* RATING SUMMARY SECTION */}
      <section className="dhaba-rating-summary-sec">
        <div className="dhaba-rating-summary-grid">
          <div className="dhaba-rating-score-box">
            <div className="dhaba-rating-num">4.3</div>
            <div className="dhaba-rating-stars-wrap">
              {"★".repeat(4)}
              <span style={{ opacity: 0.3 }}>★</span>
            </div>
            <p className="dhaba-rating-count">80+ Reviews on Google</p>
          </div>
          
          <div className="dhaba-rating-features-grid">
            {ratingFeatures.map((feat, idx) => (
              <div className="dhaba-rating-feature-item" key={idx}>
                <div className="dhaba-rating-feature-icon">{feat.icon}</div>
                <div className="dhaba-rating-feature-text">{feat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW THEMES BADGES */}
      <div className="dhaba-review-themes-sec">
        {reviewThemes.map((theme, idx) => (
          <span className="dhaba-theme-badge" key={idx}>
            #{theme}
          </span>
        ))}
      </div>

      {/* FEATURED REVIEWS GRID */}
      <section className="dhaba-reviews-layout">
        <div className="dhaba-reviews-grid-container">
          <div className="dhaba-reviews-grid-list">
            {reviewsData.map((rev, idx) => (
              <div className="dhaba-review-page-card" key={idx}>
                <div>
                  <div className="dhaba-review-card-stars">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>
                  <p className="dhaba-review-card-text">"{rev.text}"</p>
                </div>
                <h4 className="dhaba-review-card-author">— {rev.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS CTA */}
      <section className="dhaba-google-reviews-cta">
        <div className="dhaba-google-reviews-container">
          <h3>Read More Reviews On Google</h3>
          <p>
            We are proud of our service and quality. Check out our real customer feedback 
            and dining reviews directly on our Google Maps profile.
          </p>
          <a 
            href="https://www.google.com/maps/place/Yaara+Da+Dhaba/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="dhaba-btn-primary"
            style={{ display: 'inline-block', fontSize: '16px', padding: '12px 30px' }}
          >
            View Google Reviews
          </a>
        </div>
      </section>
    </>
  );
}
