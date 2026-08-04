import React, { useState } from 'react';
import logosImg from '../assets/logos.png';

const PRODUCT_DATA = [
  // 1. Full Contour Zirconia
  { id: 1, name: "Monolithic Zirconia Crown", category: "full-contour", material: "Zirconia", use: "Posterior", turnaround: "5d", price: "₹4,500" },
  { id: 2, name: "Posterior Zirconia", category: "full-contour", material: "Zirconia", use: "Posterior crowns", turnaround: "6d", price: "₹4,200" },
  { id: 3, name: "Anterior Zirconia", category: "full-contour", material: "Zirconia", use: "Anterior crowns", turnaround: "6d", price: "₹4,800" },
  { id: 4, name: "Multi-Layer Zirconia", category: "full-contour", material: "Zirconia", use: "Aesthetic crowns", turnaround: "6d", price: "₹5,200" },
  { id: 5, name: "Premium Esthetic Zirconia", category: "full-contour", material: "Zirconia", use: "High-esthetic", turnaround: "7d", price: "₹6,500" },
  { id: 9, name: "Bridge Zirconia", category: "full-contour", material: "Zirconia", use: "Multi-unit bridges", turnaround: "8d", price: "₹5,200" },
  { id: 10, name: "Long Span Bridge", category: "full-contour", material: "Zirconia", use: "Full arch bridges", turnaround: "10d", price: "₹6,800" },

  // 2. Layered Zirconia
  { id: 6, name: "Anterior Layered Zirconia", category: "layered", material: "Zirconia + Ceramic", use: "Anterior aesthetics", turnaround: "7d", price: "₹5,800" },
  { id: 7, name: "Posterior Layered Zirconia", category: "layered", material: "Zirconia + Ceramic", use: "Posterior strength", turnaround: "7d", price: "₹5,500" },
  { id: 8, name: "Implant Zirconia", category: "layered", material: "Zirconia", use: "Implant supported", turnaround: "8d", price: "₹7,500" },

  // 3. E-Max Restorations
  { id: 11, name: "E-Max Crown", category: "emax", material: "Lithium Disilicate", use: "Anterior crowns", turnaround: "5d", price: "₹5,000" },
  { id: 12, name: "E-Max Veneer", category: "emax", material: "Lithium Disilicate", use: "Aesthetic veneers", turnaround: "5d", price: "₹4,800" },
  { id: 13, name: "E-Max Inlay", category: "emax", material: "Lithium Disilicate", use: "Conservative", turnaround: "5d", price: "₹4,200" },
  { id: 14, name: "E-Max Onlay", category: "emax", material: "Lithium Disilicate", use: "Conservative", turnaround: "5d", price: "₹4,500" },
  { id: 15, name: "E-Max Overlay", category: "emax", material: "Lithium Disilicate", use: "Full coverage", turnaround: "5d", price: "₹4,700" },
  { id: 16, name: "E-Max Bridge", category: "emax", material: "Lithium Disilicate", use: "Short span", turnaround: "7d", price: "₹6,200" },

  // 4. Implant Prosthetics
  { id: 17, name: "Screw Retained Crown", category: "implants", material: "Zirconia", use: "Implant supported", turnaround: "8d", price: "₹9,500" },
  { id: 18, name: "Cement Retained Crown", category: "implants", material: "Zirconia", use: "Implant supported", turnaround: "8d", price: "₹8,000" },
  { id: 19, name: "Custom Abutment", category: "implants", material: "Titanium / Zirconia", use: "Implant abutment", turnaround: "6d", price: "₹6,500" },
  { id: 20, name: "Healing Abutment", category: "implants", material: "Titanium", use: "Healing phase", turnaround: "3d", price: "₹2,500" },
  { id: 21, name: "Temporary Crown (Implant)", category: "implants", material: "PMMA", use: "Interim", turnaround: "3d", price: "₹3,000" },
  { id: 22, name: "Implant Bridge", category: "implants", material: "Zirconia", use: "Multi-implant", turnaround: "10d", price: "₹9,500" },
  { id: 23, name: "Full Arch Implant", category: "implants", material: "Zirconia", use: "Full arch restoration", turnaround: "12d", price: "₹19,500" },

  // 5. CAD/CAM Services
  { id: 24, name: "Digital Design", category: "cadcam", material: "Digital", use: "CAD design", turnaround: "2d", price: "₹1,500" },
  { id: 25, name: "CAD Designing", category: "cadcam", material: "Digital", use: "Full design", turnaround: "2d", price: "₹2,000" },
  { id: 26, name: "CAM Milling", category: "cadcam", material: "Zirconia/PMMA", use: "Milling", turnaround: "1d", price: "₹1,200" },
  { id: 27, name: "Wax Pattern", category: "cadcam", material: "Wax", use: "Casting pattern", turnaround: "2d", price: "₹1,000" },
  { id: 28, name: "PMMA", category: "cadcam", material: "PMMA", use: "Temporary", turnaround: "3d", price: "₹1,800" },
  { id: 29, name: "Diagnostic Wax-Up", category: "cadcam", material: "Wax", use: "Planning", turnaround: "3d", price: "₹1,500" },
  { id: 30, name: "Smile Design", category: "cadcam", material: "Digital", use: "Aesthetic planning", turnaround: "3d", price: "₹4,000" },

  // 6. Shade Matching
  { id: 31, name: "Standard Shade", category: "shade", material: "Digital", use: "Vita Classical", turnaround: "1d", price: "₹500" },
  { id: 32, name: "Custom Shade", category: "shade", material: "Custom", use: "Bespoke match", turnaround: "1d", price: "₹1,200" },
  { id: 33, name: "Digital Shade", category: "shade", material: "Spectrophotometer", use: "Precise match", turnaround: "1d", price: "₹1,500" },
  { id: 34, name: "Photographic Shade", category: "shade", material: "Photographic", use: "Documented match", turnaround: "1d", price: "₹1,000" }
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'full-contour', label: 'Full Contour Zirconia' },
  { id: 'layered', label: 'Layered Zirconia' },
  { id: 'emax', label: 'E-Max Restorations' },
  { id: 'implants', label: 'Implant Prosthetics' },
  { id: 'cadcam', label: 'CAD/CAM Services' },
  { id: 'shade', label: 'Shade Matching' }
];

export default function ProductsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState(PRODUCT_DATA);

  React.useEffect(() => {
    fetch('http://localhost:5005/api/catalog/products')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            material: item.material,
            use: item.indicatedUse,
            turnaround: item.turnaroundTime,
            price: `₹${item.price.toLocaleString('en-IN')}`
          }));
          setProducts(mapped);
        }
      })
      .catch(err => console.log('Using local products list fallback.'));
  }, []);

  const filteredProducts = products.filter(product => {
    return activeTab === 'all' || product.category === activeTab;
  });

  return (
    <div className="landing-subpage-container products-page-custom">
      
      {/* Hero Title Section */}
      <section className="products-hero-section-custom">
        <div className="products-hero-left">
          <span className="products-subtitle-tag">Products</span>
          <h1 className="products-title-custom">
            RESTORATIONS CRAFTED FOR<br />
            FUNCTION, ACCURACY AND<br />
            AESTHETICS.
          </h1>
          <p className="products-desc-custom">
            Search and filter our full product catalogue. Prices are indicative — logged-in clinics see their custom pricing.
          </p>
        </div>
        <div className="products-hero-right">
          <img src={logosImg} alt="J3 Dental Lab Decorative Logo" className="products-hero-logo" />
        </div>
      </section>

      {/* Catalog Filters and List Section */}
      <section className="products-content-section-custom">
        <div className="products-content-wrapper">
          
          {/* Tabs row */}
          <div className="products-tabs-row">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`product-tab-btn-pill ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Count indicator */}
          <div className="products-count-bar">
            <span>{filteredProducts.length} products</span>
          </div>

          {/* Product Data Table */}
          <div className="products-table-wrapper">
            <table className="products-custom-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Material</th>
                  <th>Use</th>
                  <th>Turnaround</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td className="product-name-bold-cell">{product.name}</td>
                    <td className="product-material-cell">{product.material}</td>
                    <td className="product-use-cell">{product.use}</td>
                    <td className="product-turnaround-cell">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle', opacity: 0.6 }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{product.turnaround}</span>
                    </td>
                    <td className="product-price-action-cell">
                      <div className="product-price-action-inner">
                        <span className="product-price-bold">{product.price}</span>
                        <button 
                          className="product-add-action-btn"
                          onClick={() => onNavigate('book-case')}
                        >
                          + Add
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

    </div>
  );
}

