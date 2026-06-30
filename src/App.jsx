import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Menu from './pages/Menu.jsx';
import Gallery from './pages/Gallery.jsx';
import Reviews from './pages/Reviews.jsx';
import Contact from './pages/Contact.jsx';
import PPolicy from './pages/PPolicy.jsx';
import TConditions from './pages/TConditions.jsx';
import RCancellation from './pages/RCancellation.jsx';
import SPolicy from './pages/SPolicy.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="mad-page-wrapper" className="mad-page-wrapper dhaba-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PPolicy />} />
          <Route path="/terms-conditions" element={<TConditions />} />
          <Route path="/refund-cancellation" element={<RCancellation />} />
          <Route path="/shipping-policy" element={<SPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
