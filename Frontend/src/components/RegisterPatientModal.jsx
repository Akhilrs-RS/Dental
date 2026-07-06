import React, { useState } from 'react';

export default function RegisterPatientModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [coveragePercent, setCoveragePercent] = useState('80');
  const [deductibleMet, setDeductibleMet] = useState(false);
  const [medicalAlerts, setMedicalAlerts] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const patientData = {
      name,
      age: parseInt(age) || 30,
      gender,
      phone,
      email,
      address,
      insurance: {
        provider: insuranceProvider || 'No Insurance / Self-Pay',
        policyNumber: policyNumber || 'N/A',
        coveragePercent: parseInt(coveragePercent) || 0,
        deductibleMet
      },
      medicalAlerts: medicalAlerts
        ? medicalAlerts.split(',').map(item => item.trim()).filter(Boolean)
        : []
    };

    onRegister(patientData);
    onClose();
    
    // Reset fields
    setName('');
    setAge('');
    setGender('Female');
    setPhone('');
    setEmail('');
    setAddress('');
    setInsuranceProvider('');
    setPolicyNumber('');
    setCoveragePercent('80');
    setDeductibleMet(false);
    setMedicalAlerts('');
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: '650px', width: '100%' }}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2 style={{ marginBottom: '8px' }}>Register New Patient</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Collect and enter the patient's personal details for first-time clinic registration.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Section 1: Demographics */}
          <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', margin: 0 }}>
            <legend style={{ padding: '0 8px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-teal)' }}>Personal Details</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Full Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. John Doe"
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Age</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  placeholder="e.g. 35"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Gender</label>
                <select 
                  className="form-control" 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Phone Number *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="e.g. (555) 123-4567"
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
              <label>Residential Address</label>
              <input 
                type="text" 
                className="form-control" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="e.g. 123 Pine St, Seattle WA"
              />
            </div>
          </fieldset>

          {/* Section 2: Insurance & Alerts */}
          <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', margin: 0 }}>
            <legend style={{ padding: '0 8px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-teal)' }}>Insurance & Health Alerts</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Insurance Provider</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={insuranceProvider} 
                  onChange={(e) => setInsuranceProvider(e.target.value)} 
                  placeholder="e.g. Delta Dental"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Policy ID Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={policyNumber} 
                  onChange={(e) => setPolicyNumber(e.target.value)} 
                  placeholder="e.g. DD-55410"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Coverage %</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={coveragePercent} 
                  onChange={(e) => setCoveragePercent(e.target.value)} 
                  min="0" 
                  max="100"
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <input 
                type="checkbox" 
                id="deductibleMetCheck"
                checked={deductibleMet} 
                onChange={(e) => setDeductibleMet(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="deductibleMetCheck" style={{ fontSize: '13px', cursor: 'pointer', userSelect: 'none', color: 'var(--text-primary)' }}>
                Deductible Met for Current Benefit Cycle
              </label>
            </div>

            <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
              <label>Medical Alerts & Allergies (Comma-separated)</label>
              <input 
                type="text" 
                className="form-control" 
                value={medicalAlerts} 
                onChange={(e) => setMedicalAlerts(e.target.value)} 
                placeholder="e.g. Penicillin Allergy, Heart Condition, Latex Allergy"
              />
            </div>
          </fieldset>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
