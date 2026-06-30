# Yaara Da Dhaba

A modern, high-performance, and fully responsive website for **Yaara Da Dhaba**—a local food outlet located in Agarpara, Kolkata. The website is built using React, Vite, and custom Vanilla CSS, designed with a food-first layout to make menu exploration and food discovery seamless, fast, and authentic.

---

## 🍽️ About the Restaurant
Yaara Da Dhaba serves freshly prepared, high-quality, and highly affordable meals. The menu focuses on:
* **Chinese** (Chowmein, Fried Rice, Manchurian)
* **Biryani** (Chicken Biryani, Egg Biryani, Aloo Biryani)
* **Rolls** (Egg, Chicken, Paneer, and Cheese varieties)
* **South Indian** (Crispy Dosas, Idlis)
* **Meals & Thalis** (Veg, Egg, Fish, and Chicken meals)
* **Momos** (Steamed and Fried)

---

## ✨ Features
* **🚀 Fast Performance**: Pre-bundled and compiled using Vite for near-instant load times.
* **📱 Mobile-First Design**: Optimized for seamless navigation across desktops, laptops, tablets, and mobile screens.
* **📂 Interactive Menu Page**: Inspired by Swiggy/Zomato, featuring category filters, Veg/Non-Veg toggle, instant search, and WhatsApp ordering integrations.
* **🖼️ Dhaba Photo Gallery**: Live category filtering (Food, Kitchen, Restaurant) with an accessible and touch-friendly lightbox overlay.
* **⭐ Authentic Reviews**: Clean ratings summary section showing a 4.3 Google rating with real customer testimonials and a call-to-action to view live Google Reviews.
* **📞 Quick Actions**: Sticky navbar CTA and WhatsApp/Call buttons on cards for fast customer orders.
* **🔍 SEO Ready**: Custom `useSEO` hook dynamically injecting descriptions, optimized titles, Open Graph tags, and social share metadata.
* **🔒 Policy Compliant**: Includes standard routes for Privacy Policy, Terms & Conditions, Refund/Cancellation, and Shipping Policies.

---

## 🛠️ Tech Stack
* **Core**: React 18.3, React Router DOM 6.23
* **Build System**: Vite 5.2
* **Styling**: Custom Vanilla CSS (No heavy framework overhead)
* **Icons**: Google Material Icons

---

## 📂 Project Directory Structure
```
Yaara_da_dhaba/
├── public/                 # Static assets
│   ├── images/             # Optimized food photography & branding
│   └── onlineorder/        # Standalone online order interface
├── src/
│   ├── components/         # Reusable Header & Footer elements
│   ├── hooks/              # useSEO custom SEO helper hook
│   ├── pages/              # Page components (Home, Menu, Gallery, Reviews, etc.)
│   ├── App.jsx             # React routing configurations
│   ├── dhaba.css           # Global custom style rules & media queries
│   └── main.jsx            # Entry point file
├── index.html              # HTML shell & web fonts loading
├── package.json            # Scripts & dependencies definitions
├── vercel.json             # Vercel deployment routing rewrites
└── vite.config.js          # Vite config definitions
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 16 or above) installed on your system.

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Run Locally
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 3. Production Build
Generate a production-ready static build bundle inside the `dist/` directory:
```bash
npm run build
```

### 4. Local Preview
Verify the production build locally:
```bash
npm run preview
```

---

## 📦 Deployment Instructions

### Vercel Deployment
This project is configured and ready for immediate deployment on Vercel:
1. Push this project folder to your GitHub repository.
2. Link the repository to your Vercel Dashboard.
3. Configure the following build settings:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. The router uses `vercel.json` rewrites to guarantee SPA route safety (preventing 404 errors on direct path refreshes).
