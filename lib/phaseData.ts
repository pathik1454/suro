export interface Spec {
  label: string;
  value: string;
}

export interface PhaseInfo {
  id: number;
  tag: string;
  title: string;
  description: string;
  specs: Spec[];
  direction: 'left' | 'right';
}

export const PHASE_DATA: PhaseInfo[] = [
  {
    id: 1,
    tag: '01  THE BARE FOUNDATION',
    title: 'The Bare Foundation',
    description: 'Every coach begins here. High-tensile structural steel, precision-cut and welded to exact specification. The framework is the promise — built to carry weight, absorb force, and endure decades.',
    direction: 'left',
    specs: [
      { label: 'FRAMEWORK', value: 'High-Tensile Steel' },
      { label: 'COMPLIANCE', value: 'AIS 052' },
      { label: 'WELD TYPE', value: 'MIG / TIG' },
      { label: 'SURFACE', value: 'Anti-Corrosion' },
      { label: 'AXLE TYPE', value: 'Commercial Grade' },
      { label: 'UNDERFRAME', value: 'Load-Rated' },
    ],
  },
  {
    id: 2,
    tag: '02  THE DRIVETRAIN',
    title: 'The Drivetrain',
    description: 'The Volvo B11R engine — 430 horsepower, 2,100 Nm of torque — is seated into the rear compartment. Four heavy-duty axle assemblies are mounted. The mechanical soul of the coach takes form.',
    direction: 'right',
    specs: [
      { label: 'ENGINE', value: 'Volvo B11R' },
      { label: 'OUTPUT', value: '430 HP' },
      { label: 'TORQUE', value: '2,100 Nm' },
      { label: 'EMISSION', value: 'Euro VI' },
      { label: 'TRANS.', value: 'I-Shift 12-Spd' },
      { label: 'FUEL', value: '400L Capacity' },
    ],
  },
  {
    id: 3,
    tag: '03  INTERIOR ARCHITECTURE',
    title: 'Interior Architecture',
    description: 'A bespoke double-decker steel cage rises from the frame. Individual sleeper pods are fitted with premium leather. Theatre floors. Everything designed for the passenger.',
    direction: 'left',
    specs: [
      { label: 'LAYOUT', value: 'Double Deck' },
      { label: 'BERTHS', value: '40 Premium' },
      { label: 'DECK SPLIT', value: '20 + 20' },
      { label: 'UPHOLSTERY', value: 'Leather' },
      { label: 'FLOORING', value: 'Theatre-Grade' },
      { label: 'AC', value: 'Dual-Zone' },
    ],
  },
  {
    id: 4,
    tag: '04  THE EXTERIOR SHELL',
    title: 'The Exterior Shell',
    description: "Aerodynamic silver metallic body panels encase the completed interior. Panoramic tinted glass units are seated into precision-machined frames. The coach's silhouette is sealed.",
    direction: 'right',
    specs: [
      { label: 'PANELS', value: 'Silver Metallic' },
      { label: 'GLASS', value: 'Panoramic Tinted' },
      { label: 'WINDSHIELD', value: 'Laminated' },
      { label: 'SEALING', value: 'Weatherproof' },
      { label: 'PROFILE', value: 'Aerodynamic' },
      { label: 'LIVERY', value: 'Custom Available' },
    ],
  },
  {
    id: 5,
    tag: '05  THE MASTERPIECE',
    title: 'The Masterpiece',
    description: '25 years. 500 coaches. One philosophy: no compromises. The finished vehicle is the beginning of its story — and yours.',
    direction: 'left',
    specs: [], // Handled custom in UI — trust lines + CTA
  },
];
