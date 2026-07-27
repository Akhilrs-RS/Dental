import React, { useState } from 'react';
import img4 from '../assets/4.png';
import img1 from '../assets/1.jpg';
import img14 from '../assets/14.png';
import imgD from '../assets/d.png';
import img3 from '../assets/3.png';
import img7 from '../assets/7.png';
import img6 from '../assets/6.jpg';
import img102 from '../assets/102.png';

const GALLERY_ITEMS = [
  { id: 1, title: 'Monolithic Zirconia Crown', category: 'zirconia', img: img4, spec: 'Multilayer, shade A2, prep #14' },
  { id: 2, title: 'Anterior e.max Veneers', category: 'veneers', img: img1, spec: 'Pressed glass ceramic, shade BL3, teeth #7-10' },
  { id: 3, title: 'Intraoral 3D CAD Alignment', category: 'cad', img: img14, spec: 'Digital margin marking, tooth #30' },
  { id: 4, title: '5-Axis Wet Milling Process', category: 'milling', img: imgD, spec: 'Precision cobalt-chromium milling' },
  { id: 5, title: 'Custom Abutment Connection', category: 'implants', img: img3, spec: 'Grade 5 Titanium, customized emergence profile' },
  { id: 6, title: 'Full Arch Hybrid Zirconia', category: 'zirconia', img: img7, spec: 'All-on-4 framework, customized shading' },
  { id: 7, title: 'Digital Smile Makeover Design', category: 'cad', img: img6, spec: 'Cosmetic diagnostic wax-up mapping' },
  { id: 8, title: 'Custom Layered e.max Crowns', category: 'veneers', img: img102, spec: 'IPS e.max hand-stained, shade B1, tooth #8-9' }
];

const CATEGORIES = [
  { id: 'all', label: 'Show All' },
  { id: 'zirconia', label: 'Zirconia' },
  { id: 'veneers', label: 'Veneers & Aesthetics' },
  { id: 'cad', label: 'CAD Models' },
  { id: 'milling', label: 'Milling Machine' }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  return (
    <div className="landing-subpage-container gallery-page-custom">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="gallery-subtitle-tag">Portfolio</span>
        <h1 className="subpage-title-custom">
          A PORTFOLIO OF PRECISION.
        </h1>
        <p className="subpage-desc-custom">
          Explore photographic and digital alignment cases representing our lab's restorative craftsmanship.
        </p>
      </section>

      {/* Gallery Content Section */}
      <section className="gallery-content-section-custom">
        <div className="gallery-content-wrapper">
          
          {/* Category Tabs */}
          <div className="gallery-tabs-row-custom">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`gallery-tab-btn-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry-style Portfolio Grid */}
          <div className="portfolio-grid-custom">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="portfolio-card-custom"
                onClick={() => setLightboxItem(item)}
              >
                <div className="portfolio-card-img-wrapper-custom">
                  <img src={item.img} className="portfolio-card-img-custom" alt={item.title} />
                  <div className="portfolio-card-hover-overlay-custom">
                    <span className="portfolio-card-zoom-icon-custom">🔍 View Details</span>
                  </div>
                </div>
                <div className="portfolio-card-content-custom">
                  <span className="portfolio-card-cat-custom">{item.category.toUpperCase()}</span>
                  <h3 className="portfolio-card-title-custom">{item.title}</h3>
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

