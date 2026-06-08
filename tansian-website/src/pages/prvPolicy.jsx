import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Mail, Phone, Shield, ChevronDown } from 'lucide-react';

const policySections = [
  {
    name: 'Information We Collect',
    items: [
      {
        heading: 'Personal Information',
        body: 'We collect personal information that you voluntarily provide when applying for admission, registering as a student, or interacting with our services. This includes your full name, date of birth, gender, home address, phone number, and email address.'
      },
      {
        heading: 'Academic Records',
        body: "We collect and maintain academic information including O'Level results, UTME scores, transcripts, course registrations, examination results, and other academic performance data necessary for your enrollment and progression at Tansian University."
      },
      {
        heading: 'Financial Information',
        body: 'We collect payment details related to tuition fees, hostel payments, and other charges. Financial transactions are processed through secure payment gateways. We do not store full card details on our servers.'
      },
      {
        heading: 'Technical & Usage Data',
        body: 'When you use our online portal or website, we may automatically collect technical information such as your IP address, browser type, pages visited, and session duration to improve our digital services and maintain security.'
      }
    ]
  },
  {
    name: 'How We Use Your Information',
    items: [
      {
        heading: 'Admissions & Enrollment',
        body: 'Your information is used to process applications, conduct screening exercises, communicate admission decisions, facilitate registration, and manage your academic records throughout your time at Tansian University.'
      },
      {
        heading: 'Communication',
        body: 'We use your contact details to send important notices regarding fees, examinations, academic calendars, events, and other university announcements. You may receive communications via email, SMS, or the student portal.'
      },
      {
        heading: 'Legal & Regulatory Compliance',
        body: 'We may use and disclose your information as required by Nigerian law, accreditation bodies such as the National Universities Commission (NUC), or other regulatory authorities that oversee higher education in Nigeria.'
      },
      {
        heading: 'Research & Institutional Planning',
        body: 'Anonymized and aggregated data may be used internally for academic research, institutional planning, and improving the quality of education and services at Tansian University.'
      }
    ]
  },
  {
    name: 'Data Sharing & Disclosure',
    items: [
      {
        heading: 'Third-Party Service Providers',
        body: 'We may share your data with trusted third-party vendors who assist in providing services such as payment processing, email delivery, and IT infrastructure. These parties are contractually obligated to protect your information.'
      },
      {
        heading: 'Government & Regulatory Bodies',
        body: 'We may be required to share student information with government agencies, the NUC, or law enforcement when legally mandated. We will notify you where possible and permitted by law.'
      },
      {
        heading: 'No Sale of Personal Data',
        body: 'Tansian University does not sell, rent, or trade your personal information to any third party for marketing or commercial purposes. Your data is used solely in connection with your academic relationship with the university.'
      }
    ]
  },
  {
    name: 'Data Security',
    items: [
      {
        heading: 'Security Measures',
        body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include secure servers, encrypted connections, and access controls.'
      },
      {
        heading: 'Data Retention',
        body: 'Academic records are retained permanently as required for the issuance of transcripts and verification of qualifications. Other personal data is retained for as long as necessary to fulfill the purposes described in this policy or as required by law.'
      },
      {
        heading: 'Breach Notification',
        body: 'In the event of a data breach that may affect your rights or freedoms, Tansian University will notify affected individuals and relevant authorities in accordance with applicable Nigerian data protection regulations.'
      }
    ]
  },
  {
    name: 'Your Rights',
    items: [
      {
        heading: 'Access & Correction',
        body: "You have the right to request access to the personal information we hold about you and to request corrections if any data is inaccurate or incomplete. Requests can be submitted to the Registrar's Office or Data Protection Officer."
      },
      {
        heading: 'Withdrawal of Consent',
        body: 'Where processing is based on your consent, you may withdraw that consent at any time. Withdrawal will not affect the lawfulness of processing carried out before the withdrawal.'
      },
      {
        heading: 'Complaints',
        body: "If you believe your data rights have been violated, you may file a complaint with Tansian University's Data Protection Officer or with the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng."
      }
    ]
  },
  {
    name: 'Cookies & Online Services',
    items: [
      {
        heading: 'Use of Cookies',
        body: 'Our website and student portal use cookies to improve your browsing experience, remember your preferences, and gather anonymized analytics. You may disable cookies through your browser settings, though some portal features may be affected.'
      },
      {
        heading: 'Third-Party Links',
        body: 'Our website may contain links to external websites such as government portals or payment platforms. Tansian University is not responsible for the privacy practices of these external sites and encourages you to review their privacy policies.'
      }
    ]
  },
  {
    name: 'Updates to This Policy',
    items: [
      {
        heading: 'Policy Changes',
        body: 'Tansian University reserves the right to update this Privacy Policy periodically to reflect changes in law, technology, or our practices. The revised policy will be posted on our website with the effective date. Continued use of our services constitutes acceptance of the updated policy.'
      },
      {
        heading: 'Effective Date',
        body: 'This Privacy Policy is effective as of January 1, 2025. For questions or concerns regarding this policy, please contact our Data Protection Officer at privacy@tansianuniversity.edu.ng.'
      }
    ]
  }
];

// Build default open state: first item of every section is open
const buildDefaultOpenItems = () => {
  const defaults = {};
  policySections.forEach(sec => {
    defaults[`${sec.name}-0`] = true;
  });
  return defaults;
};

export default function PrivacyPolicy() {
  const pageRef = useRef(null);
  const [activeSection, setActiveSection] = useState('Information We Collect');
  const [openItems, setOpenItems] = useState(buildDefaultOpenItems);

  const toggleItem = (sectionName, index) => {
    const key = `${sectionName}-${index}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentSection = policySections.find(s => s.name === activeSection);

  // Initial page entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.privacy-sidebar > *', {
        x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        clearProps: 'all'
      });
      gsap.from('.privacy-main > *', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        clearProps: 'all'
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Re-animate main content on section switch
  useEffect(() => {
    gsap.from('.privacy-main > *', {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out',
      clearProps: 'all'
    });
  }, [activeSection]);

  const renderPolicyItem = (item, index, sectionName) => {
    const key = `${sectionName}-${index}`;
    const isOpen = openItems[key];
    return (
      <div className="faq-item" key={key}>
        <div
          className={`faq-question ${isOpen ? 'active' : ''}`}
          onClick={() => toggleItem(sectionName, index)}
        >
          <span>{item.heading}</span>
          <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
            <ChevronDown size={20} />
          </span>
        </div>
        <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
          <p>{item.body}</p>
        </div>
      </div>
    );
  };

  return (
    <div ref={pageRef}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Privacy Policy</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Intro Banner */}
      <section className="inner-page-section" style={{ paddingBottom: 0 }}>
        <div className="section-inner" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '16px',
            padding: '24px 28px', borderRadius: '6px',
            background: 'var(--off-white)', border: '1px solid var(--border)'
          }}>
            <Shield size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '4px', fontSize: '0.95rem' }}>
                Your privacy matters to us
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                This policy explains how Tansian University collects, uses, and protects your personal information
                in accordance with the Nigeria Data Protection Act (NDPA) and related regulations.
                Last updated: <strong>January 1, 2025</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="inner-page-section faq-page-content">
        <div className="section-inner">
          <div className="faq-grid" style={{ gap: '60px' }}>

            {/* Sidebar Navigation */}
            <div className="faq-page-sidebar faq-left privacy-sidebar" style={{ paddingTop: 0 }}>
              <div className="faq-label">
                <span className="section-label-line"></span>
                <span>Sections</span>
              </div>
              <h2 className="faq-title" style={{ fontSize: '2rem', marginBottom: '28px' }}>
                Policy Contents
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
                {policySections.map((sec, i) => (
                  <button
                    key={sec.name}
                    onClick={() => setActiveSection(sec.name)}
                    style={{
                      padding: '14px 20px',
                      borderRadius: '4px',
                      border: 'none',
                      background: activeSection === sec.name ? 'var(--primary)' : 'var(--off-white)',
                      color: activeSection === sec.name ? 'var(--white)' : 'var(--text-light)',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{i + 1}. {sec.name}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      opacity: activeSection === sec.name ? 1 : 0.5,
                      background: activeSection === sec.name ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                      padding: '2px 10px', borderRadius: '12px', flexShrink: 0
                    }}>{sec.items.length}</span>
                  </button>
                ))}
              </div>

              {/* Contact Block */}
              <div className="faq-contact" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <span className="faq-contact-text" style={{ fontWeight: '600', color: 'var(--primary)' }}>
                  Privacy concerns?
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="mailto:privacy@tansianuniversity.edu.ng" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Mail size={14} color="var(--accent)" /> privacy@tansianuniversity.edu.ng
                  </a>
                  <a href="tel:+2348012345678" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <Phone size={14} color="var(--accent)" /> +234 801 234 5678
                  </a>
                </div>
                <Link to="/contact" className="faq-contact-btn" style={{ marginTop: '8px' }}>
                  Contact DPO <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="faq-page-main privacy-main" style={{ paddingTop: '0' }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '1.5rem',
                color: 'var(--primary)', marginBottom: '8px'
              }}>
                {activeSection}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
                {currentSection.items.length} clause{currentSection.items.length !== 1 ? 's' : ''} in this section
              </p>
              {currentSection.items.map((item, i) =>
                renderPolicyItem(item, i, activeSection)
              )}

              {/* Bottom navigation */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginTop: '40px',
                paddingTop: '24px', borderTop: '1px solid var(--border)'
              }}>
                {(() => {
                  const idx = policySections.findIndex(s => s.name === activeSection);
                  const prev = policySections[idx - 1];
                  const next = policySections[idx + 1];
                  return (
                    <>
                      {prev ? (
                        <button onClick={() => setActiveSection(prev.name)} style={{
                          background: 'none', border: '1px solid var(--border)',
                          borderRadius: '4px', padding: '10px 18px',
                          fontSize: '0.85rem', color: 'var(--text-light)',
                          cursor: 'pointer', fontWeight: '600',
                          display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                          ← {prev.name}
                        </button>
                      ) : <span />}
                      {next ? (
                        <button onClick={() => setActiveSection(next.name)} style={{
                          background: 'var(--primary)', border: 'none',
                          borderRadius: '4px', padding: '10px 18px',
                          fontSize: '0.85rem', color: 'var(--white)',
                          cursor: 'pointer', fontWeight: '600',
                          display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                          {next.name} →
                        </button>
                      ) : <span />}
                    </>
                  );
                })()}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
