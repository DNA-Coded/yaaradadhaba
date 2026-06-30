import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';

// Exactly the 25 original images inside the img directory (excluding logo)
const galleryItems = [
  // FOOD CATEGORY (16 items)
  { src: "/images/yaara_da_dhaba/unnamed.webp", title: "Signature Dish", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed.jpg", title: "Traditional Food", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (1).webp", title: "Deluxe Meal Platter", category: "Food", isSpecial: true },
  { src: "/images/yaara_da_dhaba/unnamed (1).jpg", title: "Dhaba Snack", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (2).webp", title: "Special Fried Rice", category: "Food", isSpecial: true },
  { src: "/images/yaara_da_dhaba/unnamed (2).jpg", title: "Spicy Gravy Special", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (3).webp", title: "Chicken Gravy Bowl", category: "Food", isSpecial: true },
  { src: "/images/yaara_da_dhaba/unnamed (3).jpg", title: "Spiced Curry", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (4).webp", title: "Dhaba Rolls", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (4).jpg", title: "Pan-Fried Snack", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (5).webp", title: "Speciality Dosa", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (5).jpg", title: "Roasted Food", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (6).webp", title: "Mouth-Watering Biryani", category: "Food", isSpecial: true },
  { src: "/images/yaara_da_dhaba/unnamed (9).webp", title: "Crisp Paratha Roll", category: "Food", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (13).webp", title: "Flaky Lachha Paratha", category: "Food", isSpecial: true },
  { src: "/images/yaara_da_dhaba/unnamed (14).webp", title: "Paneer Dish", category: "Food", isSpecial: false },

  // KITCHEN CATEGORY (4 items)
  { src: "/images/yaara_da_dhaba/unnamed (7).webp", title: "Tandoor Preparation", category: "Kitchen", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (11).webp", title: "Food Prep Station", category: "Kitchen", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (12).webp", title: "Dhaba Kitchen Cooking", category: "Kitchen", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (15).webp", title: "Chef Handcrafted Roll", category: "Kitchen", isSpecial: false },

  // RESTAURANT CATEGORY (5 items)
  { src: "/images/yaara_da_dhaba/unnamed (8).webp", title: "Dhaba Counter Area", category: "Restaurant", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (10).webp", title: "Dine-in Ambience", category: "Restaurant", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (16).webp", title: "Customer Dining Area", category: "Restaurant", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (17).webp", title: "Interior Seating", category: "Restaurant", isSpecial: false },
  { src: "/images/yaara_da_dhaba/unnamed (18).webp", title: "Serving Counter Area", category: "Restaurant", isSpecial: false }
];

// Reusable individual Card component to handle skeletons and lazy-loading cleanly per item
function GalleryCard({ item, index, onCardClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="dhaba-gallery-card"
      onClick={() => onCardClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(index);
        }
      }}
    >
      <div className="dhaba-gallery-img-container">
        {!isLoaded && <div className="dhaba-gallery-skeleton" />}
        <img 
          src={item.src} 
          alt={item.title} 
          className="dhaba-gallery-img"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
        <div className="dhaba-gallery-overlay">
          <button className="dhaba-gallery-overlay-btn" tabIndex={-1}>View Photo</button>
          <div className="dhaba-gallery-overlay-title">{item.title}</div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  useSEO({
    title: "Yaara Da Dhaba Gallery | Authentic Food & Dining Showcase",
    description: "Explore the photo gallery of Yaara Da Dhaba. Authentic customer dining areas, food preparation, and premium food photography."
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Swipe gesture detection states for mobile devices
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Filter list of items dynamically
  const getFilteredItems = () => {
    if (activeFilter === "All") return galleryItems;
    if (activeFilter === "Specials") return galleryItems.filter(item => item.isSpecial);
    return galleryItems.filter(item => item.category === activeFilter);
  };

  const filteredItems = getFilteredItems();

  // Navigation handlers
  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % filteredItems.length);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  // Keyboard navigation listener (Left, Right, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, filteredItems]);

  // Touch Swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Prevent scroll when lightbox is active
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIdx]);

  return (
    <>
      {/* SECTION 1 — GALLERY HERO */}
      <section className="dhaba-gallery-hero">
        <div className="dhaba-gallery-hero-container">
          <h1 className="dhaba-gallery-hero-title">Our Gallery</h1>
          <p className="dhaba-gallery-hero-subtitle">
            Explore our delicious food, kitchen moments, and dining experience.
          </p>
        </div>
      </section>

      {/* SECTION 2 — CATEGORY FILTERS */}
      <div className="dhaba-gallery-filter-wrap">
        <div className="container">
          {["All", "Food", "Kitchen", "Restaurant", "Specials"].map((filter) => (
            <button
              key={filter}
              className={`dhaba-gallery-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIdx(null); // Reset lightbox on filter change
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3 — PHOTO GRID */}
      <div className="dhaba-gallery-layout">
        <div className="dhaba-gallery-grid-container">
          <div className="dhaba-gallery-photo-grid">
            {filteredItems.map((item, index) => (
              <GalleryCard 
                key={index} 
                item={item} 
                index={index} 
                onCardClick={setSelectedIdx} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — LIGHTBOX VIEWER */}
      {selectedIdx !== null && filteredItems[selectedIdx] && (
        <div 
          className="dhaba-lightbox-overlay" 
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button 
            className="dhaba-lightbox-close" 
            onClick={closeLightbox}
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {/* Left Navigation Arrow */}
          <button 
            className="dhaba-lightbox-btn prev" 
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Photo"
          >
            ‹
          </button>

          {/* Image & Caption Wrapper */}
          <div 
            className="dhaba-lightbox-content-wrapper" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={filteredItems[selectedIdx].src} 
              alt={filteredItems[selectedIdx].title} 
              className="dhaba-lightbox-img" 
            />
            
            <div className="dhaba-lightbox-caption-box">
              <h3 className="dhaba-lightbox-title">{filteredItems[selectedIdx].title}</h3>
              <p className="dhaba-lightbox-counter">
                Image {selectedIdx + 1} of {filteredItems.length}
              </p>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button 
            className="dhaba-lightbox-btn next" 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
