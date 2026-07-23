import React, { useState } from 'react';

const PRODUCT_DATA = [
  { id: 1, name: 'Zirconia Monolithic Crown', category: 'crowns', material: 'Multilayer Zirconia', turnaround: '5 Days', price: '$149' },
  { id: 2, name: 'IPS e.max Veneer', category: 'crowns', material: 'Lithium Disilicate', turnaround: '5 Days', price: '$189' },
  { id: 3, name: 'Custom Titanium Abutment', category: 'implants', material: 'Grade 5 Titanium', turnaround: '7 Days', price: '$249' },
  { id: 4, name: 'Hybrid Zirconia Abutment', category: 'implants', material: 'Ti-Base + Zirconia', turnaround: '7 Days', price: '$299' },
  { id: 5, name: 'CLEARsplint Nightguard', category: 'ortho', material: 'Class IIa Biocompatible Resin', turnaround: '5 Days', price: '$129' },
  { id: 6, name: '3D Printed Surgical Guide', category: 'ortho', material: 'Biocompatible Guide Resin', turnaround: '3 Days', price: '$99' },
  { id: 7, name: 'PMMA Temporary Crown', category: 'crowns', material: 'High-density PMMA', turnaround: '2 Days', price: '$49' },
  { id: 8, name: 'Screw-Retained Bridge', category: 'implants', material: 'Zirconia on Ti-Base', turnaround: '8 Days', price: '$599' },
  { id: 9, name: 'Diagnostic Wax-Up', category: 'crowns', material: 'Synthetic Lab Wax', turnaround: '4 Days', price: '$39' },
  { id: 10, name: 'Clear Aligner Models (Per Arch)', category: 'ortho', material: 'Model Resin', turnaround: '4 Days', price: '$79' }
];

export default function ProductsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'crowns', 'implants', 'ortho'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCT_DATA.filter(product => {
    const matchesTab = activeTab === 'all' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="landing-subpage-container">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="landing-section-tag">OUR CATALOG</span>
        <h1 className="subpage-title">
          RESTORATIONS CRAFTED FOR<br />
          FUNCTION, ACCURACY AND AESTHETICS.
        </h1>
        <p className="subpage-subtitle">
          Search our product list, check standard turnaround times, and get estimated pricing.
        </p>
      </section>

      {/* Catalog Search & Table Section */}
      <section className="subpage-content-section">
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          
          {/* Tabs and Search Bar row */}
          <div className="catalog-filters-row">
            <div className="catalog-tabs">
              <button 
                className={`catalog-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Products
              </button>
              <button 
                className={`catalog-tab-btn ${activeTab === 'crowns' ? 'active' : ''}`}
                onClick={() => setActiveTab('crowns')}
              >
                Crowns & Bridges
              </button>
              <button 
                className={`catalog-tab-btn ${activeTab === 'implants' ? 'active' : ''}`}
                onClick={() => setActiveTab('implants')}
              >
                Implants
              </button>
              <button 
                className={`catalog-tab-btn ${activeTab === 'ortho' ? 'active' : ''}`}
                onClick={() => setActiveTab('ortho')}
              >
                Orthodontics & Splints
              </button>
            </div>

            <div className="catalog-search-wrapper">
              <input 
                type="text" 
                placeholder="Search products or materials..." 
                className="catalog-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="catalog-search-icon">🔍</span>
            </div>
          </div>

          {/* Product Data Table */}
          <div className="catalog-table-wrapper">
            {filteredProducts.length > 0 ? (
              <table className="catalog-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Material Composition</th>
                    <th>Turnaround</th>
                    <th style={{ textAlign: 'right' }}>Est. Price</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td className="prod-name-cell">{product.name}</td>
                      <td>
                        <span className={`prod-cat-badge ${product.category}`}>
                          {product.category === 'crowns' 
                            ? 'Crowns & Bridges' 
                            : product.category === 'implants' 
                            ? 'Implantology' 
                            : 'Ortho & Splints'
                          }
                        </span>
                      </td>
                      <td style={{ color: '#94a3b8' }}>{product.material}</td>
                      <td style={{ fontWeight: '500' }}>{product.turnaround}</td>
                      <td style={{ textAlign: 'right', fontWeight: '700', color: '#dda73c' }}>{product.price}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="catalog-order-btn"
                          onClick={() => onNavigate('planner')}
                        >
                          Submit Case
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
                <p>No products match your search or filter criteria.</p>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '16px', fontSize: '12px' }}
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
