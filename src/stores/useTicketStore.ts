import type { MaintenanceTicket } from "@/types/api";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TicketState {
  tickets: MaintenanceTicket[];
  selectedTicket: MaintenanceTicket | null;
  isLoading: boolean;
  error: string | null;
  setTickets: (tickets: MaintenanceTicket[]) => void;
  setSelectedTicket: (ticket: MaintenanceTicket | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTicketStore = create<TicketState>()(
  devtools(
    (set) => ({
      tickets: [],
      selectedTicket: null,
      isLoading: false,
      error: null,

      setTickets: (tickets) => set({ tickets }),

      setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    { name: "TicketStore" },
  ),
);
