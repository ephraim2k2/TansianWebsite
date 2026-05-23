import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Plus, ArrowRight, Mail, Phone, Search, X } from 'lucide-react';

const faqCategories = [
  {
    name: 'Admissions',
    items: [
      {
        q: 'How do I apply to Tansian University?',
        a: "Visit our admissions portal, pay ₦10,000 for the application form, complete your details online, then visit the Registrar's Office at Umunya or Oba campus with your credentials for verification and screening."
      },
      {
        q: 'What are the admission requirements?',
        a: "You need a minimum UTME score for your chosen course, five O'Level credits including English and Mathematics (WASC, NECO, GCE or NABTEB), and the required subject combinations. Direct Entry requires NCE or equivalent."
      },
      {
        q: 'Can I apply as an international student?',
        a: 'Yes, Tansian University welcomes international students. All programs are taught in English. You will need to provide academic credentials, passport, and meet English proficiency requirements. Contact our International Affairs Office for assistance.'
      },
      {
        q: 'What is the application deadline?',
        a: 'Tansian University operates a flexible admissions calendar. Applications for each academic session typically open between January and August. Late applications may be considered subject to available slots. Check our admissions page for current dates.'
      },
      {
        q: 'Is there an entrance examination?',
        a: 'Yes. All UTME candidates must take the Post-UTME screening exercise, which includes a written assessment and an oral interview. Direct Entry candidates undergo a credential verification and interview process.'
      }
    ]
  },
  {
    name: 'Tuition & Fees',
    items: [
      {
        q: 'How much is tuition at Tansian University?',
        a: 'Tuition varies by faculty and program. Undergraduate fees typically range from ₦200,000 to ₦450,000 per session, depending on the program. Postgraduate fees are structured separately. Contact the Bursary Department for a detailed fee schedule.'
      },
      {
        q: 'Are there scholarships available?',
        a: "Yes, Tansian University offers merit-based scholarships, sports talent scholarships, and the Founder's Memorial Scholarship for outstanding students. Financial need-based support may also be available through the Student Affairs office."
      },
      {
        q: 'Can I pay tuition in installments?',
        a: 'Yes. The university offers a structured installment payment plan. Students can pay 60% at registration and the remaining 40% before mid-semester examinations. Special arrangements may be made through the Bursary Department.'
      }
    ]
  },
  {
    name: 'Hostels & Housing',
    items: [
      {
        q: 'Is campus accommodation available?',
        a: 'Yes. Tansian University provides secure male and female hostel facilities at both the Umunya and Oba campuses. Hostels include study areas, common rooms, 24/7 security, and power backup. Allocation is on a first-come, first-served basis.'
      },
      {
        q: 'Can I live off campus?',
        a: 'Off-campus accommodation is permitted for students in higher levels. However, first-year students are strongly encouraged to reside on campus. The Student Affairs office can assist with recommended off-campus housing options nearby.'
      },
      {
        q: 'What amenities are included in the hostels?',
        a: 'Hostel accommodation includes furnished rooms, laundry areas, common study lounges, Wi-Fi access, 24/7 power backup via solar and generator systems, and live-in wardens for student welfare support.'
      }
    ]
  },
  {
    name: 'Transfer & Credits',
    items: [
      {
        q: 'How do I transfer from another university?',
        a: "Transfer students should apply through the Registrar's Office with transcripts from their previous institution, a letter of good standing, and meet the minimum GPA requirement for their desired program."
      },
      {
        q: 'Will my previous credits be recognized?',
        a: "Credit transfer is evaluated on a case-by-case basis by the relevant Faculty Board. Courses that match Tansian's curriculum and were passed with a minimum grade may be accepted. You will receive a formal credit evaluation within 4 weeks of applying."
      },
      {
        q: 'Can I transfer between faculties within Tansian?',
        a: 'Yes, inter-faculty transfers are possible subject to meeting the requirements of the receiving faculty and approval by both Faculty Deans. Transfers are typically processed at the beginning of a new academic session.'
      }
    ]
  }
];

export default function FAQ() {
  const faqPageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Admissions');
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (catName, index) => {
    const key = `${catName}-${index}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCategory = faqCategories.find(c => c.name === activeCategory);

  // Filter by search query across all categories
  const searchResults = searchQuery.trim()
    ? faqCategories.flatMap(cat =>
        cat.items
          .filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => ({ ...item, category: cat.name }))
      )
    : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-page-sidebar > *', {
        x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out'
      });
      gsap.from('.faq-page-main > *', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-page-content', start: 'top 80%' }
      });
    }, faqPageRef);
    return () => ctx.revert();
  }, []);

  const renderFaqItem = (item, index, catName) => {
    const key = `${catName}-${index}`;
    const isOpen = openItems[key];
    return (
      <div className="faq-item" key={key}>
        <div
          className={`faq-question ${isOpen ? 'active' : ''}`}
          onClick={() => toggleItem(catName, index)}
        >
          <span>{item.q}</span>
          <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
            <Plus size={20} />
          </span>
        </div>
        <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
          <p>{item.a}</p>
        </div>
      </div>
    );
  };

  return (
    <div ref={faqPageRef}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Frequently Asked Questions</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">FAQ</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <section className="inner-page-section" style={{ paddingBottom: 0 }}>
        <div className="section-inner" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search all frequently asked questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '16px 48px 16px 50px',
                border: '1px solid var(--border)', borderRadius: '6px',
                fontSize: '1rem', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px'
              }}><X size={16} /></button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="inner-page-section faq-page-content">
        <div className="section-inner">
          {searchResults !== null ? (
            /* Search Results View */
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '8px' }}>
                Search Results
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              {searchResults.length > 0 ? (
                <div className="faq-page-main">
                  {searchResults.map((item, i) => (
                    <div key={i}>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', background: 'var(--primary)',
                        color: 'var(--white)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '1px',
                        textTransform: 'uppercase', borderRadius: '2px', marginBottom: '8px'
                      }}>{item.category}</span>
                      {renderFaqItem(item, i, 'search')}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h4 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>No results found</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Try different keywords or browse categories below.</p>
                  <button onClick={() => setSearchQuery('')} className="admission-card-btn" style={{ marginTop: '20px' }}>
                    Browse All FAQs <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Category View */
            <div className="faq-grid" style={{ gap: '60px' }}>
              <div className="faq-page-sidebar faq-left" style={{ paddingTop: 0 }}>
                <div className="faq-label">
                  <span className="section-label-line"></span>
                  <span>Topics</span>
                </div>
                <h2 className="faq-title" style={{ fontSize: '2rem', marginBottom: '28px' }}>Browse by Category</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
                  {faqCategories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      style={{
                        padding: '14px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        background: activeCategory === cat.name ? 'var(--primary)' : 'var(--off-white)',
                        color: activeCategory === cat.name ? 'var(--white)' : 'var(--text-light)',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {cat.name}
                      <span style={{
                        fontSize: '0.75rem',
                        opacity: activeCategory === cat.name ? 1 : 0.5,
                        background: activeCategory === cat.name ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                        padding: '2px 10px', borderRadius: '12px'
                      }}>{cat.items.length}</span>
                    </button>
                  ))}
                </div>

                <div className="faq-contact" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                  <span className="faq-contact-text" style={{ fontWeight: '600', color: 'var(--primary)' }}>Still have questions?</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a href="mailto:info@tansianuniversity.edu.ng" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <Mail size={14} color="var(--accent)" /> info@tansianuniversity.edu.ng
                    </a>
                    <a href="tel:+2348012345678" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <Phone size={14} color="var(--accent)" /> +234 801 234 5678
                    </a>
                  </div>
                  <Link to="/admissions" className="faq-contact-btn" style={{ marginTop: '8px' }}>
                    Contact Admissions <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="faq-page-main" style={{ paddingTop: '0' }}>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '1.5rem',
                  color: 'var(--primary)', marginBottom: '8px'
                }}>{activeCategory}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
                  {currentCategory.items.length} question{currentCategory.items.length !== 1 ? 's' : ''} in this category
                </p>
                {currentCategory.items.map((item, i) => renderFaqItem(item, i, activeCategory))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
