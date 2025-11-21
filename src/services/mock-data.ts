export type MachineStatus = 'normal' | 'warning' | 'critical';

export interface IMachine {
  id: string;
  name: string;
  status: MachineStatus;
  lastCheck: string;
  location: string;
}

export interface IChartData {
  time: string;
  temperature: number;
  vibration: number;
}

export const mockMachineData: IMachine[] = [
  {
    id: 'T-101',
    name: 'Mesin 1',
    status: 'normal',
    lastCheck: '2025-11-16T12:00:00Z',
    location: 'Region A - Sektor 1',
  },
  {
    id: 'T-102',
    name: 'Mesin 2',
    status: 'warning',
    lastCheck: '2025-11-16T11:30:00Z',
    location: 'Region A - Sektor 2',
  },
  {
    id: 'T-103',
    name: 'Mesin 3',
    status: 'critical',
    lastCheck: '2025-11-16T10:00:00Z',
    location: 'Region B - Sektor 1',
  },
];

export const mockSensorData: IChartData[] = [
  { time: '06:00', temperature: 80, vibration: 0.2 },
  { time: '08:00', temperature: 82, vibration: 0.2 },
  { time: '10:00', temperature: 85, vibration: 0.3 },
  { time: '12:00', temperature: 95, vibration: 0.8 }, // Anomali
  { time: '14:00', temperature: 92, vibration: 0.7 },
];
