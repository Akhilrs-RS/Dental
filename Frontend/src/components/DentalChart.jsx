import React, { useState } from 'react';

// Surfaces list
const SURFACES = [
  { id: 'occlusal', label: 'Occlusal/Incisal (Top)' },
  { id: 'mesial', label: 'Mesial (Front/Left)' },
  { id: 'distal', label: 'Distal (Back/Right)' },
  { id: 'buccal', label: 'Buccal/Labial (Outer)' },
  { id: 'lingual', label: 'Lingual (Inner)' }
];

export default function DentalChart({ patient, onChangeChart, userRole }) {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [appliedStatus, setAppliedStatus] = useState('decay');
  const [treatmentNotes, setTreatmentNotes] = useState('');

  if (!patient) {
    return <div className="card">Please select a patient to view their dental chart.</div>;
  }

  const patientChart = patient.chart || {};

  const handleToothClick = (toothNum) => {
    setSelectedTooth(toothNum);
    setSelectedSurfaces([]); // Reset surfaces on new tooth selection
    
    // Autofill with existing data if present
    const toothData = patientChart[toothNum];
    if (toothData) {
      if (toothData.surfaces) {
        setSelectedSurfaces(toothData.surfaces);
      }
    }
  };

  const toggleSurface = (surfaceId) => {
    if (selectedSurfaces.includes(surfaceId)) {
      setSelectedSurfaces(selectedSurfaces.filter(s => s !== surfaceId));
    } else {
      setSelectedSurfaces([...selectedSurfaces, surfaceId]);
    }
  };

  const handleApplyStatus = () => {
    if (!selectedTooth) return;

    let updatedChart = { ...patientChart };

    if (appliedStatus === 'healthy') {
      // Clear tooth status
      delete updatedChart[selectedTooth];
    } else if (appliedStatus === 'missing') {
      updatedChart[selectedTooth] = {
        condition: 'missing',
        surfaces: [],
        treatments: [{ type: 'extraction', date: new Date().toISOString().split('T')[0], notes: 'Marked as missing' }]
      };
    } else if (['decay', 'fracture'].includes(appliedStatus)) {
      updatedChart[selectedTooth] = {
        condition: appliedStatus,
        surfaces: selectedSurfaces.length > 0 ? selectedSurfaces : ['occlusal'],
        treatments: patientChart[selectedTooth]?.treatments || []
      };
    } else {
      // It's a treatment (filling, crown, rct)
      const existingTreatments = patientChart[selectedTooth]?.treatments || [];
      const newTreatment = {
        type: appliedStatus,
        date: new Date().toISOString().split('T')[0],
        notes: treatmentNotes || `Completed ${appliedStatus}`
      };
      
      updatedChart[selectedTooth] = {
        condition: 'healthy', // resolve active decay/fracture upon treatment
        surfaces: selectedSurfaces.length > 0 ? selectedSurfaces : ['occlusal'],
        treatments: [...existingTreatments, newTreatment]
      };
    }

    onChangeChart(patient.id, updatedChart);
    setTreatmentNotes('');
    // Clear selection or keep it
  };

  // Get color for a tooth/surface based on condition or treatments
  const getSurfaceClass = (toothNum, surfaceId) => {
    const toothData = patientChart[toothNum];
    if (!toothData) return 'healthy';

    if (toothData.condition === 'missing') {
      return 'missing';
    }

    // Check treatments first (completed status overrides condition)
    if (toothData.treatments && toothData.treatments.length > 0) {
      const lastTreatment = toothData.treatments[toothData.treatments.length - 1];
      if (toothData.surfaces.includes(surfaceId) || lastTreatment.type === 'crown' || lastTreatment.type === 'rct') {
        return lastTreatment.type; // filling, crown, rct, extraction
      }
    }

    // Check active conditions
    if (toothData.condition && toothData.surfaces.includes(surfaceId)) {
      return toothData.condition; // decay, fracture
    }

    return 'healthy';
  };

  const getToothStatusLabel = (toothNum) => {
    const toothData = patientChart[toothNum];
    if (!toothData) return 'Healthy';
    if (toothData.condition === 'missing') return 'Missing (Extracted)';
    
    let label = '';
    if (toothData.condition !== 'healthy') {
      label += `Active ${toothData.condition.toUpperCase()} (${toothData.surfaces.join(', ')})`;
    }
    if (toothData.treatments && toothData.treatments.length > 0) {
      const tTypes = toothData.treatments.map(t => t.type.toUpperCase()).join(', ');
      label += label ? ` | Treated: ${tTypes}` : `Treated: ${tTypes}`;
    }
    return label || 'Healthy';
  };

  // Render a single tooth component
  const renderTooth = (num, x, y, rotDeg) => {
    const isSelected = selectedTooth === num;
    const toothData = patientChart[num];
    const isMissing = toothData?.condition === 'missing';

    return (
      <div 
        key={num} 
        className={`tooth-item ${isSelected ? 'selected' : ''} ${isMissing ? 'missing' : ''}`}
        onClick={() => handleToothClick(num)}
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: isSelected ? 10 : 2
        }}
      >
        <div 
          className="tooth-svg-wrapper"
          style={{
            transform: `rotate(${rotDeg}deg)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Custom SVG Drawing of a tooth Silhouette */}
          <svg viewBox="0 0 100 120" width="100%" height="100%">
            {/* Tooth Crown */}
            <path 
              d="M 15,35 C 15,15 25,10 35,12 C 43,14 57,14 65,12 C 75,10 85,15 85,35 C 85,55 75,65 50,65 C 25,65 15,55 15,35 Z" 
              className={`tooth-part ${isMissing ? 'missing' : getSurfaceClass(num, 'occlusal')}`}
            />
            {/* Tooth Roots (Double Root representation) */}
            {!isMissing && (
              <>
                <path 
                  d="M 22,63 C 25,75 18,95 28,110 C 35,110 38,85 45,70" 
                  className={`tooth-part ${getSurfaceClass(num, 'buccal')}`}
                />
                <path 
                  d="M 78,63 C 75,75 82,95 72,110 C 65,110 62,85 55,70" 
                  className={`tooth-part ${getSurfaceClass(num, 'lingual')}`}
                />
                {/* Pulp Chamber (visible if RCT treatment is applied) */}
                {toothData?.treatments?.some(t => t.type === 'rct') && (
                  <path d="M 45,45 L 45,65 M 32,65 L 28,95 M 68,65 L 72,95" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" fill="none" />
                )}
              </>
            )}
            {/* Missing outline */}
            {isMissing && (
              <path 
                d="M 15,35 C 15,15 25,10 35,12 C 43,14 57,14 65,12 C 75,10 85,15 85,35 C 85,55 75,65 50,65 C 25,65 15,55 15,35 Z M 22,63 C 25,75 18,95 28,110 C 35,110 38,85 45,70 M 78,63 C 75,75 82,95 72,110 C 65,110 62,85 55,70" 
                stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.3"
              />
            )}
          </svg>
          
          {/* Clickable mini 5-surface selector overlay when not missing */}
          {!isMissing && (
            <div 
              style={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5
              }}
            >
              <div className="tooth-surface-map">
                <div className={`surface-sector top ${getSurfaceClass(num, 'occlusal')}`} title="Occlusal"></div>
                <div className={`surface-sector left ${getSurfaceClass(num, 'mesial')}`} title="Mesial"></div>
                <div className={`surface-sector center ${getSurfaceClass(num, 'lingual')}`} title="Lingual"></div>
                <div className={`surface-sector right ${getSurfaceClass(num, 'distal')}`} title="Distal"></div>
                <div className={`surface-sector bottom ${getSurfaceClass(num, 'buccal')}`} title="Buccal"></div>
              </div>
            </div>
          )}
        </div>
        <div className="tooth-label">#{num}</div>
      </div>
    );
  };

  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i); // Render 32 to 17 left-to-right to match dental notation

  // 3D Arch layout coordinates mapping parameters
  const cx = 300;
  const cyUpper = 240;
  const cyLower = 460;
  const rx = 180;
  const ry = 135;
  const tMin = 0.08 * Math.PI;
  const tMax = 0.92 * Math.PI;
  
  const tValues = Array.from(
    { length: 16 },
    (_, idx) => tMin + (idx * (tMax - tMin)) / 15
  );

  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="flex-between">
        <h2>Interactive 3D Orthodontic Arch Charting</h2>
        <div className="badge badge-info">Patient: {patient.name}</div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Select a tooth below to map diagnostic findings or completed dental procedures. Hover surfaces to see statuses.
      </p>

      {/* Dental Chart 3D Arch Container */}
      <div className="dental-chart-arch-container">
        {/* SVG background arches (gums, palate, tongue) */}
        <svg viewBox="0 0 600 700" className="dental-chart-arch-bg">
          {/* Upper Palate Background */}
          <path 
            d="M 125,225 Q 300,105 475,225 Z" 
            fill="rgba(239, 68, 68, 0.04)" 
          />
          {/* Upper Gums Arch Line */}
          <path 
            d="M 125,225 Q 300,105 475,225" 
            fill="none" 
            stroke="rgba(239, 68, 68, 0.16)" 
            strokeWidth="48" 
            strokeLinecap="round" 
          />

          {/* Lower Tongue Cavity Background */}
          <path 
            d="M 125,475 Q 300,595 475,475 Z" 
            fill="rgba(239, 68, 68, 0.04)" 
          />
          {/* Lower Gums Arch Line */}
          <path 
            d="M 125,475 Q 300,595 475,475" 
            fill="none" 
            stroke="rgba(239, 68, 68, 0.16)" 
            strokeWidth="48" 
            strokeLinecap="round" 
          />
          
          {/* Occlusal Plane Guideline */}
          <line x1="80" y1="350" x2="520" y2="350" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="6,6" opacity="0.3" />
          
          {/* Arch Labels */}
          <text x="300" y="45" fill="var(--text-muted)" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">UPPER MAXILLARY ARCH</text>
          <text x="300" y="665" fill="var(--text-muted)" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">LOWER MANDIBULAR ARCH</text>
        </svg>

        {/* Upper Arch Teeth */}
        {upperTeeth.map((num, idx) => {
          const t = tValues[idx];
          const x = cx - rx * Math.cos(t);
          const y = cyUpper - ry * Math.sin(t);
          const rotDeg = (t - Math.PI / 2) * (180 / Math.PI);
          return renderTooth(num, x, y, rotDeg);
        })}

        {/* Lower Arch Teeth */}
        {lowerTeeth.map((num, idx) => {
          const t = tValues[idx];
          const x = cx - rx * Math.cos(t);
          const y = cyLower + ry * Math.sin(t);
          const rotDeg = 180 - (t - Math.PI / 2) * (180 / Math.PI);
          return renderTooth(num, x, y, rotDeg);
        })}
      </div>

      {/* Chart Legend */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '20px',
          padding: '12px',
          backgroundColor: 'var(--primary-teal-light)',
          borderRadius: '10px',
          fontSize: '12px'
        }}
      >
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }} /> Healthy</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--color-decay)' }} /> Active Decay</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--color-fracture)' }} /> Fracture</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#cbd5e1', border: '1px dashed #64748b' }} /> Missing</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--color-filling)' }} /> Restored (Filling)</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--color-crown)' }} /> Crown</div>
        <div className="flex-row-center"><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--color-rct)' }} /> Root Canal (RCT)</div>
      </div>

      {/* Tooth Action Panel */}
      {selectedTooth && (
        <div className="card mt-lg" style={{ border: '1px solid var(--primary-teal)', backgroundColor: 'var(--bg-card)' }}>
          <div className="dashboard-main-layout">
            <div>
              <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Tooth #{selectedTooth} - <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>{getToothStatusLabel(selectedTooth)}</span>
              </h3>
              
              {userRole === 'doctor' ? (
                <>
                  {/* Surface multi-select */}
                  {patientChart[selectedTooth]?.condition !== 'missing' && (
                    <div className="mt-md">
                      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Select Impacted Surfaces:</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {SURFACES.map(surf => {
                          const isChecked = selectedSurfaces.includes(surf.id);
                          return (
                            <button
                              key={surf.id}
                              className={`btn ${isChecked ? 'btn-primary' : 'btn-secondary'}`}
                              style={{ padding: '6px 12px', fontSize: '12px' }}
                              onClick={() => toggleSurface(surf.id)}
                            >
                              {surf.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status Apply Selector */}
                  <div className="mt-md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Diagnostics / Treatments</label>
                      <select 
                        className="form-control"
                        value={appliedStatus}
                        onChange={(e) => setAppliedStatus(e.target.value)}
                      >
                        <optgroup label="Clear / Reset">
                          <option value="healthy">Healthy (Clear Condition)</option>
                        </optgroup>
                        <optgroup label="Pathology (Conditions)">
                          <option value="decay">Decay / Cavity</option>
                          <option value="fracture">Fractured Tooth</option>
                          <option value="missing">Missing / Extracted</option>
                        </optgroup>
                        <optgroup label="Procedures (Treatments)">
                          <option value="filling">Composite Filling</option>
                          <option value="crown">Porcelain Crown</option>
                          <option value="rct">Root Canal Therapy</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Treatment Notes */}
                    {['filling', 'crown', 'rct'].includes(appliedStatus) && (
                      <div className="form-group">
                        <label>Treatment Notes</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Composite resin on D-O" 
                          value={treatmentNotes}
                          onChange={(e) => setTreatmentNotes(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <button className="btn btn-primary mt-md" onClick={handleApplyStatus}>
                    Update Tooth Status
                  </button>
                </>
              ) : (
                <div style={{ backgroundColor: 'var(--primary-teal-light)', padding: '16px', borderRadius: '10px', fontSize: '13px', marginTop: '16px', border: '1px dashed var(--border-color)' }}>
                  🔒 <strong>Clinical Charting Restricted:</strong> Dental charting and diagnosis mapping are authorized for the Doctor role only.
                </div>
              )}
            </div>

            {/* Tooth History Log */}
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Tooth History Log</h4>
              <div style={{ maxHeight: '180px', overflowY: 'auto', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {patientChart[selectedTooth]?.treatments && patientChart[selectedTooth].treatments.length > 0 ? (
                  patientChart[selectedTooth].treatments.map((tx, idx) => (
                    <div key={idx} style={{ padding: '8px', backgroundColor: 'var(--bg-app)', borderRadius: '6px', fontSize: '12px' }}>
                      <div className="flex-between">
                        <strong style={{ color: 'var(--primary-teal)', textTransform: 'capitalize' }}>{tx.type}</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{tx.date}</span>
                      </div>
                      <p style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{tx.notes}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No completed treatment logged for this tooth.</p>
                )}

                {patientChart[selectedTooth]?.condition && patientChart[selectedTooth].condition !== 'healthy' && (
                  <div style={{ padding: '8px', border: '1px dashed var(--color-decay)', borderRadius: '6px', fontSize: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
                    <span style={{ color: 'var(--color-decay)', fontWeight: 'bold' }}>PENDING DIAGNOSIS:</span>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Active {patientChart[selectedTooth].condition} on surfaces: {patientChart[selectedTooth].surfaces?.join(', ') || 'N/A'}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
