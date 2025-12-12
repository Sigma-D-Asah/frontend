import type { ProcessResult } from "@/types/api";

import { apiFetch } from "@/lib/api";

export const jobApi = {
  // Trigger manual sensor data generation
  generateSensors: () =>
    apiFetch<ProcessResult>("/jobs/generate-sensors", {
      method: "POST",
    }),

  // Trigger manual processing of unprocessed readings
  processReadings: () =>
    apiFetch<ProcessResult>("/jobs/process", {
      method: "POST",
    }),
};
