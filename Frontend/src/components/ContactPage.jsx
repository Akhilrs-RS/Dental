import React, { useState } from 'react';
import mapImg from '../assets/map.png';

// Contact Icons matching the screenshot
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    clinic: '',
    phone: '',
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
      setForm({ name: '', clinic: '', phone: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="landing-subpage-container contact-page-custom">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="contact-subtitle-tag">Contact</span>
        <h1 className="subpage-title-custom">
          GET IN TOUCH WITH J3 DENTAL<br />
          LAB.
        </h1>
        <p className="subpage-desc-custom">
          Whether it's a case question, a pickup issue or a billing query — our team is here to help
        </p>
      </section>

      {/* Contact Content Section */}
      <section className="contact-content-section-custom">
        <div className="contact-main-grid">
          
          {/* Left Column: Details & Map */}
          <div className="contact-left-stack">
            
            {/* Info Cards */}
            <div className="contact-info-card-white">
              <div className="contact-card-icon-box">
                <MapPinIcon />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Laboratory Address</h4>
                <p className="contact-card-detail">J3 Dental Laboratory, 14 Industrial Estate, Coimbatore, Tamil Nadu 641001</p>
              </div>
            </div>

            <div className="contact-info-card-white">
              <div className="contact-card-icon-box">
                <PhoneIcon />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Phone</h4>
                <p className="contact-card-detail">+91 4221234567</p>
              </div>
            </div>

            <div className="contact-info-card-white">
              <div className="contact-card-icon-box">
                <MailIcon />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Email</h4>
                <p className="contact-card-detail">hello @ j3dentallab.com</p>
              </div>
            </div>

            <div className="contact-info-card-white">
              <div className="contact-card-icon-box">
                <MailIcon />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">PickUp Support</h4>
                <p className="contact-card-detail">+91 4221234567</p>
              </div>
            </div>

            <div className="contact-info-card-white">
              <div className="contact-card-icon-box">
                <MailIcon />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Billing Support</h4>
                <p className="contact-card-detail">billing @3dentallab.com</p>
              </div>
            </div>

            {/* Map Image */}
            <div className="contact-map-wrapper">
              <img src={mapImg} className="contact-map-image" alt="Coimbatore Map Location" />
            </div>

          </div>

          {/* Right Column: Enquiry Form */}
          <div className="contact-form-card-white">
            {submitted ? (
              <div className="contact-success-msg">
                <div className="contact-success-icon">✓</div>
                <h3 className="contact-success-title">Message Sent!</h3>
                <p className="contact-success-desc">
                  Thank you for reaching out to J3 Dental Lab. We will respond to your message shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-grid">
                <h3 className="contact-form-card-title">Send us a Message</h3>
                
                <div className="contact-form-group">
                  <label className="contact-form-label">Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="contact-form-input"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Clinic</label>
                  <input 
                    type="text" 
                    className="contact-form-input"
                    value={form.clinic}
                    onChange={(e) => setForm({...form, clinic: e.target.value})}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Phone *</label>
                  <input 
                    type="tel" 
                    required 
                    className="contact-form-input"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Email *</label>
                  <input 
                    type="email" 
                    required 
                    className="contact-form-input"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>

                <div className="contact-form-group span-full">
                  <label className="contact-form-label">Subject*</label>
                  <input 
                    type="text" 
                    required 
                    className="contact-form-input"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                  />
                </div>

                <div className="contact-form-group span-full">
                  <label className="contact-form-label">Message</label>
                  <textarea 
                    rows="6" 
                    className="contact-form-input textarea"
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                </div>

                <div className="contact-form-action span-full">
                  <button type="submit" className="btn-contact-submit">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}



