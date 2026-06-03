import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { GraduationCap, Award, Calendar, BookOpen, Search, ArrowRight } from 'lucide-react';

export default function Programs() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pageRef = useRef(null);

  // Run ONCE on mount — animates tab buttons only
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faculty-tabs > button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Run on tab change — animates course cards only
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.program-list-grid > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeTab]);

  const faculties = [
    {
      name: "Natural & Applied Sciences",
      icon: <Award size={18} />,
      tagline: "Unlocking innovation, analytical research, and digital transformation.",
      campuses: "Umunya Main Campus",
      courses: [
        { name: "Computer Science", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Physics, and 2 other science subjects." },
        { name: "Biochemistry", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Biology, Chemistry, and Physics." },
        { name: "Microbiology", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Biology, Chemistry, and Physics." },
        { name: "Information & Communication Tech (ICT)", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Physics, and 2 other sciences." },
        { name: "Industrial Chemistry", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Chemistry, Physics, and Biology." },
        { name: "Physics with Electronics", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Physics, and Chemistry/Geography." }
      ]
    },
    {
      name: "Management & Social Sciences",
      icon: <BookOpen size={18} />,
      tagline: "Developing corporate leaders, public policy experts, and ethical communicators.",
      campuses: "Umunya Main Campus",
      courses: [
        { name: "Mass Communication", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Literature in English, and 2 social sciences." },
        { name: "Business Administration", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Economics, and Commercial subjects." },
        { name: "Accounting", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Economics, and Financial Accounting." },
        { name: "Political Science", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Government/History, and 2 others." },
        { name: "International Relations", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Government/History, and Literature." },
        { name: "Economics", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Economics, and 2 social sciences." },
        { name: "Banking & Finance", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits including English, Math, Economics, and Accounting." }
      ]
    },
    {
      name: "Health Sciences",
      icon: <GraduationCap size={18} />,
      tagline: "Training compassionate health professionals to engineer clinical care.",
      campuses: "Oba Professional Campus",
      courses: [
        { name: "Nursing Science", degree: "B.N.Sc.", duration: "5 Years", reqs: "5 O'Level credits in English, Math, Physics, Chemistry, and Biology. WAEC/NECO sitting strictly <= 2." },
        { name: "Medical Laboratory Science", degree: "B.MLS", duration: "5 Years", reqs: "5 O'Level credits in English, Math, Physics, Chemistry, and Biology." },
        { name: "Public Health", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Biology, Chemistry, and Physics." }
      ]
    },
    {
      name: "Faculty of Law",
      icon: <Award size={18} />,
      tagline: "Molding advocates of justice and legal reformers.",
      campuses: "Oba Professional Campus",
      courses: [
        { name: "Civil Law", degree: "LL.B.", duration: "5 Years", reqs: "5 O'Level credits in English, Math, Literature in English, Government, and 1 other art subject." }
      ]
    },
    {
      name: "Environmental Sciences",
      icon: <BookOpen size={18} />,
      tagline: "Designing structural, sustainable habitats for tomorrow's environment.",
      campuses: "Umunya Main Campus",
      courses: [
        { name: "Architecture", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Physics, Chemistry, and Geography/Fine Arts." },
        { name: "Estate Management", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Economics, Physics, and Geography/Chemistry." },
        { name: "Urban & Regional Planning", degree: "B.Sc.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Geography, Economics, and 1 science." }
      ]
    },
    {
      name: "Faculty of Education",
      icon: <GraduationCap size={18} />,
      tagline: "Preparing educators to inspire intellectual growth and vocational skills.",
      campuses: "Umunya Main Campus",
      courses: [
        { name: "Special Education", degree: "B.Ed.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, and 3 relevant subjects (Arts/Sciences)." },
        { name: "Science Education (Biology, Chemistry, Computer)", degree: "B.Sc.Ed.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Biology/Chemistry/Physics, and 2 sciences." },
        { name: "Social Science Education", degree: "B.Ed.", duration: "4 Years", reqs: "5 O'Level credits in English, Math, Economics/Government, and 2 social sciences." }
      ]
    },
    {
      name: "Postgraduate School",
      icon: <GraduationCap size={18} />,
      tagline: "Advancing scholarly expertise, doctoral research, and corporate credentials.",
      campuses: "Umunya & Oba Campuses",
      courses: [
        { name: "Accountancy (PGD, M.Sc., PhD)", degree: "M.Sc./PhD", duration: "1.5 - 3 Years", reqs: "Relevant Bachelor's degree (minimum 2nd Class Lower) or Higher National Diploma with PGD." },
        { name: "Business Administration (PGD, M.Sc., PhD)", degree: "M.Sc./PhD", duration: "1.5 - 3 Years", reqs: "B.Sc. in Business Administration or PGD with CGPA >= 3.0." },
        { name: "Microbiology (PGD, M.Sc., PhD)", degree: "M.Sc./PhD", duration: "1.5 - 3 Years", reqs: "B.Sc. in Microbiology, Biochemistry, or biological sciences." },
        { name: "Computer Science (PGD, M.Sc., PhD)", degree: "M.Sc./PhD", duration: "1.5 - 3 Years", reqs: "B.Sc. in Computer Science, ICT, or Mathematics with relevant programming competency." },
        { name: "Political Science & Journalism", degree: "MA/PhD", duration: "1.5 - 3 Years", reqs: "B.Sc./BA in Political Science, Mass Comm, or social sciences." }
      ]
    }
  ];

  const filteredCourses = faculties[activeTab].courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={pageRef}>
      {/* Inner Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Academic Offerings</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">Programs</span>
          </div>
        </div>
      </div>

      {/* Course Explorer Section */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '40px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Find Your Fit</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">Our Faculties & Degrees</h2>
            <p className="admissions-subtitle">
              We offer NUC-accredited undergraduate and postgraduate programs across two campuses, engineered to produce the "Total Man".
            </p>
          </div>

          {/* Search bar */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 50px',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--off-white)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '12px 18px',
          }}>
            <Search size={18} color="var(--text-light)" style={{ marginRight: '10px' }} />
            <input
              type="text"
              placeholder="Search departments (e.g. Computer Science)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem',
                color: 'var(--text)'
              }}
            />
          </div>

          {/* Faculty Tabs */}
          <div className="faculty-tabs" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--light-gray)',
            paddingBottom: '20px'
          }}>
            {faculties.map((fac, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(i); setSearchQuery(''); }}
                style={{
                  padding: '12px 24px',
                  background: activeTab === i ? 'var(--primary)' : 'var(--off-white)',
                  color: activeTab === i ? 'var(--white)' : 'var(--text-light)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                {fac.icon}
                {fac.name}
              </button>
            ))}
          </div>

          {/* Tagline of Active Faculty */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'var(--white)',
            padding: '30px 40px',
            borderRadius: '4px',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700', letterSpacing: '2px' }}>
                Active School / Faculty
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginTop: '4px', color: 'var(--white)' }}>
                {faculties[activeTab].name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginTop: '6px', maxWidth: '650px' }}>
                {faculties[activeTab].tagline}
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 18px', borderRadius: '4px', borderLeft: '3px solid var(--accent)' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', display: 'block' }}>Location</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{faculties[activeTab].campuses}</span>
            </div>
          </div>

          {/* Courses List Grid */}
          <div className="program-list-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px'
          }}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div key={index} style={{
                  background: 'var(--off-white)',
                  borderRadius: '4px',
                  padding: '32px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{
                        background: 'var(--primary)',
                        color: 'var(--white)',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '2px',
                        textTransform: 'uppercase'
                      }}>{course.degree}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Calendar size={14} color="var(--accent)" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '12px' }}>
                      {course.name}
                    </h4>

                    <div style={{ borderTop: '1px solid var(--light-gray)', paddingTop: '14px', marginTop: '14px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>
                        Minimum Requirements
                      </span>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.5' }}>
                        {course.reqs}
                      </p>
                    </div>
                  </div>

                  <Link to="/admissions" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--primary)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    marginTop: '20px',
                    transition: 'gap 0.3s'
                  }} className="program-card-link">
                    Apply for this course
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                No departments found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}