import React, { useState, useEffect } from 'react';
import logosImg from '../assets/logos.png';

export default function AdminPage({ onNavigateHome }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  // Auth Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  
  // Notice states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);

  // Console active route and lists
  const [activeTab, setActiveTab] = useState('overview');
  const [clinics, setClinics] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [labCases, setLabCases] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Timer countdown hook for simulated forgot password reset cooldown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Fetch all dashboard lists
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [clinicsRes, pickupsRes, enquiriesRes, casesRes] = await Promise.all([
        fetch('http://localhost:5005/api/admin/clinics'),
        fetch('http://localhost:5005/api/pickup'),
        fetch('http://localhost:5005/api/contact'),
        fetch('http://localhost:5005/api/labcases')
      ]);

      if (clinicsRes.ok && pickupsRes.ok && enquiriesRes.ok && casesRes.ok) {
        const clinicsData = await clinicsRes.json();
        const pickupsData = await pickupsRes.json();
        const enquiriesData = await enquiriesRes.json();
        const casesData = await casesRes.json();

        setClinics(clinicsData);
        setPickups(pickupsData);
        setEnquiries(enquiriesData);
        setLabCases(casesData);
      } else {
        console.error('Error fetching admin dashboard lists');
      }
    } catch (err) {
      console.error('Network error during admin list fetches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5005/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        fetchDashboardData();
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Connection failure to admin API.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5005/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('System recovery instruction email dispatched! Cooldown active.');
        setTimer(30);
      } else {
        setError(data.message || 'Account not found.');
      }
    } catch (err) {
      setError('Connection failure.');
    }
  };

  const handleUpdateStatus = async (pickupId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5005/api/admin/pickups/${pickupId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Update local state list
        setPickups(prev =>
          prev.map(p => p.id === pickupId ? { ...p, status: newStatus } : p)
        );
      } else {
        alert('Failed to update status on server.');
      }
    } catch (err) {
      console.error('Status sync error:', err);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // --- RENDERS ---

  // 1. Authorization Login Card Screen
  if (!isLoggedIn && !forgotPasswordMode) {
    return (
      <div className="admin-portal-wrapper">
        <div className="admin-auth-card">
          <div className="admin-auth-logo" onClick={onNavigateHome}>
            <img src={logosImg} alt="J3 Dental Lab Logo" style={{ maxHeight: '40px', objectFit: 'contain' }} />
          </div>
          <h2 className="admin-auth-title">Admin Portal</h2>
          <p className="admin-auth-subtitle">Login to access clinical registry and orders console</p>

          {error && <div className="admin-auth-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label className="admin-form-label">Username / Email</label>
              <input
                type="email"
                required
                className="admin-form-input"
                placeholder="admin@j3dental.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input
                type="password"
                required
                className="admin-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-admin-submit">Sign In</button>
          </form>

          <div className="admin-auth-footer">
            <span className="admin-link" onClick={() => setForgotPasswordMode(true)}>Forgot Password?</span>
            <span className="admin-link-divider">|</span>
            <span className="admin-link" onClick={onNavigateHome}>Back to Website</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Forgot Password Recovery Screen
  if (!isLoggedIn && forgotPasswordMode) {
    return (
      <div className="admin-portal-wrapper">
        <div className="admin-auth-card">
          <div className="admin-auth-logo" onClick={onNavigateHome}>
            <img src={logosImg} alt="J3 Dental Lab Logo" style={{ maxHeight: '40px', objectFit: 'contain' }} />
          </div>
          <h2 className="admin-auth-title">Reset Password</h2>
          <p className="admin-auth-subtitle">Provide your administrator email to initiate credential recovery</p>

          {error && <div className="admin-auth-error">{error}</div>}
          {success && <div className="admin-auth-success">{success}</div>}

          <form onSubmit={handleForgotPassword}>
            <div className="admin-form-group">
              <label className="admin-form-label">Administrator Email</label>
              <input
                type="email"
                required
                className="admin-form-input"
                placeholder="admin@j3dental.com"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-admin-submit" 
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend Cooldown (${timer}s)` : 'Send Recovery Email'}
            </button>
          </form>

          <div className="admin-auth-footer">
            <span className="admin-link" onClick={() => { setForgotPasswordMode(false); setError(''); setSuccess(''); }}>Back to Login</span>
            <span className="admin-link-divider">|</span>
            <span className="admin-link" onClick={onNavigateHome}>Back to Website</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard Panel Console
  return (
    <div className="admin-dashboard-container">
      
      {/* Sidebar Panel */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo-mark">
            <img src={logosImg} alt="J3 Dental Lab Logo" style={{ maxHeight: '30px', objectFit: 'contain' }} />
          </div>
          <div>
            <h3 className="admin-sidebar-title">Admin Console</h3>
            <span className="admin-operator-tag">System Operator</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'clinics' ? 'active' : ''}`}
            onClick={() => setActiveTab('clinics')}
          >
            Clinic Accounts
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'labcases' ? 'active' : ''}`}
            onClick={() => setActiveTab('labcases')}
          >
            Lab Cases
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'pickups' ? 'active' : ''}`}
            onClick={() => setActiveTab('pickups')}
          >
            Pickup Orders
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            Client Enquiries
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="btn-sidebar-secondary" onClick={onNavigateHome}>J3 Website Home</button>
          <button className="btn-sidebar-signout" onClick={handleSignOut}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-panel">
        
        {/* Panel Header */}
        <header className="admin-panel-header">
          <div className="admin-header-title-block">
            <h1 className="admin-panel-title">
              {activeTab === 'overview' && 'System Overview'}
              {activeTab === 'clinics' && 'Clinic Registry'}
              {activeTab === 'pickups' && 'Pickup Requests Ledger'}
              {activeTab === 'labcases' && 'Lab Cases Register'}
              {activeTab === 'enquiries' && 'Enquiry Submissions'}
            </h1>
            <p className="admin-panel-desc">Manage accounts, coordinate pickups, and audit communications</p>
          </div>

          <button className="btn-admin-refresh" onClick={fetchDashboardData} disabled={loading}>
            {loading ? 'Refreshing...' : 'Sync Database'}
          </button>
        </header>

        {/* Dynamic Inner Panel View content */}
        <div className="admin-panel-content">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="admin-overview-grid">
              
              <div className="stat-card">
                <span className="stat-label">Total Clinics</span>
                <h2 className="stat-value">{clinics.length}</h2>
                <p className="stat-subtext">Registered dental practices</p>
              </div>

              <div className="stat-card">
                <span className="stat-label">Active Pickups</span>
                <h2 className="stat-value">{pickups.filter(p => p.status !== 'Completed').length}</h2>
                <p className="stat-subtext">Pending or dispatched pickups</p>
              </div>

              <div className="stat-card">
                <span className="stat-label">Total Enquiries</span>
                <h2 className="stat-value">{enquiries.length}</h2>
                <p className="stat-subtext">Contact page submissions</p>
              </div>

              <div className="admin-overview-summary span-3">
                <h3 className="summary-title">Recent Activity Logs</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-time">Database Connected</span>
                    <p className="activity-text">Entity Framework migration audit check completed successfully.</p>
                  </div>
                  {pickups.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="activity-item">
                      <span className="activity-time">Pickup Order #{p.id}</span>
                      <p className="activity-text">Clinic <strong>{p.clinicName}</strong> requested pickup for {p.numberOfCases} case(s). Current status: <strong>{p.status}</strong></p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CLINIC ACCOUNTS TABLE */}
          {activeTab === 'clinics' && (
            <div className="admin-table-container">
              {loading ? (
                <div className="admin-loading-spinner">Loading clinics database...</div>
              ) : clinics.length === 0 ? (
                <div className="admin-empty-state">No clinics registered in the database.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Clinic Name</th>
                      <th>Doctor Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinics.map((c) => (
                      <tr key={c.id}>
                        <td className="bold">{c.id}</td>
                        <td className="bold text-gold">{c.clinicName}</td>
                        <td>{c.doctorName}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.city}</td>
                        <td>{c.state}</td>
                        <td className="dim">{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 3: PICKUP ORDERS TABLE */}
          {activeTab === 'pickups' && (
            <div className="admin-table-container">
              {loading ? (
                <div className="admin-loading-spinner">Loading pickup entries...</div>
              ) : pickups.length === 0 ? (
                <div className="admin-empty-state">No courier pickup requests.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Clinic Name</th>
                      <th>Pickup Date</th>
                      <th>Time Slot</th>
                      <th>Cases</th>
                      <th>Contact Person</th>
                      <th>OTP</th>
                      <th>Status Mapping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickups.map((p) => (
                      <tr key={p.id}>
                        <td className="bold">{p.id}</td>
                        <td className="bold text-gold">{p.clinicName}</td>
                        <td>{new Date(p.pickupDate).toLocaleDateString()}</td>
                        <td>{p.preferredTime}</td>
                        <td className="bold">{p.numberOfCases}</td>
                        <td>{p.contactPerson}</td>
                        <td className="bold font-mono">{p.otp || 'N/A'}</td>
                        <td>
                          <select 
                            className={`admin-status-dropdown ${p.status.toLowerCase()}`}
                            value={p.status}
                            onChange={(e) => handleUpdateStatus(p.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Picked">Picked</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 5: LAB CASES TABLE */}
          {activeTab === 'labcases' && (
            <div className="admin-table-container">
              {loading ? (
                <div className="admin-loading-spinner">Loading lab cases...</div>
              ) : labCases.length === 0 ? (
                <div className="admin-empty-state">No lab cases submitted yet.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Patient Name</th>
                      <th>Clinic/Dr</th>
                      <th>Delivery Date</th>
                      <th>Materials</th>
                      <th>Delivery</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labCases.map((c) => (
                      <tr key={c.id}>
                        <td className="bold">{c.id}</td>
                        <td className="bold text-gold">{c.patientName}</td>
                        <td>{c.clinicName}<br/><span className="dim">{c.doctorName}</span></td>
                        <td>{c.expectedDeliveryDate}</td>
                        <td>{c.materials}</td>
                        <td>{c.deliveryOption}</td>
                        <td className="bold">{c.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 4: CLIENT ENQUIRIES TABLE */}
          {activeTab === 'enquiries' && (
            <div className="admin-table-container">
              {loading ? (
                <div className="admin-loading-spinner">Loading enquiry messages...</div>
              ) : enquiries.length === 0 ? (
                <div className="admin-empty-state">No customer enquiries received yet.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                      <th>Message Body</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e.id}>
                        <td className="bold">{e.id}</td>
                        <td className="bold text-gold">{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td className="bold">{e.subject}</td>
                        <td className="enquiry-msg-cell">{e.message}</td>
                        <td className="dim">{new Date(e.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </div>

      </main>

    </div>
  );
}
