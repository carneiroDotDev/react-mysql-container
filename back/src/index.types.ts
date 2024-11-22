import { RequestHandler } from "express";

interface DeviceRequest<Params = unknown> extends RequestHandler<Params, unknown, Device, unknown> {}

interface Device {
  id: number;
  deviceName: string;
  deviceType: 'SMARTPHONE' | 'CAMERA' | 'TABLET';
  ownerName: string;
  batteryStatus: number;
}

export {DeviceRequest, Device}