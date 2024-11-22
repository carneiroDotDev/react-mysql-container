
export interface Device {
    id: number;
    deviceName: string;
    deviceType: 'SMARTPHONE' | 'CAMERA' | 'TABLET';
    ownerName: string;
    batteryStatus: number;
  }