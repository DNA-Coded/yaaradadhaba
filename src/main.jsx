import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { captureAttribution } from './utils/attribution.js';
import './styles.css';

captureAttribution();

// Mark images as loaded so the shimmer placeholder behind them can stop and the
// photo fades in. Handles images that finish loading before React sees them.
const markLoaded = (img) => img.classList.add('is-loaded');
document.addEventListener('load', (e) => e.target.tagName === 'IMG' && markLoaded(e.target), true);
document.addEventListener('error', (e) => e.target.tagName === 'IMG' && markLoaded(e.target), true);
new MutationObserver((records) => {
  for (const r of records) {
    for (const n of r.addedNodes) {
      if (n.nodeType !== 1) continue;
      const imgs = n.tagName === 'IMG' ? [n] : n.querySelectorAll('img');
      imgs.forEach((img) => img.complete && markLoaded(img));
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
