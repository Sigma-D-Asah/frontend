import type { Machine } from "@/types/api";

import { apiFetch } from "@/lib/api";

export const machineApi = {
  // Get all machines
  getAll: () => apiFetch<{ machines: Machine[] }>("/machines"),

  // Get machine by code
  getByCode: (code: string) =>
    apiFetch<{ machine: Machine }>(`/machines/${code}`),

  // Create machine
  create: (data: Partial<Machine>) =>
    apiFetch<{ machine: Machine }>("/machines", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update machine
  update: (code: string, data: Partial<Machine>) =>
    apiFetch<{ machine: Machine }>(`/machines/${code}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
