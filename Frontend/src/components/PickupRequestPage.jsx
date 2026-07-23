import React, { useState } from 'react';

export default function PickupRequestPage({ onNavigate }) {
  const [pickupForm, setPickupForm] = useState({
    clinicName: 'Aura Dental Clinic',
    caseNumber: '',
    materials: 'Silicone Impressions',
    date: new Date().toISOString().split('T')[0],
    time: '14:30',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPickupForm({
        clinicName: 'Aura Dental Clinic',
        caseNumber: '',
        materials: 'Silicone Impressions',
        date: new Date().toISOString().split('T')[0],
        time: '14:30',
        notes: ''
      });
    }, 4000);
  };

  return (
    <div className="landing-subpage-container">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="landing-section-tag">EXPRESS COURIER</span>
        <h1 className="subpage-title">
          SCHEDULE LABORATORY<br />
          PICKUPS WITHOUT MAKING A CALL.
        </h1>
        <p className="subpage-subtitle">
          Request a physical courier pickup for impressions, bite blocks, or plaster models instantly.
        </p>
      </section>

      {/* Courier Schedulers Grid */}
      <section className="subpage-content-section">
        <div className="landing-courier-grid" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          
          {/* Left Form Panel */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#10b981', lineHeight: '66px' }}>
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Courier Collection Scheduled!</h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '8px', lineHeight: '1.6' }}>
                    Your request has been dispatched to our courier dispatch center. A courier will arrive at <strong>{pickupForm.clinicName}</strong> on <strong>{pickupForm.date}</strong> around <strong>{pickupForm.time}</strong>.
                  </p>
                  <p style={{ color: '#64748b', fontSize: '11px', marginTop: '16px' }}>
                    Resetting form in a few seconds...
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', margin: 0 }}>
                  Courier Scheduling Form
                </h3>
                
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Clinic Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={pickupForm.clinicName}
                    onChange={(e) => setPickupForm({...pickupForm, clinicName: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Associated Case Number / Patient</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Case #J3-2486 or Patient Name"
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={pickupForm.caseNumber}
                    onChange={(e) => setPickupForm({...pickupForm, caseNumber: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Pickup Date</label>
                    <input 
                      type="date" 
                      required 
                      className="form-control" 
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                      value={pickupForm.date}
                      onChange={(e) => setPickupForm({...pickupForm, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Preferred Time</label>
                    <input 
                      type="time" 
                      required 
                      className="form-control" 
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                      value={pickupForm.time}
                      onChange={(e) => setPickupForm({...pickupForm, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Materials for Collection</label>
                  <select 
                    className="form-control" 
                    style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px' }}
                    value={pickupForm.materials}
                    onChange={(e) => setPickupForm({...pickupForm, materials: e.target.value})}
                  >
                    <option value="Silicone Impressions">Silicone / Alginate Impressions</option>
                    <option value="Plaster Models">Plaster / Stone Models</option>
                    <option value="Wax-ups">Bite Rims / Wax-ups</option>
                    <option value="Metal Substructures">Metal Frameworks</option>
                    <option value="Multiple Materials">Multiple Materials / Other</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>Special Instructions (Optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Gate codes, courier notes, urgent case details..."
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 14px', resize: 'vertical' }}
                    value={pickupForm.notes}
                    onChange={(e) => setPickupForm({...pickupForm, notes: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 'bold' }}>
                  Request Courier Pickup
                </button>
              </form>
            )}
          </div>

          {/* Right Guidelines Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <span className="landing-section-tag">COURIER SERVICE GUIDELINES</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginTop: '12px', marginBottom: '16px' }}>
                Safe Shipment Preparations
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                To protect models and impressions during transit, please follow these core packaging instructions:
              </p>
            </div>

            <div className="courier-guides-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(221, 167, 60, 0.1)', border: '1px solid #dda73c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dda73c', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>Sanitation Protocols</h4>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
                    All silicone impressions must be rinsed in cold water and disinfected with compliant sprays before packaging.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(221, 167, 60, 0.1)', border: '1px solid #dda73c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dda73c', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>Cushioned Containers</h4>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
                    Place stone models inside padded shipping bags or secure plaster model boxes wrapped in bubble wrap to prevent fractures.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(221, 167, 60, 0.1)', border: '1px solid #dda73c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dda73c', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>Prescription Forms</h4>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
                    Always insert a printed prescription slip matching your digital submission inside the box.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', background: 'rgba(221, 167, 60, 0.05)', border: '1px dashed rgba(221, 167, 60, 0.25)', borderRadius: '16px', marginTop: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#dda73c', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pickup Timings
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '12px', margin: 0, lineHeight: '1.6' }}>
                Requests submitted before <strong>11:00 AM</strong> are collected same-day. Requests submitted after 11:00 AM will be assigned for next-day morning collection.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
