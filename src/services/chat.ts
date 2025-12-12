import type { ChatMessage, ChatResponse } from "@/types/api";

import { apiFetch } from "@/lib/api";

export const chatApi = {
  // Send message to AI agent
  sendMessage: (data: ChatMessage) =>
    apiFetch<ChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Stream chat (for future implementation)
  // streamMessage: (data: ChatMessage) => { ... }
};
