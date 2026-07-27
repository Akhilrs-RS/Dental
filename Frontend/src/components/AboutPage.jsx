import React from 'react';
import dImg from '../assets/d.png';
import teethImg from '../assets/teeth.png';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="landing-subpage-container about-page-custom">
      
      {/* Section 1: Hero Section */}
      <section className="subpage-hero-section">
        <span className="about-subtitle-tag">About J3 Dental Lab</span>
        <h1 className="subpage-title-custom">
          DENTAL CRAFTSMANSHIP<br />
          SUPPORTED BY DIGITAL PRECISION.
        </h1>
        <p className="subpage-desc-custom">
          For nearly two decades, J3 Dental Lab has partnered with dental practices to deliver restorations that balance strength, accuracy, and aesthetics.
        </p>
      </section>

      {/* Section 2: Our Story */}
      <section className="about-story-section-custom">
        <div className="about-story-grid">
          <div className="about-story-image-col">
            <img src={dImg} alt="Dental Laboratory" className="about-story-img" />
          </div>
          
          <div className="about-story-info-col">
            <span className="about-section-tag-gold">OUR STORY</span>
            <h2 className="about-section-title-serif">From A Single Bench To A Digital Laboratory.</h2>
            <p className="about-section-desc-light">
              J3 Dental Lab began as a small traditional dental laboratory focused on hand-crafted ceramic restorations. Over the years, we've invested in digital scanners, CAD/CAM milling systems and intraoral scan processing — while keeping the craftspeople who give every restoration its character.
            </p>
            <p className="about-section-desc-light">
              Today, clinics across South India rely on J3 for everything from single-unit crowns to full-arch implant prosthetics, all managed through a connected digital platform.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Mission & Quality Philosophy */}
      <section className="about-mission-section-custom">
        <div className="about-mission-grid">
          <div className="about-mission-col">
            <span className="about-section-tag-muted">Our Mission</span>
            <h3 className="about-section-title-small">
              Make every laboratory case clearer, faster and more precise.
            </h3>
            <p className="about-section-desc-muted">
              We believe clinics deserve a laboratory partner that communicates openly, tracks every stage and delivers consistent quality. Our mission is to bridge traditional dental craftsmanship with modern digital workflows — so practices can focus on patients, not chasing cases.
            </p>
          </div>

          <div className="about-mission-col">
            <span className="about-section-tag-muted">Quality Philosophy</span>
            <h3 className="about-section-title-small">
              Quality is checked, not assumed.
            </h3>
            <p className="about-section-desc-muted">
              Every restoration passes through defined quality gates: scan review, margin verification, shade matching, fit confirmation and final inspection. No case leaves the lab without sign-off.
            </p>
            <ul className="j3-about-bullets-custom">
              <li>Per-stage quality checks</li>
              <li>Digital margin verification</li>
              <li>Shade confirmation under controlled light</li>
              <li>Final inspection sign-off</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Why Clinics Choose J3 */}
      <section className="about-principles-section-custom">
        <div className="about-principles-header">
          <span className="about-section-tag-muted">Why Clinics Choose J3</span>
          <h2 className="about-section-title-serif">Four principles behind every restoration.</h2>
        </div>

        <div className="principles-grid-custom">
          <div className="principle-column-custom">
            <h4 className="principle-title-serif">Craftsmanship</h4>
            <p className="principle-desc-custom">
              Experienced technicians with an eye for detail on every restoration.
            </p>
          </div>

          <div className="principle-column-custom">
            <h4 className="principle-title-serif">Digital Precision</h4>
            <p className="principle-desc-custom">
              CAD/CAM workflows and digital scanning for consistent, accurate results.
            </p>
          </div>

          <div className="principle-column-custom">
            <h4 className="principle-title-serif">Transparency</h4>
            <p className="principle-desc-custom">
              Every case tracked, every invoice clear, every stage visible.
            </p>
          </div>

          <div className="principle-column-custom">
            <h4 className="principle-title-serif">Partnership</h4>
            <p className="principle-desc-custom">
              We work alongside clinics as an extension of your practice.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Technician Expertise */}
      <section className="about-expertise-section-custom">
        <div className="about-expertise-header">
          <span className="about-section-tag-muted">Technician Expertise</span>
          <h2 className="about-section-title-serif">The people behind the precision.</h2>
        </div>

        <div className="expertise-grid-custom">
          <div className="expertise-item-custom">
            <div className="expertise-number-circle">1</div>
            <div className="expertise-content-custom">
              <h4 className="expertise-title-serif">Master Ceramists</h4>
              <p className="expertise-desc-custom">Artisans with 15+ years shaping layered ceramics and zirconia restorations.</p>
            </div>
          </div>

          <div className="expertise-item-custom">
            <div className="expertise-number-circle">2</div>
            <div className="expertise-content-custom">
              <h4 className="expertise-title-serif">CAD Designers</h4>
              <p className="expertise-desc-custom">Digital designers trained in the latest CAD software and smile design.</p>
            </div>
          </div>

          <div className="expertise-item-custom">
            <div className="expertise-number-circle">3</div>
            <div className="expertise-content-custom">
              <h4 className="expertise-title-serif">CAM Operators</h4>
              <p className="expertise-desc-custom">Milling specialists running precision 5-axis CAM systems.</p>
            </div>
          </div>

          <div className="expertise-item-custom">
            <div className="expertise-number-circle">4</div>
            <div className="expertise-content-custom">
              <h4 className="expertise-title-serif">Quality Technicians</h4>
              <p className="expertise-desc-custom">Dedicated QC at every stage, from scan review to final shade check.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Bottom CTA Card */}
      <section className="about-cta-card-wrapper">
        <div className="about-cta-card-beige">
          <div className="about-cta-card-image-col">
            <img src={teethImg} alt="Teeth Restoration" className="about-cta-card-img" />
          </div>
          <div className="about-cta-card-content-col">
            <h2 className="about-cta-card-title-serif">Ready to work with a laboratory that keeps you informed?</h2>
            <button className="about-cta-card-btn" onClick={() => onNavigate('scheduler')}>
              Register your clinic &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

