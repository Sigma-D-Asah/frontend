export type MachineStatus = 'normal' | 'warning' | 'critical';

export interface IMachine {
  id: string;
  name: string;
  status: MachineStatus;
  lastCheck: string;
  location: string;
  // Field Baru untuk Informasi Detail
  riskScore: number;
  operator: string;
  recommendation: string;
  alerts: string[];
  technicalSpecs: {
    voltage: string;
    vibration: string;
    temperature: string;
  };
}

export interface IChartData {
  time: string;
  value: number;
  threshold: number;
}

export const mockMachineData: IMachine[] = [
  {
    id: 'T-101',
    name: 'Mesin 1',
    status: 'normal',
    lastCheck: '2025-11-16T12:00:00Z',
    location: 'Region A - Sektor 1',
    riskScore: 12, // Rendah
    operator: 'Budi Santoso',
    recommendation: 'No action needed. Schedule routine check next month.',
    alerts: [],
    technicalSpecs: {
      voltage: '220V (Stable)',
      vibration: '0.2g (Normal)',
      temperature: '45°C (Optimal)',
    }
  },
  {
    id: 'T-102',
    name: 'Mesin 2',
    status: 'warning',
    lastCheck: '2025-11-16T11:30:00Z',
    location: 'Region A - Sektor 2',
    riskScore: 65, // Menengah
    operator: 'Agus Pratama',
    recommendation: 'Monitor vibration levels closely. Prepare for bearing lubrication.',
    alerts: [
      'Vibration slightly above threshold (0.7g)',
      'Lubrication level low'
    ],
    technicalSpecs: {
      voltage: '218V (Stable)',
      vibration: '0.7g (Warning)',
      temperature: '58°C (Elevated)',
    }
  },
  {
    id: 'T-103',
    name: 'Mesin 3',
    status: 'critical',
    lastCheck: '2025-11-16T10:00:00Z',
    location: 'Region B - Sektor 1',
    riskScore: 92, // Kritis
    operator: 'Rian Hidayat',
    recommendation: 'IMMEDIATE STOP. Check bearing and alignment. Generate ticket #MT-999.',
    alerts: [
      'Critical Vibration: 1.1g (Threshold 0.8g)',
      'Temperature Spike detected (+15°C)',
      'Unusual noise reported by operator'
    ],
    technicalSpecs: {
      voltage: '210V (Fluctuating)',
      vibration: '1.1g (Critical)',
      temperature: '85°C (Overheating)',
    }
  },
];

// Data Sensor Multi-Mesin
export const mockSensorData: Record<string, IChartData[]> = {
  'T-101': [ // Normal Pattern
    { time: '06:00', value: 0.20, threshold: 0.8 },
    { time: '07:00', value: 0.22, threshold: 0.8 },
    { time: '08:00', value: 0.25, threshold: 0.8 },
    { time: '09:00', value: 0.23, threshold: 0.8 },
    { time: '10:00', value: 0.28, threshold: 0.8 },
    { time: '11:00', value: 0.30, threshold: 0.8 },
    { time: '12:00', value: 0.32, threshold: 0.8 },
    { time: '13:00', value: 0.29, threshold: 0.8 },
    { time: '14:00', value: 0.25, threshold: 0.8 },
    { time: '15:00', value: 0.22, threshold: 0.8 },
  ],
  'T-102': [ // Warning Pattern
    { time: '06:00', value: 0.40, threshold: 0.8 },
    { time: '07:00', value: 0.45, threshold: 0.8 },
    { time: '08:00', value: 0.55, threshold: 0.8 },
    { time: '09:00', value: 0.60, threshold: 0.8 },
    { time: '10:00', value: 0.72, threshold: 0.8 },
    { time: '11:00', value: 0.75, threshold: 0.8 },
    { time: '12:00', value: 0.65, threshold: 0.8 },
    { time: '13:00', value: 0.55, threshold: 0.8 },
    { time: '14:00', value: 0.45, threshold: 0.8 },
    { time: '15:00', value: 0.42, threshold: 0.8 },
  ],
  'T-103': [ // Critical Pattern
    { time: '06:00', value: 0.45, threshold: 0.8 },
    { time: '07:00', value: 0.50, threshold: 0.8 },
    { time: '08:00', value: 0.65, threshold: 0.8 },
    { time: '09:00', value: 0.85, threshold: 0.8 }, // Cross threshold
    { time: '10:00', value: 0.95, threshold: 0.8 },
    { time: '11:00', value: 1.10, threshold: 0.8 }, // Peak Anomaly
    { time: '12:00', value: 0.90, threshold: 0.8 },
    { time: '13:00', value: 0.85, threshold: 0.8 },
    { time: '14:00', value: 0.75, threshold: 0.8 },
    { time: '15:00', value: 0.60, threshold: 0.8 },
  ]
};