import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // If not home page, navbar is always in scrolled/inner-page state
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Campus Life', path: '/campus-life' },
    { name: 'News', path: '/news' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMobileMenu}>
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={closeMobileMenu}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.name}
          </Link>
        ))}

        <div className="mobile-hub-section">
          <div className="mobile-hub-title">Digital services</div>
          <a href="#" className="mobile-hub-link" onClick={closeMobileMenu}>Pixpay - Fees Payment</a>
          <a href="#" className="mobile-hub-link" onClick={closeMobileMenu}>Smart ID - Digital Cards</a>
          <a href="#" className="mobile-hub-link" onClick={closeMobileMenu}>Zora Care - Student Portal</a>
          <a href="#" className="mobile-hub-link" onClick={closeMobileMenu}>School Portal - Academic System</a>
        </div>

        <Link to="/admissions" className="nav-cta" onClick={closeMobileMenu} style={{ marginTop: '20px' }}>
          Apply Now
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!isHome ? 'inner-page' : ''}`}>
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <img src="/tansian-logo.png" alt="Tansian Logo" className="nav-logo-img" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginRight: '10px' }} />
          <span className="nav-logo-text">Tansian University</span>
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="nav-item-dropdown">
            <span className="nav-link" style={{ cursor: 'pointer' }}>Digital services</span>
            <div className="nav-mega-menu">
              <div className="mega-menu-grid">
                <a href="#" className="mega-card">
                  <div className="mega-card-img-wrapper">
                    <img src="/pixpay-removebg-preview.png" alt="Pixpay" className="mega-card-img" />
                  </div>
                  <div className="mega-card-content">
                    <div className="mega-card-title">Pixpay</div>
                    <div className="mega-card-desc">Seamless School Fees Payment</div>
                  </div>
                  <ArrowUpRight className="mega-card-icon" size={20} />
                </a>
                <a href="#" className="mega-card">
                  <div className="mega-card-img-wrapper">
                    <img src="Ellipse_8-removebg-preview.png" alt="Smart ID" className="mega-card-img" />
                  </div>
                  <div className="mega-card-content">
                    <div className="mega-card-title">Smart ID</div>
                    <div className="mega-card-desc">Digital Smart Cards</div>
                  </div>
                  <ArrowUpRight className="mega-card-icon" size={20} />
                </a>
                <a href="#" className="mega-card">
                  <div className="mega-card-img-wrapper">
                    <img src="/zora-removebg-preview.png" alt="Zora Care" className="mega-card-img" />
                  </div>
                  <div className="mega-card-content">
                    <div className="mega-card-title">Zora Admita</div>
                    <div className="mega-card-desc">Unified Student Portal</div>
                  </div>
                  <ArrowUpRight className="mega-card-icon" size={20} />
                </a>
                <a href="#" className="mega-card">
                  <div className="mega-card-img-wrapper">
                    <img src="tansian-logo.png" alt="School Portal" className="mega-card-img" />
                  </div>
                  <div className="mega-card-content">
                    <div className="mega-card-title">School Portal</div>
                    <div className="mega-card-desc">Access Academic Systems</div>
                  </div>
                  <ArrowUpRight className="mega-card-icon" size={20} />
                </a>
              </div>
            </div>
          </div>

          <Link to="/admissions" className="nav-cta">Apply Now</Link>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </>
  );
}
