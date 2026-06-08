import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export default function Contact() {
  const contactPageRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-animate > *', {
        x: -30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
      });
      gsap.from('.contact-form-card', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
      gsap.from('.campus-card', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.campuses-section', start: 'top 80%' }
      });
    }, contactPageRef);
    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Enter a valid email address';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setFormErrors({});
      }, 4000);
    }
  };

  return (
    <div ref={contactPageRef} className="contact-page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Contact Us</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">Contact</span>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="contact-grid">
            
            {/* Left Column: Info */}
            <div className="contact-info-animate" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
                  <span className="section-label-line"></span>
                  <span>Connect With Us</span>
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--primary)', lineHeight: '1.2', marginBottom: '20px' }}>
                  We'd Love to Hear From You
                </h2>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>
                  Have questions about admissions, academic programs, campus life, or school portals? 
                  Reach out to our administrative offices directly, or send us a message using the form.
                </p>
              </div>

              {/* Quick Contact Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="info-item-card">
                  <div className="info-icon-box"><Phone size={20} /></div>
                  <div>
                    <h4 className="info-card-title">General Inquiries</h4>
                    <p className="info-card-text"><a href="tel:+2348035826674">+234 803 582 6674</a></p>
                    <p className="info-card-text"><a href="tel:+2348012345678">+234 801 234 5678</a></p>
                  </div>
                </div>

                <div className="info-item-card">
                  <div className="info-icon-box"><Mail size={20} /></div>
                  <div>
                    <h4 className="info-card-title">Email Correspondence</h4>
                    <p className="info-card-text"><a href="mailto:info@tansianuniversity.edu.ng">info@tansianuniversity.edu.ng</a></p>
                    <p className="info-card-text"><a href="mailto:admissions@tansianuniversity.edu.ng">admissions@tansianuniversity.edu.ng</a></p>
                  </div>
                </div>

                <div className="info-item-card">
                  <div className="info-icon-box"><Clock size={20} /></div>
                  <div>
                    <h4 className="info-card-title">Office Hours</h4>
                    <p className="info-card-text">Monday – Friday: 8:00 AM – 4:00 PM</p>
                    <p className="info-card-text" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Closed on weekends and public holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-form-card">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div className="success-icon-wrapper"><CheckCircle2 size={40} /></div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '12px' }}>Message Sent Successfully!</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto' }}>
                    Thank you for reaching out. A representative from the relevant department will review your message and respond via email within 24-48 business hours.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '28px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Send Us a Message</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Please fill out the details below and we will get back to you.</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className={`form-input ${formErrors.name ? 'error' : ''}`}
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                        placeholder="e.g. John Doe"
                      />
                      {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-row">
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input 
                          type="email" 
                          className={`form-input ${formErrors.email ? 'error' : ''}`}
                          value={formData.email} 
                          onChange={e => setFormData({ ...formData, email: e.target.value })} 
                          placeholder="you@example.com"
                        />
                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                      </div>
                      <div>
                        <label className="form-label">Phone Number (Optional)</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          value={formData.phone} 
                          onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                          placeholder="+234..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Subject *</label>
                      <input 
                        type="text" 
                        className={`form-input ${formErrors.subject ? 'error' : ''}`}
                        value={formData.subject} 
                        onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                        placeholder="What is your message about?"
                      />
                      {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea 
                        className={`form-input ${formErrors.message ? 'error' : ''}`}
                        style={{ minHeight: '120px', resize: 'vertical' }}
                        value={formData.message} 
                        onChange={e => setFormData({ ...formData, message: e.target.value })} 
                        placeholder="Write your message here..."
                      ></textarea>
                      {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                    </div>

                    <button type="submit" className="submit-btn">
                      <Send size={15} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Campuses Section */}
   

      {/* Styled block */}
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .info-item-card {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .info-item-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.03);
        }

        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          color: var(--primary);
          margin-bottom: 6px;
          font-weight: 600;
        }

        .info-card-text {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0;
          line-height: 1.6;
        }

        .info-card-text a {
          color: inherit;
          transition: color 0.3s;
        }

        .info-card-text a:hover {
          color: var(--primary);
          text-decoration: underline;
        }

        .contact-form-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .success-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2e7d32, #43a047);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 10px 20px rgba(46,125,50,0.2);
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 8px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s;
          font-family: 'Inter', sans-serif;
          background: var(--off-white);
        }

        .form-input:focus {
          border-color: var(--primary);
          background: var(--white);
          box-shadow: 0 0 0 3px rgba(138, 20, 20, 0.08);
        }

        .form-input.error {
          border-color: #c62828;
          background: rgba(198, 40, 40, 0.02);
        }

        .error-text {
          font-size: 0.76rem;
          color: #c62828;
          margin-top: 5px;
          display: block;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: var(--primary);
          color: var(--white);
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #731010;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(138, 20, 20, 0.15);
        }

        .campus-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.02);
          transition: all 0.4s ease;
        }

        .campus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.05);
        }

        .campus-card-image-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .campus-card-map-mockup {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.95);
          gap: 12px;
          padding: 20px;
          text-align: center;
          position: relative;
        }

        .map-mockup-pin {
          animation: float 2.5s ease-in-out infinite;
        }

        .map-mockup-text {
          font-size: 0.85rem;
          opacity: 0.8;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .campus-card-badge {
          display: inline-block;
          padding: 4px 10px;
          background: var(--accent);
          color: var(--primary-dark);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 2px;
          margin-bottom: 16px;
        }

        .campus-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--primary);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .campus-card-desc {
          font-size: 0.88rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .campus-detail-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .campus-detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .map-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary);
          transition: all 0.3s;
        }

        .map-link-btn:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        @media (max-width: 968px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .campuses-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 580px) {
          .form-grid-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .contact-form-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
