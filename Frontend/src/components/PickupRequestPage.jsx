import React, { useState } from 'react';
import logosImg from '../assets/logos.png';

export default function PickupRequestPage({ onNavigate }) {
  const [pickupForm, setPickupForm] = useState({
    clinicName: '',
    doctorName: '',
    date: '',
    time: '',
    address: '',
    contactPersonDate: '', // date-type visual placeholder
    contactNumberTime: '', // time-type visual placeholder
    cases: '1',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPickupForm({
        clinicName: '',
        doctorName: '',
        date: '',
        time: '',
        address: '',
        contactPersonDate: '',
        contactNumberTime: '',
        cases: '1',
        notes: ''
      });
    }, 4000);
  };

  return (
    <div className="landing-subpage-container pickup-page-custom">
      
      {/* Background Watermark */}
      <img src={logosImg} alt="Watermark" className="pickup-bg-watermark" />

      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="pickup-subtitle-tag">Pickup Request</span>
        <h1 className="subpage-title-custom">
          SCHEDULE LABORATORY<br />
          PICKUPS WITHOUT MAKING A<br />
          CALL.
        </h1>
        <p className="subpage-desc-custom">
          Request a driver to collect your cases directly from your clinic. Track every pickup from request to completion.
        </p>
      </section>

      {/* Main Grid Content */}
      <section className="pickup-content-section-custom">
        <div className="pickup-main-grid">
          
          {/* Left Form Card */}
          <div className="pickup-form-card-white">
            {submitted ? (
              <div className="pickup-success-msg">
                <div className="pickup-success-icon">✓</div>
                <h3 className="pickup-success-title">Request Submitted!</h3>
                <p className="pickup-success-desc">
                  We have received your pickup request. A collection driver will be assigned shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pickup-form-grid">
                <div className="pickup-form-group">
                  <label className="pickup-form-label">CLINIC NAME *</label>
                  <input
                    type="text"
                    required
                    className="pickup-form-input"
                    value={pickupForm.clinicName}
                    onChange={(e) => setPickupForm({...pickupForm, clinicName: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Doctor Name*</label>
                  <input
                    type="text"
                    required
                    className="pickup-form-input"
                    value={pickupForm.doctorName}
                    onChange={(e) => setPickupForm({...pickupForm, doctorName: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Pickup Date *</label>
                  <input
                    type="date"
                    required
                    className="pickup-form-input"
                    value={pickupForm.date}
                    onChange={(e) => setPickupForm({...pickupForm, date: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Preferred Time *</label>
                  <input
                    type="time"
                    required
                    className="pickup-form-input"
                    value={pickupForm.time}
                    onChange={(e) => setPickupForm({...pickupForm, time: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group span-full">
                  <label className="pickup-form-label">Pickup Address *</label>
                  <input
                    type="text"
                    required
                    className="pickup-form-input"
                    value={pickupForm.address}
                    onChange={(e) => setPickupForm({...pickupForm, address: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Contact person *</label>
                  <input
                    type="date"
                    required
                    className="pickup-form-input"
                    value={pickupForm.contactPersonDate}
                    onChange={(e) => setPickupForm({...pickupForm, contactPersonDate: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Contact Number *</label>
                  <input
                    type="time"
                    required
                    className="pickup-form-input"
                    value={pickupForm.contactNumberTime}
                    onChange={(e) => setPickupForm({...pickupForm, contactNumberTime: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Number of Cases *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="pickup-form-input"
                    value={pickupForm.cases}
                    onChange={(e) => setPickupForm({...pickupForm, cases: e.target.value})}
                  />
                </div>

                <div className="pickup-form-group">
                  <label className="pickup-form-label">Special Notes</label>
                  <input
                    type="text"
                    className="pickup-form-input"
                    value={pickupForm.notes}
                    onChange={(e) => setPickupForm({...pickupForm, notes: e.target.value})}
                  />
                </div>

                <div className="pickup-form-action span-full">
                  <button type="submit" className="btn-pickup-submit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-pickup-icon">
                      <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>Request Pickup</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column Stack */}
          <div className="pickup-guidelines-stack">
            
            {/* Card 1: Pickup Process */}
            <div className="pickup-process-card-white">
              <h3 className="pickup-process-card-title">Pickup process</h3>
              <div className="pickup-steps-list">
                
                <div className="pickup-step-item">
                  <div className="pickup-step-badge">1</div>
                  <div className="pickup-step-content">
                    <h4 className="pickup-step-title">Submit request</h4>
                    <p className="pickup-step-desc">Fill the form with your clinic and case details.</p>
                  </div>
                </div>

                <div className="pickup-step-item">
                  <div className="pickup-step-badge">2</div>
                  <div className="pickup-step-content">
                    <h4 className="pickup-step-title">Driver assigned</h4>
                    <p className="pickup-step-desc">We assign a delivery executive to your route.</p>
                  </div>
                </div>

                <div className="pickup-step-item">
                  <div className="pickup-step-badge">3</div>
                  <div className="pickup-step-content">
                    <h4 className="pickup-step-title">OTP verification</h4>
                    <p className="pickup-step-desc">Confirm pickup with a one-time password.</p>
                  </div>
                </div>

                <div className="pickup-step-item">
                  <div className="pickup-step-badge">4</div>
                  <div className="pickup-step-content">
                    <h4 className="pickup-step-title">Received in lab</h4>
                    <p className="pickup-step-desc">Cases logged and production begins.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Same-day available */}
            <div className="same-day-card-white">
              <div className="same-day-icon-row">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bc9c74" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="same-day-card-title">Same -day available</h3>
              <p className="same-day-card-desc">
                Requests before 11 AM qualify for same-day collection in Coimbatore city limits.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

