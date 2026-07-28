CREATE TABLE IF NOT EXISTS `Products` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(150) NOT NULL,
    `Material` VARCHAR(150) NOT NULL,
    `IndicatedUse` VARCHAR(255) NOT NULL,
    `TurnaroundTime` VARCHAR(50) NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Category` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Services` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Num` VARCHAR(10) NOT NULL,
    `Title` VARCHAR(100) NOT NULL,
    `Description` TEXT NOT NULL,
    `Cases` VARCHAR(255) NULL,
    `Products` VARCHAR(255) NULL,
    `Options` VARCHAR(255) NULL,
    `Turnaround` VARCHAR(50) NULL
);

CREATE TABLE IF NOT EXISTS `Clinics` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `ClinicName` VARCHAR(150) NOT NULL,
    `DoctorName` VARCHAR(100) NOT NULL,
    `Phone` VARCHAR(20) NOT NULL,
    `GstNumber` VARCHAR(20) NULL,
    `Email` VARCHAR(150) NOT NULL UNIQUE,
    `Address` VARCHAR(255) NOT NULL,
    `City` VARCHAR(100) NOT NULL,
    `State` VARCHAR(100) NOT NULL,
    `Pincode` VARCHAR(15) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `PickupRequests` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `ClinicId` INT NULL,
    `ClinicName` VARCHAR(150) NOT NULL,
    `DoctorName` VARCHAR(100) NOT NULL,
    `Phone` VARCHAR(20) NOT NULL,
    `Email` VARCHAR(150) NOT NULL,
    `PickupDate` DATETIME NOT NULL,
    `PreferredTime` VARCHAR(50) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `ContactPerson` VARCHAR(100) NOT NULL,
    `NumberOfCases` INT DEFAULT 1,
    `SpecialNotes` TEXT NULL,
    `Status` VARCHAR(30) DEFAULT 'Pending',
    `Otp` VARCHAR(6) NULL,
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ContactEnquiries` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(150) NOT NULL,
    `Phone` VARCHAR(20) NOT NULL,
    `Subject` VARCHAR(150) NOT NULL,
    `Message` TEXT NOT NULL,
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Delete old rows to prevent duplicates on restart/init
TRUNCATE TABLE `Products`;
TRUNCATE TABLE `Services`;

-- Prepopulate Products Catalog
INSERT INTO `Products` (`Name`, `Material`, `IndicatedUse`, `TurnaroundTime`, `Price`, `Category`) VALUES
('Full Contour Zirconia', 'Monolithic high-strength zirconia', 'Single crowns, bridges, posterior zones', '5–7 days', 1500.00, 'crowns'),
('Layered Zirconia', 'Zirconia framework veneered with porcelain', 'Anterior crowns, aesthetic bridges', '6–8 days', 2200.00, 'crowns'),
('Ultra Translucent Zirconia', 'High translucency monolithic zirconia', 'Single crowns in the anterior aesthetic zone', '5–7 days', 2600.00, 'crowns'),
('Pre-shaded Zirconia', 'Multi-layer pre-shaded monolithic zirconia', 'Posterior crowns, multi-unit bridges', '5–6 days', 1800.00, 'crowns'),
('High-Strength Zirconia', '1200+ MPa structural monolithic zirconia', 'Long-span bridges, bruxer molar crowns', '5–7 days', 2000.00, 'crowns'),
('IPS e.max CAD Crown', 'Lithium disilicate glass-ceramic', 'Inlays, onlays, thin veneers, single crowns', '4–5 days', 3500.00, 'crowns'),
('IPS e.max Press Crown', 'Pressed lithium disilicate ceramic', 'Highly aesthetic anterior single crowns', '5–6 days', 3800.00, 'crowns'),
('Feldspathic Veneer', 'Stacked feldspathic porcelain on refractory', 'Conservative smile makeovers, micro-veneers', '7–8 days', 4500.00, 'veneers'),
('IPS e.max Press Veneer', 'Pressed lithium disilicate glass-ceramic', 'Ultra-thin aesthetic veneers (0.3mm)', '5–7 days', 4000.00, 'veneers'),
('E.max Layered Veneer', 'Lithium disilicate core layered with fluorapatite', 'Aesthetic zone veneers demanding deep character', '6–8 days', 4200.00, 'veneers'),
('PFM Premium', 'Biocompatible Cobalt-Chrome base fused to ceramic', 'Crowns, long-span bridges, combination cases', '5–6 days', 1200.00, 'crowns'),
('PFM Standard', 'Nickel-Chrome base fused to dental ceramic', 'Cost-effective posterior crowns and bridges', '5–6 days', 900.00, 'crowns'),
('Full Metal Crown', 'Semi-precious gold alloy or base metal', 'Heavy bruxer molars, low clearance crowns', '5–6 days', 1400.00, 'crowns'),
('Temporary PMMA Crown', 'CAD/CAM milled polymethyl methacrylate', 'Interim single crowns and bridges', '2–3 days', 500.00, 'crowns'),
('Diagnostic Wax-up', 'Hard diagnostic carving wax', 'Esthetic mock-ups, treatment visualization', '3–4 days', 300.00, 'implants'),
('Screw-Retained Implant Crown', 'Titanium base / Monolithic zirconia', 'Single or multi-unit screw-retained implants', '6–8 days', 5500.00, 'implants'),
('Cement-Retained Implant Crown', 'Custom abutment + Zirconia/E.max crown', 'Angulated implants, customized emergence profile', '7–9 days', 6000.00, 'implants'),
('Custom Titanium Abutment', 'Medical-grade 5 Titanium (Ti6Al4V)', 'Implant abutments needing custom angles', '5–7 days', 3000.00, 'implants'),
('Custom Zirconia Abutment', 'Zirconia coping cemented to titanium base', 'High esthetic zone implant abutments', '6–8 days', 3500.00, 'implants'),
('Implant Surgical Guide', 'Biocompatible clear surgical resin', 'Guided implant placement surgery', '3–4 days', 2500.00, 'implants'),
('All-on-4 / All-on-6 Hybrid', 'Titanium milled bar + acrylic wrap + PMMA teeth', 'Full-arch fixed implant restorations', '10–12 days', 35000.00, 'implants'),
('Fixed Zirconia Arch (Prettau)', 'Solid monolithic zirconia bridge on Ti-bar', 'Premium full-arch implant restorations', '12–14 days', 45000.00, 'implants'),
('Inlay / Onlay Composite', 'Micro-hybrid indirect lab composite', 'Conservative posterior tooth restorations', '3–4 days', 1100.00, 'crowns'),
('Inlay / Onlay Zirconia', 'Monolithic high-strength zirconia', 'Conservative heavy load posterior restorations', '4–5 days', 1600.00, 'crowns'),
('Inlay / Onlay E.max', 'Lithium disilicate glass-ceramic', 'Aesthetic zone inlays, onlays, overlays', '4–5 days', 2000.00, 'crowns'),
('Maryland Bridge', 'Resin-bonded wings + Zirconia/PFM pontic', 'Conservative single-tooth anterior replacement', '5–7 days', 2800.00, 'bridges'),
('Cast Post & Core', 'Non-precious Cobalt-Chrome alloy', 'Endodontically treated post rebuilds', '4–5 days', 1000.00, 'crowns'),
('Fiber Post with Core', 'Quartz fiber post + dual-cure composite core', 'Aesthetic post-and-core crown rebuilds', '3–4 days', 800.00, 'crowns'),
('Custom Bleaching Tray', 'Soft medical-grade vinyl sheet', 'Take-home whitening tray systems', '2–3 days', 600.00, 'veneers'),
('Night Guard (Hard)', 'Heat-cured clear PMMA acrylic', 'Heavy bruxism and teeth clenching protection', '4–5 days', 1500.00, 'veneers'),
('Night Guard (Soft)', 'Dual-laminate soft/hard vinyl sheet', 'Mild teeth grinding and clenching protection', '3–4 days', 1200.00, 'veneers'),
('Sports Mouthguard', 'Multi-layered custom laminated EVA', 'Athletic impact jaw and tooth protection', '3–4 days', 1000.00, 'veneers'),
('Orthodontic Retainer', 'Essix clear thermoformed sheet (0.040")', 'Post-treatment orthodontic retention', '2–3 days', 700.00, 'veneers'),
('Space Maintainer', 'Orthodontic wire + band loop maintainer', 'Pediatric space maintenance appliances', '4–5 days', 900.00, 'veneers');

-- Prepopulate Services Catalog
INSERT INTO `Services` (`Num`, `Title`, `Description`, `Cases`, `Products`, `Options`, `Turnaround`) VALUES
('01', 'Zirconia Restorations', 'High-strength monolithic and layered zirconia for crowns and bridges, balancing durability with lifelike translucency.', 'Anterior crowns, aesthetic zones', 'Full Contour Zirconia, Layered Zirconia', 'Monolithic, layered, multi-layer', '5–7 days'),
('02', 'Layered Zirconia', 'Zirconia frameworks layered with ceramic for anterior aesthetics that mimics natural enamel.', 'Single crowns, bridges, full-arch', 'Anterior Layered, Posterior Layered', 'Veneered, cut-back technique', '6–8 days'),
('03', 'E-Max Restorations', 'Lithium disilicate ceramic offering exceptional translucency for highly aesthetic anterior work.', 'Veneers, anterior crowns, inlays', 'E-Max Crown, E-Max Veneer', 'Crown, veneer, inlay, onlay', '4–5 days'),
('04', 'PFM Crowns', 'Porcelain fused to metal providing strength and reliability, ideal for posterior zones and long bridges.', 'Posterior crowns, bridge abutments', 'PFM Premium, PFM Standard', 'Cobalt-Chrome, Nickel-Free', '5–6 days'),
('05', 'Implant Prosthetics', 'Custom abutments, screw-retained and cement-retained implant solutions for major implant brands.', 'Single implants, multi-unit arches', 'Screw-Retained, Cement-Retained', 'Titanium, hybrid zirconia', '6–9 days'),
('06', 'Full Arch Hybrids', 'Fixed full-arch hybrid restorations, titanium bar-reinforced solutions for edentulous patients.', 'Edentulous arches, rehabilitation', 'All-on-4 Hybrid, All-on-6 Hybrid', 'Titanium bar, cobalt-chrome bar', '10–12 days'),
('07', 'Diagnostic Wax-Ups', 'Precision diagnostic wax-ups for treatment visualization, cosmetic mockups, and surgery prep.', 'Esthetic zones, full mouth rehab', 'Anterior Wax-up, Posterior Wax-up', 'Conventional, digital wax-up', '3–4 days'),
('08', 'Inlays & Onlays', 'Conservative esthetic restorations in ceramic, composite, or zirconia to repair moderately damaged teeth.', 'Molar restorations, conservations', 'E.max Inlay, Zirconia Onlay', 'Ceramic, composite, monolithic', '3–5 days'),
('09', 'Custom Abutments', 'CAD/CAM designed titanium and hybrid zirconia abutments for optimal emergence profiles.', 'Single/multiple implants', 'Custom Titanium, Custom Zirconia', 'Straight, angulated profiles', '5–8 days'),
('10', 'Surgical Guides', 'Digitally planned drill guides for precise implant placement, compatible with guided surgery kits.', 'Guided surgery implants', 'Single-site Guide, Multi-site Guide', 'Tooth-supported, bone-supported', '3–4 days'),
('11', 'Veneers', 'Ultra-thin prep and no-prep porcelain veneers for cosmetic makeovers and structural corrections.', 'Aesthetic zone, smile designs', 'Feldspathic Veneer, E-Max Veneer', 'No-prep, prep veneers', '5–7 days'),
('12', 'Night Guards & Splints', 'Hard, soft, and dual-laminate splints for bruxism, muscle relaxation, and orthodontic retention.', 'Bruxism, TMJ disorders, retention', 'Hard Guard, Soft Guard, Splints', 'Hard PMMA, soft vinyl, dual', '3–5 days');
