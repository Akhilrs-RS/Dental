import React from 'react';
import logosImg from '../assets/logos.png';

// Golden monogram tooth logo
const LogoIcon = () => (
  <img src={logosImg} alt="J3 Dental Lab Logo" className="footer-logo-img" />
);

// Gold Contact SVG Icons
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dda73c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default function Footer({ onNavigate, onOpenModal }) {
  return (
    <footer className="j3-main-footer">
      <div className="j3-footer-grid">
        
        {/* Column 1: Logo and Slogan */}
        <div className="j3-footer-col j3-footer-brand">
          <div className="j3-footer-logo-row">
            <LogoIcon />
            <div className="j3-footer-logo-text">
              <span className="j3-logo-title">J3 DENTAL LAB</span>
              <span className="j3-logo-subtitle">PRECISION DENTAL EXCELLENCE</span>
            </div>
          </div>
          <p className="j3-footer-desc">
            Crafting precision dental restorations with cutting-edge CAD/CAM technology. Your trusted partner in dental excellence.
          </p>
          <p className="j3-footer-slogan">
            "Crafting Precision, Delivering Confidence."
          </p>
        </div>

        {/* Column 2: Our Services */}
        <div className="j3-footer-col">
          <h4 className="j3-footer-heading">OUR SERVICES</h4>
          <ul className="j3-footer-links">
            <li onClick={() => onOpenModal('products')}>
              <span className="j3-link-bullet">»</span> Zirconia Crowns
            </li>
            <li onClick={() => onOpenModal('products')}>
              <span className="j3-link-bullet">»</span> E-Max Crowns
            </li>
            <li onClick={() => onOpenModal('services')}>
              <span className="j3-link-bullet">»</span> Digital CAD/CAM
            </li>
            <li onClick={() => onOpenModal('products')}>
              <span className="j3-link-bullet">»</span> Implant Prosthetics
            </li>
            <li onClick={() => onOpenModal('services')}>
              <span className="j3-link-bullet">»</span> Shade Matching
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="j3-footer-col">
          <h4 className="j3-footer-heading">QUICK LINKS</h4>
          <ul className="j3-footer-links">
            <li onClick={() => onOpenModal('about')}>
              <span className="j3-link-bullet">»</span> About Us
            </li>
            <li onClick={() => onOpenModal('services')}>
              <span className="j3-link-bullet">»</span> Services
            </li>
            <li onClick={() => onOpenModal('contact')}>
              <span className="j3-link-bullet">»</span> Contact
            </li>
            <li onClick={() => onNavigate('dashboard')}>
              <span className="j3-link-bullet">»</span> Dentist Login
            </li>
            <li onClick={() => onNavigate('scheduler')}>
              <span className="j3-link-bullet">»</span> Register
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="j3-footer-col">
          <h4 className="j3-footer-heading">CONTACT US</h4>
          <ul className="j3-footer-contacts">
            <li>
              <div className="j3-contact-icon">
                <PhoneIcon />
              </div>
              <div className="j3-contact-text">
                <span>+91 97899 93073</span>
                <span>+91 97899 93076</span>
              </div>
            </li>
            <li>
              <div className="j3-contact-icon">
                <MailIcon />
              </div>
              <div className="j3-contact-text">
                <a href="mailto:info@j3dentallab.com">info@j3dentallab.com</a>
              </div>
            </li>
            <li>
              <div className="j3-contact-icon">
                <MapPinIcon />
              </div>
              <div className="j3-contact-text">
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </li>
            <li>
              <div className="j3-contact-icon">
                <ClockIcon />
              </div>
              <div className="j3-contact-text">
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="j3-footer-bottom">
        <div className="j3-copyright">
          © 2026 J3 Dental Lab. All rights reserved.
        </div>
        <div className="j3-footer-legal">
          <span onClick={() => onOpenModal('about')}>Privacy Policy</span>
          <span onClick={() => onOpenModal('about')}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
