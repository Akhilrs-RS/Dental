import React, { useState, useEffect } from 'react';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS } from './data/mockData';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import PatientEHR from './components/PatientEHR';
import TreatmentPlanner from './components/TreatmentPlanner';
import RegisterPatientModal from './components/RegisterPatientModal';
import WhatsAppSimulator from './components/WhatsAppSimulator';

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activePatientId, setActivePatientId] = useState('P-101');
  const [currentView, setCurrentView] = useState('dashboard');
  const [themeMode, setThemeMode] = useState('dark');
  const [userRole, setUserRole] = useState('receptionist'); // receptionist vs doctor
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [whatsappNotification, setWhatsappNotification] = useState(null);

  // Sync theme mode with body class
  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [themeMode]);

  // EHR: Update patient dental chart
  const handleUpdateChart = (patientId, newChart) => {
    setPatients(prevPatients =>
      prevPatients.map(p => (p.id === patientId ? { ...p, chart: newChart } : p))
    );
  };

  // EHR: Append clinical notes
  const handleAddVisitNote = (patientId, noteText) => {
    const newNote = {
      date: new Date().toISOString().split('T')[0],
      notes: noteText
    };
    setPatients(prevPatients =>
      prevPatients.map(p =>
        p.id === patientId ? { ...p, visits: [newNote, ...(p.visits || [])] } : p
      )
    );
  };

  // Planner: Update patient treatment plan
  const handleUpdatePatient = (patientId, updatedPatient) => {
    setPatients(prevPatients =>
      prevPatients.map(p => (p.id === patientId ? updatedPatient : p))
    );
  };

  // Register Patient
  const handleRegisterPatient = (newPatientData) => {
    const nextIdNum = Math.max(...patients.map(p => parseInt(p.id.replace('P-', '')))) + 1;
    const newPatient = {
      id: `P-${nextIdNum}`,
      ...newPatientData,
      chart: {},
      xrays: [],
      visits: []
    };
    setPatients(prev => [...prev, newPatient]);
    setActivePatientId(newPatient.id);
  };

  // Check In Patient
  const handleCheckInPatient = (patientId, room = 'Operatory A', dentist = 'Dr. Sarah Carter', type = 'Walk-In Consultation') => {
    const today = new Date().toISOString().split('T')[0];
    const existingIdx = appointments.findIndex(apt => apt.patientId === patientId && apt.date === today);
    if (existingIdx !== -1) {
      setAppointments(prev => prev.map((apt, idx) => idx === existingIdx ? { ...apt, status: 'checked-in' } : apt));
    } else {
      const patientObj = patients.find(p => p.id === patientId);
      const newApt = {
        id: 'apt-' + Date.now(),
        patientId,
        patientName: patientObj ? patientObj.name : 'Unknown Patient',
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        duration: 30,
        room,
        dentist,
        type,
        status: 'checked-in',
        date: today
      };
      setAppointments(prev => [...prev, newApt]);
    }
  };

  // Scheduler: Add appointment
  const handleAddAppointment = (newApt) => {
    setAppointments(prev => [...prev, newApt]);
  };

  // Scheduler: Update appointment status/details
  const handleUpdateAppointment = (aptId, updatedApt) => {
    setAppointments(prev => prev.map(apt => (apt.id === aptId ? updatedApt : apt)));
  };

  // Scheduler: Delete/Cancel appointment
  const handleDeleteAppointment = (aptId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== aptId));
  };

  // Sidebar link details
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'scheduler', label: 'Scheduler', icon: '📅' },
    { id: 'patients', label: 'Patient EHR', icon: '👥' },
    { id: 'planner', label: 'Ledger & Billing', icon: '💳' }
  ];

  // Dynamic Header Titles
  const getHeaderDetails = () => {
    switch (currentView) {
      case 'dashboard':
        return { title: 'Clinic Analytics Dashboard', desc: 'Real-time overview of chair statistics, revenue flows, and daily logs.' };
      case 'scheduler':
        return { title: 'Operatory Booking grid', desc: 'Operatory-split scheduling and patient appointment status tracking.' };
      case 'patients':
        return { title: 'Electronic Health Records (EHR)', desc: 'Comprehensive patient directory, medical alerts, live charting, and radiology.' };
      case 'planner':
        return { title: 'Treatment Planner & Claims Ledger', desc: 'Manage diagnostic estimates, build invoices, and simulate insurance clearinghouses.' };
      default:
        return { title: 'Dental Management System', desc: 'Enterprise Practice Management Console.' };
    }
  };

  const header = getHeaderDetails();

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">🦷</div>
          <div className="logo-text">AuraDental</div>
        </div>

        <nav className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {/* User Role Switcher */}
          <div style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px', width: '100%' }}>
            <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active User Role
            </label>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-app)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button 
                type="button"
                className={`btn ${userRole === 'receptionist' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '6px 4px', fontSize: '10px', border: 'none', borderRadius: '6px', minWidth: '0' }}
                onClick={() => setUserRole('receptionist')}
              >
                Receptionist
              </button>
              <button 
                type="button"
                className={`btn ${userRole === 'doctor' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '6px 4px', fontSize: '10px', border: 'none', borderRadius: '6px', minWidth: '0' }}
                onClick={() => setUserRole('doctor')}
              >
                Doctor
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px', width: '100%', marginBottom: '12px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: userRole === 'doctor' ? 'var(--primary-teal)' : 'var(--secondary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
              {userRole === 'doctor' ? 'SC' : 'ES'}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {userRole === 'doctor' ? 'Dr. Sarah Carter' : 'Emily Stone'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {userRole === 'doctor' ? 'Lead Dentist' : 'Receptionist'}
              </div>
            </div>
          </div>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            style={{ width: '100%', fontSize: '12px', padding: '8px 12px' }}
          >
            {themeMode === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        
        {/* Dynamic Top Header */}
        <header className="top-header">
          <div className="page-title">
            <h1>{header.title}</h1>
            <p>{header.desc}</p>
          </div>
          <div className="header-actions">
            <div className="flex-row-center" style={{ backgroundColor: 'var(--primary-teal-light)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', border: '1px solid var(--border-color)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-healthy)', display: 'inline-block', marginRight: '6px' }} />
              <strong>Clinic Database Connected ({userRole.toUpperCase()})</strong>
            </div>
          </div>
        </header>

        {/* Tab Routing */}
        <div style={{ flexGrow: 1 }}>
          {currentView === 'dashboard' && (
            <Dashboard 
              userRole={userRole}
              patients={patients}
              appointments={appointments}
              onCheckInPatient={handleCheckInPatient}
              onRegisterPatient={() => setShowRegisterModal(true)}
              onViewScheduler={() => setCurrentView('scheduler')}
              onViewPatient={(patientId) => {
                if (patientId) setActivePatientId(patientId);
                setCurrentView('patients');
              }}
              onUpdateAppointment={handleUpdateAppointment}
            />
          )}

          {currentView === 'scheduler' && (
            <Scheduler 
              userRole={userRole}
              appointments={appointments}
              patients={patients}
              onAddAppointment={handleAddAppointment}
              onUpdateAppointment={handleUpdateAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}

          {currentView === 'patients' && (
            <PatientEHR 
              userRole={userRole}
              patients={patients}
              activePatientId={activePatientId}
              onSelectPatient={setActivePatientId}
              onChangeChart={handleUpdateChart}
              onAddVisitNote={handleAddVisitNote}
              onCheckInPatient={handleCheckInPatient}
              onUpdatePatient={handleUpdatePatient}
            />
          )}

          {currentView === 'planner' && (
            <TreatmentPlanner 
              userRole={userRole}
              patients={patients}
              appointments={appointments}
              activePatientId={activePatientId}
              onUpdatePatient={handleUpdatePatient}
              onSelectPatient={setActivePatientId}
              onAddAppointment={handleAddAppointment}
              onSendWhatsApp={(notif) => setWhatsappNotification(notif)}
            />
          )}
        </div>
      </main>

      {/* Global Modals & Simulators */}
      <RegisterPatientModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
        onRegister={handleRegisterPatient}
      />
      
      <WhatsAppSimulator 
        notification={whatsappNotification} 
        onClose={() => setWhatsappNotification(null)}
      />

    </div>
  );
}
