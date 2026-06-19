import React from 'react';
import { CLINIC_ANALYTICS, INITIAL_APPOINTMENTS } from '../data/mockData';

export default function Dashboard({ onViewScheduler, onViewPatient }) {
  const { dailyRevenue, monthlyRevenue, occupancyRate, activePatients, procedureBreakdown, revenueHistory } = CLINIC_ANALYTICS;

  // Render SVG Area Chart for Revenue History
  const renderRevenueChart = () => {
    const width = 500;
    const height = 180;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxVal = Math.max(...revenueHistory.map(d => d.amount)) * 1.1;
    const minVal = 0;

    // Calculate coordinates
    const points = revenueHistory.map((d, i) => {
      const x = padding + (i * chartWidth) / (revenueHistory.length - 1);
      const y = padding + chartHeight - ((d.amount - minVal) * chartHeight) / (maxVal - minVal);
      return { x, y, month: d.month, amount: d.amount };
    });

    const pathData = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    const areaData = points.length > 0 
      ? `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : '';

    return (
      <svg width="100%" height="200" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-teal)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary-teal)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding + chartHeight * ratio;
          const val = Math.round(maxVal - (ratio * (maxVal - minVal)));
          return (
            <g key={idx}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4,4" />
              <text x={padding - 5} y={y + 4} fill="var(--text-muted)" fontSize="9" textAnchor="end">₹{(val / 1000).toFixed(0)}k</text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={areaData} fill="url(#chartGrad)" />

        {/* Main Line */}
        <path d={pathData} fill="none" stroke="var(--primary-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i} className="chart-dot-group">
            <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-card)" stroke="var(--primary-teal)" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} fill="var(--text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">₹{(p.amount / 1000).toFixed(1)}k</text>
            <text x={p.x} y={height - padding + 16} fill="var(--text-secondary)" fontSize="11" fontWeight="500" textAnchor="middle">{p.month}</text>
          </g>
        ))}
      </svg>
    );
  };

  // Render SVG Donut Chart for Procedure Breakdown
  const renderDonutChart = () => {
    const size = 180;
    const center = size / 2;
    const radius = 50;
    const strokeWidth = 18;
    const circumference = 2 * Math.PI * radius;
    
    let currentAngle = 0;
    const items = procedureBreakdown.map(item => {
      const percentage = item.value;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      const angle = currentAngle;
      currentAngle += (percentage / 100) * 360;
      return { ...item, strokeDashoffset, angle };
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {items.map((item, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={item.strokeDashoffset}
              transform={`rotate(${item.angle - 90} ${center} ${center})`}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          ))}
          <circle cx={center} cy={center} r={radius - strokeWidth/2 - 2} fill="var(--bg-card)" />
          <text x={center} y={center - 2} textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="bold">ADA</text>
          <text x={center} y={center + 14} textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Procedures</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          {items.map((item, idx) => (
            <div key={idx} className="flex-row-center">
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
              <span style={{ color: 'var(--text-secondary)' }}>{item.name}:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Stat Cards Row */}
      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-info">
            <h3>Today's Production</h3>
            <div className="stat-value">₹{dailyRevenue.toLocaleString()}</div>
            <div className="stat-change positive">
              <span>↑ 12%</span> vs last Friday
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', color: 'var(--primary-teal)' }}>
            🏥
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>Monthly Billings</h3>
            <div className="stat-value">₹{monthlyRevenue.toLocaleString()}</div>
            <div className="stat-change positive">
              <span>↑ 8.4%</span> this month
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(2, 132, 199, 0.1)', color: 'var(--secondary-blue)' }}>
            💳
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>Operatory Occupancy</h3>
            <div className="stat-value">{occupancyRate}%</div>
            <div className="stat-change negative">
              <span>↓ 2%</span> vs target 87%
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-decay)' }}>
            🦷
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-info">
            <h3>Active Patients</h3>
            <div className="stat-value">{activePatients.toLocaleString()}</div>
            <div className="stat-change positive">
              <span>↑ 24</span> new this month
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-crown)' }}>
            👥
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="dashboard-main-layout">
        
        {/* Practice Revenue Area Chart */}
        <div className="card">
          <h2>Revenue Generation & Forecasting</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            A comprehensive history of clinic revenue collections over the last 6 months.
          </p>
          {renderRevenueChart()}
        </div>

        {/* Procedures Donut Chart */}
        <div className="card">
          <h2>Procedure Metrics</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Distribution of treatment types billed.
          </p>
          {renderDonutChart()}
        </div>
      </div>

      {/* Operatorries & Recent Alerts Row */}
      <div className="dashboard-main-layout">
        
        {/* Operatory Chairs Monitor */}
        <div className="card">
          <h2>Live Chair Monitor</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Real-time status of the clinic treatment rooms.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div className="flex-between" style={{ padding: '12px 16px', backgroundColor: 'rgba(139, 92, 246, 0.08)', borderRadius: '10px', borderLeft: '4px solid var(--color-crown)' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Operatory A (General Dentistry)</strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Patient: <strong>Marcus Sterling</strong> | Provider: Dr. Carter
                </p>
              </div>
              <span className="badge badge-danger">In-Chair (Filling #8)</span>
            </div>

            <div className="flex-between" style={{ padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', borderLeft: '4px solid var(--color-healthy)' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Operatory B (Surg / Implantology)</strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Next patient: <strong>Samuel Henderson</strong> (11:15 AM)
                </p>
              </div>
              <span className="badge badge-success">Sterilization Complete</span>
            </div>

            <div className="flex-between" style={{ padding: '12px 16px', backgroundColor: 'rgba(2, 132, 199, 0.08)', borderRadius: '10px', borderLeft: '4px solid var(--secondary-blue)' }}>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Hygiene Bay 1</strong>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Patient: <strong>Chloe Park</strong> | Provider: Amy Miller
                </p>
              </div>
              <span className="badge badge-info">Cleaning Completed</span>
            </div>

          </div>
          <button className="btn btn-secondary mt-md" style={{ width: '100%' }} onClick={onViewScheduler}>
            Open Scheduling Grid
          </button>
        </div>

        {/* Live Alerts Feed */}
        <div className="card">
          <h2>Clinic Notifications</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Recent system activities and doctor call-outs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
            
            <div style={{ padding: '10px', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
              <div className="flex-between">
                <span className="badge badge-success">Checked-In</span>
                <span style={{ color: 'var(--text-muted)' }}>09:12 AM</span>
              </div>
              <p style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                Patient <strong>Eleanor Vance</strong> has checked in at reception.
              </p>
            </div>

            <div style={{ padding: '10px', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
              <div className="flex-between">
                <span className="badge badge-info">Image Uploaded</span>
                <span style={{ color: 'var(--text-muted)' }}>09:05 AM</span>
              </div>
              <p style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                2 Intraoral Bitewing Radiographs uploaded for Eleanor Vance.
              </p>
            </div>

            <div style={{ padding: '10px', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
              <div className="flex-between">
                <span className="badge badge-warning">Lab Case Alert</span>
                <span style={{ color: 'var(--text-muted)' }}>Yesterday</span>
              </div>
              <p style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                Elite Dental Lab: Crown case #82103 for Marcus Sterling is <strong>Shipped</strong>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
