import type { ChatMessageUI } from "@/types/api";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ChatState {
  messages: ChatMessageUI[];
  conversationId: string;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: ChatMessageUI) => void;
  setMessages: (messages: ChatMessageUI[]) => void;
  setConversationId: (id: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        conversationId: "",
        isLoading: false,
        error: null,

        addMessage: (message) =>
          set((state) => ({ messages: [...state.messages, message] })),

        setMessages: (messages) => set({ messages }),

        setConversationId: (id) => set({ conversationId: id }),

        clearMessages: () => set({ messages: [], conversationId: "" }),

        setLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),
      }),
      {
        name: "chat-storage",
        partialize: (state) => ({
          messages: state.messages,
          conversationId: state.conversationId,
        }),
      },
    ),
    { name: "ChatStore" },
  ),
);
