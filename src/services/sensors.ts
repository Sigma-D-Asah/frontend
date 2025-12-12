import type {
  SensorReading,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

import { apiFetch } from "@/lib/api";

export const sensorApi = {
  // Get all sensor readings with pagination
  getAll: (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/sensors${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      readings: SensorReading[];
      pagination: PaginatedResponse<SensorReading>["pagination"];
    }>(url);
  },

  // Get sensor readings by machine
  getByMachine: (machineId: string, params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/sensors/machine/${machineId}${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      readings: SensorReading[];
      pagination: PaginatedResponse<SensorReading>["pagination"];
    }>(url);
  },

  // Get unprocessed readings
  getUnprocessed: () =>
    apiFetch<{ readings: SensorReading[] }>("/sensors/unprocessed"),

  // Generate sensor data
  generate: (machineId: string) =>
    apiFetch<{ reading: SensorReading }>(`/sensors/generate/${machineId}`, {
      method: "POST",
    }),
};
