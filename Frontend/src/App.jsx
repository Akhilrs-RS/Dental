import React, { useState, useEffect } from 'react';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS } from './data/mockData';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import PatientEHR from './components/PatientEHR';
import TreatmentPlanner from './components/TreatmentPlanner';

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activePatientId, setActivePatientId] = useState('P-101');
  const [currentView, setCurrentView] = useState('dashboard');
  const [themeMode, setThemeMode] = useState('dark');

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'var(--primary-teal)', display: 'flex', alignItems: 'center', justifycontent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
              SC
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Sarah Carter</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lead Dentist</div>
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
              <strong>Clinic Database Connected</strong>
            </div>
          </div>
        </header>

        {/* Tab Routing */}
        <div style={{ flexGrow: 1 }}>
          {currentView === 'dashboard' && (
            <Dashboard 
              onViewScheduler={() => setCurrentView('scheduler')}
              onViewPatient={() => setCurrentView('patients')}
            />
          )}

          {currentView === 'scheduler' && (
            <Scheduler 
              appointments={appointments}
              patients={patients}
              onAddAppointment={handleAddAppointment}
              onUpdateAppointment={handleUpdateAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}

          {currentView === 'patients' && (
            <PatientEHR 
              patients={patients}
              activePatientId={activePatientId}
              onSelectPatient={setActivePatientId}
              onChangeChart={handleUpdateChart}
              onAddVisitNote={handleAddVisitNote}
            />
          )}

          {currentView === 'planner' && (
            <TreatmentPlanner 
              patients={patients}
              activePatientId={activePatientId}
              onUpdatePatient={handleUpdatePatient}
              onSelectPatient={setActivePatientId}
            />
          )}
        </div>
      </main>

    </div>
  );
}
