import React from 'react';

const SERVICES_DATA = [
  {
    num: "01",
    title: "ZIRCONIA CROWNS",
    gridTitle: "Zirconia Restorations",
    subtitle: "Strength Meets Aesthetics",
    desc: "Our multi-layered zirconia crowns offer exceptional strength (1200+ MPa) while maintaining natural translucency. Available in Full Contour and Layered options.",
    gridDesc: "High-strength monolithic and layered zirconia for crowns and bridges, balancing durability with lifelike translucency.",
    keyBenefits: [
      "Superior strength & durability",
      "Biocompatible & metal-free",
      "Excellent marginal fit",
      "Natural translucency & shade blending",
      "Minimal tooth preparation required"
    ],
    indications: [
      "Posterior single crowns",
      "3-unit bridges",
      "Implant-supported crowns",
      "Anterior aesthetics",
      "Full mouth rehabilitations"
    ],
    materials: [
      "Pre-shaded blanks",
      "Multi-layered Zirconia (HT/ST/UT)",
      "A1-D4 VITA shades available"
    ],
    price: "3,500",
    standardTurnaround: "5-7 Days",
    expressTurnaround: "2-3Days",
    // Keep existing short data for card view
    cases: "Anterior crowns, aesthetic zones",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Monolithic, layered, multi-layer",
    turnaround: "5-7 days"
  },
  {
    num: "02",
    title: "LAYERED ZIRCONIA",
    gridTitle: "Layered Zirconia",
    subtitle: "Natural Aesthetics with Reliable Strength",
    desc: "Our Layered Zirconia restorations combine a strong zirconia base with carefully layered ceramic to create a more natural colour, translucency, and lifelike appearance. They are suitable for cases where both durability and improved aesthetics are important.",
    gridDesc: "Zirconia frameworks layered with ceramic for anterior aesthetics that mimic natural enamel.",
    keyBenefits: [
      "Natural-looking colour and translucency",
      "Strong and durable zirconia foundation",
      "Improved aesthetics for visible teeth",
      "Accurate fit and comfortable function",
      "Suitable for crowns, bridges, and implant restorations"
    ],
    indications: [
      "Anterior aesthetic restorations",
      "Posterior layered restorations",
      "Implant-supported crowns",
      "Zirconia bridges",
      "Long-span bridge cases"
    ],
    materials: [
      "Anterior Layered Zirconia",
      "Posterior Layered Zirconia",
      "Coping Zirconia"
    ],
    price: "7,000",
    standardTurnaround: "6-8 Days",
    expressTurnaround: "3-4 Days",
    cases: "Single crowns, bridges, full-arch",
    products: "Anterior Layered, Posterior Layered",
    options: "Veneered, cut-back technique",
    turnaround: "6-8 days"
  },
  {
    num: "03",
    title: "E-MAX CROWNS",
    gridTitle: "E-Max Restorations",
    subtitle: "The Gold Standard in Aesthetics",
    desc: "IPS e.max lithium disilicate crowns delivering unparalleled aesthetics with excellent strength (500 MPa). The preferred choice for anterior restorations.",
    gridDesc: "Lithium disilicate ceramic offering exceptional translucency for highly aesthetic anterior work.",
    keyBenefits: [
      "Unmatched translucency",
      "Strong chemical bond",
      "Highly polishable surface",
      "Excellent color stability",
      "Minimal preparation needed"
    ],
    indications: [
      "Anterior single crowns",
      "Inlays & Onlays",
      "Conservative restorations",
      "Veneers",
      "Implant abutment crowns"
    ],
    materials: [
      "IPS e.max Press",
      "IPS e.max CAD",
      "MO/HO/LT/HT/MT translucency"
    ],
    price: "4,000",
    standardTurnaround: "5-7 Days",
    expressTurnaround: "2-3days",
    cases: "Veneers, anterior crowns, inlays",
    products: "E-Max Crown, E-Max Veneer",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "4-6 days"
  },
  {
    num: "04",
    title: "IMPLANT PROSTHETIC",
    gridTitle: "Implant Prosthetics",
    subtitle: "Precision Through Technology",
    desc: "Custom implant prosthetics compatible with all major systems, from single crowns to full-arch rehabilitations.",
    gridDesc: "Screw-retained and cement-retained implant restorations with custom abutments and full-arch solutions.",
    keyBenefits: [
      "Compatible with all systems",
      "Custom titanium abutments",
      "Screw-retained options",
      "Digital accuracy",
      "Lifetime warranty on fit"
    ],
    indications: [
      "Single implant crowns",
      "Implant bridges",
      "All-on-4/6 prostheses",
      "Custom abutments",
      "Hybrid dentures"
    ],
    materials: [
      "Grade 5 Titanium bases",
      "Zirconia/E-Max superstructures",
      "Nobel/Straumann/Dentium/Zimmer-compatible"
    ],
    price: "5,000",
    standardTurnaround: "7-10 Days",
    expressTurnaround: "3-5 Days",
    cases: "Single implant, multi-unit, full arch",
    products: "E-Max Crown, E-Max Veneer",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "7-10 days"
  },
  {
    num: "05",
    title: "DIGITAL CAD/CAM",
    gridTitle: "CAD Designing",
    subtitle: "Precision Through Technology",
    desc: "Full digital workflow from scanning to milling. Our CAD/CAM department handles everything from design to precision manufacturing.",
    gridDesc: "Digital crown and bridge design using advanced CAD software with margin and anatomy verification.",
    keyBenefits: [
      "Micron-level accuracy",
      "Consistent quality",
      "Faster production",
      "Digital records saved",
      "Easy modifications"
    ],
    indications: [
      "All crown types",
      "Bridge frameworks",
      "Custom abutments",
      "Surgical guides",
      "Model printing"
    ],
    materials: [
      "Exocad & 3Shape design",
      "5-axis milling",
      "3D printing (DLP)"
    ],
    price: "1,000",
    standardTurnaround: "3-5 Days",
    expressTurnaround: "1-2 Days",
    cases: "All restorations, digital cases",
    products: "Digital Design, CAD Designing",
    options: "Full design, design review",
    turnaround: "2-3 days"
  },
  {
    num: "06",
    title: "DIGITAL CAD/CAM",
    gridTitle: "CAM Milling",
    subtitle: "Precision Through Technology",
    desc: "Full digital workflow from scanning to milling. Our CAD/CAM department handles everything from design to precision manufacturing.",
    gridDesc: "Precision 5-axis milling of zirconia, PMMA and wax patterns for consistent manufacturing.",
    keyBenefits: [
      "Micron-level accuracy",
      "Consistent quality",
      "Faster production",
      "Digital records saved",
      "Easy modifications"
    ],
    indications: [
      "All crown types",
      "Bridge frameworks",
      "Custom abutments",
      "Surgical guides",
      "Model printing"
    ],
    materials: [
      "Exocad & 3Shape design",
      "5-axis milling",
      "3D printing (DLP)"
    ],
    price: "1,000",
    standardTurnaround: "3-5 Days",
    expressTurnaround: "1-2 Days",
    cases: "Zirconia, temporary, wax patterns",
    products: "CAM Milling, PMMA",
    options: "Wet mill, dry mill",
    turnaround: "1-2 days"
  },
  {
    num: "07",
    title: "DIGITAL SMILE DESIGN",
    gridTitle: "Digital Smile Design",
    subtitle: "Plan the Smile Before Treatment",
    desc: "Our Digital Smile Design service helps clinics plan aesthetic restorations using patient photographs, intraoral scans, facial references, and digital dental models. It provides a clear visual guide for treatment planning and improves communication between the clinic, laboratory, and patient.",
    gridDesc: "Aesthetic smile planning with digital previews, facial analysis and tooth proportion design.",
    keyBenefits: [
      "Clear preview of the proposed smile",
      "Improved aesthetic treatment planning",
      "Better communication with patients",
      "Accurate tooth shape and proportion planning",
      "More predictable restorative results"
    ],
    indications: [
      "Smile makeover cases",
      "Anterior restorations",
      "Veneer and crown cases",
      "Full-mouth aesthetic rehabilitation",
      "Cases requiring facially guided planning"
    ],
    materials: [
      "Patient and dental photography",
      "Intraoral and face scan analysis",
      "Digital tooth proportion and alignment planning"
    ],
    price: "1,500",
    standardTurnaround: "3-4 Days",
    expressTurnaround: "1-2 Days",
    cases: "Complex cases, aesthetic planning",
    products: "Smile Design",
    options: "Crown, veneer, inlay, onlay",
    turnaround: "7-10 days"
  },
  {
    num: "08",
    title: "DIAGNOSTIC WAX-UP",
    gridTitle: "Diagnostic Wax-Up",
    subtitle: "Visualize the Treatment Before Restoration",
    desc: "Our Diagnostic Wax-Up service creates a detailed physical or digital preview of the proposed dental restoration. It helps dentists evaluate tooth shape, alignment, proportions, occlusion, and treatment outcomes before beginning the final restoration. Diagnostic Wax-Up is included under J3 Dental Lab's CAD/CAM services.",
    gridDesc: "Physical wax mock-ups for treatment planning and patient communication before final restorations.",
    keyBenefits: [
      "Clear preview of the proposed restoration",
      "Better treatment planning and communication",
      "Accurate tooth shape and proportion analysis",
      "Improved functional and aesthetic outcomes",
      "Helps reduce changes during final production"
    ],
    indications: [
      "Smile design cases",
      "Anterior crown and veneer cases",
      "Full-mouth rehabilitation",
      "Bridge and implant planning",
      "Complex restorative cases"
    ],
    materials: [
      "Digital or physical wax up models",
      "CAD-based tooth design and planning",
      "Full-arch and segmental mock-up support"
    ],
    price: "5,000",
    standardTurnaround: "3-4 Days",
    expressTurnaround: "1-2 Days",
    cases: "Single crowns, bridges, full-arch",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Full arch, segmental",
    turnaround: "3-4 days"
  },
  {
    num: "09",
    title: "TEMPORARY RESTORATIONS",
    gridTitle: "Temporary Restorations",
    subtitle: "Reliable Protection During Treatment",
    desc: "Our temporary restorations provide comfortable and functional coverage while the final crown, bridge, or implant restoration is being prepared. They help protect the prepared teeth, maintain appearance, and support normal function during the treatment period.",
    gridDesc: "PMMA and composite temporaries for interim coverage during treatment.",
    keyBenefits: [
      "Protects prepared teeth",
      "Maintains appearance during treatment",
      "Supports temporary chewing function",
      "Comfortable and natural-looking fit",
      "Easy to adjust or replace"
    ],
    indications: [
      "Temporary crowns and bridges",
      "Implant provisional restorations",
      "Smile design trial restorations",
      "Long-term provisional cases",
      "Restorations under final production"
    ],
    materials: [
      "PMMA temporary restorations",
      "Composite provisional materials",
      "CAD-designed temporary crowns"
    ],
    price: "3,000",
    standardTurnaround: "2-3 Days",
    expressTurnaround: "1-2 Days",
    cases: "Interim restorations, long-term provisional",
    products: "Temporary Crown, PMMA",
    options: "PMMA, composite",
    turnaround: "2-3 days"
  },
  {
    num: "10",
    title: "SHADE MATCHING",
    gridTitle: "Digital Shade Matching",
    subtitle: "Precision Through Technology",
    desc: "Advanced digital shade matching using spectrophotometry and photo analysis. We match your restorations perfectly to adjacent teeth.",
    gridDesc: "Physical wax mock-ups for treatment planning and patient communication before final restorations.",
    keyBenefits: [
      "Digital spectrophotometry",
      "Multiple shade verification",
      "Before/after comparison",
      "Photo-based analysis",
      "Consistent results"
    ],
    indications: [
      "All aesthetic cases",
      "Veneer cases",
      "Complex shade matching",
      "Anterior restorations",
      "Shade corrections"
    ],
    materials: [
      "VITA Classical A1-D4",
      "VITA 3D Master",
      "Custom shade tabs",
      "Staining & glazing options"
    ],
    price: "Included",
    standardTurnaround: "Same day",
    expressTurnaround: "N/A",
    cases: "Single crowns, bridges, full-arch",
    products: "Full Contour Zirconia, Layered Zirconia",
    options: "Full arch, segmental",
    turnaround: "3-4 days"
  },
  {
    num: "11",
    title: "DIGITAL IMPRESSION PROCESSING",
    gridTitle: "Digital Impression Processing",
    subtitle: "Seamless Scan-to-Lab Workflow",
    desc: "Our digital impression processing service transforms intraoral scans into accurate, production-ready lab data. We streamline scan import, alignment, articulation, and model preparation for efficient, fully digital workflows.",
    gridDesc: "Intraoral scan import, alignment and model generation for fully digital workflows.",
    keyBenefits: [
      "Accurate scan alignment and processing",
      "Faster case preparation",
      "Reduced manual errors",
      "Smooth digital workflow integration",
      "Better communication between clinic and lab"
    ],
    indications: [
      "IOS scan submissions",
      "Full-arch digital cases",
      "Single crown workflows",
      "Bridge and implant planning",
      "Remote clinic case transfers"
    ],
    materials: [
      "Intraoral scan import — STL, PLY and OBJ",
      "Digital model alignment and articulation",
      "Full-arch and segment bit workflow support"
    ],
    price: "1,500",
    standardTurnaround: "3-4 Days",
    expressTurnaround: "1-2 Days",
    cases: "IOS scans, digital cases",
    products: "Digital Impression Processing",
    options: "Full arch, segmental",
    turnaround: "3-4 days"
  },
  {
    num: "12",
    title: "PICKUP AND DELIVERY",
    gridTitle: "Pickup and Delivery",
    subtitle: "Reliable Case Collection & Delivery",
    desc: "Our pickup and delivery service helps dental clinics send physical cases to J3 Dental Lab and receive completed restorations safely. Clinics can schedule pickups, track the request status, verify handovers using OTP, and receive delivery confirmation.",
    gridDesc: "Scheduled physical collection of cases from your clinic with OTP-verified delivery of completed work.",
    keyBenefits: [
      "Convenient clinic pickup scheduling",
      "Safe handling of dental cases",
      "Pickup and delivery status updates",
      "OTP-based handover verification",
      "Clear communication with the laboratory"
    ],
    indications: [
      "Physical impressions and models",
      "Multiple dental cases",
      "Completed restoration delivery",
      "Urgent clinic pickups",
      "Cases requiring secure transportation"
    ],
    materials: [
      "Scheduled pickup requests",
      "Route and status management",
      "Signature or photo confirmation"
    ],
    price: "1,500",
    standardTurnaround: "3-4 Days",
    expressTurnaround: "1-2 Days",
    cases: "All physical cases",
    products: "Pickup and Delivery",
    options: "Scheduled, urgent",
    turnaround: "3-4 days"
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
              
              <h3 className="service-card-title">{srv.gridTitle || srv.title}</h3>
              <p className="service-card-desc">{srv.gridDesc || srv.desc}</p>
              
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
                <button className="btn-service-detail" onClick={() => onNavigate('service-detail', srv)}>
                  View Detail
                </button>
                <button className="btn-service-book" onClick={() => onNavigate('register')}>
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
