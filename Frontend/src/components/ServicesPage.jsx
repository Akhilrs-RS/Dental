import React from 'react';

const SERVICES_DATA = [
  {
    num: "01",
    title: "Zirconia Restorations",
    desc: "High-strength monolithic and layered zirconia for crowns and bridges, balancing durability with lifelike translucency.",
    cases: "Anterior crowns, aesthetic zones",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Monolithic, layered, multi-layer",
    turnaround: "5–7 days"
  },
  {
    num: "02",
    title: "Layered Zirconia",
    desc: "Zirconia frameworks layered with ceramic for anterior aesthetics that mimics natural enamel.",
    cases: "Single crowns, bridges, full-arch",
    products: "Anterior Layered, Posterior Layered",
    options: "Veneered, cut-back technique",
    turnaround: "6–8 days"
  },
  {
    num: "03",
    title: "E-Max Restorations",
    desc: "Lithium disilicate ceramic offering exceptional translucency for highly aesthetic anterior work.",
    cases: "Veneers, anterior crowns, inlays",
    products: "E-Max Crown, E-Max Veneer",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "4–5 days"
  },
  {
    num: "04",
    title: "Implant Prosthetics",
    desc: "Screw-retained and cement-retained implant restorations with custom abutments and full-arch solutions.",
    cases: "Single implant, multi-unit, full-arch",
    products: "E-Max Crown, E-Max Veneer",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "7–10 days"
  },
  {
    num: "05",
    title: "CAD Designing",
    desc: "Digital crown and bridge design using advanced CAD software with margin and anatomy verification.",
    cases: "All restorations, digital cases",
    products: "Digital Design, CAD Designing",
    options: "Full design, design review",
    turnaround: "2–3 days"
  },
  {
    num: "06",
    title: "CAM Milling",
    desc: "Precision 5-axis milling of zirconia, PMMA and wax patterns for consistent manufacturing.",
    cases: "Zirconia, temporary, wax patterns",
    products: "CAM Milling, PMMA",
    options: "Wet mill, dry mill",
    turnaround: "1–2 days"
  },
  {
    num: "07",
    title: "Digital Smile Design",
    desc: "Aesthetic smile planning with digital previews, facial analysis and tooth proportion design.",
    cases: "Complex cases, aesthetic planning",
    products: "Smile Design",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "7–10 days"
  },
  {
    num: "08",
    title: "Diagnostic Wax Up",
    desc: "Physical wax mock-ups for treatment planning and patient communication before final restorations.",
    cases: "Single crowns, bridges, full-arch",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Full arch, segmental",
    turnaround: "3–4 days"
  },
  {
    num: "09",
    title: "Temporary Restorations",
    desc: "PMMA and composite temporaries for interim coverage during treatment.",
    cases: "Interim restorations, long-term provisional",
    products: "Temporary Crown, PMMA",
    options: "PMMA, composite",
    turnaround: "2–3 days"
  },
  {
    num: "10",
    title: "Digital Shade Matching",
    desc: "Physical wax mock-ups for treatment planning and patient communication before final restorations.",
    cases: "Single crowns, bridges, full-arch",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Full arch, segmental",
    turnaround: "3–4 days"
  },
  {
    num: "11",
    title: "Digital Impression Processing",
    desc: "Intraoral scan import, alignment and model generation for fully digital workflows.",
    cases: "IOS scans, digital cases",
    products: "Digital Impression Processing",
    options: "Full arch, segmental",
    turnaround: "3–4 days"
  },
  {
    num: "12",
    title: "Pickup and Delivery",
    desc: "Scheduled physical collection of cases from your clinic with OTP-verified delivery of completed work.",
    cases: "All physical cases",
    products: "Pickup and Delivery",
    options: "Scheduled, urgent",
    turnaround: "3–4 days"
  }
];

export default function ServicesPage({ onNavigate }) {
  const [services, setServices] = React.useState(SERVICES_DATA);

  React.useEffect(() => {
    fetch('http://localhost:5005/api/catalog/services')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            num: item.num,
            title: item.title,
            desc: item.description,
            cases: item.cases || '',
            products: item.products || '',
            options: item.options || '',
            turnaround: item.turnaround || ''
          }));
          setServices(mapped);
        }
      })
      .catch(err => console.log('Using local services list fallback.'));
  }, []);

  return (
    <div className="landing-subpage-container services-page-custom">
      
      {/* Hero Title Section */}
      <section className="subpage-hero-section">
        <span className="services-subtitle-tag">Our Services</span>
        <h1 className="subpage-title-custom">
          RESTORATION SERVICES,<br />
          ENGINEERED END TO END.
        </h1>
        <p className="subpage-desc-custom">
          From digital design to final shade matching, every service is defined by clear options, realistic turnaround and consistent quality.
        </p>
      </section>

      {/* Grid of 12 Cards */}
      <section className="services-grid-section">
        <div className="services-cards-grid">
          {services.map((srv) => (
            <div key={srv.num} className="service-card-item">
              <div className="service-card-num">{srv.num}</div>
              
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.desc}</p>
              
              <div className="service-card-meta-list">
                <div className="service-card-meta-item">
                  <span className="meta-label">Suitable Cases</span>
                  <span className="meta-value">{srv.cases}</span>
                </div>
                <div className="service-card-meta-item">
                  <span className="meta-label">Related Products</span>
                  <span className="meta-value">{srv.products}</span>
                </div>
                <div className="service-card-meta-item">
                  <span className="meta-label">Options</span>
                  <span className="meta-value">{srv.options}</span>
                </div>
                <div className="service-card-meta-item">
                  <span className="meta-label">Turnaround</span>
                  <span className="meta-value">{srv.turnaround}</span>
                </div>
              </div>
              
              <div className="service-card-actions">
                <button className="btn-service-detail" onClick={() => onNavigate('contact')}>
                  View Detail
                </button>
                <button className="btn-service-book" onClick={() => onNavigate('book-case')}>
                  Book Case &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
