import type { AIPrediction } from "@/types/api";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PredictionState {
  predictions: AIPrediction[];
  failurePredictions: AIPrediction[];
  isLoading: boolean;
  error: string | null;
  setPredictions: (predictions: AIPrediction[]) => void;
  setFailurePredictions: (predictions: AIPrediction[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePredictionStore = create<PredictionState>()(
  devtools(
    (set) => ({
      predictions: [],
      failurePredictions: [],
      isLoading: false,
      error: null,

      setPredictions: (predictions) => set({ predictions }),

      setFailurePredictions: (predictions) =>
        set({ failurePredictions: predictions }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    { name: "PredictionStore" },
  ),
);
