import type {
  AIPrediction,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

import { apiFetch } from "@/lib/api";

export const predictionApi = {
  // Get all predictions with pagination
  getAll: (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/predictions${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      predictions: AIPrediction[];
      pagination: PaginatedResponse<AIPrediction>["pagination"];
    }>(url);
  },

  // Get predictions by machine
  getByMachine: (machineId: string, params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/predictions/machine/${machineId}${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      predictions: AIPrediction[];
      pagination: PaginatedResponse<AIPrediction>["pagination"];
    }>(url);
  },

  // Get only failure predictions
  getFailures: (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.cursor) queryParams.set("cursor", params.cursor);

    const url = `/predictions/failures${queryParams.toString() ? `?${queryParams}` : ""}`;

    return apiFetch<{
      success: boolean;
      predictions: AIPrediction[];
      pagination: PaginatedResponse<AIPrediction>["pagination"];
      count: number;
    }>(url);
  },

  // Get prediction by ID
  getById: (predictionId: string) =>
    apiFetch<{ prediction: AIPrediction }>(`/predictions/${predictionId}`),
};
