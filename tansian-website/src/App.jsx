import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout components
import ScrollToTop from './components/ScrollToTop';
import InfoTopBar from './components/InfoTopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import CampusLife from './pages/CampusLife';
import News from './pages/News';
import Admissions from './pages/Admissions';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/prvPolicy';
import Contact from './pages/Contact';

import './App.css';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <InfoTopBar />
      <Navbar />
      <div className="main-content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/news" element={<News />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;