import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  GraduationCap,
  BookOpen,
  Globe,
  ArrowRight,
  CheckCircle2,
  FileText,
  Users,
  ClipboardList,
  Send,
  X
} from 'lucide-react';

const pathways = [
  {
    icon: <GraduationCap size={28} />,
    title: 'UTME Undergraduate',
    desc: 'Apply via the Joint Admissions and Matriculation Board (JAMB). Choose Tansian University as your first choice, then complete our Post-UTME screening at either Umunya or Oba campuses.',
    requirements: [
      'Minimum UTME cut-off score for your chosen course',
      'Five O\'Level credits including English & Mathematics (WASC/NECO/GCE/NABTEB)',
      'Required subject combinations for your faculty',
      'Post-UTME screening form — ₦10,000'
    ]
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Direct Entry',
    desc: 'Holders of NCE, ND, HND, or equivalent diplomas may apply for direct entry admission into 200-level of their chosen program.',
    requirements: [
      'NCE with minimum of merit passes in relevant subjects',
      'ND/HND with minimum of Upper Credit',
      'Five O\'Level credits including English & Mathematics',
      'Valid JAMB Direct Entry registration'
    ]
  },
  {
    icon: <ClipboardList size={28} />,
    title: 'Postgraduate Studies',
    desc: 'PGD, Masters (M.Sc./MA), and PhD programs are available across multiple disciplines. Applicants must hold a recognized first degree.',
    requirements: [
      'Bachelor\'s degree with minimum of Second Class Lower Division',
      'NYSC discharge or exemption certificate',
      'Two academic references',
      'Research proposal (for PhD applicants)'
    ]
  },
  {
    icon: <Globe size={28} />,
    title: 'International Students',
    desc: 'Tansian University welcomes applications from international students. All programs are taught in English.',
    requirements: [
      'Valid international passport',
      'Certified academic transcripts with English translation',
      'English language proficiency evidence',
      'Student visa sponsorship letter from TANU upon admission'
    ]
  }
];

const steps = [
  { num: '01', title: 'Choose Your Program', desc: 'Browse our catalog of 50+ programs across six faculties and select the one that matches your aspirations.' },
  { num: '02', title: 'Submit Application', desc: 'Complete the online application form and pay the ₦10,000 application fee via bank transfer or online payment.' },
  { num: '03', title: 'Screening & Interview', desc: 'Attend the Post-UTME or Direct Entry screening at the Registrar\'s office. Bring original credentials for verification.' },
  { num: '04', title: 'Receive Admission', desc: 'Successful candidates receive an admission letter. Accept your offer and complete registration to begin your journey.' }
];

export default function Admissions() {
  const admissionsRef = useRef(null);
  const [expandedPathway, setExpandedPathway] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pathway-card-item', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pathways-section', start: 'top 75%' }
      });
      gsap.from('.step-item', {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-section', start: 'top 75%' }
      });
    }, admissionsRef);
    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Enter a valid email address';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.program.trim()) errors.program = 'Please select a program interest';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setShowForm(false);
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', program: '', message: '' });
        setFormErrors({});
      }, 3000);
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '14px 16px',
    border: `1px solid ${hasError ? '#c62828' : 'var(--border)'}`,
    borderRadius: '4px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    fontFamily: 'Inter, sans-serif',
    background: 'var(--white)'
  });

  return (
    <div ref={admissionsRef}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-pattern"></div>
        <div className="page-header-content">
          <h1 className="page-header-title">Admissions</h1>
          <div className="page-header-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="active">Admissions</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="inner-page-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '20px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>Join Us</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">Begin Your Journey at Tansian</h2>
            <p className="admissions-subtitle">
              Whether you are a fresh UTME candidate, a Direct Entry applicant, or seeking postgraduate studies, we have a pathway for you.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="inner-page-section alt-bg pathways-section" style={{ paddingTop: '60px' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
            {pathways.map((pw, i) => (
              <div
                key={i}
                className="pathway-card-item"
                style={{
                  background: 'var(--white)',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                }}
              >
                <div style={{ padding: '32px 28px' }}>
                  <div className="admission-card-icon" style={{ margin: '0 0 20px 0' }}>
                    {pw.icon}
                  </div>
                  <h3 className="admission-card-title" style={{ fontSize: '1.2rem' }}>{pw.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px' }}>{pw.desc}</p>
                  <button
                    onClick={() => setExpandedPathway(expandedPathway === i ? null : i)}
                    style={{
                      background: 'none', border: 'none', color: 'var(--primary)',
                      fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px', padding: 0
                    }}
                  >
                    {expandedPathway === i ? 'Hide Requirements' : 'View Requirements'}
                    <ArrowRight size={14} style={{ transform: expandedPathway === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                </div>

                <div style={{
                  maxHeight: expandedPathway === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                  background: 'var(--off-white)',
                  borderTop: expandedPathway === i ? '1px solid var(--border)' : 'none'
                }}>
                  <ul style={{ padding: '24px 28px', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {pw.requirements.map((req, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="inner-page-section steps-section">
        <div className="section-inner">
          <div className="admissions-header" style={{ marginBottom: '60px' }}>
            <div className="admissions-label">
              <span className="section-label-line"></span>
              <span>How to Apply</span>
              <span className="section-label-line"></span>
            </div>
            <h2 className="admissions-title">Application Process</h2>
            <p className="admissions-subtitle">Follow these four simple steps to begin your educational journey at Tansian University.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '36px' }}>
            {steps.map((step, i) => (
              <div key={i} className="step-item" style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: '700',
                  color: 'var(--off-white)', position: 'absolute', top: '-10px', left: '0',
                  lineHeight: '1', zIndex: 0,
                  WebkitTextStroke: '1px var(--border)'
                }}>{step.num}</div>
                <div style={{ position: 'relative', zIndex: 1, paddingTop: '28px', paddingLeft: '4px' }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '10px' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #8a1414 0%, #a81c1c 100%)',
        color: 'var(--white)', padding: '80px 0', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', pointerEvents: 'none'
        }}></div>
        <div className="section-inner" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', marginBottom: '16px' }}>Have Questions About Admissions?</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 36px', fontSize: '1.05rem', opacity: '0.9', lineHeight: '1.7' }}>
            Our admissions counselors are ready to help you choose the right program, understand requirements, and guide you through the application process.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="campus-life-btn"
            style={{ background: 'var(--white)', color: '#8a1414', border: '1px solid var(--white)' }}
          >
            <FileText size={18} /> Send an Inquiry
          </button>
        </div>
      </section>

      {/* Inquiry Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={{
            background: 'var(--white)', borderRadius: '8px', padding: '48px',
            maxWidth: '560px', width: '100%', position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <button onClick={() => setShowForm(false)} style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px'
            }}><X size={20} /></button>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2e7d32, #43a047)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', color: 'var(--white)'
                }}><CheckCircle2 size={36} /></div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '12px' }}>Inquiry Submitted!</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Our admissions team will reach out to you within 48 hours.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '8px' }}>Prospective Student Inquiry</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fill out the form below and our counselors will be in touch.</p>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px', display: 'block' }}>Full Name *</label>
                    <input style={inputStyle(formErrors.name)} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter your full name" />
                    {formErrors.name && <span style={{ fontSize: '0.78rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{formErrors.name}</span>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px', display: 'block' }}>Email *</label>
                      <input type="email" style={inputStyle(formErrors.email)} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@email.com" />
                      {formErrors.email && <span style={{ fontSize: '0.78rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{formErrors.email}</span>}
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px', display: 'block' }}>Phone *</label>
                      <input style={inputStyle(formErrors.phone)} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+234 ..." />
                      {formErrors.phone && <span style={{ fontSize: '0.78rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{formErrors.phone}</span>}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px', display: 'block' }}>Program of Interest *</label>
                    <select style={{ ...inputStyle(formErrors.program), appearance: 'auto' }} value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                      <option value="">Select a program category</option>
                      <option value="Natural & Applied Sciences">Natural & Applied Sciences</option>
                      <option value="Management & Social Sciences">Management & Social Sciences</option>
                      <option value="Education">Education</option>
                      <option value="Environmental Sciences">Environmental Sciences</option>
                      <option value="Health Sciences">Health Sciences</option>
                      <option value="Law">Law</option>
                      <option value="Postgraduate Studies">Postgraduate Studies</option>
                    </select>
                    {formErrors.program && <span style={{ fontSize: '0.78rem', color: '#c62828', marginTop: '4px', display: 'block' }}>{formErrors.program}</span>}
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px', display: 'block' }}>Message (Optional)</label>
                    <textarea style={{ ...inputStyle(false), minHeight: '100px', resize: 'vertical' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Any questions or additional information..."></textarea>
                  </div>
                  <button type="submit" className="admission-card-btn" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '0.95rem' }}>
                    <Send size={16} /> Submit Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .pathway-card-item:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }
      `}</style>
    </div>
  );
}
