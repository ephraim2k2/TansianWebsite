import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Search, X, Calendar, Clock, ChevronLeft } from 'lucide-react';

const allNews = [
  {
    id: 1,
    category: 'Academics',
    date: 'May 2025',
    title: '14th Convocation Ceremony Celebrates Academic Excellence',
    excerpt: 'Tansian University held its 14th Convocation Ceremony, celebrating graduates across all six faculties and inaugurating new leadership under Professor Ellis Idemobi.',
    body: 'The 14th Convocation Ceremony of Tansian University was a landmark occasion that recognized the academic achievements of hundreds of graduates from the faculties of Natural & Applied Sciences, Management & Social Sciences, Education, Environmental Sciences, Health Sciences, and Law. The event was graced by dignitaries from across the nation, including representatives from the National Universities Commission (NUC). Professor Ellis Idemobi was formally inaugurated as the new Pro-Chancellor, pledging to advance the university\'s mission of holistic education through the Total Man Concept.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80',
    featured: true
  },
  {
    id: 2,
    category: 'Events',
    date: 'March 2025',
    title: 'New Chancellor Elected: Very Rev. Fr. Dr. ESC Obiorah, SAN',
    excerpt: 'The Board of Trustees elected a new Chancellor to guide the university\'s Catholic mission and governance.',
    body: 'Very Rev. Fr. Dr. ESC Obiorah, SAN, has been elected as the new Chancellor of Tansian University by the Board of Trustees. Father Obiorah brings decades of experience in academic leadership and Catholic spiritual formation. He pledged to uphold the founding vision of the late Rev. Prof. John Bosco Akam and to strengthen the university\'s commitment to moral and intellectual excellence.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    featured: false
  },
  {
    id: 3,
    category: 'Academics',
    date: 'January 2025',
    title: 'Post-UTME & Direct Entry Applications Now Open',
    excerpt: 'Applications for the 2025/2026 session are being accepted at both Umunya and Oba campuses.',
    body: 'Tansian University is now accepting applications for the 2025/2026 academic session. Prospective students who chose Tansian University in their UTME can apply for Post-UTME screening. Direct Entry candidates with NCE, ND, or HND qualifications are also welcome. Application forms are available online and at the Registrar\'s offices on both campuses. The screening exercise includes a written assessment and oral interview.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    featured: false
  },
  {
    id: 4,
    category: 'Academics',
    date: 'December 2024',
    title: 'Postgraduate Programs Expanded with New PhD Tracks',
    excerpt: 'New doctoral programs in Political Science, Computer Science, and Biochemistry now available.',
    body: 'The School of Postgraduate Studies has announced the expansion of its doctoral offerings. New PhD programs are now available in Political Science, Computer Science, and Biochemistry. These programs are designed to produce cutting-edge researchers who can contribute to Nigeria\'s development. The university has also upgraded its research laboratories and library resources to support advanced research.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    featured: false
  },
  {
    id: 5,
    category: 'Sports',
    date: 'November 2024',
    title: 'Tansian Warriors Win Inter-University Football Championship',
    excerpt: 'The Tansian Warriors football team clinched the South-East Inter-University Football Championship title.',
    body: 'The Tansian Warriors football team delivered a stunning performance at the South-East Inter-University Football Championship, defeating five rival universities to claim the championship trophy. The final match, held at the Umunya campus sports complex, saw the Warriors triumph 3-1. Coach Emmanuel Obi praised the team\'s discipline and teamwork, attributes he credits to the university\'s emphasis on character development alongside physical excellence.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80',
    featured: false
  },
  {
    id: 6,
    category: 'Events',
    date: 'October 2024',
    title: 'Founder\'s Day Memorial: Remembering Rev. Prof. John Bosco Akam',
    excerpt: 'The university community gathered to honor the life and legacy of its visionary founder.',
    body: 'The annual Founder\'s Day Memorial brought together students, staff, alumni, and community members to celebrate the enduring legacy of the late Rev. Prof. John Bosco Akam. The day featured a special Mass at the Christian Spiritual Center, an academic symposium on the Total Man Concept, and a cultural showcase by students. Scholarships were awarded to outstanding students in Father Akam\'s honor.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    featured: false
  },
  {
    id: 7,
    category: 'Sports',
    date: 'September 2024',
    title: 'Annual Inter-Faculty Sports Festival Opens with Grand Ceremony',
    excerpt: 'Six faculties compete in athletics, basketball, volleyball, and chess during the week-long festival.',
    body: 'The Annual Inter-Faculty Sports Festival kicked off with a colorful opening ceremony at the Umunya sports complex. All six faculties paraded their athletes in a display of unity and healthy competition. The week-long event features competitions in athletics, football, basketball, volleyball, table tennis, and chess. The festival is a cornerstone of campus life, promoting physical fitness and camaraderie among students.',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c8e19?w=600&q=80',
    featured: false
  },
  {
    id: 8,
    category: 'Academics',
    date: 'August 2024',
    title: 'NUC Grants Full Accreditation to Faculty of Law Programs',
    excerpt: 'The National Universities Commission has granted full accreditation status to Tansian\'s law programs.',
    body: 'The National Universities Commission (NUC) has granted full accreditation to the programs offered by the Faculty of Law at Tansian University\'s Oba campus. This milestone recognizes the quality of legal education, the adequacy of facilities including the moot court, and the qualifications of the faculty. Graduates of the program are eligible to proceed to the Nigerian Law School for their Bar examinations.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    featured: false
  }
];

const categories = ['All', 'Academics', 'Events', 'Sports'];

export default function News() {
  const newsPageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = allNews.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = allNews.find(n => n.featured);
  const listArticles = filteredNews.filter(n => !n.featured || activeCategory !== 'All' || searchQuery);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-controls > *', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
      });
      gsap.from('.news-page-featured', {
        x: -50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.news-page-grid', start: 'top 80%' }
      });
      gsap.from('.news-page-card', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.news-page-list', start: 'top 80%' }
      });
    }, newsPageRef);
    return () => ctx.revert();
  }, []);

  // Modal overlay for article detail
  if (selectedArticle) {
    return (
      <div ref={newsPageRef}>
        <div className="page-header">
          <div className="page-header-pattern"></div>
          <div className="page-header-content">
            <h1 className="page-header-title">News & Events</h1>
            <div className="page-header-breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <span className="active" style={{ cursor: 'pointer' }} onClick={() => setSelectedArticle(null)}>News</span>
              <span className="separator">/</span>
              <span className="active">Article</span>
            </div>
          </div>
        </div>
        <section className="inner-page-section">
          <div className="section-inner" style={{ maxWidth: '860px' }}>
            <button onClick={() => setSelectedArticle(null)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', color: 'var(--primary)',
              fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '32px',
              padding: 0
            }}>
              <ChevronLeft size={18} /> Back to All News
            </button>
            <span className="news-featured-tag" style={{ display: 'inline-block', marginBottom: '16px' }}>{selectedArticle.category}</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: 'var(--primary)', marginBottom: '16px', lineHeight: '1.25' }}>
              {selectedArticle.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {selectedArticle.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> 4 min read</span>
            </div>
            <img src={selectedArticle.image} alt={selectedArticle.title} style={{
              width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '6px',
              marginBottom: '36px', boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
            }} />
            <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-light)', marginBottom: '20px' }}>
              {selectedArticle.body}
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Published: {selectedArticle.date}</span>
              <button onClick={() => setSelectedArticle(null)} className="admission-card-btn">
                More Stories <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={newsPageRef}>
      {/* Inner Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">News & Events</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">News</span>
          </div>
        </div>
      </div>

      {/* Controls: Category Bar + Search */}
      <section className="inner-page-section" style={{ paddingBottom: '0' }}>
        <div className="section-inner">
          <div className="news-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '4px',
                    border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                    background: activeCategory === cat ? 'var(--primary)' : 'var(--white)',
                    color: activeCategory === cat ? 'var(--white)' : 'var(--text-light)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px'
                }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured + Grid Layout */}
      <section className="inner-page-section" style={{ paddingTop: '0' }}>
        <div className="section-inner">
          {/* Featured Hero Article (only on unfiltered view) */}
          {activeCategory === 'All' && !searchQuery && featuredArticle && (
            <div className="news-page-grid" style={{ marginBottom: '56px' }}>
              <div
                className="news-page-featured"
                onClick={() => setSelectedArticle(featuredArticle)}
                style={{
                  position: 'relative', borderRadius: '6px', overflow: 'hidden',
                  cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                }}
              >
                <img src={featuredArticle.image} alt={featuredArticle.title} style={{
                  width: '100%', height: '480px', objectFit: 'cover', display: 'block',
                  transition: 'transform 0.5s ease'
                }} className="featured-news-img" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(5,26,53,0.95) 0%, rgba(5,26,53,0.3) 50%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '48px'
                }}>
                  <span className="news-featured-tag">{featuredArticle.category}</span>
                  <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '12px', lineHeight: '1.3', fontFamily: 'Playfair Display, serif' }}>
                    {featuredArticle.title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px', marginBottom: '20px' }}>
                    {featuredArticle.excerpt}
                  </p>
                  <span className="news-featured-link">
                    Read Full Story <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Article Cards Grid */}
          <div className="news-page-list" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px'
          }}>
            {listArticles.map(article => (
              <div
                key={article.id}
                className="news-page-card"
                onClick={() => setSelectedArticle(article)}
                style={{
                  background: 'var(--white)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }} className="news-card-img" />
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className="program-card-tag">{article.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: '600' }}>{article.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '10px', lineHeight: '1.35' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '20px',
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                  </p>
                  <span className="program-card-link">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)', marginBottom: '12px' }}>No articles found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .news-page-card:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }
        .news-page-card:hover .news-card-img { transform: scale(1.05); }
        .news-page-featured:hover .featured-news-img { transform: scale(1.03); }
      `}</style>
    </div>
  );
}
