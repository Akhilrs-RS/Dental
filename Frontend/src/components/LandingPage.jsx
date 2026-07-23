import React, { useState } from 'react';
import homeBg from '../assets/home.png';
import Footer from './Footer';
import dentalOperatory from '../assets/dental_operatory.png';
import zirconiaRestorationImg from '../assets/zirconia_restoration.png';
import millingMachineImg from '../assets/milling_machine.png';
import teethProfileImg from '../assets/teeth_profile.png';
import AboutPage from './AboutPage';
import ProductsPage from './ProductsPage';
import PickupRequestPage from './PickupRequestPage';
import GalleryPage from './GalleryPage';
import ContactPage from './ContactPage';


// SVG Icons
const LogoIcon = () => (
  <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF1C5" />
        <stop offset="30%" stopColor="#D8A236" />
        <stop offset="70%" stopColor="#A8751B" />
        <stop offset="100%" stopColor="#F5D061" />
      </linearGradient>
    </defs>
    <path 
      d="M50 12C38 12 28 15 28 32C28 46 38 52 42 60C45 66 42 78 47 84C49 86 51 88 53 88C55 88 57 86 59 84C64 78 61 66 64 60C68 52 78 46 78 32C78 15 68 12 50 12Z" 
      stroke="url(#goldGradient)" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M43 32H57M50 32V60C50 63.5 47 65.5 44 65.5M54 41.5C57.5 41.5 59.5 39 59.5 37.25C59.5 35.5 57.5 32 54 32M54 51C57.5 51 59.5 48.5 59.5 46.75C59.5 45 57.5 41.5 54 41.5" 
      stroke="url(#goldGradient)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ToothIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C9.5 2 7.5 3.5 7.5 7C7.5 10 9.5 11.5 10.5 13C11 14 10.5 16.5 11.5 18C12 18.8 12.5 18.8 13 18C14 16.5 13.5 14 14 13C15 11.5 17 10 17 7C17 3.5 15 2 12 2Z" />
    <path d="M8 12.5C7.2 13 6.5 13.8 6.5 15C6.5 17 8 18.5 10 18.5" />
    <path d="M16 12.5C16.8 13 17.5 13.8 17.5 15C17.5 17 16 18.5 14 18.5" />
  </svg>
);

const CubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 7 22 17 12 22 2 17 2 7 12 2"></polygon>
    <polyline points="2 7 12 12 22 7"></polyline>
    <line x1="12" y1="12" x2="12" y2="22"></line>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

export default function LandingPage({ onNavigate }) {
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'products', 'pickup', '3d', 'contact', 'services', 'about', 'gallery'
  const [pickupForm, setPickupForm] = useState({
    clinicName: 'Aura Dental Clinic',
    caseNumber: 'J3-2486',
    materials: 'Silicone Impressions',
    date: new Date().toISOString().split('T')[0],
    time: '14:30',
    notes: ''
  });
  const [pickupSubmitted, setPickupSubmitted] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [trackingStageIndex, setTrackingStageIndex] = useState(6);
  const [landingView, setLandingView] = useState('home');

  const handlePickupSubmit = (e) => {
    e.preventDefault();
    setPickupSubmitted(true);
    setTimeout(() => {
      setPickupSubmitted(false);
      setActiveModal(null);
    }, 3000);
  };

  const renderHeader = () => (
    <header className="landing-header" style={{ position: 'relative', width: '100%', padding: '24px 0', borderBottom: landingView !== 'home' ? '1px solid rgba(255,255,255,0.06)' : 'none', zIndex: 10 }}>
      <nav className="landing-navbar">
        <div className="landing-logo" onClick={() => setLandingView('home')} style={{ cursor: 'pointer' }}>
          <LogoIcon />
        </div>

        <div className="landing-nav-pill">
          <span className={`landing-nav-link ${landingView === 'about' ? 'active' : ''}`} onClick={() => setLandingView('about')}>About</span>
          <span className="landing-nav-link" onClick={() => setActiveModal('services')}>Services</span>
          <span className={`landing-nav-link ${landingView === 'products' ? 'active' : ''}`} onClick={() => setLandingView('products')}>Products</span>
          <span className={`landing-nav-link ${landingView === 'pickup' ? 'active' : ''}`} onClick={() => setLandingView('pickup')}>Pickup Request</span>
          <span className={`landing-nav-link ${landingView === 'gallery' ? 'active' : ''}`} onClick={() => setLandingView('gallery')}>Gallery</span>
          <span className={`landing-nav-link ${landingView === 'contact' ? 'active' : ''}`} onClick={() => setLandingView('contact')}>Contact</span>
        </div>

        <button className="landing-login-btn" onClick={() => onNavigate('dashboard')}>
          <span>Login</span>
          <div className="landing-login-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </button>
      </nav>
    </header>
  );

  return (
    <div className="landing-page-wrapper">
      <div className="landing-container">
        
        {landingView === 'home' ? (
          <>
            {/* Hero Section */}
            <div 
              className="landing-hero-section" 
              style={{ backgroundImage: `url(${homeBg})` }}
            >
              <div className="landing-hero-overlay"></div>
              
              {/* Header */}
              {renderHeader()}

              {/* Hero Content */}
              <div className="landing-hero-content">
                <div className="landing-hero-left">
                  <span className="landing-subtitle">Digital Dental Laboratory</span>
                  <h1 className="landing-title">
                    Precision<br />
                    Restorations.<br />
                    <span className="gold-text">Connected<br /></span>
                    <span className="gold-text">Workflows.</span>
                  </h1>
                  
                  <div className="landing-actions">
                    <button className="btn-gold" onClick={() => onNavigate('scheduler')}>
                      Book a Lab Case
                    </button>
                    <button className="btn-outline-white" onClick={() => setLandingView('products')}>
                      Explore Our Products
                    </button>
                  </div>
                </div>

            <div className="landing-hero-right">
              {/* Live Case Card */}
              <div className="landing-live-case-card">
                <div className="landing-live-case-title">Live Case</div>
                
                <div className="landing-live-case-row">
                  <span className="landing-live-case-label">Case Number</span>
                  <span className="landing-live-case-value">J3-2486</span>
                </div>
                
                <div className="landing-live-case-row">
                  <span className="landing-live-case-label">Current Stage</span>
                  <span className="landing-live-case-value">CAD design</span>
                </div>
                
                <div className="landing-live-case-row">
                  <span className="landing-live-case-label">Est Delivery</span>
                  <span className="landing-live-case-value">Jul 22</span>
                </div>
                
                <div className="landing-live-case-row" style={{ marginTop: '4px' }}>
                  <span className="landing-live-case-label">Progress</span>
                  <span className="landing-live-case-value">45%</span>
                </div>

                <div className="landing-progress-container">
                  <div className="landing-progress-bar">
                    <div className="landing-progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="landing-footer">
          <div className="landing-footer-item" onClick={() => onNavigate('planner')}>
            <div className="landing-footer-icon">
              <DocumentIcon />
            </div>
            <span>Digital Case Submission</span>
          </div>

          <div className="landing-footer-item" onClick={() => onNavigate('patients')}>
            <div className="landing-footer-icon">
              <ToothIcon />
            </div>
            <span>Interactive Tooth Chart</span>
          </div>

          <div className="landing-footer-item" onClick={() => setActiveModal('3d')}>
            <div className="landing-footer-icon">
              <CubeIcon />
            </div>
            <span>3D Scan Viewer</span>
          </div>

          <div className="landing-footer-item" onClick={() => setLandingView('pickup')}>
            <div className="landing-footer-icon">
              <TruckIcon />
            </div>
            <span>Clinic Pickup Service</span>
          </div>
        </footer>

        {/* Section 1: About J3 Dental Lab */}
        <section className="landing-about-section">
          <div className="landing-about-grid">
            <div className="landing-about-image-col">
              <img src={dentalOperatory} alt="Dental Operatory" className="landing-about-img" />
              <div className="landing-about-badge">
                <span className="badge-v">10+</span>
                <span className="badge-lbl">Years of dental laboratory craftsmanship</span>
              </div>
            </div>
            <div className="landing-about-info-col">
              <span className="landing-section-tag" style={{ color: '#dda73c' }}>About J3 Dental Lab</span>
              <h2 className="landing-section-title">BUILT FOR ACCURACY. DESIGNED FOR BETTER COLLABORATION.</h2>
              <p className="landing-section-desc">
                J3 Dental Lab combines experienced dental technicians, digital workflows and advanced restoration technology to help clinics manage laboratory cases with greater clarity, speed and precision
              </p>
              
              <div className="landing-about-metrics" style={{ alignItems: 'center' }}>
                <div className="landing-metric-item">
                  <span className="landing-metric-val">98%</span>
                  <span className="landing-metric-lbl">Satisfaction Rate</span>
                </div>
                <div className="landing-metric-item">
                  <span className="landing-metric-val">4.5</span>
                  <span className="landing-metric-lbl">Customer's Rating</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                  <button 
                    className="btn-outline-white" 
                    style={{ borderRadius: '20px', padding: '8px 24px', fontSize: '12px', borderColor: 'rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: '500' }}
                    onClick={() => setLandingView('about')}
                  >
                    Read more
                  </button>
                  <div 
                    onClick={() => setLandingView('about')}
                    className="readmore-arrow-btn"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s ease' }}
                  >
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="landing-about-carousel">
            <div className="landing-carousel-item" onClick={() => setActiveModal('gallery')}>
              <img src={dentalOperatory} className="landing-carousel-img" alt="Carousel 1" />
            </div>
            <div className="landing-carousel-item" onClick={() => setActiveModal('gallery')}>
              <img src={zirconiaRestorationImg} className="landing-carousel-img" alt="Carousel 2" />
            </div>
            <div className="landing-carousel-item" onClick={() => setActiveModal('gallery')}>
              <img src={millingMachineImg} className="landing-carousel-img" alt="Carousel 3" />
            </div>
            <div className="landing-carousel-item" onClick={() => setActiveModal('gallery')}>
              <img src={homeBg} className="landing-carousel-img" alt="Carousel 4" />
            </div>
            <div className="landing-carousel-item" onClick={() => setActiveModal('gallery')}>
              <img src={teethProfileImg} className="landing-carousel-img" alt="Carousel 5" />
            </div>
          </div>
        </section>

        {/* Section 2: Product Restorations Grid */}
        <section className="landing-products-section">
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <span className="landing-section-tag">OUR PRODUCTS</span>
            <h2 className="landing-section-title" style={{ marginTop: '12px' }}>RESTORATION SOLUTIONS, ENGINEERED END-TO-END</h2>
          </div>
          
          <div className="landing-products-grid">
            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={zirconiaRestorationImg} className="landing-product-card-img" alt="Zirconia Restorations" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">Zirconia Restorations</h3>
                <p className="landing-product-card-desc">Monolithic or micro-layered. Ultra-high strength crowns and bridges with multi-layered translucency.</p>
              </div>
            </div>

            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={millingMachineImg} className="landing-product-card-img" alt="Implant Prosthetics" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">Implant Prosthetics</h3>
                <p className="landing-product-card-desc">Custom titanium and hybrid abutments. Precise emergence profiles for all major implant systems.</p>
              </div>
            </div>

            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={teethProfileImg} className="landing-product-card-img" alt="Digital Orthodontics" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">Digital Orthodontics & Splints</h3>
                <p className="landing-product-card-desc">Biocompatible surgical guides, splints, and custom aligner models for precise setups.</p>
              </div>
            </div>

            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={zirconiaRestorationImg} className="landing-product-card-img" alt="IPS e.max" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">IPS e.max Restorations</h3>
                <p className="landing-product-card-desc">Lithium disilicate crowns, veneers, and onlays for unparalleled anterior aesthetics.</p>
              </div>
            </div>

            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={homeBg} className="landing-product-card-img" alt="Digital Smile Design" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">Digital Smile Design</h3>
                <p className="landing-product-card-desc">Custom diagnostics and virtual wax-ups to plan full mouth cosmetic makeovers.</p>
              </div>
            </div>

            <div className="landing-product-card" onClick={() => setActiveModal('products')}>
              <img src={dentalOperatory} className="landing-product-card-img" alt="CAD/CAM Services" />
              <div className="landing-product-card-content">
                <h3 className="landing-product-card-title">CAD/CAM Services</h3>
                <p className="landing-product-card-desc">Send us your raw digital scan files and receive mill-ready CAD designs in return.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Case Tracking Section */}
        <section className="landing-tracking-section">
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <span className="landing-section-tag">CASE TRACKING</span>
            <h2 className="landing-section-title" style={{ marginTop: '12px' }}>FROM PRESCRIPTION TO DELIVERY, EVERY STAGE STAYS VISIBLE.</h2>
          </div>

          <div className="landing-timeline-container">
            <div className="landing-timeline-wrapper">
              <div className="landing-timeline-line"></div>
              <div 
                className="landing-timeline-progress-line" 
                style={{ width: `${(trackingStageIndex / 8) * 100}%` }}
              ></div>

              {[
                "Order Received", "Model Prep", "CAD Design", "Milling/3D Print", 
                "Ceramic/Finish", "Quality Control", "Labeling/Packaging", 
                "On Courier", "Delivered"
              ].map((stage, idx) => (
                <div 
                  key={stage} 
                  className={`landing-timeline-step ${idx < trackingStageIndex ? 'completed' : ''} ${idx === trackingStageIndex ? 'active' : ''}`}
                  onClick={() => setTrackingStageIndex(idx)}
                >
                  <div className="landing-timeline-dot"></div>
                  <span className="landing-timeline-label">{stage}</span>
                </div>
              ))}
            </div>

            <div className="landing-tracking-stats">
              <div className="landing-track-stat-item">
                <span className="landing-track-stat-val">5.4 Days</span>
                <span className="landing-track-stat-lbl">Avg Turnaround Time</span>
              </div>
              <div className="landing-track-stat-item">
                <span className="landing-track-stat-val">12,482</span>
                <span className="landing-track-stat-lbl">Completed Cases</span>
              </div>
              <div className="landing-track-stat-item">
                <span className="landing-track-stat-val">99.6%</span>
                <span className="landing-track-stat-lbl">On-Time Delivery Rate</span>
              </div>
              <div className="landing-track-stat-item">
                <span className="landing-track-stat-val">Pre-stage</span>
                <span className="landing-track-stat-lbl">Quality Checks Done</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Courier Pickup Section */}
        <section className="landing-courier-section">
          <div className="landing-courier-grid">
            <div>
              <span className="landing-section-tag">COURIER PICKUP</span>
              <h2 className="landing-section-title" style={{ marginTop: '12px', marginBottom: '24px' }}>
                SCHEDULE LABORATORY PICKUPS WITHOUT MAKING A CALL
              </h2>
              
              <div className="landing-courier-timeline">
                <div className="landing-courier-timeline-item active">
                  <div className="landing-courier-timeline-dot"></div>
                  <span className="landing-courier-timeline-lbl">Verified Request</span>
                </div>
                <div className="landing-courier-timeline-item active">
                  <div className="landing-courier-timeline-dot"></div>
                  <span className="landing-courier-timeline-lbl">Scheduled Pickup</span>
                </div>
                <div className="landing-courier-timeline-item">
                  <div className="landing-courier-timeline-dot"></div>
                  <span className="landing-courier-timeline-lbl">In Transit to Lab</span>
                </div>
                <div className="landing-courier-timeline-item">
                  <div className="landing-courier-timeline-dot"></div>
                  <span className="landing-courier-timeline-lbl">Received at Lab</span>
                </div>
                <div className="landing-courier-timeline-item">
                  <div className="landing-courier-timeline-dot"></div>
                  <span className="landing-courier-timeline-lbl">Delivered Restoration</span>
                </div>
              </div>

              <button className="btn-gold" style={{ marginTop: '36px' }} onClick={() => setActiveModal('pickup')}>
                Request Courier Pickup →
              </button>
            </div>

            <div className="landing-courier-form-preview">
              <div className="landing-courier-preview-title">
                <span>Active Courier Order</span>
                <span className="landing-courier-preview-badge">Courier Dispatched</span>
              </div>
              <div className="landing-courier-preview-grid">
                <div className="landing-courier-preview-item">
                  <span className="landing-courier-preview-lbl">Clinic Name</span>
                  <span className="landing-courier-preview-val">{pickupForm.clinicName}</span>
                </div>
                <div className="landing-courier-preview-item">
                  <span className="landing-courier-preview-lbl">Case Number</span>
                  <span className="landing-courier-preview-val">{pickupForm.caseNumber}</span>
                </div>
                <div className="landing-courier-preview-item">
                  <span className="landing-courier-preview-lbl">Courier Collection</span>
                  <span className="landing-courier-preview-val">{pickupForm.materials}</span>
                </div>
                <div className="landing-courier-preview-item">
                  <span className="landing-courier-preview-lbl">Date & Time</span>
                  <span className="landing-courier-preview-val">{pickupForm.date} @ {pickupForm.time}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Tooth Chart Promo & Testimonials */}
        <section className="landing-toothchart-promo-section">
          <div className="landing-about-grid">
            <div>
              <span className="landing-section-tag">INTERACTIVE TOOTH CHART</span>
              <h2 className="landing-section-title" style={{ marginTop: '12px' }}>SELECT THE RESTORATIONS WITH FULL PRECISION.</h2>
            </div>
            <div>
              <p className="landing-section-desc" style={{ fontSize: '16px' }}>
                Provide detailed instructions, choose shades, and trace pathology on our interactive 2D and 3D dental chart. Get exact visual representations of crowns, veneers, RCTs, and fillings before production starts.
              </p>
            </div>
          </div>

          <div className="landing-testimonial-box">
            <span className="landing-testimonial-quote-icon">“</span>
            
            {testimonialIndex === 0 && (
              <p className="landing-testimonial-text">
                "The digital workflow and the tracking tools completely changed how we work with our lab. No more phone calls to clarify where a case is at or clarify instructions."
              </p>
            )}
            {testimonialIndex === 1 && (
              <p className="landing-testimonial-text">
                "Accuracy is everything in implant prosthetics. J3 Dental Lab consistently delivers custom abutments and crowns that require zero chairside adjustments. Exceptional work!"
              </p>
            )}
            {testimonialIndex === 2 && (
              <p className="landing-testimonial-text">
                "Our transition to 100% digital was made seamless by their support team. We upload intraoral scans directly from our scanner and receive beautiful restorations within days."
              </p>
            )}

            <div className="landing-testimonial-author">
              <span className="landing-testimonial-name">
                {testimonialIndex === 0 ? "Dr. Sarah Carter" : testimonialIndex === 1 ? "Dr. Amit Patel" : "Dr. Lisa Vance"}
              </span>
              <span className="landing-testimonial-meta">
                {testimonialIndex === 0 
                  ? "Aura Dental Clinic, San Francisco, CA • Clinical Director" 
                  : testimonialIndex === 1 
                  ? "Apex Implant Center, Chicago, IL • Lead Implantologist" 
                  : "Metro Dental Group, New York, NY • Managing Partner"
                }
              </span>
            </div>

            <div className="landing-testimonial-dots">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx} 
                  className={`landing-testimonial-dot ${testimonialIndex === idx ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(idx)}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: FAQ Accordion Section */}
        <section className="landing-faq-section">
          <div className="landing-faq-grid">
            <div>
              <span className="landing-section-tag">FAQ</span>
              <h2 className="landing-section-title" style={{ marginTop: '12px', marginBottom: '16px' }}>
                Common questions, answered.
              </h2>
              <p className="landing-section-desc" style={{ marginBottom: '24px' }}>
                Everything you need to know about getting started and integrating with J3 Dental Lab.
              </p>
              <button className="btn-outline-white" onClick={() => setActiveModal('contact')}>
                View Help Center
              </button>
            </div>

            <div className="landing-faq-accordion">
              {[
                {
                  q: "How do I register my clinic?",
                  a: "You can create an account by clicking the 'Register' button in the top navbar. Once verified, you'll gain access to the doctor portal, allowing you to submit cases, track status, and manage billing."
                },
                {
                  q: "What file formats do you support?",
                  a: "We support all major open scanner formats including STL, PLY, and OBJ files. You can export scans directly from iTero, Trios, Medit, or Carestream and upload them."
                },
                {
                  q: "Is express courier service free?",
                  a: "Yes, we provide complimentary express courier pickup and delivery for all regular contracted clinics within our service metropolitan zones."
                },
                {
                  q: "Do you bundle physical shipments?",
                  a: "Yes, to reduce environmental impact and shipping delays, we can bundle multiple cases completed in the same period into single courier batches."
                },
                {
                  q: "How long does the average case take?",
                  a: "Standard zirconia crowns take 5 business days from scan receipt. Implant cases take 7-10 business days depending on component sourcing. Rush options are available."
                }
              ].map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`landing-faq-item ${activeFaqIndex === idx ? 'open' : ''}`}
                >
                  <button className="landing-faq-trigger" onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}>
                    <span>{faq.q}</span>
                    <span className="landing-faq-arrow">»</span>
                  </button>
                  <div className="landing-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Gold Call-to-Action Banner */}
        <section className="landing-cta-banner">
          <h2 className="landing-cta-title">A clearer way to work with your dental laboratory.</h2>
          <p className="landing-cta-subtitle">Submit cases, track stats, and schedule pickups in our intuitive portal.</p>
          <div className="landing-cta-buttons">
            <button className="btn-black" onClick={() => onNavigate('scheduler')}>
              Register Clinic
            </button>
            <button className="btn-outline-dark" onClick={() => onNavigate('dashboard')}>
              Access Portal
            </button>
          </div>
        </section>
        </>
        ) : (
          <>
            {/* Subpage Header */}
            <div style={{ background: '#03050a', padding: '0 80px', width: '100%', boxSizing: 'border-box' }}>
              {renderHeader()}
            </div>

            {/* Subpages Routing */}
            {landingView === 'about' && <AboutPage onNavigate={onNavigate} />}
            {landingView === 'products' && <ProductsPage onNavigate={onNavigate} />}
            {landingView === 'pickup' && <PickupRequestPage onNavigate={onNavigate} />}
            {landingView === 'gallery' && <GalleryPage />}
            {landingView === 'contact' && <ContactPage />}
          </>
        )}

        {/* J3 Main Footer */}
        <Footer 
          onNavigate={(view) => {
            if (view === 'dashboard' || view === 'patients' || view === 'scheduler' || view === 'planner') {
              onNavigate(view);
            } else {
              setLandingView(view);
            }
          }} 
          onOpenModal={(modal) => {
            if (modal === 'about' || modal === 'products' || modal === 'pickup' || modal === 'gallery' || modal === 'contact') {
              setLandingView(modal);
            } else {
              setActiveModal(modal);
            }
          }} 
        />

      </div>

      {/* --- MODALS --- */}
      
      {/* 1. About Modal */}
      {activeModal === 'about' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '600px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <LogoIcon />
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '12px', fontFamily: 'Playfair Display, serif' }}>About AuraDental Lab</h2>
              <p style={{ color: '#dda73c', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>Excellence in Digital Restorations</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>
              <p>
                Founded at the intersection of dentistry and advanced engineering, AuraDental is a premier full-service digital dental laboratory. We partner with dental clinics worldwide to deliver superior-fitting, highly aesthetic dental prosthetics.
              </p>
              <p>
                By utilising state-of-the-art CAD/CAM systems, ultra-precise 3D printing technologies, and premium biocompatible materials, we eliminate variables and provide predictable clinical results. Our team of experienced master technicians inspects every restoration under high-power magnification to ensure absolute precision.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dda73c' }}>&lt; 50μm</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Restoration Accuracy</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dda73c' }}>100%</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Digital CAD/CAM Workflow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Services Modal */}
      {activeModal === 'services' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '700px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>Our Digital Lab Services</h2>
              <p style={{ color: '#dda73c', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>Predictable, Fast, & Beautiful</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px' }}>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <h3 style={{ color: '#dda73c', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>CAD/CAM Design</h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>Send us your intraoral scans (STL/PLY). Our designers build precise digital restorations tailored to patients' dynamic occlusion.</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <h3 style={{ color: '#dda73c', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>3D Printing & Milling</h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>Milling zirconia, PMMA, and wax. 3D printing implant surgical guides, diagnostic models, and biocompatible splints.</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <h3 style={{ color: '#dda73c', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>Custom Shade Matching</h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>Upload patient studio photography. Our master ceramicists apply hand-layered stains for seamless aesthetic blending.</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <h3 style={{ color: '#dda73c', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>Diagnostic Wax-Ups</h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>High-aesthetic physical or digital mock-ups to showcase smile transformations and secure patient case acceptance.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Products Modal */}
      {activeModal === 'products' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '800px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>Premium Restorative Products</h2>
              <p style={{ color: '#dda73c', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>Individually Customized Restorations</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '24px' }}>🦷</div>
                <h3 style={{ color: '#dda73c', fontSize: '16px', fontWeight: 'bold' }}>Zirconia Crowns</h3>
                <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>Monolithic or micro-layered. Multi-layered shade gradient mimicking natural dentin/enamel translucency.</p>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 'auto' }}>Strength: 1200 MPa</div>
              </div>

              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '24px' }}>✨</div>
                <h3 style={{ color: '#dda73c', fontSize: '16px', fontWeight: 'bold' }}>IPS e.max Veneers</h3>
                <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>Pressed lithium disilicate veneers. Incredible life-like aesthetics and superior bond strength.</p>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 'auto' }}>Thickness: down to 0.3mm</div>
              </div>

              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '24px' }}>🔩</div>
                <h3 style={{ color: '#dda73c', fontSize: '16px', fontWeight: 'bold' }}>Implant Abutments</h3>
                <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>Custom titanium or hybrid zirconia abutments. Perfect emergence profile matching surgical plans.</p>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 'auto' }}>Compatibility: Major brands</div>
              </div>

              <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '24px' }}>🛡️</div>
                <h3 style={{ color: '#dda73c', fontSize: '16px', fontWeight: 'bold' }}>Guides & Splints</h3>
                <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>Surgical guide sleeves for implant accuracy. Hard/soft nightguards and custom orthodontic aligners.</p>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 'auto' }}>Material: Biocompatible Class IIa</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Pickup Request Modal */}
      {activeModal === 'pickup' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '500px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '30px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚚</div>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>Schedule a Clinic Pickup</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Our courier will collect your physical models or silicone impressions.</p>
            </div>

            {pickupSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '28px', color: '#10b981', lineHeight: '56px' }}>
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>Pickup Scheduled!</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px' }}>
                    Courier assigned for <strong>{pickupForm.date}</strong> at approximately <strong>{pickupForm.time}</strong>.
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '8px' }}>
                    Closing in a moment...
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePickupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px' }}>Clinic Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px' }}
                    value={pickupForm.clinicName}
                    onChange={(e) => setPickupForm({...pickupForm, clinicName: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px' }}>Associated Case # / Patient Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px' }}
                    value={pickupForm.caseNumber}
                    onChange={(e) => setPickupForm({...pickupForm, caseNumber: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ color: '#cbd5e1', fontSize: '12px' }}>Pickup Date</label>
                    <input 
                      type="date" 
                      required 
                      className="form-control" 
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px' }}
                      value={pickupForm.date}
                      onChange={(e) => setPickupForm({...pickupForm, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ color: '#cbd5e1', fontSize: '12px' }}>Preferred Time</label>
                    <input 
                      type="time" 
                      required 
                      className="form-control" 
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px' }}
                      value={pickupForm.time}
                      onChange={(e) => setPickupForm({...pickupForm, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ color: '#cbd5e1', fontSize: '12px' }}>Materials for Pickup</label>
                  <select 
                    className="form-control" 
                    style={{ background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px' }}
                    value={pickupForm.materials}
                    onChange={(e) => setPickupForm({...pickupForm, materials: e.target.value})}
                  >
                    <option value="Silicone Impressions">Silicone / Alginate Impressions</option>
                    <option value="Plaster Models">Plaster / Stone Models</option>
                    <option value="Wax-ups">Bite Rims / Wax-ups</option>
                    <option value="Metal Substructures">Metal Frameworks</option>
                    <option value="Other">Multiple Materials / Other</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #b98d58, #dda73c)', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', marginTop: '8px' }}>
                  Request Courier Pickup
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. 3D Scan Viewer Modal */}
      {activeModal === '3d' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '800px', width: '90%', background: '#070a13', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#fff', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                  <span className="pulse-indicator"></span> Live 3D Scan Viewer
                </h3>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>Case #J3-2486 • Mandibular Arch CAD Alignment</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setIsWireframe(!isWireframe)} 
                  className="btn" 
                  style={{ background: isWireframe ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isWireframe ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`, color: isWireframe ? '#38bdf8' : '#fff', padding: '6px 12px', fontSize: '11px', borderRadius: '6px' }}
                >
                  {isWireframe ? 'Solid Mode' : 'Wireframe'}
                </button>
                <button 
                  onClick={() => setIsScanning(!isScanning)} 
                  className="btn" 
                  style={{ background: isScanning ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isScanning ? '#10b981' : 'rgba(255,255,255,0.1)'}`, color: isScanning ? '#10b981' : '#fff', padding: '6px 12px', fontSize: '11px', borderRadius: '6px' }}
                >
                  {isScanning ? 'Stop Laser' : 'Start Laser'}
                </button>
                <button className="modal-close-btn" style={{ position: 'static', color: '#fff', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setActiveModal(null)}>×</button>
              </div>
            </div>

            {/* Viewer Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr', height: '420px', position: 'relative' }}>
              
              {/* Left Canvas Panel */}
              <div style={{ background: '#03050a', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                
                {/* Tech Grid Overlay */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, transparent 20%, #03050a 80%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100% 100%, 20px 20px, 20px 20px', opacity: 0.8, pointerEvents: 'none' }} />
                
                {/* Scanning Laser Line */}
                {isScanning && (
                  <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: '#00ffcc', boxShadow: '0 0 15px #00ffcc, 0 0 5px #00ffcc', zIndex: 10, animation: 'scanLine 3s ease-in-out infinite' }} />
                )}

                {/* Rotating SVG Tooth Model */}
                <div style={{ width: '220px', height: '220px', animation: 'spin3d 12s linear infinite', zIndex: 5, display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M50 10C35 10 25 14 25 32C25 48 36 55 40 64C43 71 39 84 45 90C47 92 50 94 53 92C56 90 58 76 61 70C65 62 75 55 75 32C75 14 65 10 50 10Z" 
                      fill={isWireframe ? 'rgba(56,189,248,0.05)' : 'rgba(56, 189, 248, 0.15)'}
                      stroke="#38bdf8" 
                      strokeWidth={isWireframe ? '1' : '3'}
                      strokeDasharray={isWireframe ? '4 2' : 'none'}
                    />
                    <path 
                      d="M38 32C38 32 44 26 50 32C56 38 62 32 62 32" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                      strokeDasharray={isWireframe ? '3 3' : 'none'}
                    />
                    <path 
                      d="M48 65C48 65 42 75 43 85M52 65C52 65 58 75 57 85" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                      strokeDasharray={isWireframe ? '3 3' : 'none'}
                    />
                  </svg>
                </div>

                {/* Tech Compass / Axis indicator */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px', fontSize: '9px', fontFamily: 'monospace', color: '#64748b' }}>
                  <div>X: <span style={{ color: '#38bdf8' }}>-12.4</span></div>
                  <div>Y: <span style={{ color: '#10b981' }}>+48.1</span></div>
                  <div>Z: <span style={{ color: '#dda73c' }}>+102.7</span></div>
                </div>
              </div>

              {/* Right Sidebar Info Panel */}
              <div style={{ padding: '20px', borderLeft: '1px solid rgba(255,255,255,0.08)', background: '#070a13', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'monospace', fontSize: '11px', color: '#cbd5e1' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase' }}>Scan Source</div>
                  <div style={{ color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>Intraoral Scanner v4.5</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase' }}>Accuracy Tolerance</div>
                  <div style={{ color: '#10b981', fontWeight: 'bold', marginTop: '2px' }}>± 18 Microns [Optimal]</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase' }}>Surface Triangles</div>
                  <div style={{ color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>1,482,042 Polys</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase' }}>Milling Pathing</div>
                  <div style={{ color: '#dda73c', fontWeight: 'bold', marginTop: '2px' }}>5-Axis Wet Milling Ready</div>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <button 
                    onClick={() => {
                      setActiveModal(null);
                      onNavigate('patients');
                    }}
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '10px', fontSize: '11px', background: 'linear-gradient(135deg, #0d9488, #0284c7)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Open Diagnostic Chart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. Gallery Modal */}
      {activeModal === 'gallery' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '800px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>Lab Case Gallery</h2>
              <p style={{ color: '#dda73c', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>Our Finished Restoration Cases</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div className="gallery-item-stub" style={{ position: 'relative', height: '150px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(13, 148, 136, 0.8)', fontSize: '9px', padding: '2px 6px', borderRadius: '8px' }}>Crown</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Zirconia Multilayer</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Tooth #24 • Full anatomical</div>
              </div>
              <div className="gallery-item-stub" style={{ position: 'relative', height: '150px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(2, 132, 199, 0.8)', fontSize: '9px', padding: '2px 6px', borderRadius: '8px' }}>Veneer</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>IPS e.max Veneers</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Anterior Smile makeover</div>
              </div>
              <div className="gallery-item-stub" style={{ position: 'relative', height: '150px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(139, 92, 246, 0.8)', fontSize: '9px', padding: '2px 6px', borderRadius: '8px' }}>Implant</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Screw-Retained Hybrid</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Titanium base + zirconia</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Contact Modal */}
      {activeModal === 'contact' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ maxWidth: '500px', background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '30px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#fff' }} onClick={() => setActiveModal(null)}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>Contact AuraDental</h2>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Get in touch with our laboratory team.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <div style={{ color: '#dda73c', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px' }}>Lab Address</div>
                <div style={{ marginTop: '4px', fontSize: '13px', color: '#cbd5e1' }}>102 Innovation Way, Suite 400, Tech City, TC 94016</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <div style={{ color: '#dda73c', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px' }}>Direct Phone</div>
                <div style={{ marginTop: '4px', fontSize: '13px', color: '#cbd5e1' }}>+1 (800) 555-DENT [3368]</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <div style={{ color: '#dda73c', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px' }}>Email Enquiries</div>
                <div style={{ marginTop: '4px', fontSize: '13px', color: '#cbd5e1' }}>support@auradentallab.com</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for custom modal backdrops, scanLine, and spin animations */}
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease-out forwards;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #38bdf8;
          display: inline-block;
          animation: pulseGreen 1.5s infinite;
        }

        .gallery-item-stub {
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .gallery-item-stub:hover {
          transform: scale(1.03);
          border-color: #dda73c !important;
          background-color: rgba(255,255,255,0.05) !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(56, 189, 248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }

        @keyframes spin3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>

    </div>
  );
}
