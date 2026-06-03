import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Flame,
  Home as HomeIcon,
  Trophy,
  Compass,
  ArrowRight,
  MapPin,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function CampusLife() {
  const campusPageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from('.campus-intro-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Grid card animations
      gsap.from('.life-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.life-grid-section',
          start: 'top 75%'
        }
      });

      // Tour gallery animations
      gsap.from('.gallery-item', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 75%'
        }
      });
    }, campusPageRef);

    return () => ctx.revert();
  }, []);

  const dimensions = [
    {
      title: "Christian Spiritual Center",
      desc: "Rooted in our rich Catholic heritage, the Spiritual Center serves as the spiritual heartbeat of Tansian. Through daily Mass, counseling, and quiet reflection, we nurture character in alignment with the Total Man Concept.",
      features: ["Daily Chapel Services", "Blessed Tansi Devotional Hours", "Ecumenical & Spiritual Mentoring"],
      icon: <Flame size={28} />,
      image: "/ Spiritual.jpeg"
    },
    {
      title: "Premium Accommodation",
      desc: "A secure home away from home. Our modern, separate male and female hostels in Umunya and Oba offer comfortable study environments, 24/7 power backup, high-speed Wi-Fi, and dedicated live-in wardens.",
      features: ["24/7 Secured Boundaries", "Laundry & Common Study Areas", "Oba & Umunya Site Availability"],
      icon: <HomeIcon size={28} />,
      image: "/hstel.png"
    },
    {
      title: "Athletics & Tansian Warriors",
      desc: "Physical fitness is key to the Total Man development. Our student athletes excel in football, basketball, track, and lawn tennis. Take part in regional leagues and regular inter-faculty tournament cups.",
      features: ["Fully Equipped Sports Complex", "Tansian Warriors Soccer Team", "Sports Talent Scholarships"],
      icon: <Trophy size={28} />,
      image: "/Athletics.png"
    },
    {
      title: "Clubs & Leadership Societies",
      desc: "Step out of your comfort zone and lead. Students actively participate in the Debate Society, ICT Innovators Hub, Red Cross, Student Judicial Moots, and creative performing arts troupes.",
      features: ["Student Leadership Council", "ICT Hackathons & Incubators", "Drama, Music & Poetry Clubs"],
      icon: <Compass size={28} />,
      image: "/Clubs_&_Leadership_Societies.png"
    }
  ];

  const galleryImages = [
    { url: "/Management2.png", title: "Central Plaza" },
    { url: "/Library.png", title: "Modern Library Complex" },
    { url: "/FacultyofLaw.jpeg", title: "Faculty Moot Court" },
    { url: "/Natural_Science_Labs.jpeg", title: "Natural Science Labs" },
    { url: "/Gemini_Generated_Image_bhq8n4bhq8n4bhq8.png", title: "Umunya Main Gate" },
    { url: "/hall.png", title: "Auditorium Hall" }
  ];

  return (
    <div ref={campusPageRef}>
      {/* Inner Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Campus Life</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">Campus Life</span>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="about-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="campus-intro-content">
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>The Total Man Experience</span>
              </div>
              <h2 className="about-title" style={{ fontSize: '2.6rem', lineHeight: '1.2' }}>
                Where Bright Futures Build Lifelong Bonds
              </h2>
              <p className="about-text" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                At Tansian University, student life is intentionally crafted to develop all dimensions of the individual. We believe that learning extends far beyond academic lecture halls.
              </p>
              <p className="about-text" style={{ marginBottom: '28px' }}>
                Through an active community of service, vibrant physical recreational programs, deeply rewarding spiritual retreats, and high-fidelity leadership associations, we empower students to lead ethically, innovate creatively, and respect human dignity.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--off-white)', padding: '12px 20px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <Sparkles size={18} color="var(--accent)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>Safe & Inclusive Community</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--off-white)', padding: '12px 20px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <ShieldCheck size={18} color="var(--accent)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>24/7 Campus Security</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ position: 'relative' }}>
                <img
                  src="/black_student_library.png"
                  alt="Vibrant Student Community"
                  style={{ width: '100%', aspectRatio: '1.1', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-25px',
                  right: '25px',
                  background: 'var(--accent)',
                  color: 'var(--primary-dark)',
                  padding: '24px 30px',
                  borderRadius: '4px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  textAlign: 'center'
                }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.6rem', margin: 0 }}>Two Sites</p>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', margin: '4px 0 0' }}>Umunya & Oba Campuses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions of Campus Life */}
      <section className="inner-page-section alt-bg life-grid-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '60px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Our Ecosystem</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">The Pillars of Student Experience</h2>
            <p className="admissions-subtitle">
              From spiritual growth to housing and physical well-being, we sustain an environment where students thrive.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
            {dimensions.map((dim, index) => (
              <div
                className="life-card"
                key={index}
                style={{
                  background: 'var(--white)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={dim.image}
                    alt={dim.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="life-card-image"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,47,92,0.8) 0%, transparent 100%)' }}></div>
                  <div style={{ position: 'absolute', bottom: '20px', left: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0, paddingLeft: '10px' }}>
                      {dim.icon}
                    </div>
                    <h3 style={{ color: 'var(--white)', fontSize: '1.35rem', margin: 0, fontFamily: 'Playfair Display, serif' }}>{dim.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '24px' }}>{dim.desc}</p>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-dark)', marginBottom: '12px', fontWeight: '700' }}>Highlights Include:</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {dim.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Tour Gallery */}
      <section className="inner-page-section gallery-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '50px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Visual Gallery</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">Our Campuses In Focus</h2>
            <p className="admissions-subtitle">Take a virtual walk through the laboratories, moot courts, academic halls, and beautiful green squares that define Tansian.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  aspectRatio: '1.3',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  className="gallery-image"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,47,92,0.85) 0%, rgba(10,47,92,0.2) 60%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px'
                }} className="gallery-overlay">
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', marginBottom: '4px' }}>{img.title}</h4>
                    <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      View Campus Facility <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Banner Update Callout (Rich Red Color) */}
      <section style={{
        background: 'linear-gradient(135deg, #8a1414 0%, #a81c1c 100%)',
        color: 'var(--white)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none'
        }}></div>

        <div className="section-inner" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '16px' }}>Want to Experience the Campus in Person?</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 36px', fontSize: '1.05rem', opacity: '0.9', lineHeight: '1.7' }}>
            We host weekly campus guided tours for prospective candidates, parents, and secondary school groups at both our Umunya main campus and Oba professional health and law campuses.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admissions" className="campus-life-btn" style={{ background: 'var(--white)', color: '#8a1414', border: '1px solid var(--white)' }}>
              Arrange a Campus Tour
              <ArrowRight size={18} />
            </Link>
            <a href="mailto:info@tansianuniversity.edu.ng" className="btn-outline" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'var(--white)', padding: '16px 40px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '600' }}>
              Contact Student Affairs
            </a>
          </div>
        </div>
      </section>

      {/* Custom Styles for Hover Zoom Actions */}
      <style>{`
        .life-card:hover .life-card-image {
          transform: scale(1.05);
        }
        .gallery-item:hover .gallery-image {
          transform: scale(1.08);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
