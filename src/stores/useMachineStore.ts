import type { Machine } from "@/types/api";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MachineState {
  machines: Machine[];
  selectedMachine: Machine | null;
  isLoading: boolean;
  error: string | null;
  setMachines: (machines: Machine[]) => void;
  setSelectedMachine: (machine: Machine | null) => void;
  selectMachineByCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMachineStore = create<MachineState>()(
  devtools(
    (set, get) => ({
      machines: [],
      selectedMachine: null,
      isLoading: false,
      error: null,

      setMachines: (machines) => set({ machines }),

      setSelectedMachine: (machine) => set({ selectedMachine: machine }),

      selectMachineByCode: (code) => {
        const machine = get().machines.find((m) => m.machineCode === code);

        set({ selectedMachine: machine || null });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    { name: "MachineStore" },
  ),
);
