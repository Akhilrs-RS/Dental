import React, { useState, useEffect } from 'react';
import { ADA_CODES } from '../data/mockData';

export default function TreatmentPlanner({ patients, activePatientId, onUpdatePatient, onSelectPatient }) {
  const [selectedCode, setSelectedCode] = useState(ADA_CODES[0].code);
  const [selectedTooth, setSelectedTooth] = useState('General');
  const [showReceipt, setShowReceipt] = useState(false);
  const [claimStatus, setClaimStatus] = useState('idle'); // idle, submitting, approved
  const [claimResponse, setClaimResponse] = useState(null);

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];

  // Initialize a default treatment plan if none exists
  useEffect(() => {
    if (activePatient && !activePatient.treatmentPlan) {
      let defaultPlan = [];
      if (activePatient.id === 'P-101') {
        defaultPlan = [
          { id: 'tp-1', code: 'D0220', name: 'Intraoral Radiograph (Periapical)', tooth: '3', price: 45, status: 'approved' },
          { id: 'tp-2', code: 'D2393', name: 'Resin Composite - 3 Surfaces (Posterior)', tooth: '3', price: 260, status: 'planned' }
        ];
      } else if (activePatient.id === 'P-102') {
        defaultPlan = [
          { id: 'tp-3', code: 'D2740', name: 'Crown - Porcelain/Ceramic', tooth: '8', price: 1250, status: 'planned' }
        ];
      } else if (activePatient.id === 'P-104') {
        defaultPlan = [
          { id: 'tp-4', code: 'D2391', name: 'Resin Composite - 1 Surface (Posterior)', tooth: '12', price: 185, status: 'planned' },
          { id: 'tp-5', code: 'D2391', name: 'Resin Composite - 1 Surface (Posterior)', tooth: '20', price: 185, status: 'planned' }
        ];
      } else {
        defaultPlan = [
          { id: 'tp-6', code: 'D1110', name: 'Prophylaxis (Adult Cleaning)', tooth: 'General', price: 95, status: 'planned' }
        ];
      }
      onUpdatePatient(activePatient.id, { ...activePatient, treatmentPlan: defaultPlan });
    }
  }, [activePatientId]);

  if (!activePatient) {
    return <div className="card">Please select a patient to access the Treatment Planner.</div>;
  }

  const treatmentPlan = activePatient.treatmentPlan || [];

  const handleAddProcedure = (e) => {
    e.preventDefault();
    const selectedAda = ADA_CODES.find(c => c.code === selectedCode);
    if (!selectedAda) return;

    const newItem = {
      id: 'tp-' + Date.now(),
      code: selectedAda.code,
      name: selectedAda.name,
      tooth: selectedTooth,
      price: selectedAda.price,
      status: 'planned'
    };

    const updatedPlan = [...treatmentPlan, newItem];
    onUpdatePatient(activePatient.id, { ...activePatient, treatmentPlan: updatedPlan });
    setShowReceipt(false); // Reset receipt on change
    setClaimStatus('idle');
  };

  const handleRemoveProcedure = (itemId) => {
    const updatedPlan = treatmentPlan.filter(item => item.id !== itemId);
    onUpdatePatient(activePatient.id, { ...activePatient, treatmentPlan: updatedPlan });
    setShowReceipt(false);
    setClaimStatus('idle');
  };

  const handleToggleCompleted = (itemId) => {
    const updatedPlan = treatmentPlan.map(item => {
      if (item.id === itemId) {
        return { ...item, status: item.status === 'completed' ? 'planned' : 'completed' };
      }
      return item;
    });
    onUpdatePatient(activePatient.id, { ...activePatient, treatmentPlan: updatedPlan });
    setShowReceipt(false);
    setClaimStatus('idle');
  };

  // Calculations
  const subtotal = treatmentPlan.reduce((sum, item) => sum + item.price, 0);
  const insRate = activePatient.insurance.coveragePercent / 100;
  const insuranceCoverage = subtotal * insRate;
  const patientResponsibility = subtotal - insuranceCoverage;

  // Electronic Claim Submission Simulation
  const handleSimulateClaim = () => {
    setClaimStatus('submitting');
    setTimeout(() => {
      setClaimStatus('approved');
      setClaimResponse({
        claimId: 'CLM-' + Math.floor(100000 + Math.random() * 900000),
        clearinghouse: 'Emdeon / Change Healthcare',
        approvedAmount: insuranceCoverage,
        patientResponsibility: patientResponsibility,
        authCode: 'AUTH-' + Math.floor(5000 + Math.random() * 5000),
        message: 'Claim processed successfully. Electronic funds transfer scheduled.'
      });
    }, 2500); // 2.5 seconds loading for high production effect
  };

  // Printable receipt window toggle
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Patient selector bar */}
      <div className="card flex-between">
        <div>
          <h2>Treatment Planning & Ledger Studio</h2>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Patient: <strong>{activePatient.name}</strong> ({activePatient.id}) | Insurer: <strong>{activePatient.insurance.provider}</strong>
          </div>
        </div>
        
        <div className="flex-row-center">
          <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Patient:</label>
          <select 
            className="form-control"
            value={activePatient.id}
            onChange={(e) => {
              onSelectPatient(e.target.value);
              setShowReceipt(false);
              setClaimStatus('idle');
            }}
            style={{ width: '200px' }}
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-main-layout">
        
        {/* Left Side: Planner List & Procedure Adder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Procedure Adder Form */}
          <div className="card">
            <h2>Add Procedure to Treatment Plan</h2>
            <form onSubmit={handleAddProcedure} className="mt-md" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', alignItems: 'end' }}>
              <div className="form-group">
                <label>Procedure Code (ADA)</label>
                <select 
                  className="form-control"
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                >
                  {ADA_CODES.map(ada => (
                    <option key={ada.code} value={ada.code}>
                      [{ada.code}] {ada.name} - ₹{ada.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tooth # / Area</label>
                <select 
                  className="form-control"
                  value={selectedTooth}
                  onChange={(e) => setSelectedTooth(e.target.value)}
                >
                  <option value="General">General / Full Mouth</option>
                  {Array.from({ length: 32 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n.toString()}>Tooth #{n}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ height: '42px', marginBottom: '16px' }}>
                + Add Procedure
              </button>
            </form>
          </div>

          {/* Active Treatment Plan Checklist */}
          <div className="card">
            <h2>Proposed Treatment Procedures</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Toggle checkbox to mark a planned procedure as Completed to prepare the billing invoice.
            </p>
            
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>Mark</th>
                    <th>Tooth</th>
                    <th>ADA Code</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'right' }}>Cost</th>
                    <th style={{ textAlign: 'center', width: '80px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentPlan.length > 0 ? (
                    treatmentPlan.map((item) => (
                      <tr key={item.id} style={{ opacity: item.status === 'completed' ? 0.75 : 1 }}>
                        <td style={{ textAlign: 'center' }}>
                          <input 
                            type="checkbox"
                            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            checked={item.status === 'completed'}
                            onChange={() => handleToggleCompleted(item.id)}
                            title="Toggle Completed"
                          />
                        </td>
                        <td>
                          <span className="badge badge-info" style={{ padding: '2px 6px' }}>
                            {item.tooth}
                          </span>
                        </td>
                        <td><strong>{item.code}</strong></td>
                        <td>{item.name}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.price.toFixed(2)}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--color-fracture)' }}
                            onClick={() => handleRemoveProcedure(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                        No procedures planned. Use the form above to add treatments.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Ledger and Claim Submissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Cost Estimates Card */}
          <div className="card">
            <h2>Financial Estimates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <strong style={{ fontSize: '16px' }}>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Insurance Pay ({activePatient.insurance.coveragePercent}%):
                </span>
                <span style={{ color: 'var(--color-healthy)', fontWeight: 600 }}>
                  -₹{insuranceCoverage.toFixed(2)}
                </span>
              </div>

              <div className="flex-between" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Patient Co-Pay:
                </span>
                <strong style={{ fontSize: '20px', color: 'var(--primary-teal)' }}>
                  ₹{patientResponsibility.toFixed(2)}
                </strong>
              </div>

              <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-muted)', backgroundColor: 'var(--primary-teal-light)', padding: '10px', borderRadius: '8px' }}>
                <div>
                  <strong>Insurer:</strong> {activePatient.insurance.provider} <br />
                  <strong>Policy #:</strong> {activePatient.insurance.policyNumber}
                </div>
                <div>
                  <strong>Deductible Status:</strong><br />
                  {activePatient.insurance.deductibleMet ? 'Deductible Met ✓' : 'Deductible Pending (₹100)'}
                </div>
              </div>

              {treatmentPlan.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setShowReceipt(true)}
                  >
                    Generate Invoice Receipt
                  </button>

                  <button 
                    className="btn btn-secondary"
                    style={{ width: '100%', borderColor: 'var(--primary-teal)', color: 'var(--primary-teal)' }}
                    onClick={handleSimulateClaim}
                    disabled={claimStatus === 'submitting'}
                  >
                    {claimStatus === 'submitting' ? 'Submitting Claim...' : 'File Electronic Claim'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Electronic Claim Status Simulator */}
          {claimStatus !== 'idle' && (
            <div className="card" style={{ border: '1px solid var(--primary-teal)', animation: 'modalScaleUp 0.3s ease' }}>
              <h2>Insurance Clearinghouse Status</h2>
              
              {claimStatus === 'submitting' && (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    border: '4px solid var(--border-color)',
                    borderTopColor: 'var(--primary-teal)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                  `}</style>
                  <strong>Routing Claim...</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Transmitting ADA dental claim to change clearinghouse gateway.
                  </p>
                </div>
              )}

              {claimStatus === 'approved' && claimResponse && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div className="flex-between">
                    <span className="badge badge-success">CLAIM ADJUDICATED</span>
                    <strong style={{ color: 'var(--color-healthy)' }}>APPROVED</strong>
                  </div>
                  
                  <div style={{ backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Claim ID:</strong> {claimResponse.claimId}</div>
                    <div><strong>Clearinghouse:</strong> {claimResponse.clearinghouse}</div>
                    <div><strong>Carrier Approved:</strong> ₹{claimResponse.approvedAmount.toFixed(2)}</div>
                    <div><strong>Adjusted Patient Balance:</strong> ₹{claimResponse.patientResponsibility.toFixed(2)}</div>
                    <div><strong>Auth Approval #:</strong> {claimResponse.authCode}</div>
                  </div>
                  
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {claimResponse.message} Claim file submitted directly into database ledger.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Receipt Pop-out */}
      {showReceipt && (
        <div className="card mt-lg" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="flex-between mb-md">
            <h2>Billing Invoice Details</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={handlePrint}>
                Print Receipt
              </button>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setShowReceipt(false)}>
                Hide
              </button>
            </div>
          </div>
          
          <div className="invoice-container">
            <div className="invoice-header">
              <h2 style={{ fontFamily: 'Courier New', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                GALLETRIX DENTAL CLINIC
              </h2>
              <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '4px' }}>
                100 Medical Plaza, Suite 400 • Tel: (555) 019-2831
              </p>
            </div>

            <div className="invoice-meta">
              <div>
                <strong>PATIENT:</strong> {activePatient.name} <br />
                <strong>ACCOUNT ID:</strong> {activePatient.id} <br />
                <strong>DATE:</strong> {new Date().toLocaleDateString()}
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>CARRIER:</strong> {activePatient.insurance.provider} <br />
                <strong>POLICY ID:</strong> {activePatient.insurance.policyNumber} <br />
                <strong>INVOICE #:</strong> INV-{Math.floor(10000 + Math.random() * 90000)}
              </div>
            </div>

            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>TOOTH</th>
                  <th>ADA CODE</th>
                  <th>PROCEDURE DESCRIPTION</th>
                  <th style={{ textAlign: 'right' }}>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {treatmentPlan.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.tooth}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td style={{ textAlign: 'right' }}>₹{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-summary">
              <div>SUBTOTAL: ₹{subtotal.toFixed(2)}</div>
              <div>INSURANCE CO-PAY ({activePatient.insurance.coveragePercent}%): -₹{insuranceCoverage.toFixed(2)}</div>
              <div className="invoice-total-row">PATIENT OUT-OF-POCKET: ₹{patientResponsibility.toFixed(2)}</div>
            </div>

            <div className="invoice-footer">
              Thank you for trusting Galletrix Dental with your oral healthcare. <br />
              All claims are processed electronically at point-of-sale.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
