import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';

// Official Yaara Da Dhaba menu data with precise pricing, diet tags, and category mappings
const rawMenuData = [
  {
    category: "Rolls",
    items: [
      { name: "Egg Roll", price: 45, isVeg: false, image: "/images/yaara_da_dhaba/egg_roll.png" },
      { name: "Egg Cheese Roll", price: 75, isVeg: false, image: "/images/yaara_da_dhaba/egg_roll.png" },
      { name: "Chicken Roll", price: 70, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_roll.png" },
      { name: "Chicken Cheese Roll", price: 95, isVeg: false, image: "/images/yaara_da_dhaba/chicken_roll.png" },
      { name: "Egg Chicken Roll", price: 80, isVeg: false, image: "/images/yaara_da_dhaba/chicken_roll.png" },
      { name: "Paneer Roll", price: 70, isVeg: true, image: "/images/yaara_da_dhaba/paneer_roll.png" },
      { name: "Paneer Cheese Roll", price: 95, isVeg: true, image: "/images/yaara_da_dhaba/paneer_roll.png" }
    ]
  },
  {
    category: "Chinese",
    items: [
      // Chowmein Subsection
      { name: "Veg Chow", price: 60, isVeg: true, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/veg_chowmein.png" },
      { name: "Egg Chow", price: 70, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/egg_roll.png" },
      { name: "Chicken Chow", price: 90, isVeg: false, isPopular: true, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Mix Chow", price: 100, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Schezwan Veg Chow", price: 70, isVeg: true, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/veg_chowmein.png" },
      { name: "Schezwan Egg Chow", price: 80, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/egg_roll.png" },
      { name: "Schezwan Chicken Chow", price: 100, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Schezwan Egg Chicken Chow", price: 110, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Chilli Garlic Veg Chow", price: 80, isVeg: true, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/veg_chowmein.png" },
      { name: "Chilli Garlic Egg Chow", price: 90, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/egg_roll.png" },
      { name: "Chilli Garlic Chicken Chow", price: 110, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Chilli Garlic Egg Chicken Chow", price: 120, isVeg: false, subcategory: "Chowmein", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      // Fried Rice Subsection
      { name: "Veg Fried Rice", price: 80, isVeg: true, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Egg Fried Rice", price: 90, isVeg: false, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Chicken Fried Rice", price: 110, isVeg: false, isPopular: true, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Mix Fried Rice", price: 120, isVeg: false, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Schezwan Veg Fried Rice", price: 90, isVeg: true, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Schezwan Egg Fried Rice", price: 100, isVeg: false, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Schezwan Chicken Fried Rice", price: 120, isVeg: false, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Schezwan Egg Chicken Fried Rice", price: 130, isVeg: false, subcategory: "Fried Rice", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" }
    ]
  },
  {
    category: "Rice Meals",
    items: [
      { name: "Veg Meal", price: 50, isVeg: true, image: "/images/yaara_da_dhaba/indian_thali_meals.png" },
      { name: "Egg Meal", price: 70, isVeg: false, image: "/images/yaara_da_dhaba/indian_thali_meals.png" },
      { name: "Fish Meal", price: 80, isVeg: false, image: "/images/yaara_da_dhaba/indian_thali_meals.png" },
      { name: "Chicken Meal", price: 90, isVeg: false, image: "/images/yaara_da_dhaba/indian_thali_meals.png" },
      { name: "Extra Rice", price: 5, isVeg: true, image: "/images/yaara_da_dhaba/indian_thali_meals.png" }
    ]
  },
  {
    category: "Combos",
    items: [
      // Noodles Combo
      { name: "Veg Chow + Chilli Chicken + Cold Drink", price: 110, isVeg: false, subcategory: "Noodles Combo", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Egg Chow + Chilli Chicken + Cold Drink", price: 120, isVeg: false, subcategory: "Noodles Combo", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      { name: "Chicken Chow + Chilli Chicken + Cold Drink", price: 130, isVeg: false, subcategory: "Noodles Combo", image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
      // Fried Rice Combo
      { name: "Butter Garlic Veg Fried Rice + Chilli Chicken", price: 100, isVeg: false, subcategory: "Fried Rice Combo", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Butter Garlic Egg Fried Rice + Chilli Chicken", price: 110, isVeg: false, subcategory: "Fried Rice Combo", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      { name: "Chicken Fried Rice + Chilli Chicken", price: 130, isVeg: false, subcategory: "Fried Rice Combo", image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
      // Paratha Combo
      { name: "2 Lachha Paratha + 2 Chilli Paneer", price: 70, isVeg: true, subcategory: "Paratha Combo", image: "/images/yaara_da_dhaba/unnamed (13).webp" },
      { name: "2 Lachha Paratha + 2 Chilli Chicken", price: 80, isVeg: false, subcategory: "Paratha Combo", image: "/images/yaara_da_dhaba/unnamed (13).webp" },
      { name: "2 Lachha Paratha + Chicken Kasa", price: 110, isVeg: false, subcategory: "Paratha Combo", image: "/images/yaara_da_dhaba/unnamed (13).webp" }
    ]
  },
  {
    category: "Paratha & Main Course",
    items: [
      { name: "Lachha Paratha", price: 15, isVeg: true, image: "/images/yaara_da_dhaba/unnamed (13).webp" },
      { name: "Chicken Kasa (4 pcs)", price: 160, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_kasa.png" },
      { name: "Paneer Butter Masala", price: 140, isVeg: true, image: "/images/yaara_da_dhaba/paneer_butter_masala.png" },
      { name: "Chicken Butter Masala (6 pcs)", price: 140, isVeg: false, image: "/images/yaara_da_dhaba/chicken_kasa.png" },
      { name: "Chilli Paneer (6 pcs)", price: 120, isVeg: true, image: "/images/yaara_da_dhaba/paneer_butter_masala.png" },
      { name: "Chilli Chicken (6 pcs)", price: 150, isVeg: false, image: "/images/yaara_da_dhaba/chicken_kasa.png" }
    ]
  },
  {
    category: "Biryani",
    items: [
      { name: "Aloo Biryani", price: 70, isVeg: true, image: "/images/yaara_da_dhaba/chicken_biryani.png" },
      { name: "Egg Biryani", price: 80, isVeg: false, image: "/images/yaara_da_dhaba/chicken_biryani.png" },
      { name: "Chicken Biryani", price: 110, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_biryani.png" },
      { name: "Special Chicken Biryani", price: 160, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_biryani.png" }
    ]
  },
  {
    category: "Momo",
    items: [
      { name: "Veg Momo (5 pcs)", price: 60, isVeg: true, image: "/images/yaara_da_dhaba/veg_momo.png" },
      { name: "Chicken Momo (5 pcs)", price: 70, isVeg: false, image: "/images/yaara_da_dhaba/steamed_momo.png" },
      { name: "Fried Momo (5 pcs)", price: 90, isVeg: true, image: "/images/yaara_da_dhaba/veg_momo.png" }
    ]
  },
  {
    category: "Pav",
    items: [
      { name: "Pav Bhaji", price: 80, isVeg: true, image: "/images/yaara_da_dhaba/pav_bhaji.png" },
      { name: "Cheese Pav Bhaji", price: 105, isVeg: true, image: "/images/yaara_da_dhaba/pav_bhaji.png" },
      { name: "Vada Pav", price: 30, isVeg: true, image: "/images/yaara_da_dhaba/vada_pav.png" }
    ]
  },
  {
    category: "South Indian",
    items: [
      // Idly
      { name: "Idly (3 pcs)", price: 40, isVeg: true, subcategory: "Idly", image: "/images/yaara_da_dhaba/idli_sambar.png" },
      { name: "Sambar Vada (2 pcs)", price: 50, isVeg: true, subcategory: "Idly", image: "/images/yaara_da_dhaba/idli_sambar.png" },
      { name: "Idly Fry (3 pcs)", price: 70, isVeg: true, subcategory: "Idly", image: "/images/yaara_da_dhaba/idli_sambar.png" },
      { name: "Butter Idly Fry (3 pcs)", price: 90, isVeg: true, subcategory: "Idly", image: "/images/yaara_da_dhaba/idli_sambar.png" },
      { name: "Dahi Vada (2 pcs)", price: 60, isVeg: true, subcategory: "Idly", image: "/images/yaara_da_dhaba/idli_sambar.png" },
      // Plain Dosa
      { name: "Plain Dosa", price: 50, isVeg: true, subcategory: "Plain Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Onion Dosa", price: 60, isVeg: true, subcategory: "Plain Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Butter Plain Dosa", price: 70, isVeg: true, subcategory: "Plain Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Cheese Plain Dosa", price: 70, isVeg: true, subcategory: "Plain Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      // Masala Dosa
      { name: "Masala Dosa", price: 70, isVeg: true, isPopular: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Onion Masala Dosa", price: 75, isVeg: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Butter Masala Dosa", price: 90, isVeg: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Cheese Masala Dosa", price: 90, isVeg: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Onion Butter Cheese Masala Dosa", price: 115, isVeg: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" },
      { name: "Paneer Bhujia Dosa", price: 130, isVeg: true, subcategory: "Masala Dosa", image: "/images/yaara_da_dhaba/masala_dosa.png" }
    ]
  }
];

// Flat list of favorites with official prices
const favoritesList = [
  { name: "Chicken Biryani", price: 110, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_biryani.png" },
  { name: "Chicken Chow", price: 90, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_chowmein.png" },
  { name: "Chicken Fried Rice", price: 110, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_fried_rice.png" },
  { name: "Chicken Roll", price: 70, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_roll.png" },
  { name: "Masala Dosa", price: 70, isVeg: true, isPopular: true, image: "/images/yaara_da_dhaba/masala_dosa.png" },
  { name: "Chicken Kasa (4 pcs)", price: 160, isVeg: false, isPopular: true, image: "/images/yaara_da_dhaba/chicken_kasa.png" }
];

export default function Menu() {
  useSEO({
    title: "Yaara Da Dhaba Menu | Chinese, Biryani, Rolls, South Indian",
    description: "Explore our official menu prices. We offer Chicken Biryani, Dosa, Egg Rolls, Chinese Chowmein, Momo, and South Indian delicacies in Agarpara, Kolkata."
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("All"); // All | Veg | Non Veg
  const [activeCategory, setActiveCategory] = useState("Rolls");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Accordion open states for mobile
  const [expandedCategories, setExpandedCategories] = useState({
    "Rolls": true,
    "Chinese": false,
    "Rice Meals": false,
    "Combos": false,
    "Paratha & Main Course": false,
    "Biryani": false,
    "Momo": false,
    "Pav": false,
    "South Indian": false
  });

  // Monitor screen size to swap layout states dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active scroll section for desktop sticky navigation
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const cat of rawMenuData) {
        const el = document.getElementById(cat.category);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.category);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Smooth scroll helper
  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 220; // accounting for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mobile Category Picker (expands target and scrolls smoothly)
  const handleMobileCategoryClick = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: true
    }));
    setActiveCategory(categoryName);
    setTimeout(() => {
      const el = document.getElementById(categoryName);
      if (el) {
        const offset = 240;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  const toggleAccordion = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // WhatsApp click trigger
  const triggerWhatsAppOrder = (item) => {
    const messageText = `Hello Yaara Da Dhaba,\n\nI would like to order:\n*${item.name}*\n\nPrice: *₹${item.price}*\n\nPlease share availability.`;
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919903005932?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Total metrics
  const totalCategoriesCount = rawMenuData.length;
  const totalItemsCount = rawMenuData.reduce((acc, cat) => acc + cat.items.length, 0);

  // Filter full menu dynamically
  const getFilteredMenu = () => {
    return rawMenuData.map(cat => {
      const filteredItems = cat.items.filter(item => {
        // Search query filter
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              cat.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Veg / Non-Veg toggle filter
        let matchesDiet = true;
        if (dietFilter === "Veg") {
          matchesDiet = item.isVeg === true;
        } else if (dietFilter === "Non Veg") {
          matchesDiet = item.isVeg === false;
        }

        return matchesSearch && matchesDiet;
      });

      return {
        ...cat,
        items: filteredItems
      };
    }).filter(cat => cat.items.length > 0); // Hide empty categories
  };

  const filteredMenuData = getFilteredMenu();

  return (
    <>
      {/* SECTION 1 — MENU HERO */}
      <section className="dhaba-menu-hero">
        <div className="dhaba-menu-hero-container">
          <h1 className="dhaba-menu-hero-title">Explore Our Menu</h1>
          <p className="dhaba-menu-hero-subtitle">
            From Chinese and Biryani to Dosa and Rolls, find your favourite dish here.
          </p>
          <div className="dhaba-menu-hero-stats">
            <div className="dhaba-menu-stat-item">
              <span className="dhaba-menu-stat-val">{totalCategoriesCount}</span>
              <span className="dhaba-menu-stat-label">Categories</span>
            </div>
            <div className="dhaba-menu-stat-item">
              <span className="dhaba-menu-stat-val">{totalItemsCount}</span>
              <span className="dhaba-menu-stat-label">Menu Items</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3 — SEARCH & DIET FILTERS (STICKY CONTROLS) */}
      <div className="dhaba-menu-controls">
        <div className="container">
          {/* Prominent Search bar */}
          <div className="dhaba-search-wrapper">
            <input 
              type="text" 
              className="dhaba-search-input" 
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search food items"
            />
            <svg className="dhaba-search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>

          {/* Veg / Non-Veg toggle buttons */}
          <div className="dhaba-diet-filters">
            <button 
              className={`dhaba-filter-btn ${dietFilter === "All" ? "active" : ""}`}
              onClick={() => setDietFilter("All")}
            >
              All
            </button>
            <button 
              className={`dhaba-filter-btn ${dietFilter === "Veg" ? "active" : ""}`}
              onClick={() => setDietFilter("Veg")}
            >
              🟢 Veg
            </button>
            <button 
              className={`dhaba-filter-btn ${dietFilter === "Non Veg" ? "active" : ""}`}
              onClick={() => setDietFilter("Non Veg")}
            >
              🔴 Non Veg
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY CATEGORY BAR */}
      {isMobile && (
        <div className="dhaba-mobile-categories-bar">
          {rawMenuData.map((cat, idx) => (
            <button 
              key={idx}
              className={`dhaba-mobile-cat-btn ${activeCategory === cat.category ? "active" : ""}`}
              onClick={() => handleMobileCategoryClick(cat.category)}
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="dhaba-menu-layout-wrapper">
        <div className="container">
          
          {/* DESKTOP ONLY STICKY SIDEBAR NAVIGATION */}
          {!isMobile && (
            <aside className="dhaba-menu-sidebar">
              <h2 className="dhaba-sidebar-title">Categories</h2>
              <ul className="dhaba-sidebar-list">
                {rawMenuData.map((cat, idx) => (
                  <li 
                    key={idx} 
                    className={`dhaba-sidebar-item ${activeCategory === cat.category ? "active" : ""}`}
                  >
                    <button onClick={() => scrollToCategory(cat.category)}>
                      {cat.category}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* MAIN MENU CONTENT */}
          <main className="dhaba-menu-main-content">
            
            {/* SECTION 6 — CUSTOMER FAVORITES (BEFORE FULL MENU) */}
            {searchQuery === "" && dietFilter === "All" && (
              <section className="dhaba-menu-section" style={{ borderBottom: '2px dashed #E8DDBE', paddingBottom: '40px' }}>
                <h2 className="dhaba-menu-section-header">
                  Customer Favorites
                  <span>Top Rated</span>
                </h2>
                <div className="dhaba-menu-cards-grid">
                  {favoritesList.map((item, idx) => (
                    <div className="dhaba-menu-item-card" key={idx}>
                      <div className="dhaba-menu-card-img-wrapper">
                        <img src={item.image} alt={item.name} className="dhaba-menu-card-img" loading="lazy" />
                      </div>
                      
                      <div className="dhaba-menu-card-info">
                        <div className="dhaba-menu-card-name-row">
                          <h3 className="dhaba-menu-card-title">{item.name}</h3>
                          <span className="dhaba-badge-diet" title={item.isVeg ? "Veg" : "Non-Veg"}>
                            <span className={`dhaba-diet-box ${item.isVeg ? 'veg' : 'nonveg'}`} style={{ borderSize: '1px' }}>
                              <span className="dhaba-diet-dot" />
                            </span>
                          </span>
                        </div>

                        <div className="dhaba-menu-card-meta">
                          <span className="dhaba-badge-popular" style={{ position: 'static', margin: 0, fontSize: '11px', padding: '2px 6px' }}>
                            ⭐ Best Seller
                          </span>
                        </div>

                        <div className="dhaba-menu-card-price-row">
                          <span className="dhaba-menu-card-price">₹{item.price}</span>
                          <button 
                            className="dhaba-menu-card-action-btn"
                            onClick={() => triggerWhatsAppOrder(item)}
                            aria-label={`Order ${item.name} on WhatsApp`}
                          >
                            Order via WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FULL CATEGORY-WISE MENU */}
            {filteredMenuData.length > 0 ? (
              filteredMenuData.map((cat, idx) => {
                // Group items by subcategory if present
                const subcategoriesMap = {};
                cat.items.forEach(item => {
                  const subKey = item.subcategory || "default";
                  if (!subcategoriesMap[subKey]) {
                    subcategoriesMap[subKey] = [];
                  }
                  subcategoriesMap[subKey].push(item);
                });

                const isExpanded = isMobile ? !!expandedCategories[cat.category] : true;

                return (
                  <section 
                    key={idx} 
                    id={cat.category} 
                    className="dhaba-menu-section"
                  >
                    {/* ACCORDION TRIGGER FOR MOBILE, SIMPLE HEADING FOR DESKTOP */}
                    {isMobile ? (
                      <div 
                        className={`dhaba-accordion-header ${isExpanded ? "expanded" : ""}`}
                        onClick={() => toggleAccordion(cat.category)}
                      >
                        <span>{cat.category} ({cat.items.length})</span>
                        <span className="dhaba-accordion-icon">▶</span>
                      </div>
                    ) : (
                      <h2 className="dhaba-menu-section-header">
                        {cat.category}
                        <span>{cat.items.length} Items</span>
                      </h2>
                    )}

                    {/* ACCORDION CONTENT WRAPPER */}
                    <div className={`dhaba-accordion-content ${isExpanded ? "expanded" : ""}`}>
                      {Object.keys(subcategoriesMap).map((subKey, subIdx) => {
                        const subItems = subcategoriesMap[subKey];
                        
                        return (
                          <div key={subIdx}>
                            {/* Render subcategory heading if it's not "default" */}
                            {subKey !== "default" && (
                              <h4 className="dhaba-menu-subcategory-title">{subKey}</h4>
                            )}

                            <div className="dhaba-menu-cards-grid">
                              {subItems.map((item, itemIdx) => {
                                // Highlight signature/Biryani items as best sellers
                                const isBiryaniBestSeller = cat.category === "Biryani" && 
                                  (item.name === "Chicken Biryani" || item.name === "Special Chicken Biryani");

                                return (
                                  <div className="dhaba-menu-item-card" key={itemIdx}>
                                    <div className="dhaba-menu-card-img-wrapper">
                                      <img src={item.image} alt={item.name} className="dhaba-menu-card-img" loading="lazy" />
                                    </div>
                                    
                                    <div className="dhaba-menu-card-info">
                                      <div className="dhaba-menu-card-name-row">
                                        <h3 className="dhaba-menu-card-title">{item.name}</h3>
                                        <span className="dhaba-badge-diet" title={item.isVeg ? "Veg" : "Non-Veg"}>
                                          <span className={`dhaba-diet-box ${item.isVeg ? 'veg' : 'nonveg'}`} style={{ borderSize: '1px' }}>
                                            <span className="dhaba-diet-dot" />
                                          </span>
                                        </span>
                                      </div>

                                      <div className="dhaba-menu-card-meta">
                                        {(item.isPopular || isBiryaniBestSeller) && (
                                          <span className="dhaba-badge-popular" style={{ position: 'static', margin: 0, fontSize: '11px', padding: '2px 6px' }}>
                                            ⭐ Best Seller
                                          </span>
                                        )}
                                      </div>

                                      <div className="dhaba-menu-card-price-row">
                                        <span className="dhaba-menu-card-price">₹{item.price}</span>
                                        <button 
                                          className="dhaba-menu-card-action-btn"
                                          onClick={() => triggerWhatsAppOrder(item)}
                                          aria-label={`Order ${item.name} on WhatsApp`}
                                        >
                                          Order via WhatsApp
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <h3>No food items found matching your filters.</h3>
                <p>Try searching for a different dish or clearing the filters.</p>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* SECTION 7 — CALL TO ACTION */}
      <section className="dhaba-final-cta">
        <div className="dhaba-final-cta-container">
          <h2>Ready to Order?</h2>
          <p>Get freshly prepared food delivered piping hot to your doorstep.</p>
          <div className="dhaba-final-cta-buttons">
            <a href="tel:+919903005932" className="dhaba-btn-primary" aria-label="Call now to order">
              📞 Call Now
            </a>
            <a 
              href="https://wa.me/919903005932?text=Hello%20Yaara%20Da%20Dhaba,%20I%20would%20like%20to%20order%20some%20food%20from%20the%20menu!" 
              className="dhaba-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
