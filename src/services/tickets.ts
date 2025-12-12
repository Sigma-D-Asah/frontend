import type {
  MaintenanceTicket,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

import { apiFetch } from "@/lib/api";

export const ticketApi = {
  // Get all tickets with pagination
  getAll: (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/tickets${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      tickets: MaintenanceTicket[];
      pagination: PaginatedResponse<MaintenanceTicket>["pagination"];
    }>(url);
  },

  // Get ticket by ID
  getById: (ticketId: string) =>
    apiFetch<{ ticket: MaintenanceTicket }>(`/tickets/${ticketId}`),

  // Create ticket
  create: (data: Partial<MaintenanceTicket>) =>
    apiFetch<{ ticket: MaintenanceTicket }>("/tickets", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update ticket
  update: (ticketId: string, data: Partial<MaintenanceTicket>) =>
    apiFetch<{ updatedTicket: MaintenanceTicket }>(`/tickets/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
