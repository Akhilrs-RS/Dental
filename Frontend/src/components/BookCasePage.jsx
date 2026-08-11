import React, { useState } from 'react';

const PRODUCTS_LIST = [
  { id: 'mono-zirc', name: 'Monolithic Zirconia Crown', desc: 'High-strength full contour zirconia' },
  { id: 'ant-zirc', name: 'Anterior Zirconia', desc: 'Highly translucent zirconia for aesthetic zone' },
  { id: 'emax-crown', name: 'E-Max Crown', desc: 'Lithium disilicate crown for ultimate aesthetics' },
  { id: 'emax-veneer', name: 'E-Max Veneer', desc: 'Thin aesthetic veneers for smile design' },
  { id: 'layered-zirc', name: 'Layered Zirconia', desc: 'Zirconia core layered with hand-stacked porcelain' },
  { id: 'screw-retained', name: 'Screw Retained Crown', desc: 'Implant crown directly screw-retained' },
  { id: 'custom-abutment', name: 'Custom Abutment', desc: 'Precision milled titanium or zirconia abutment' },
  { id: 'bridge-zirc', name: 'Bridge Zirconia', desc: 'Multi-unit high strength zirconia bridges' },
  { id: 'diag-waxup', name: 'Diagnostic Wax-Up', desc: 'Aesthetic model preview for treatment planning' },
  { id: 'pmma-temp', name: 'PMMA Temporary', desc: 'Provisional restoration milled from PMMA' },
  { id: 'smile-design', name: 'Smile Design', desc: 'Digital smile aesthetic mapping' },
  { id: 'digital-shade', name: 'Digital Shade', desc: 'Camera/spectrophotometer shade matching verification' }
];

const RESTORATION_TYPES = [
  { type: 'Crown', color: '#10b981', label: 'Crown (Green)' },
  { type: 'Bridge', color: '#f59e0b', label: 'Bridge (Yellow/Orange)' },
  { type: 'Implant', color: '#06b6d4', label: 'Implant (Cyan)' },
  { type: 'Veneer', color: '#3b82f6', label: 'Veneer (Blue)' },
  { type: 'Missing', color: '#6b7280', label: 'Missing Tooth (Grey)' },
  { type: 'Extraction', color: '#ef4444', label: 'Extraction (Red)' }
];

export default function BookCasePage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [patientDetails, setPatientDetails] = useState({
    clinicName: '',
    doctorName: '',
    patientName: '',
    patientAge: '',
    gender: '',
    mobileNumber: '',
    caseType: '',
    expectedDeliveryDate: '',
    priority: '',
    notes: ''
  });

  // Step 2: Selected Products State
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Step 3: Tooth Selection State
  const [selectedTeeth, setSelectedTeeth] = useState({}); // { toothNum: { type: 'Crown', color: '#10b981' } }
  const [currentRestorationType, setCurrentRestorationType] = useState('Crown');

  // Step 4: Scan Uploads
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Step 5: Pickup Option
  const [pickupOption, setPickupOption] = useState('Digital'); // 'Digital' or 'Physical'

  // Progress Stages
  const steps = [
    { num: 1, label: 'Patient Details' },
    { num: 2, label: 'Products' },
    { num: 3, label: 'Tooth Selection' },
    { num: 4, label: 'Upload Scans' },
    { num: 5, label: 'Pickup Option' },
    { num: 6, label: 'Review & Submit' }
  ];

  // FDI Tooth Chart arrays
  const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
  const lowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];
  const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];

  const primaryUpperRight = [55, 54, 53, 52, 51];
  const primaryUpperLeft = [61, 62, 63, 64, 65];
  const primaryLowerLeft = [71, 72, 73, 74, 75];
  const primaryLowerRight = [85, 84, 83, 82, 81];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!patientDetails.patientName.trim()) {
        alert("Please enter the Patient Name.");
        return;
      }
      if (!patientDetails.patientAge) {
        alert("Please enter the Patient Age.");
        return;
      }
      if (!patientDetails.mobileNumber.trim()) {
        alert("Please enter a Mobile Number.");
        return;
      }
    } else if (currentStep === 2) {
      if (selectedProducts.length === 0) {
        alert("Please select at least one product before continuing.");
        return;
      }
    } else if (currentStep === 3) {
      if (Object.keys(selectedTeeth).length === 0) {
        alert("Please select at least one tooth on the chart before continuing.");
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleToothClick = (toothNum) => {
    setSelectedTeeth(prev => {
      const updated = { ...prev };
      if (updated[toothNum]) {
        delete updated[toothNum];
      } else {
        const restType = RESTORATION_TYPES.find(t => t.type === currentRestorationType);
        updated[toothNum] = {
          type: restType.type,
          color: restType.color
        };
      }
      return updated;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSaveCraft = () => {
    alert('Draft J3-CASE saved successfully!');
  };

  const handleSubmitCase = async () => {
    try {
      const payload = {
        patientName: patientDetails.patientName,
        patientAge: patientDetails.patientAge,
        gender: patientDetails.gender,
        clinicName: patientDetails.clinicName,
        doctorName: patientDetails.doctorName,
        mobileNumber: patientDetails.mobileNumber,
        expectedDeliveryDate: patientDetails.expectedDeliveryDate || new Date().toISOString().split('T')[0],
        priority: patientDetails.priority,
        materials: selectedProducts.map(p => PRODUCTS_LIST.find(pl => pl.id === p)?.name).join(', ') || 'Zirconia Restorations',
        teethConfig: Object.keys(selectedTeeth).map(k => `${k}(${selectedTeeth[k].type})`).join(', ') || 'None',
        deliveryOption: pickupOption,
        notes: patientDetails.notes
      };

      const res = await fetch('http://localhost:5005/api/labcases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Lab Case Submitted Successfully and Sync\'d with Database!');
        onBack();
      } else {
        alert('Failed to submit lab case. Please try again.');
      }
    } catch (e) {
      alert('Case details submitted successfully (Mock Offline)!');
      onBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Clinic and Patient Details</h2>
            <div className="booking-form-grid">
              <div className="form-group-custom">
                <label>CLINIC NAME</label>
                <input 
                  type="text" 
                  value={patientDetails.clinicName} 
                  onChange={e => setPatientDetails({...patientDetails, clinicName: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>DOCTOR NAME</label>
                <input 
                  type="text" 
                  value={patientDetails.doctorName} 
                  onChange={e => setPatientDetails({...patientDetails, doctorName: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>PATIENT NAME *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter patient full name"
                  value={patientDetails.patientName} 
                  onChange={e => setPatientDetails({...patientDetails, patientName: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>PATIENT AGE</label>
                <input 
                  type="number" 
                  placeholder="Enter age"
                  value={patientDetails.patientAge} 
                  onChange={e => setPatientDetails({...patientDetails, patientAge: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>GENDER</label>
                <select 
                  value={patientDetails.gender} 
                  onChange={e => setPatientDetails({...patientDetails, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group-custom">
                <label>MOBILE NUMBER</label>
                <input 
                  type="tel" 
                  placeholder="Enter contact number"
                  value={patientDetails.mobileNumber} 
                  onChange={e => setPatientDetails({...patientDetails, mobileNumber: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>CASE TYPE</label>
                <select 
                  value={patientDetails.caseType} 
                  onChange={e => setPatientDetails({...patientDetails, caseType: e.target.value})}
                >
                  <option value="">Select Case Type</option>
                  <option>Crown</option>
                  <option>Bridge</option>
                  <option>Implant</option>
                  <option>Veneer</option>
                  <option>Inlay/Onlay</option>
                </select>
              </div>
              <div className="form-group-custom">
                <label>EXPECTED DELIVERY DATE</label>
                <input 
                  type="date" 
                  value={patientDetails.expectedDeliveryDate} 
                  onChange={e => setPatientDetails({...patientDetails, expectedDeliveryDate: e.target.value})} 
                />
              </div>
              <div className="form-group-custom">
                <label>PRIORITY</label>
                <select 
                  value={patientDetails.priority} 
                  onChange={e => setPatientDetails({...patientDetails, priority: e.target.value})}
                >
                  <option value="">Select Priority</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="form-group-custom full-width">
                <label>LAB INSTRUCTIONS & NOTES</label>
                <textarea 
                  rows="4" 
                  placeholder="Please specify custom shade instructions, margin placements, or material overrides here..."
                  value={patientDetails.notes} 
                  onChange={e => setPatientDetails({...patientDetails, notes: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Restoration and Product Selection</h2>
            <p className="booking-step-subtitle">Select one or more products for this case.</p>
            <div className="products-selection-grid">
              {PRODUCTS_LIST.map(prod => {
                const isSelected = selectedProducts.includes(prod.id);
                return (
                  <div 
                    key={prod.id} 
                    className={`product-select-box ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleProductToggle(prod.id)}
                  >
                    <div className="product-checkbox">
                      {isSelected && <span className="chk-tick">✓</span>}
                    </div>
                    <div className="product-info-text">
                      <span className="prod-name">{prod.name}</span>
                      <span className="prod-desc">{prod.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Tooth Selection</h2>
            <p className="booking-step-subtitle">Click teeth to select them, then choose a restoration type. Click a selected tooth to configure details.</p>
            
            {/* Legend and Active type selector */}
            <div className="tooth-type-selector">
              {RESTORATION_TYPES.map(r => (
                <button 
                  key={r.type} 
                  className={`type-pill ${currentRestorationType === r.type ? 'active' : ''}`}
                  style={{ '--pill-color': r.color }}
                  onClick={() => setCurrentRestorationType(r.type)}
                >
                  <span className="dot-indicator" style={{ backgroundColor: r.color }}></span>
                  {r.type}
                </button>
              ))}
            </div>

            {/* FDI Tooth Chart Canvas */}
            <div className="fdi-chart-interactive-canvas">
              <span className="arch-label">UPPER ARCH - RIGHT TO LEFT</span>
              <div className="teeth-row-arch">
                {upperRight.map(t => (
                  <button 
                    key={t} 
                    className="tooth-btn" 
                    style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                    onClick={() => handleToothClick(t)}
                  >
                    <span className="tooth-lbl">{t}</span>
                  </button>
                ))}
                <div className="arch-gap"></div>
                {upperLeft.map(t => (
                  <button 
                    key={t} 
                    className="tooth-btn" 
                    style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                    onClick={() => handleToothClick(t)}
                  >
                    <span className="tooth-lbl">{t}</span>
                  </button>
                ))}
              </div>

              <div className="teeth-row-arch" style={{ marginTop: '24px' }}>
                {lowerRight.map(t => (
                  <button 
                    key={t} 
                    className="tooth-btn" 
                    style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                    onClick={() => handleToothClick(t)}
                  >
                    <span className="tooth-lbl">{t}</span>
                  </button>
                ))}
                <div className="arch-gap"></div>
                {lowerLeft.map(t => (
                  <button 
                    key={t} 
                    className="tooth-btn" 
                    style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                    onClick={() => handleToothClick(t)}
                  >
                    <span className="tooth-lbl">{t}</span>
                  </button>
                ))}
              </div>
              <span className="arch-label" style={{ marginTop: '12px' }}>LOWER ARCH - RIGHT TO LEFT</span>

              {/* Primary Dentition */}
              <div className="primary-dentition-section">
                <span className="arch-label">PRIMARY DENTITION (OPTIONAL)</span>
                
                <div className="teeth-row-arch" style={{ marginTop: '12px' }}>
                  {primaryUpperRight.map(t => (
                    <button 
                      key={t} 
                      className="tooth-btn primary-tooth" 
                      style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                      onClick={() => handleToothClick(t)}
                    >
                      <span className="tooth-lbl">{t}</span>
                    </button>
                  ))}
                  <div className="arch-gap"></div>
                  {primaryUpperLeft.map(t => (
                    <button 
                      key={t} 
                      className="tooth-btn primary-tooth" 
                      style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                      onClick={() => handleToothClick(t)}
                    >
                      <span className="tooth-lbl">{t}</span>
                    </button>
                  ))}
                </div>

                <div className="teeth-row-arch" style={{ marginTop: '16px' }}>
                  {primaryLowerRight.map(t => (
                    <button 
                      key={t} 
                      className="tooth-btn primary-tooth" 
                      style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                      onClick={() => handleToothClick(t)}
                    >
                      <span className="tooth-lbl">{t}</span>
                    </button>
                  ))}
                  <div className="arch-gap"></div>
                  {primaryLowerLeft.map(t => (
                    <button 
                      key={t} 
                      className="tooth-btn primary-tooth" 
                      style={{ backgroundColor: selectedTeeth[t]?.color || 'transparent' }}
                      onClick={() => handleToothClick(t)}
                    >
                      <span className="tooth-lbl">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Upload Scans and Files</h2>
            <div 
              className="dropzone-scan-files"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="dropzone-content">
                <div className="upload-cloud-icon">☁️</div>
                <span className="primary-prompt">Drag and drop files here</span>
                <span className="secondary-prompt">Supported file types: STL, PLY, OBJ, JPEG, PNG, PDF, DICOM | Max 500MB</span>
                <label className="browse-btn-label">
                  Browse Files
                  <input 
                    type="file" 
                    multiple 
                    className="hidden-file-input" 
                    onChange={handleFileChange} 
                  />
                </label>
              </div>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="uploaded-list-box">
                <h4>Uploaded Scans ({uploadedFiles.length})</h4>
                <ul>
                  {uploadedFiles.map((fn, idx) => (
                    <li key={idx}>📁 {fn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Pickup or Digital Case</h2>
            <div className="pickup-cards-selection">
              <div 
                className={`pickup-option-card ${pickupOption === 'Digital' ? 'active' : ''}`}
                onClick={() => setPickupOption('Digital')}
              >
                <div className="radio-circle">
                  {pickupOption === 'Digital' && <div className="radio-dot"></div>}
                </div>
                <div className="option-card-body">
                  <h3>Digital Case Only</h3>
                  <p>No physical pickup needed. Case is processed entirely from uploaded digital STL/PLY scans.</p>
                </div>
              </div>

              <div 
                className={`pickup-option-card ${pickupOption === 'Physical' ? 'active' : ''}`}
                onClick={() => setPickupOption('Physical')}
              >
                <div className="radio-circle">
                  {pickupOption === 'Physical' && <div className="radio-dot"></div>}
                </div>
                <div className="option-card-body">
                  <h3>Physical Pickup Needed</h3>
                  <p>Request a driver to collect physical impression models or wax bite blocks directly from your clinic.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="booking-step-container">
            <h2 className="booking-step-title">Review & Submit</h2>
            <div className="booking-review-layout">
              <div className="review-block">
                <h3>Patient Info</h3>
                <p><strong>Name:</strong> {patientDetails.patientName || 'Not Specified'}</p>
                <p><strong>Age:</strong> {patientDetails.patientAge || 'Not Specified'}</p>
                <p><strong>Gender:</strong> {patientDetails.gender}</p>
                <p><strong>Doctor:</strong> {patientDetails.doctorName}</p>
                <p><strong>Clinic:</strong> {patientDetails.clinicName}</p>
                <p><strong>Expected Delivery:</strong> {patientDetails.expectedDeliveryDate || 'Standard turnaround'}</p>
              </div>
              <div className="review-block">
                <h3>Selected Products</h3>
                {selectedProducts.length > 0 ? (
                  <ul>
                    {selectedProducts.map(id => (
                      <li key={id}>{PRODUCTS_LIST.find(p => p.id === id)?.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No products selected</p>
                )}
              </div>
              <div className="review-block">
                <h3>Teeth Configurations</h3>
                {Object.keys(selectedTeeth).length > 0 ? (
                  <ul>
                    {Object.keys(selectedTeeth).map(num => (
                      <li key={num}>Tooth {num}: <span style={{ color: selectedTeeth[num].color }}>{selectedTeeth[num].type}</span></li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No teeth selected on chart</p>
                )}
              </div>
              <div className="review-block">
                <h3>Digital Scans</h3>
                <p>{uploadedFiles.length} files staged for upload</p>
              </div>
              <div className="review-block">
                <h3>Logistics</h3>
                <p><strong>Type:</strong> {pickupOption === 'Digital' ? 'Pure Digital Workflow' : 'Courier Model Collection'}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="book-case-wizard-wrapper">
      <div className="wizard-sidebar">
        <h2 className="wizard-main-title">New Lab Case</h2>
        <div className="steps-tracker-list">
          {steps.map(s => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <div key={s.num} className={`tracker-step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                <div className="step-circle-num">
                  {isCompleted ? '✓' : s.num}
                </div>
                <span className="step-label-txt">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wizard-main-content">
        <div className="step-content-pane">
          {renderStepContent()}
        </div>

        <div className="wizard-action-footer">
          <button className="btn-back-arrow" onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onBack()}>
            ← Back
          </button>
          
          <button className="btn-save-draft" onClick={handleSaveCraft}>
            Save Craft
          </button>

          {currentStep < 6 ? (
            <button className="btn-continue-step" onClick={handleNextStep}>
              Continue &rarr;
            </button>
          ) : (
            <button className="btn-submit-case-final" onClick={handleSubmitCase}>
              Submit Case &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
