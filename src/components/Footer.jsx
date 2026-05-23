import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const SocialIcon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const socialLinks = [
  { href: 'https://facebook.com', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { href: 'https://twitter.com', d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
  { href: 'https://instagram.com', d: 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01' },
  { href: 'https://linkedin.com', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="section-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/tansian-logo.png" alt="Tansian Logo" className="footer-logo-img" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginRight: '10px' }} />
              <span className="footer-logo-text">Tansian University</span>
            </div>
            <p className="footer-desc">
              A private Christian university in Umunya, Anambra State, Nigeria. 
              Building knowledge and restoring pride through the Total Man Concept.
            </p>
            <div className="footer-social">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon d={s.d} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">About Us</h4>
            <div className="footer-links">
              <Link to="/about">Our History</Link>
              <Link to="/about">Mission & Vision</Link>
              <Link to="/about">University Leadership</Link>
              <Link to="/campus-life">Campus Locations</Link>
              <Link to="/campus-life">Facilities</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Education</h4>
            <div className="footer-links">
              <Link to="/programs">Undergraduate Programs</Link>
              <Link to="/programs">Postgraduate School</Link>
              <Link to="/programs">Faculties</Link>
              <Link to="/admissions">Admissions Guide</Link>
              <Link to="/faq">Frequently Asked Questions</Link>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-heading">Subscribe to Updates</h4>
            {subscribed ? (
              <p style={{ color: '#e0c878', fontWeight: '500' }}>Thank you for subscribing to our updates!</p>
            ) : (
              <>
                <p>Get the latest news, events, and admission updates delivered to your inbox.</p>
                <form className="footer-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">
                    <ArrowUpRight size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright &copy; {new Date().getFullYear()} Tansian University. All rights reserved.</span>
          <span>Powered by Academic Excellence. Designed with care.</span>
        </div>
      </div>
    </footer>
  );
}
