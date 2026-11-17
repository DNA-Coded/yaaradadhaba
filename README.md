# Yaara Da Dhaba

Website for **Yaara Da Dhaba**, a neighbourhood dhaba at 81, Nilgunj Road, Agarpara, Kolkata. Built with React 18, React Router 6 and Vite 5, with hand-written CSS and no UI framework.

Visitors can browse the full menu with prices, build an order and send it to the dhaba on WhatsApp in one message, see real photos, read reviews and find the shop.

## Features

- **Menu as a price board.** 72 dishes in 9 sections, with search, a veg / non-veg filter, sticky section chips that track your scroll, and deep links like `/menu#biryani`.
- **Built for phones first.** Thumb-reach bottom tab bar (Home, Menu, Order, Call, Find us), a header that hides while scrolling, swipeable rows and a bottom-sheet order you can drag closed.
- **WhatsApp ordering.** Add dishes, change quantities, choose pickup or delivery, then send one pre-filled WhatsApp message. The order is remembered in the browser if the visitor leaves and comes back.
- **Live open / closed badge** based on Kolkata time.
- **Site search** for dishes and pages (header button, or `/` on a keyboard), **dark mode** that follows the phone, a **FAQ**, **copy address / phone**, a **printable menu**, toasts with **undo**, and a Google Map that only loads when tapped.
- **Real photo gallery** with filters and an accessible lightbox (keyboard, swipe, focus handling).
- **Security:** strict Content-Security-Policy and HSTS headers in `vercel.json`, `npm audit` clean, unknown URLs return a real 404.
- **SEO:** per-page titles, descriptions, canonical URLs, Open Graph image, `Restaurant` structured data, `sitemap.xml`, `robots.txt`.
- **Accessibility:** skip link, visible keyboard focus, labelled controls, WCAG AA colour contrast, `prefers-reduced-motion` support.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/ at http://localhost:4173
```

> **WSL users:** if `npm` fails with `Cannot find module 'C:\...\npm'`, your shell is picking up the Windows Node. Put the Linux Node first, for example `export PATH="$HOME/.nvm/versions/node/<version>/bin:$PATH"`.

## Updating content

All business details live in `src/data/`, so most edits touch one file:

| What to change | File |
| --- | --- |
| Phone numbers, address, hours, map links, site URL | `src/data/site.js` |
| Dishes, prices, veg flag, best sellers, home page favourites | `src/data/menu.js` |
| Customer reviews | `src/data/reviews.js` |
| Gallery photos and captions | `src/data/gallery.js` |

### Images

Original photos are kept in `assets-src/` and are **not** deployed. Web-ready versions in `public/img/` are generated with:

```bash
npm run images
```

This resizes and converts every photo to WebP, creates the transparent logo, favicons and the social-share image. To add a gallery photo: drop it in `assets-src/gallery/`, run `npm run images`, then add an entry to `src/data/gallery.js`.

## Project structure

```
assets-src/          Original photos (not deployed)
  brand/  dishes/  gallery/  low-res/
public/
  img/               Generated, optimised images
  robots.txt  sitemap.xml  site.webmanifest
scripts/
  optimize-images.mjs
src/
  cart/              Order basket (context, drawer, add buttons)
  components/        Header, Footer, Icon set, shared UI
  data/              Menu, reviews, gallery, business details
  hooks/useSEO.js    Per-page meta tags
  pages/             Home, Menu, Gallery, Reviews, About, Contact, Legal, NotFound
  App.jsx            Routes (pages are lazy-loaded)
  styles.css         Design tokens and all styles
index.html           Fonts, structured data, default meta
vercel.json          SPA rewrites, caching and security headers
```

## Campaign links (see where orders come from)

Add `utm_source` (and optionally `utm_campaign`) to links you share. The site keeps it for the visit and adds a line like `Found you via: instagram / diwali` to the WhatsApp order. No tracking scripts or cookies are involved.

| Where | Link |
| --- | --- |
| Instagram bio | `https://yaaradadhaba.vercel.app/menu?utm_source=instagram&utm_medium=bio` |
| Instagram post or reel | `https://yaaradadhaba.vercel.app/menu?utm_source=instagram&utm_campaign=<post-name>` |
| WhatsApp status | `https://yaaradadhaba.vercel.app/menu?utm_source=whatsapp-status` |
| Printed QR code at the shop | `https://yaaradadhaba.vercel.app/menu?utm_source=qr-counter` |

## Deployment

Configured for Vercel: `vercel.json` rewrites routes to `index.html`, caches hashed assets for a year, and redirects the old `/onlineorder` URL to `/menu`.

Live site: **https://yaaradadhaba.vercel.app**. Vercel deploys automatically on every push to `main`. If the site moves to a custom domain, update the URL in `src/data/site.js`, `index.html`, `public/robots.txt` and `public/sitemap.xml`.
