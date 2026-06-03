import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Plus, GraduationCap, BookOpen, Globe, Volume2, CreditCard, Smartphone, Users, Monitor } from 'lucide-react';

export default function Home() {
  const homeRef = useRef(null);
  const programsContainerRef = useRef(null);
  const programsTrackRef = useRef(null);

  // Announcements State
  const announcements = [
    "Applications for the 2025/2026 Academic Session are now open. Post-UTME and Direct Entry screening is ongoing at both Umunya and Oba campuses.",
    "14th Convocation Ceremony held March 2025. Professor Ellis Idemobi inaugurated as new Pro-Chancellor.",
    "Very Rev. Fr. Dr. ESC Obiorah, SAN elected as new Chancellor. Guiding Tansian's Catholic mission forward."
  ];
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Hero Media State
  const leftImages = [
    '/monument.jpg',
    '/students.jpg',
    '/monument2.png'
  ];

  const rightVideos = [
    '/0_Student_Woman_1280x720.mp4',
    '/1474126_People_Technology_1280x720.mp4',
    '/1476153_People_1280x720.mp4'
  ];

  const [leftIndex, setLeftIndex] = useState(0);
  const [leftExitingIndex, setLeftExitingIndex] = useState(null);
  const [rightIndex, setRightIndex] = useState(0);
  const [rightExitingIndex, setRightExitingIndex] = useState(null);

  useEffect(() => {
    const leftTimer = setInterval(() => {
      setLeftIndex(prev => {
        setLeftExitingIndex(prev);
        return (prev + 1) % leftImages.length;
      });
    }, 5000);
    return () => clearInterval(leftTimer);
  }, [leftImages.length]);

  useEffect(() => {
    const rightTimer = setTimeout(() => {
      setRightIndex(prev => {
        setRightExitingIndex(prev);
        return (prev + 1) % rightVideos.length;
      });
      const interval = setInterval(() => {
        setRightIndex(prev => {
          setRightExitingIndex(prev);
          return (prev + 1) % rightVideos.length;
        });
      }, 5000);
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(rightTimer);
  }, [rightVideos.length]);

  // Auto-rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-label', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 })
        .from('.hero-title .line span', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out'
        }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('.hero-cta-group', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
        .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.3');

      // Hero Content scroll parallax
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Hero Background zoom out on scroll
      gsap.to('.hero-bg', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // About image main parallax slide
      gsap.from('.about-image-main', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // About image accent slide in
      gsap.from('.about-image-accent', {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // About Badge popup
      gsap.from('.about-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // About title slide up
      gsap.from('.about-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-right',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // About stats counters
      const stats = [
        { selector: '.stat-num-faculties', target: 6 },
        { selector: '.stat-num-programs', target: 50 },
        { selector: '.stat-num-campuses', target: 2 }
      ];

      stats.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
          gsap.to(el, {
            innerText: item.target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }
      });

      // Campus life parallax background
      gsap.to('.campus-life-bg', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.campus-life',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Campus life card contents
      gsap.from('.campus-life-content', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.campus-life',
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      });

      // Admissions headers
      gsap.from('.admissions-header', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.admissions',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Admissions card list
      gsap.from('.admission-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.admissions-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Feature cards animation
      const featureCards = gsap.utils.toArray('.feature-card');
      featureCards.forEach((card, index) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

    }, homeRef);

    return () => ctx.revert();
  }, []);

  // GSAP Horizontal Scroll Pinning (separate effect for clean viewport width checking)
  useEffect(() => {
    const track = programsTrackRef.current;
    const container = programsContainerRef.current;
    if (!track || !container) return;

    // Check width to ensure we only pin on desktop (screen width > 1024px)
    const initHorizontalScroll = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = trackWidth - viewportWidth + 100;

      if (viewportWidth > 1024) {
        const pinAnimation = gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'programsPin'
          }
        });
        return () => pinAnimation.scrollTrigger?.kill();
      }
    };

    const cleanup = initHorizontalScroll();

    // Refresh ScrollTrigger and re-initialize on resize
    const handleResize = () => {
      ScrollTrigger.getById('programsPin')?.kill();
      initHorizontalScroll();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleApplyClick = () => {
    // Navigate via standard HTML routing fallback if needed, but here we redirect or scroll
    window.location.hash = "#admissions";
  };

  return (
    <div ref={homeRef}>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>

        {/* Left Media Box */}
        <div className="hero-media-box hero-media-left">
          {leftImages.map((src, i) => {
            let className = 'media-item';
            if (i === leftIndex) className += ' active';
            else if (i === leftExitingIndex) className += ' exiting';
            return <img key={i} src={src} className={className} alt="Campus Life" />;
          })}
        </div>

        {/* Right Media Box */}
        <div className="hero-media-box hero-media-right">
          {rightVideos.map((src, i) => {
            let className = 'media-item';
            if (i === rightIndex) className += ' active';
            else if (i === rightExitingIndex) className += ' exiting';
            return (
              <video key={i} src={src} className={className} autoPlay muted loop playsInline />
            );
          })}
        </div>

        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-line"></span>
            <span>Est. 2009 — Umunya, Anambra State</span>
            <span className="hero-label-line"></span>
          </div>
          <h1 className="hero-title">
            <span className="line"><span>Knowledge Is Power.</span></span>
            <span className="line"><span>Character Is Foundation.</span></span>
          </h1>
          <p className="hero-desc">
            Tansian University is a private Christian university committed to academic excellence,
            spiritual formation, and ethical leadership. Founded by Rev. Prof. John Bosco Akam,
            we develop the Total Man through innovative education and research.
          </p>
          <div className="hero-cta-group">
            <Link to="/admissions" className="btn-primary">
              Begin Your Journey
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-outline">
              Discover Tansian
              <ChevronDown size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line"></div>
        </div>
      </section>

      {/* Announcement Bar */}
      <div className="announcement">
        <div className="announcement-inner">
          <span className="announcement-label">
            <Volume2 size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
            Announcement
          </span>
          <p className="announcement-text" id="announcementText">
            {announcements[currentAnnouncement]}
          </p>
          <div className="announcement-nav">
            <button onClick={prevAnnouncement} aria-label="Previous announcement"><ChevronLeft size={16} /></button>
            <button onClick={nextAnnouncement} aria-label="Next announcement"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-left">
              <img src="/monument.jpg" alt="Tansian University Students" className="about-image-main" />
              <img src="/students.jpg" alt="Campus Building" className="about-image-accent" />
              <div className="about-badge">
                <div className="about-badge-num">16+</div>
                <div className="about-badge-text">Years of Excellence</div>
              </div>
            </div>
            <div className="about-right">
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>About Tansian</span>
              </div>
              <h2 className="about-title">Building Knowledge, Restoring Pride.</h2>
              <p className="about-text">
                Tansian University (TANU) is a private Christian university located in Umunya,
                Oyi Local Government Area, Anambra State, Nigeria. Established on May 17, 2009,
                and named after the late Father Iwene Tansi, the university integrates academic
                excellence with spiritual, moral, and ethical values across six faculties.
              </p>
              <div className="about-mission">
                <p className="about-mission-text">
                  "To foster the individual student's intellectual, personal, cultural, and ethical
                  development; to build knowledge and restore the pride of the black man through
                  a Human Development Total Man Concept driven curriculum."
                </p>
                <p className="about-mission-author">— Tansian University Mission Statement</p>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-num stat-num-faculties">0</div>
                  <div className="stat-label">Faculties</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num stat-num-programs">0</div>
                  <div className="stat-label">Programs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num stat-num-campuses">0</div>
                  <div className="stat-label">Campuses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Tansian Section */}
      <section className="features-section" id="features">
        <div className="section-inner">
          <div className="features-grid">
            <div className="features-sticky-left">
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>The Tansian Advantage</span>
              </div>
              <h2 className="features-title">What Makes Tansian the Right Choice?</h2>
              <p className="features-desc">
                We've built a modern, seamless ecosystem designed to put you first. From instant digital payments to an immersive campus life, experience education without borders.
              </p>
            </div>
            <div className="features-cards-right">

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <CreditCard size={32} />
                </div>
                <h3>Seamless School Fees Payment</h3>
                <p>
                  No more bank queues. Make payments anywhere, anytime using our secure digital payment gateway. Track your transactions and instantly receive verifiable receipts directly via WhatsApp.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Monitor size={32} />
                </div>
                <h3>Unified Student Portal</h3>
                <p>
                  A powerful, centralized dashboard that makes academic life effortless. Register for courses, check your grades, access study materials, and manage your schedule all in one place.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Smartphone size={32} />
                </div>
                <h3>Digital Smart Cards</h3>
                <p>
                  Experience the future of campus security and identity. Our NFC-enabled digital smart cards provide secure access control to university facilities, library access, and identity verification.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <Users size={32} />
                </div>
                <h3>Vibrant Campus Experience</h3>
                <p>
                  Beyond academics, immerse yourself in a vibrant, community-driven environment. Engage in extracurricular activities, join student clubs, and build lifelong friendships on our state-of-the-art campuses.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Programs Section (Horizontal Scroll on Desktop) */}
      <section className="programs" id="programs" ref={programsContainerRef}>
        <div className="section-inner">
          <div className="programs-header">
            <div>
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>Academic Offerings</span>
              </div>
              <h2 className="programs-title">Our Programs<span className="dot">.</span></h2>
            </div>
            <Link to="/programs" className="programs-link">
              View All Programs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="programs-horizontal-wrapper">
          <div className="programs-track" ref={programsTrackRef} id="programsTrack">
            {[
              {
                tag: "Sciences",
                title: "Natural & Applied Sciences",
                desc: "Biochemistry, Chemistry, Computer Science, Industrial Chemistry, ICT, Microbiology, Physics & Electronics.",
                img: "/black_student_librarye.png"
              },
              {
                tag: "Business",
                title: "Management & Social Sciences",
                desc: "Accounting, Banking & Finance, Business Administration, Mass Communication, Economics, Political Science, International Relations.",
                img: "/Management2.png"
              },
        
              {
                tag: "Built Environment",
                title: "Environmental Sciences",
                desc: "Architecture, Estate Management, and Urban & Regional Planning — shaping sustainable communities for tomorrow.",
                img: "/Environmental.png"
              },
                    {
                tag: "Education",
                title: "Faculty of Education",
                desc: "Special Education, Arts Education, Science Education, and Social Science & Vocational Education with NCE Direct Entry options.",
                img: "/Education.png"
              },
              {
                tag: "Health",
                title: "Health Sciences",
                desc: "Nursing Science, Medical Laboratory Science, and Public Health — training compassionate healthcare professionals.",
                img: "/Health.png"
              },
              {
                tag: "Law",
                title: "Faculty of Law",
                desc: "Civil Law program accredited by the Nigerian National Universities Commission (NUC), preparing ethical legal practitioners.",
                img: "/FacultyofLaw.jpeg"
              },
              {
                tag: "Advanced",
                title: "Postgraduate Studies",
                desc: "PGD, M.Sc., MA, and PhD in Accountancy, Business Administration, Journalism, Political Science, Philosophy, Computer Science & more.",
                img: "/black_student_library.png"
              }
            ].map((prog, index) => (
              <div className="program-card" key={index}>
                <img src={prog.img} alt={prog.title} className="program-card-img" />
                <div className="program-card-body">
                  <span className="program-card-tag">{prog.tag}</span>
                  <h3 className="program-card-title">{prog.title}</h3>
                  <p className="program-card-desc">{prog.desc}</p>
                  <Link to="/programs" className="program-card-link">
                    Explore
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="campus-life" id="campus">
        <div className="campus-life-bg" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/Gemini_Generated_Image_bhq8n4bhq8n4bhq8.png)' }}></div>
        <div className="campus-life-content">
          <div className="campus-life-label">
            <span className="section-label-line" style={{ background: 'var(--accent)' }}></span>
            <span>Campus Life</span>
            <span className="section-label-line" style={{ background: 'var(--accent)' }}></span>
          </div>
          <h2 className="campus-life-title">A World of Ideas, One Campus.<br />Big Dreams Start at Tansian.</h2>
          <p className="campus-life-desc">
            Discover a vibrant, inclusive, and inspiring place to learn, grow, and connect.
            At Tansian University, campus life goes beyond the classroom — it is where futures
            are built, friendships are formed, and dreams take flight. Join us across our
            Umunya and Oba campuses.
          </p>
          <Link to="/campus-life" className="campus-life-btn">
            Join Tansian Today
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="news" id="news">
        <div className="section-inner">
          <div className="news-header">
            <div>
              <div className="section-label">
                <span className="section-label-line"></span>
                <span>Latest Updates</span>
              </div>
              <h2 className="news-title">Campus News<span className="dot">.</span></h2>
            </div>
            <Link to="/news" className="programs-link">
              See All News
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="news-grid">
            <div className="news-featured">
              <img src="/students.jpg" alt="Convocation" className="news-featured-img" />
              <div className="news-featured-overlay">
                <span className="news-featured-tag">Convocation</span>
                <h3 className="news-featured-title">14th Convocation Ceremony Celebrates Academic Excellence</h3>
                <p className="news-featured-excerpt">Tansian University held its 14th Convocation Ceremony, celebrating graduates across all six faculties and inaugurating new leadership under Professor Ellis Idemobi.</p>
                <Link to="/news" className="news-featured-link">
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="news-list">
              {[
                {
                  date: "March 2025",
                  title: "New Chancellor Elected: Very Rev. Fr. Dr. ESC Obiorah, SAN",
                  excerpt: "The Board of Trustees elected a new Chancellor to guide the university's Catholic mission and governance.",
                  img: "/black_students_graduating.png"
                },
                {
                  date: "January 2025",
                  title: "Post-UTME & Direct Entry Applications Now Open",
                  excerpt: "Applications for the 2025/2026 session are being accepted at both Umunya and Oba campuses.",
                  img: "/black_student_female.png"
                },
                {
                  date: "December 2024",
                  title: "Postgraduate Programs Expanded with New PhD Tracks",
                  excerpt: "New doctoral programs in Political Science, Computer Science, and Biochemistry now available.",
                  img: "/black_students_campus.png"
                }
              ].map((item, i) => (
                <Link to="/news" className="news-item" key={i}>
                  <img src={item.img} alt={item.title} className="news-item-img" />
                  <div className="news-item-body">
                    <div className="news-item-date">{item.date}</div>
                    <h4 className="news-item-title">{item.title}</h4>
                    <p className="news-item-excerpt">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section className="admissions" id="admissions">
        <div className="section-inner">
          <div className="admissions-header">
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Join Us</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">Begin Your Journey at Tansian</h2>
            <p className="admissions-subtitle">
              Whether you are a fresh UTME candidate, a Direct Entry applicant, or seeking
              postgraduate studies, we have a pathway for you.
            </p>
          </div>
          <div className="admissions-grid">
            <div className="admission-card">
              <div className="admission-card-icon">
                <GraduationCap size={28} />
              </div>
              <h3 className="admission-card-title">Undergraduate</h3>
              <p className="admission-card-desc">
                Apply via UTME or Direct Entry (NCE holders accepted). Choose from 50+ programs
                across six faculties. Minimum five O'Level credits required.
              </p>
              <Link to="/admissions" className="admission-card-btn">
                Apply Now
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="admission-card">
              <div className="admission-card-icon">
                <BookOpen size={28} />
              </div>
              <h3 className="admission-card-title">Postgraduate</h3>
              <p className="admission-card-desc">
                PGD, M.Sc., MA, and PhD programs in Accountancy, Business Administration,
                Journalism, Political Science, Philosophy, Computer Science & more.
              </p>
              <Link to="/admissions" className="admission-card-btn">
                Apply Now
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="admission-card">
              <div className="admission-card-icon">
                <Globe size={28} />
              </div>
              <h3 className="admission-card-title">International</h3>
              <p className="admission-card-desc">
                Tansian welcomes international students with English-taught programs.
                Contact our International Affairs Office for guidance and support.
              </p>
              <Link to="/admissions" className="admission-card-btn">
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="section-inner">
          <div className="faq-grid">
            <div className="faq-left">
              <div className="faq-label">
                <span className="section-label-line"></span>
                <span>Support</span>
              </div>
              <h2 className="faq-title">Answers That Keep You Moving Forward.</h2>

              {[
                {
                  q: "How do I apply to Tansian University?",
                  a: "Visit our admissions portal, pay N10,000 for the application form, complete your details online, then visit the Registrar's Office at Umunya or Oba campus with your credentials for verification and screening."
                },
                {
                  q: "What are the admission requirements?",
                  a: "You need minimum UTME score for your chosen course, five O'Level credits including English and Mathematics (WASC, NECO, GCE or NABTEB), and the required subject combinations. Direct Entry requires NCE or equivalent."
                },
                {
                  q: "Can I apply as an international student?",
                  a: "Yes, Tansian University welcomes international students. All programs are taught in English. You will need to provide academic credentials, passport, and meet English proficiency requirements. Contact our International Affairs Office for assistance."
                },
                {
                  q: "How do I transfer from another university?",
                  a: "Transfer students should apply through the Registrar's Office with transcripts from their previous institution, a letter of good standing, and meet the minimum GPA requirement for their desired program."
                }
              ].map((item, index) => (
                <div className="faq-item" key={index}>
                  <div className={`faq-question ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                    <span>{item.q}</span>
                    <span className={`faq-toggle ${activeFaq === index ? 'open' : ''}`}>
                      <Plus size={20} />
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === index ? 'open' : ''}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}

              <div className="faq-contact">
                <span className="faq-contact-text">My question is not here.</span>
                <Link to="/faq" className="faq-contact-btn">
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="faq-right">
              <img src="/blessfield-john-sgQM3gsGD9s-unsplash.jpg" alt="Students on Campus" className="faq-image" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
