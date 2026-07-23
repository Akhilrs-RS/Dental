import React, { useState } from 'react';

// Contact Icons
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="landing-subpage-container">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="landing-section-tag">CONTACT</span>
        <h1 className="subpage-title">
          GET IN TOUCH WITH<br />
          J3 DENTAL LAB.
        </h1>
        <p className="subpage-subtitle">
          Have a question about our services or need case support? Contact our laboratory division.
        </p>
      </section>

      {/* Contact Content Section */}
      <section className="subpage-content-section">
        <div className="landing-about-grid" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          
          {/* Left Column: Details & Mockup Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Info Cards */}
            <div className="contact-info-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', borderRadius: '16px', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(221,167,60,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPinIcon />
                </div>
                <div>
                  <h4 style={{ color: '#dda73c', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>Laboratory Address</h4>
                  <p style={{ color: '#ffffff', fontSize: '13px', margin: 0, fontWeight: '500' }}>102 Innovation Way, Suite 400, Tech City, TC 94016</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', borderRadius: '16px', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(221,167,60,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneIcon />
                </div>
                <div>
                  <h4 style={{ color: '#dda73c', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>Direct Phone Lines</h4>
                  <p style={{ color: '#ffffff', fontSize: '13px', margin: 0, fontWeight: '500' }}>+91 97899 93073, +91 97899 93076</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', borderRadius: '16px', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(221,167,60,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MailIcon />
                </div>
                <div>
                  <h4 style={{ color: '#dda73c', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>Email Enquiries</h4>
                  <p style={{ color: '#ffffff', fontSize: '13px', margin: 0, fontWeight: '500' }}>info@j3dentallab.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', borderRadius: '16px', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(221,167,60,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ClockIcon />
                </div>
                <div>
                  <h4 style={{ color: '#dda73c', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>Lab Operating Hours</h4>
                  <p style={{ color: '#ffffff', fontSize: '13px', margin: 0, fontWeight: '500' }}>Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Mock Chennai Map Panel */}
            <div className="contact-map-mockup" style={{ height: '220px', background: '#020408', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
              {/* Radial background and high-tech grid for map mockup */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, transparent 20%, #020408 80%), linear-gradient(rgba(221,167,60,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(221,167,60,0.02) 1px, transparent 1px)', backgroundSize: '100% 100%, 15px 15px, 15px 15px', opacity: 0.8 }} />
              
              {/* Gold Chennai pointer visual */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dda73c', border: '2px solid #fff', boxShadow: '0 0 10px #dda73c', animation: 'pulseGreen 2s infinite' }}></div>
                <div style={{ marginTop: '8px', padding: '6px 12px', background: '#dda73c', color: '#000', fontSize: '10px', fontWeight: 'bold', borderRadius: '6px', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 5px 15px rgba(221,167,60,0.3)' }}>
                  J3 Lab Chennai
                </div>
              </div>
              
              {/* Mock map roads */}
              <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', top: '35%', transform: 'rotate(15deg)' }}></div>
              <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', top: '65%', transform: 'rotate(-25deg)' }}></div>
              <div style={{ position: 'absolute', height: '100%', width: '2px', background: 'rgba(255,255,255,0.05)', left: '40%', transform: 'rotate(50deg)' }}></div>
            </div>

          </div>

          {/* Right Column: Enquiry Form */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#10b981', lineHeight: '66px' }}>
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Message Sent!</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '8px', lineHeight: '1.6' }}>
                    Thank you for contacting J3 Dental Lab. One of our clinical support technical representatives will get back to your email address at <strong>{form.email}</strong> shortly.
                  </p>
                  <p style={{ color: '#64748b', fontSize: '11px', marginTop: '16px' }}>
                    Resetting in a moment...
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', margin: 0 }}>
                  Send us a Message
                </h3>
                
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name"
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@clinic.com"
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Subject</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="How can we help you?"
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Message</label>
                  <textarea 
                    rows="4" 
                    required
                    placeholder="Details about your enquiry, custom restorations, or shipping queries..."
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px', resize: 'vertical' }}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 'bold' }}>
                  Send Enquiry Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
