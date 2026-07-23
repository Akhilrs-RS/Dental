import React, { useState } from 'react';
import dentalOperatory from '../assets/dental_operatory.png';
import zirconiaRestorationImg from '../assets/zirconia_restoration.png';
import millingMachineImg from '../assets/milling_machine.png';
import teethProfileImg from '../assets/teeth_profile.png';
import homeBg from '../assets/home.png';

const GALLERY_ITEMS = [
  { id: 1, title: 'Monolithic Zirconia Crown', category: 'zirconia', img: zirconiaRestorationImg, spec: 'Multilayer, shade A2, prep #14' },
  { id: 2, title: 'Anterior e.max Veneers', category: 'veneers', img: homeBg, spec: 'Pressed glass ceramic, shade BL3, teeth #7-10' },
  { id: 3, title: 'Intraoral 3D CAD Alignment', category: 'cad', img: teethProfileImg, spec: 'Digital margin marking, tooth #30' },
  { id: 4, title: '5-Axis Wet Milling Process', category: 'milling', img: millingMachineImg, spec: 'Precision cobalt-chromium milling' },
  { id: 5, title: 'Custom Abutment Connection', category: 'implants', img: dentalOperatory, spec: 'Grade 5 Titanium, customized emergence profile' },
  { id: 6, title: 'Full Arch Hybrid Zirconia', category: 'zirconia', img: zirconiaRestorationImg, spec: 'All-on-4 framework, customized shading' },
  { id: 7, title: 'Digital Smile Makeover Design', category: 'cad', img: teethProfileImg, spec: 'Cosmetic diagnostic wax-up mapping' },
  { id: 8, title: 'Custom Layered e.max Crowns', category: 'veneers', img: zirconiaRestorationImg, spec: 'IPS e.max hand-stained, shade B1, tooth #8-9' }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'zirconia', 'veneers', 'cad', 'milling', 'implants'
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  return (
    <div className="landing-subpage-container">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="landing-section-tag">PORTFOLIO</span>
        <h1 className="subpage-title">
          A PORTFOLIO OF PRECISION.
        </h1>
        <p className="subpage-subtitle">
          Explore photographic and digital alignment cases representing our lab's restorative craftsmanship.
        </p>
      </section>

      {/* Gallery Content Section */}
      <section className="subpage-content-section">
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          
          {/* Category Tabs */}
          <div className="gallery-tabs-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div className="catalog-tabs" style={{ background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <button 
                className={`catalog-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                Show All
              </button>
              <button 
                className={`catalog-tab-btn ${activeCategory === 'zirconia' ? 'active' : ''}`}
                onClick={() => setActiveCategory('zirconia')}
              >
                Zirconia
              </button>
              <button 
                className={`catalog-tab-btn ${activeCategory === 'veneers' ? 'active' : ''}`}
                onClick={() => setActiveCategory('veneers')}
              >
                Veneers & Aesthetics
              </button>
              <button 
                className={`catalog-tab-btn ${activeCategory === 'cad' ? 'active' : ''}`}
                onClick={() => setActiveCategory('cad')}
              >
                CAD Models
              </button>
              <button 
                className={`catalog-tab-btn ${activeCategory === 'milling' ? 'active' : ''}`}
                onClick={() => setActiveCategory('milling')}
              >
                Milling Machine
              </button>
            </div>
          </div>

          {/* Masonry-style Portfolio Grid */}
          <div className="portfolio-grid">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="portfolio-card"
                onClick={() => setLightboxItem(item)}
              >
                <div className="portfolio-card-img-wrapper">
                  <img src={item.img} className="portfolio-card-img" alt={item.title} />
                  <div className="portfolio-card-hover-overlay">
                    <span className="portfolio-card-zoom-icon">🔍 View Details</span>
                  </div>
                </div>
                <div className="portfolio-card-content">
                  <span className="portfolio-card-cat">{item.category.toUpperCase()}</span>
                  <h3 className="portfolio-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="modal-backdrop" onClick={() => setLightboxItem(null)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '800px', width: '90%', background: '#0a0d16', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: 0, overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', height: '400px', background: '#020408', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button 
                className="modal-close-btn" 
                style={{ top: '16px', right: '16px', color: '#fff', background: 'rgba(0,0,0,0.5)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                onClick={() => setLightboxItem(null)}
              >
                ×
              </button>
              <img src={lightboxItem.img} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={lightboxItem.title} />
            </div>
            
            <div style={{ padding: '24px 32px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#dda73c', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {lightboxItem.category} restoration case
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginTop: '6px', marginBottom: '12px' }}>
                {lightboxItem.title}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', color: '#cbd5e1' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Case Specifications</div>
                  <p style={{ margin: 0, lineHeight: '1.5', fontWeight: '600' }}>{lightboxItem.spec}</p>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Workflow Technology</div>
                  <p style={{ margin: 0, lineHeight: '1.5', color: '#dda73c', fontWeight: 'bold' }}>
                    100% Digital CAD/CAM Alignment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
