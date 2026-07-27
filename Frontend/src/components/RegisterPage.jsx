import React, { useState } from 'react';
import homeBg from '../assets/home.png';

export default function RegisterPage({ onBack }) {
  const [form, setForm] = useState({
    clinicName: '',
    doctorName: '',
    phone: '',
    gstNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      onBack(); // go back after registration simulation completes
    }, 3000);
  };

  return (
    <div className="register-page-container">
      
      {/* Left Column: Cover Image & Copy */}
      <div className="register-hero-col" style={{ backgroundImage: `url(${homeBg})` }}>
        <div className="register-hero-overlay"></div>
        
        {/* Back Circle Button */}
        <button className="register-back-btn" onClick={onBack} aria-label="Go Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Text Overlay at bottom */}
        <div className="register-hero-text">
          <span className="register-portal-tag">Clinic Portal</span>
          <h2 className="register-hero-title">
            Precision Restorations,<br />
            Connected To Your Practice.
          </h2>
          <p className="register-hero-desc">
            Submit cases, upload scans, track production and manage invoices — all from one secure digital portal.
          </p>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="register-form-col">
        <div className="register-form-header">
          <h1 className="register-page-title">Register Your Clinic</h1>
          <p className="register-page-subtitle">Create a clinic account to submit cases and track production</p>
        </div>

        {/* White Card Box */}
        <div className="register-form-card">
          {registered ? (
            <div className="register-success-msg">
              <div className="register-success-icon">✓</div>
              <h3 className="register-success-title">Account Created!</h3>
              <p className="register-success-desc">
                Your clinic registration has been submitted successfully. Redirecting you home...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* Google Button */}
              <button type="button" className="btn-google-signin">
                <svg className="btn-google-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Continue With Google</span>
              </button>

              {/* Divider line */}
              <div className="register-divider-line">
                <span>OR CLINIC DETAILS</span>
              </div>

              {/* Fields Grid */}
              <div className="register-input-grid">
                
                <div className="register-input-group">
                  <label className="register-input-label">Clinic Name *</label>
                  <input
                    type="text"
                    required
                    className="register-input-field"
                    value={form.clinicName}
                    onChange={(e) => setForm({...form, clinicName: e.target.value})}
                  />
                </div>

                <div className="register-input-group">
                  <label className="register-input-label">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    className="register-input-field"
                    value={form.doctorName}
                    onChange={(e) => setForm({...form, doctorName: e.target.value})}
                  />
                </div>

                <div className="register-input-group">
                  <label className="register-input-label">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="register-input-field"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                  />
                </div>

                <div className="register-input-group">
                  <label className="register-input-label">GST Number</label>
                  <input
                    type="text"
                    className="register-input-field"
                    value={form.gstNumber}
                    onChange={(e) => setForm({...form, gstNumber: e.target.value})}
                  />
                </div>

                <div className="register-input-group span-2">
                  <label className="register-input-label">Email *</label>
                  <input
                    type="email"
                    required
                    className="register-input-field"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>

                <div className="register-input-group span-2">
                  <label className="register-input-label">Clinic Address*</label>
                  <input
                    type="text"
                    required
                    className="register-input-field"
                    value={form.address}
                    onChange={(e) => setForm({...form, address: e.target.value})}
                  />
                </div>

                {/* 3 Columns for address details */}
                <div className="register-input-group span-3-col">
                  <div>
                    <label className="register-input-label">City *</label>
                    <input
                      type="text"
                      required
                      className="register-input-field"
                      value={form.city}
                      onChange={(e) => setForm({...form, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="register-input-label">State*</label>
                    <input
                      type="text"
                      required
                      className="register-input-field"
                      value={form.state}
                      onChange={(e) => setForm({...form, state: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="register-input-label">Pincode*</label>
                    <input
                      type="text"
                      required
                      className="register-input-field"
                      value={form.pincode}
                      onChange={(e) => setForm({...form, pincode: e.target.value})}
                    />
                  </div>
                </div>

                <div className="register-input-group">
                  <label className="register-input-label">Password *</label>
                  <input
                    type="password"
                    required
                    className="register-input-field"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                </div>

                <div className="register-input-group">
                  <label className="register-input-label">Confirm*</label>
                  <input
                    type="password"
                    required
                    className="register-input-field"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                  />
                </div>

              </div>

              {/* Submit Action */}
              <div className="register-action-row">
                <button type="submit" className="btn-register-submit">
                  Register Clinic
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}
