import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BottomNav from './components/BottomNav.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import { ToastProvider } from './components/feedback.jsx';
import { PageLoader } from './components/ui.jsx';
import Home from './pages/Home.jsx';
import { CartProvider } from './cart/CartContext.jsx';
import { CartBar, CartDrawer } from './cart/Cart.jsx';

const Menu = lazy(() => import('./pages/Menu.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Reviews = lazy(() => import('./pages/Reviews.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Scroll to the top on page change, or to #section when the URL has a hash.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) el.scrollIntoView({ block: 'start' });
        else if (attempt < 20) setTimeout(() => tryScroll(attempt + 1), 50);
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Page({ children }) {
  const { pathname } = useLocation();
  return (
    <main id="main" key={pathname} className="page-enter" tabIndex={-1}>
      {children}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <CartProvider>
        <ScrollManager />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <Page>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<Legal page="privacy" />} />
              <Route path="/terms-conditions" element={<Legal page="terms" />} />
              <Route path="/refund-cancellation" element={<Legal page="refund" />} />
              <Route path="/shipping-policy" element={<Legal page="shipping" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Page>
        <Footer />
        <CartBar />
        <FloatingActions />
        <BottomNav />
        <CartDrawer />
      </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
