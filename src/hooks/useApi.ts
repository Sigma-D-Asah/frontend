import type { PaginationParams } from "@/types/api";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { machineApi } from "@/services/machines";
import { sensorApi } from "@/services/sensors";
import { predictionApi } from "@/services/predictions";
import { ticketApi } from "@/services/tickets";
import { chatApi } from "@/services/chat";
import { jobApi } from "@/services/jobs";

// ============================================
// Machine Hooks
// ============================================
export function useMachines() {
  return useQuery({
    queryKey: ["machines"],
    queryFn: machineApi.getAll,
  });
}

export function useMachine(code: string) {
  return useQuery({
    queryKey: ["machines", code],
    queryFn: () => machineApi.getByCode(code),
    enabled: !!code,
  });
}

// ============================================
// Sensor Reading Hooks
// ============================================
export function useSensorReadings(params?: PaginationParams) {
  return useQuery({
    queryKey: ["sensors", params],
    queryFn: () => sensorApi.getAll(params),
  });
}

export function useSensorReadingsByMachine(
  machineId: string,
  params?: PaginationParams,
) {
  return useQuery({
    queryKey: ["sensors", "machine", machineId, params],
    queryFn: () => sensorApi.getByMachine(machineId, params),
    enabled: !!machineId,
  });
}

export function useUnprocessedSensors() {
  return useQuery({
    queryKey: ["sensors", "unprocessed"],
    queryFn: sensorApi.getUnprocessed,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Infinite query for sensor readings
export function useInfiniteSensorReadings() {
  return useInfiniteQuery({
    queryKey: ["sensors", "infinite"],
    queryFn: ({ pageParam }) =>
      sensorApi.getAll({ cursor: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

// ============================================
// AI Prediction Hooks
// ============================================
export function usePredictions(params?: PaginationParams) {
  return useQuery({
    queryKey: ["predictions", params],
    queryFn: () => predictionApi.getAll(params),
  });
}

export function usePredictionsByMachine(
  machineId: string,
  params?: PaginationParams,
) {
  return useQuery({
    queryKey: ["predictions", "machine", machineId, params],
    queryFn: () => predictionApi.getByMachine(machineId, params),
    enabled: !!machineId,
  });
}

export function useFailurePredictions(params?: PaginationParams) {
  return useQuery({
    queryKey: ["predictions", "failures", params],
    queryFn: () => predictionApi.getFailures(params),
    refetchInterval: 60000, // Refetch every minute for critical data
  });
}

// Infinite query for predictions
export function useInfinitePredictions() {
  return useInfiniteQuery({
    queryKey: ["predictions", "infinite"],
    queryFn: ({ pageParam }) =>
      predictionApi.getAll({ cursor: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

// ============================================
// Maintenance Ticket Hooks
// ============================================
export function useTickets(params?: PaginationParams) {
  return useQuery({
    queryKey: ["tickets", params],
    queryFn: () => ticketApi.getAll(params),
  });
}

export function useTicket(ticketId: string) {
  return useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => ticketApi.getById(ticketId),
    enabled: !!ticketId,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, data }: { ticketId: string; data: any }) =>
      ticketApi.update(ticketId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({
        queryKey: ["tickets", variables.ticketId],
      });
    },
  });
}

// Infinite query for tickets
export function useInfiniteTickets() {
  return useInfiniteQuery({
    queryKey: ["tickets", "infinite"],
    queryFn: ({ pageParam }) =>
      ticketApi.getAll({ cursor: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

// ============================================
// Chat Hooks
// ============================================
export function useSendChatMessage() {
  return useMutation({
    mutationFn: chatApi.sendMessage,
  });
}

// ============================================
// Background Job Hooks
// ============================================
export function useGenerateSensors() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobApi.generateSensors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
    },
  });
}

export function useProcessReadings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobApi.processReadings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      queryClient.invalidateQueries({ queryKey: ["sensors", "unprocessed"] });
    },
  });
}
