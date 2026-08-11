import React from 'react';
import '../index.css';

export default function ServiceDetailsPage({ service, onNavigate }) {
  if (!service) return null;

  return (
    <div className="service-details-page-wrapper">
      {/* Title section positioned over the background image */}
      <div className="service-details-hero">
        <div className="service-details-hero-inner">
          <h1 className="service-details-title">{service.title || "SERVICE NAME"}</h1>
          {service.subtitle && <p className="service-details-subtitle">{service.subtitle}</p>}
        </div>
      </div>

      {/* Grid section positioned below the background image */}
      <div className="service-details-page">
        <div className="service-details-content">
          <div className="service-details-grid">
            {/* Left Column: Rich Text Content */}
            <div className="service-details-left">
              <p className="service-details-desc">{service.desc}</p>
              
              {service.keyBenefits && service.keyBenefits.length > 0 && (
                <div className="service-details-list-section">
                  <h3><span className="section-icon"></span> Key Benefits</h3>
                  <ul className="list-two-col">
                    {service.keyBenefits.map((benefit, i) => (
                      <li key={i}>
                        <span className="icon-benefit">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.indications && service.indications.length > 0 && (
                <div className="service-details-list-section">
                  <h3><span className="section-icon"></span> Indications</h3>
                  <ul className="list-two-col">
                    {service.indications.map((indication, i) => (
                      <li key={i}>
                        <span className="icon-indication">→</span>
                        {indication}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.materials && service.materials.length > 0 && (
                <div className="service-details-list-section">
                  <h3><span className="section-icon"></span> Materials & Technology</h3>
                  <ul className="list-one-col">
                    {service.materials.map((material, i) => (
                      <li key={i} className="material-item">
                        <span className="icon-material"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Pagination matching the screenshot mockup */}
              <div className="service-details-pagination">
                <button className="btn-page">&lt;</button>
                <div className="page-dot active"></div>
                <button className="btn-page">&gt;</button>
              </div>
            </div>

          {/* Right Column: Pricing & Turnaround Card */}
          <div className="service-details-right">
            <div className="service-details-card">
              <h2 className="card-heading">SERVICE DETAILS</h2>
              
              <div className="card-row">
                <div className="card-icon rupee-icon">₹</div>
                <div className="card-text">
                  <span className="label">Starting From</span>
                  <span className="value">₹ {service.price || 'Contact for price'}</span>
                </div>
              </div>
              
              <div className="card-row">
                <div className="card-icon clock-icon">⏱</div>
                <div className="card-text">
                  <span className="label">Standard Turnaround</span>
                  <span className="value">{service.standardTurnaround || service.turnaround}</span>
                </div>
              </div>

              <div className="card-row">
                <div className="card-icon express-icon">⚡</div>
                <div className="card-text">
                  <span className="label">Express Turnaround</span>
                  <span className="value">{service.expressTurnaround || 'Not Available'}</span>
                </div>
              </div>

              <button className="btn-service-book-full" onClick={() => onNavigate('register')}>
                Submit A case
              </button>
              
              <button className="btn-service-contact-full" onClick={() => onNavigate('contact')}>
                Contact support
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
