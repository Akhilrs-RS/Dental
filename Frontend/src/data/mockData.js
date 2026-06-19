// Dental Management System Mock Database

export const ADA_CODES = [
  { code: 'D0120', name: 'Periodic Oral Evaluation', category: 'Diagnostic', price: 65 },
  { code: 'D0220', name: 'Intraoral Radiograph (Periapical)', category: 'Diagnostic', price: 45 },
  { code: 'D0274', name: 'Bitewing Radiographs (4 images)', category: 'Diagnostic', price: 85 },
  { code: 'D1110', name: 'Prophylaxis (Adult Cleaning)', category: 'Preventive', price: 95 },
  { code: 'D1208', name: 'Topical Application of Fluoride', category: 'Preventive', price: 40 },
  { code: 'D2391', name: 'Resin Composite - 1 Surface (Posterior)', category: 'Restorative', price: 185 },
  { code: 'D2393', name: 'Resin Composite - 3 Surfaces (Posterior)', category: 'Restorative', price: 260 },
  { code: 'D2740', name: 'Crown - Porcelain/Ceramic', category: 'Restorative', price: 1250 },
  { code: 'D3330', name: 'Endodontic Therapy (Molar RCT)', category: 'Endodontic', price: 980 },
  { code: 'D4341', name: 'Periodontal Scaling & Root Planing', category: 'Periodontal', price: 210 },
  { code: 'D6010', name: 'Surgical Placement of Implant Body', category: 'Implant', price: 2400 },
  { code: 'D7140', name: 'Extraction - Erupted Tooth/Exposed Root', category: 'Oral Surgery', price: 220 }
];

export const INITIAL_PATIENTS = [
  {
    id: 'P-101',
    name: 'Eleanor Vance',
    age: 34,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'eleanor.vance@example.com',
    address: '742 Evergreen Terrace, Springfield',
    insurance: {
      provider: 'Delta Dental PPO',
      policyNumber: 'DD-98721A',
      coveragePercent: 80,
      deductibleMet: true
    },
    medicalAlerts: ['Penicillin Allergy', 'Low Blood Pressure'],
    chart: {
      3: { condition: 'decay', surfaces: ['occlusal', 'distal'], treatments: [] },
      14: { condition: 'filling', surfaces: ['occlusal'], treatments: [{ type: 'filling', date: '2025-11-14', code: 'D2391', notes: 'Amalgam replaced with composite' }] },
      19: { condition: 'crown', surfaces: ['all'], treatments: [{ type: 'crown', date: '2026-01-20', code: 'D2740', notes: 'Porcelain crown placed on 19' }] },
      32: { condition: 'missing', surfaces: [], treatments: [{ type: 'extraction', date: '2024-05-10', code: 'D7140', notes: 'Wisdom tooth extracted' }] }
    },
    xrays: [
      { id: 'xr-1', label: 'Left Bitewing (14, 15, 16)', date: '2026-03-12', type: 'bitewing' },
      { id: 'xr-2', label: 'Lower Right Periapical (30, 31)', date: '2026-03-12', type: 'periapical' }
    ],
    visits: [
      { date: '2026-03-12', notes: 'Routine checkup. Found active decay on tooth #3 distal-occlusal. Scheduled treatment plan.' },
      { date: '2026-01-20', notes: 'Permanent porcelain crown cementation on tooth #19. Bite checked and verified.' }
    ]
  },
  {
    id: 'P-102',
    name: 'Marcus Sterling',
    age: 48,
    gender: 'Male',
    phone: '(555) 987-6543',
    email: 'marcus.s@example.com',
    address: '1012 Baker St, London District',
    insurance: {
      provider: 'Cigna Dental Premium',
      policyNumber: 'CIG-88219B',
      coveragePercent: 90,
      deductibleMet: true
    },
    medicalAlerts: ['Hypertension', 'Aspirin Sensitivity'],
    chart: {
      8: { condition: 'fracture', surfaces: ['incisal'], treatments: [] },
      30: { condition: 'rct', surfaces: [], treatments: [{ type: 'rct', date: '2025-08-04', code: 'D3330', notes: 'Root canal performed by Dr. Aris' }] }
    },
    xrays: [
      { id: 'xr-3', label: 'Anterior Panorex (7, 8, 9)', date: '2026-05-18', type: 'panoramic' }
    ],
    visits: [
      { date: '2026-05-18', notes: 'Patient presented with chipped tooth #8 after minor fall. Recommend composite restoration or veneer.' }
    ]
  },
  {
    id: 'P-103',
    name: 'Chloe Park',
    age: 22,
    gender: 'Female',
    phone: '(555) 456-7890',
    email: 'chloe.p@example.com',
    address: '456 University Way, Berkeley',
    insurance: {
      provider: 'MetLife Dental',
      policyNumber: 'MET-44102C',
      coveragePercent: 70,
      deductibleMet: false
    },
    medicalAlerts: [],
    chart: {
      17: { condition: 'missing', surfaces: [], treatments: [{ type: 'extraction', date: '2025-02-12', code: 'D7140', notes: 'Wisdom tooth extracted due to impaction' }] },
      18: { condition: 'missing', surfaces: [], treatments: [{ type: 'extraction', date: '2025-02-12', code: 'D7140', notes: 'Wisdom tooth extracted' }] },
      31: { condition: 'missing', surfaces: [], treatments: [{ type: 'extraction', date: '2025-02-12', code: 'D7140', notes: 'Wisdom tooth extracted' }] },
      32: { condition: 'missing', surfaces: [], treatments: [{ type: 'extraction', date: '2025-02-12', code: 'D7140', notes: 'Wisdom tooth extracted' }] }
    },
    xrays: [
      { id: 'xr-4', label: 'Full Mouth Series', date: '2026-02-10', type: 'fms' }
    ],
    visits: [
      { date: '2026-02-10', notes: 'Hygienist cleaning. No active cavities detected. Plaque index low.' }
    ]
  },
  {
    id: 'P-104',
    name: 'Samuel Henderson',
    age: 62,
    gender: 'Male',
    phone: '(555) 789-0123',
    email: 'sam.h@example.com',
    address: '89 Main St, North Andover',
    insurance: {
      provider: 'Aetna Dental PPO',
      policyNumber: 'AET-10293D',
      coveragePercent: 50,
      deductibleMet: true
    },
    medicalAlerts: ['Type 2 Diabetes', 'Takes Blood Thinners'],
    chart: {
      12: { condition: 'decay', surfaces: ['mesial', 'buccal'], treatments: [] },
      20: { condition: 'decay', surfaces: ['occlusal'], treatments: [] },
      21: { condition: 'decay', surfaces: ['lingual'], treatments: [] }
    },
    xrays: [
      { id: 'xr-5', label: 'Upper Left Quadrant PA', date: '2026-06-01', type: 'periapical' }
    ],
    visits: [
      { date: '2026-06-01', notes: 'Comprehensive evaluation. Noted active decay on #12, #20, and #21. Patient advised to monitor blood sugar prior to treatment appointments.' }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-1',
    patientId: 'P-101',
    patientName: 'Eleanor Vance',
    time: '09:00',
    duration: 60, // minutes
    room: 'Operatory A',
    dentist: 'Dr. Sarah Carter',
    type: 'Filling (#3 MOD)',
    status: 'confirmed',
    date: '2026-06-19'
  },
  {
    id: 'apt-2',
    patientId: 'P-102',
    patientName: 'Marcus Sterling',
    time: '10:30',
    duration: 45,
    room: 'Operatory A',
    dentist: 'Dr. Sarah Carter',
    type: 'Composite (#8)',
    status: 'checked-in',
    date: '2026-06-19'
  },
  {
    id: 'apt-3',
    patientId: 'P-103',
    patientName: 'Chloe Park',
    time: '09:00',
    duration: 60,
    room: 'Hygiene Room',
    dentist: 'Hygienist Amy Miller',
    type: 'Prophylaxis & Fluoride',
    status: 'completed',
    date: '2026-06-19'
  },
  {
    id: 'apt-4',
    patientId: 'P-104',
    patientName: 'Samuel Henderson',
    time: '11:15',
    duration: 90,
    room: 'Operatory B',
    dentist: 'Dr. James Aris',
    type: 'Consultation & X-Rays',
    status: 'scheduled',
    date: '2026-06-19'
  },
  {
    id: 'apt-5',
    patientId: 'P-101',
    patientName: 'Eleanor Vance',
    time: '13:00',
    duration: 45,
    room: 'Operatory B',
    dentist: 'Dr. James Aris',
    type: 'Post-Op Follow-up',
    status: 'scheduled',
    date: '2026-06-19'
  }
];

export const CLINIC_ANALYTICS = {
  dailyRevenue: 2850,
  monthlyRevenue: 64200,
  occupancyRate: 85,
  activePatients: 1420,
  procedureBreakdown: [
    { name: 'Diagnostic', value: 35, color: '#0284c7' },
    { name: 'Preventive', value: 25, color: '#10b981' },
    { name: 'Restorative', value: 20, color: '#8b5cf6' },
    { name: 'Endodontic', value: 12, color: '#06b6d4' },
    { name: 'Surgery & Implants', value: 8, color: '#ec4899' }
  ],
  revenueHistory: [
    { month: 'Jan', amount: 52000 },
    { month: 'Feb', amount: 58000 },
    { month: 'Mar', amount: 61000 },
    { month: 'Apr', amount: 69000 },
    { month: 'May', amount: 62000 },
    { month: 'Jun', amount: 64200 }
  ]
};
