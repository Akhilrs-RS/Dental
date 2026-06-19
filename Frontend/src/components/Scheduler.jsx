import React, { useState } from 'react';

const TIME_SLOTS = [
  { value: '08:00', label: '08:00 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM (Lunch)' },
  { value: '13:00', label: '01:00 PM' },
  { value: '14:00', label: '02:00 PM' },
  { value: '15:00', label: '03:00 PM' },
  { value: '16:00', label: '04:00 PM' }
];

const OPERATORIES = [
  { name: 'Operatory A', dentist: 'Dr. Sarah Carter' },
  { name: 'Operatory B', dentist: 'Dr. James Aris' },
  { name: 'Hygiene Room', dentist: 'Hygienist Amy Miller' }
];

export default function Scheduler({ appointments, patients, onAddAppointment, onUpdateAppointment, onDeleteAppointment }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null); // { time, room }
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Form states for new appointment
  const [patientId, setPatientId] = useState('');
  const [time, setTime] = useState('08:00');
  const [room, setRoom] = useState('Operatory A');
  const [type, setType] = useState('Periodic Cleaning');
  const [duration, setDuration] = useState(60);

  const openAddModal = (timeVal, roomVal) => {
    setTime(timeVal);
    setRoom(roomVal);
    if (patients.length > 0) {
      setPatientId(patients[0].id);
    }
    setType('Routine Checkup');
    setDuration(60);
    setShowAddModal(true);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === patientId);
    if (!patientObj) return;

    const newApt = {
      id: 'apt-' + Date.now(),
      patientId,
      patientName: patientObj.name,
      time,
      duration,
      room,
      dentist: OPERATORIES.find(op => op.name === room)?.dentist || 'Dr. Carter',
      type,
      status: 'scheduled',
      date: '2026-06-19'
    };

    onAddAppointment(newApt);
    setShowAddModal(false);
  };

  const handleUpdateStatus = (statusVal) => {
    if (!selectedAppointment) return;
    onUpdateAppointment(selectedAppointment.id, { ...selectedAppointment, status: statusVal });
    setShowEditModal(false);
  };

  const handleCancelAppointment = () => {
    if (!selectedAppointment) return;
    onDeleteAppointment(selectedAppointment.id);
    setShowEditModal(false);
  };

  return (
    <div className="scheduler-container">
      <div className="flex-between">
        <div>
          <h2>Operatory Scheduling Calendar</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Viewing Schedule for <strong>Friday, June 19, 2026</strong>
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => openAddModal('08:00', 'Operatory A')}>
          + Book Appointment
        </button>
      </div>

      {/* Grid Schedule */}
      <div className="scheduler-grid mt-md">
        
        {/* Row Header */}
        <div className="scheduler-time-col-header"></div>
        {OPERATORIES.map((op, idx) => (
          <div key={idx} className="scheduler-header-cell">
            <div>{op.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
              {op.dentist}
            </div>
          </div>
        ))}

        {/* Hour Slots */}
        {TIME_SLOTS.map((slot, sIdx) => (
          <div key={sIdx} className="scheduler-row">
            
            {/* Time label */}
            <div className="scheduler-time-cell">
              {slot.label}
            </div>

            {/* Operatorries columns */}
            {OPERATORIES.map((op, oIdx) => {
              // Find matching appointment that falls in this hour slot
              const cellApt = appointments.find(
                apt => apt.room === op.name && apt.time.startsWith(slot.value)
              );

              return (
                <div 
                  key={oIdx} 
                  className="scheduler-appointment-cell"
                >
                  {cellApt ? (
                    <div 
                      className={`appointment-card status-${cellApt.status}`}
                      onClick={() => {
                        setSelectedAppointment(cellApt);
                        setShowEditModal(true);
                      }}
                    >
                      <div className="appointment-patient-name">{cellApt.patientName}</div>
                      <div className="appointment-details">
                        <div>{cellApt.type}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>
                          {cellApt.time} ({cellApt.duration} mins)
                        </div>
                      </div>
                      <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', scale: '0.85', transformOrigin: 'left', marginTop: '4px' }}>
                        {cellApt.status.toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    // Clickable empty cell
                    <button 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'transparent'
                      }}
                      className="empty-slot-btn"
                      onClick={() => openAddModal(slot.value, op.name)}
                      title="Click to book this slot"
                    >
                      <span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>+</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ADD APPOINTMENT MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>×</button>
            <h3 style={{ marginBottom: '16px' }}>Schedule Appointment</h3>
            <form onSubmit={handleCreateAppointment}>
              
              <div className="form-group">
                <label>Select Patient</label>
                <select 
                  className="form-control"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Select Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Room / Operatory</label>
                  <select 
                    className="form-control"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    {OPERATORIES.map(op => (
                      <option key={op.name} value={op.name}>{op.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Time Slot</label>
                  <select 
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Procedure Type</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. Cleaning, Molar RCT"
                    required
                  />
                </div>
                <div>
                  <label>Duration (mins)</label>
                  <select 
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                    <option value={120}>120 mins</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-md" style={{ width: '100%' }}>
                Book Appointment Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / STATUS UPDATE MODAL */}
      {showEditModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
            <h3 style={{ marginBottom: '8px' }}>Appointment Details</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Patient: <strong>{selectedAppointment.patientName}</strong> ({selectedAppointment.patientId})
            </p>

            <div style={{ backgroundColor: 'var(--primary-teal-light)', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px' }}>
              <div><strong>Procedure:</strong> {selectedAppointment.type}</div>
              <div><strong>Operatory:</strong> {selectedAppointment.room}</div>
              <div><strong>Time:</strong> {selectedAppointment.time} ({selectedAppointment.duration} mins)</div>
              <div><strong>Provider:</strong> {selectedAppointment.dentist}</div>
            </div>

            <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Update Clinic Status</label>
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '8px', 
                marginTop: '8px', 
                marginBottom: '20px' 
              }}
            >
              <button 
                className={`btn ${selectedAppointment.status === 'scheduled' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('scheduled')}
              >
                Scheduled
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'checked-in' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('checked-in')}
              >
                Checked-In
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'in-chair' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('in-chair')}
              >
                In-Chair
              </button>
              <button 
                className={`btn ${selectedAppointment.status === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px', fontSize: '11px' }}
                onClick={() => handleUpdateStatus('completed')}
              >
                Completed
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1, color: 'var(--color-fracture)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                onClick={handleCancelAppointment}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
