import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, BookOpen, ShieldCheck, Heart, Users, MapPin } from 'lucide-react';

export default function About() {
  const aboutPageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-intro-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.values-grid > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 75%'
        }
      });
    }, aboutPageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutPageRef}>
      {/* Inner Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">About Tansian</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">About</span>
          </div>
        </div>
      </div>

      {/* Main Philosophy & Founder Tribute */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="about-grid" style={{ gridTemplateColumns: '1.1fr 0.9fr', gap: '60px' }}>
            <div className="about-intro-content">
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>Our Heritage</span>
              </div>
              <h2 className="about-title" style={{ fontSize: '2.5rem' }}>The Legacy of Reverend Father Akam</h2>
              <p className="about-text" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                Tansian University (TANU) was founded on May 17, 2009, by the late **Rev. Prof. John Bosco Akam**, a renowned Catholic priest, philanthropist, and academic visionary. Inspired by the holy life of Blessed Cyprian Michael Iwene Tansi, Father Akam set out to build an institution that would rescue high moral values and restore the intellectual pride of the African youth.
              </p>
              <p className="about-text" style={{ marginBottom: '24px' }}>
                TANU is built upon the **"Total Man Concept"**—a philosophy that emphasizes that education is only complete when the human intellect is refined in harmony with moral rectitude, spiritual discipline, and professional skills. Our university trains students to excel academically while instilling the fear of God, accountability, and responsibility.
              </p>
              <div className="about-mission" style={{ padding: '30px' }}>
                <p className="about-mission-text" style={{ fontSize: '1.25rem', color: 'var(--primary-light)' }}>
                  "We do not merely produce graduates with certificates; we mold complete citizens who possess the technical intelligence to engineer society and the spiritual compass to govern with integrity."
                </p>
                <p className="about-mission-author">— Late Rev. Prof. John Bosco Akam, Founder</p>
              </div>
            </div>
            <div>
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80" 
                  alt="Late Rev. Prof. John Bosco Akam" 
                  className="about-image-main" 
                  style={{ width: '100%', aspectRatio: '1', borderRadius: '8px', objectPosition: 'center 15%' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-20px', 
                  left: '20px', 
                  right: '20px', 
                  background: 'var(--primary)', 
                  color: 'var(--white)',
                  padding: '20px',
                  borderRadius: '4px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    "Knowledge is power, but character is the anchor of power."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="inner-page-section alt-bg values-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '60px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Our Pillars</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">The Core Values of TANU</h2>
            <p className="admissions-subtitle">
              Every lecture, spiritual exercise, and community action at Tansian is driven by five essential pillars.
            </p>
          </div>

          <div className="admissions-grid values-grid">
            {[
              {
                title: "Christian Character",
                desc: "Spiritual formation based on Christian principles, molding graduates who stand as moral beacons in their professional fields.",
                icon: <Heart size={28} />
              },
              {
                title: "Academic Honor",
                desc: "Rigorous scientific investigation, critical thought, and professional training guided by fully certified, experienced faculty.",
                icon: <BookOpen size={28} />
              },
              {
                title: "Social Accountability",
                desc: "Cultivating respect for human dignity, patriotic service, and a deep consciousness of giving back to rural and urban communities.",
                icon: <Users size={28} />
              },
              {
                title: "Leadership Skill",
                desc: "Equipping graduates with advanced communications, computing, and organizational capabilities to manage enterprises ethically.",
                icon: <ShieldCheck size={28} />
              }
            ].map((value, i) => (
              <div className="admission-card" key={i} style={{ padding: '36px 28px', textAlign: 'left', alignItems: 'flex-start' }}>
                <div className="admission-card-icon" style={{ margin: '0 0 20px 0' }}>
                  {value.icon}
                </div>
                <h3 className="admission-card-title" style={{ fontSize: '1.25rem' }}>{value.title}</h3>
                <p className="admission-card-desc" style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Locations Section */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="about-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <div>
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>Our Infrastructure</span>
              </div>
              <h2 className="about-title">Double Campus Advantage</h2>
              <p className="about-text" style={{ marginBottom: '32px' }}>
                Tansian University operates on two modern campuses in Anambra State, strategically designed to support specialized scientific research, professional legal training, and safe clinical operations.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <MapPin size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Umunya Main Campus</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6' }}>
                      Located in Oyi LGA along the Enugu-Onitsha Expressway. It houses the central administration, Faculty of Natural & Applied Sciences, Faculty of Environmental Sciences, Faculty of Education, and Faculty of Management Sciences. Designed for expansive, calm intellectual exploration.
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <MapPin size={24} color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>Oba Professional Campus</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6' }}>
                      Located in Idemili South LGA. It acts as our highly specialized hub housing the Faculty of Health Sciences (Nursing, Public Health, Medical Lab Sciences) and the esteemed Faculty of Law. Features high-fidelity labs and moot courts proximate to regional specialized hospitals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" 
                alt="Umunya Campus Buildings" 
                style={{ width: '100%', aspectRatio: '0.8', borderRadius: '4px', objectFit: 'cover' }} 
              />
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80" 
                alt="Student Classroom Oba Campus" 
                style={{ width: '100%', aspectRatio: '0.8', borderRadius: '4px', objectFit: 'cover', marginTop: '30px' }} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
