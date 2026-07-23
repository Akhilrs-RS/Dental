import React from 'react';
import dentalOperatory from '../assets/dental_operatory.png';
import zirconiaRestorationImg from '../assets/zirconia_restoration.png';
import millingMachineImg from '../assets/milling_machine.png';
import teethProfileImg from '../assets/teeth_profile.png';
import homeBg from '../assets/home.png';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="landing-subpage-container">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="landing-section-tag">ABOUT US</span>
        <h1 className="subpage-title">
          DENTAL CRAFTSMANSHIP<br />
          SUPPORTED BY DIGITAL PRECISION.
        </h1>
        <p className="subpage-subtitle">
          The alignment of master ceramic technicians and state-of-the-art CAD/CAM engineering.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="about-story-section">
        <div className="landing-about-grid">
          <div className="landing-about-image-col">
            <img src={dentalOperatory} alt="Dental Laboratory" className="landing-about-img" />
            <div className="landing-about-badge">
              <span className="badge-v">V2.0</span>
              <span className="badge-lbl">THE NEW DENTAL STANDARD</span>
            </div>
          </div>
          
          <div className="landing-about-info-col">
            <span className="landing-section-tag">OUR ORIGINS</span>
            <h2 className="landing-section-title">From A Single Tooth To A Digital Laboratory.</h2>
            <p className="landing-section-desc">
              At J3 Dental Lab, we believe that every restoration is a work of art. By combining advanced digital technology with master craftsmanship, we deliver restorations that fit perfectly, function flawlessly, and look beautiful.
            </p>
            <p className="landing-section-desc">
              Our lab was established to bridge the gap between clinics and technical execution. We understand the daily clinical challenges of seating crowns and custom abutments, which is why we have engineered a workflow that guarantees accuracy down to 20 microns.
            </p>
          </div>
        </div>
      </section>

      {/* Values & Core Bullet Points Section */}
      <section className="about-values-section">
        <div className="landing-about-grid">
          <div>
            <span className="landing-section-tag">THE PROBLEM WE SOLVE</span>
            <h3 className="landing-section-title" style={{ marginTop: '12px' }}>
              Make every laboratory case return with a perfect fit and correct profile.
            </h3>
            <p className="landing-section-desc" style={{ marginTop: '16px' }}>
              Too often, restorations require extensive chairside adjustment or, worse, remakes. J3 Dental Lab eliminates variables by double-checking every design digitally against dynamic occlusion models.
            </p>
          </div>

          <div>
            <span className="landing-section-tag">OUR APPROACH</span>
            <h3 className="landing-section-title" style={{ marginTop: '12px' }}>
              Quality by hand, not machine.
            </h3>
            <p className="landing-section-desc" style={{ marginTop: '16px', marginBottom: '16px' }}>
              While milling machines produce raw material geometry, true vitality and natural aesthetics can only be achieved by the human hand.
            </p>
            <ul className="j3-about-bullets">
              <li><span>✓</span> Monolithic and multilayer zirconia</li>
              <li><span>✓</span> Ultra-precise 3D printed surgical guides</li>
              <li><span>✓</span> Active 3D verification and digital matching</li>
              <li><span>✓</span> Master ceramist micro-layering</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Four Principles Section */}
      <section className="about-principles-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="landing-section-tag">CORE VALUES</span>
          <h2 className="landing-section-title" style={{ marginTop: '12px' }}>Four principles behind every restoration.</h2>
        </div>

        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-number">01</div>
            <h4 className="principle-title">Craftsmanship</h4>
            <p className="principle-desc">
              Every crown and veneer is hand-finished and stained by master dental technicians under high-power microscopes.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">02</div>
            <h4 className="principle-title">Digital Precision</h4>
            <p className="principle-desc">
              Advanced CAD/CAM alignments eliminate manual error margins, maintaining margin accuracy under 20 microns.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">03</div>
            <h4 className="principle-title">Transparency</h4>
            <p className="principle-desc">
              Through our interactive dashboard, doctors can track the live processing stage of every case in real time.
            </p>
          </div>

          <div className="principle-card">
            <div className="principle-number">04</div>
            <h4 className="principle-title">Partnership</h4>
            <p className="principle-desc">
              We operate as an extension of your clinic, providing direct communication with the designers handling your cases.
            </p>
          </div>
        </div>
      </section>

      {/* Staff Bio Cards Section */}
      <section className="about-team-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="landing-section-tag">THE TEAM</span>
          <h2 className="landing-section-title" style={{ marginTop: '12px' }}>The people behind the precision.</h2>
        </div>

        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar-placeholder">🎨</div>
            <h4 className="team-name">Master Ceramist</h4>
            <p className="team-role">Aesthetic Design Lead</p>
            <p className="team-desc">Applies micro-layered feldspathic porcelain to crowns and veneers for perfect lifelike aesthetics.</p>
          </div>

          <div className="team-card">
            <div className="team-avatar-placeholder">💻</div>
            <h4 className="team-name">CAD Designer</h4>
            <p className="team-role">Digital Engineering</p>
            <p className="team-desc">Traces margins and aligns dynamic occlusion for crowns, bridges, and complex implant frameworks.</p>
          </div>

          <div className="team-card">
            <div className="team-avatar-placeholder">⚙️</div>
            <h4 className="team-name">Craft Technician</h4>
            <p className="team-role">Milling & Sintering</p>
            <p className="team-desc">Operates our 5-axis wet and dry milling machines, calibrating speed and nesting for zirconia blocks.</p>
          </div>

          <div className="team-card">
            <div className="team-avatar-placeholder">🔍</div>
            <h4 className="team-name">Quality Assurer</h4>
            <p className="team-role">Verification Lead</p>
            <p className="team-desc">Performs micro-gap analysis and tests restorations on articulating plaster models before dispatch.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="about-cta-banner">
        <div className="landing-about-grid" style={{ alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 className="about-cta-title">Ready to work with a laboratory that keeps you informed?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px', fontSize: '14px' }}>
              Register your clinic today to begin digital case submission and access real-time case tracking.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="btn-gold" style={{ padding: '14px 36px' }} onClick={() => onNavigate('scheduler')}>
              Register Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
