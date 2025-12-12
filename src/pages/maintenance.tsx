import type { ChatMessage, ChatMessageUI } from "@/types/api";

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Chip,
  Spinner,
  Input,
  Card,
  CardBody,
  CardHeader,
  addToast,
} from "@heroui/react";

import DashboardLayout from "@/layouts/dashboard-layout";
import {
  useTickets,
  useSendChatMessage,
  useCreateTicket,
} from "@/hooks/useApi";
import { useChatStore } from "@/stores/useChatStore";
import { CreateTicketModal } from "@/components/CreateTicketModal";

export default function MaintenancePage() {
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    conversationId,
    addMessage,
    setConversationId,
    clearMessages,
  } = useChatStore();

  const { data: ticketsData, isLoading: ticketsLoading } = useTickets({
    limit: 10,
  });
  const sendMessageMutation = useSendChatMessage();
  const createTicketMutation = useCreateTicket();

  const tickets = ticketsData?.tickets || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessageUI: ChatMessageUI = {
      role: "user",
      content: input,
      conversationId: conversationId || undefined,
    };

    addMessage(userMessageUI);
    setInput("");

    try {
      const apiMessage: ChatMessage = {
        message: input,
        conversationId: conversationId || undefined,
      };

      const response = await sendMessageMutation.mutateAsync(apiMessage);

      if (response.data.conversationId && !conversationId) {
        setConversationId(response.data.conversationId);
      }

      const assistantMessage: ChatMessageUI = {
        role: "assistant",
        content: response.data.response,
        conversationId: response.data.conversationId,
      };

      addMessage(assistantMessage);
    } catch (error) {
      const errorMessage: ChatMessageUI = {
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Maaf, terjadi kesalahan. Silakan coba lagi.",
      };

      addMessage(errorMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateTicket = async (data: any) => {
    try {
      await createTicketMutation.mutateAsync(data);
      setIsModalOpen(false);
    } catch (error) {
      addToast({
        title: "Gagal Membuat Tiket",
        description:
          error instanceof Error
            ? error.message
            : "Gagal membuat tiket. Silakan coba lagi.",
        color: "danger",
      });
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "primary";
      case "ASSIGNED":
        return "secondary";
      case "IN_PROGRESS":
        return "warning";
      case "RESOLVED":
        return "success";
      case "CLOSED":
        return "default";
      default:
        return "default";
    }
  };

  const getTicketStatusLabel = (status: string) => {
    switch (status) {
      case "OPEN":
        return "Terbuka";
      case "ASSIGNED":
        return "Ditugaskan";
      case "IN_PROGRESS":
        return "Dalam Proses";
      case "RESOLVED":
        return "Terselesaikan";
      case "CLOSED":
        return "Ditutup";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "danger";
      case "HIGH":
        return "danger";
      case "MEDIUM":
        return "warning";
      case "LOW":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout
      subtitle="Automated maintenance ticketing & chatbot"
      title="Maintenance"
    >
      <div className="container mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tickets & Predictions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Maintenance Tickets */}
            <Card>
              <CardHeader className="pb-3 px-6 pt-6">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl font-bold">Maintenance Ticketing</h2>
                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => setIsModalOpen(true)}
                  >
                    Buat Tiket Baru
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                {ticketsLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner label="Memuat tiket..." />
                  </div>
                ) : tickets.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada Maintenance Ticketing
                  </p>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.ticketId}
                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold">{ticket.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {ticket.description}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0 ml-3">
                            <Chip
                              color={getPriorityColor(ticket.priority)}
                              size="sm"
                              variant="flat"
                            >
                              {ticket.priority.toUpperCase()}
                            </Chip>
                            <Chip
                              color={getTicketStatusColor(ticket.status)}
                              size="sm"
                              variant="flat"
                            >
                              {getTicketStatusLabel(ticket.status)}
                            </Chip>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <span>Mesin: {ticket.machineId}</span>
                          <span className="text-xs">
                            {new Date(ticket.createdAt).toLocaleString(
                              "id-ID",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Column - AI Copilot Chat */}
          <div className="lg:col-span-1">
            <Card className="h-[800px] flex flex-col">
              <CardHeader className="pb-3 px-6 pt-6">
                <div className="w-full flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      Maintenance Copilot with AI
                    </h2>
                    <p className="text-sm text-gray-500">
                      Tanyakan tentang kondisi mesin dan rekomendasi perawatan
                    </p>
                  </div>
                  {messages.length > 0 && (
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      onPress={clearMessages}
                    >
                      Clear Chat
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody className="flex-1 flex flex-col overflow-hidden p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                      <svg
                        className="w-16 h-16 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <p className="text-sm">
                        Mulai percakapan dengan AI Copilot
                      </p>
                      <p className="text-xs mt-2">
                        Contoh: &quot;Apa rekomendasi untuk mesin MCH-001?&quot;
                      </p>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      {sendMessageMutation.isPending && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <Spinner size="sm" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      disabled={sendMessageMutation.isPending}
                      placeholder="Ketik pesan Anda..."
                      size="sm"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyUp={handleKeyPress}
                    />
                    <Button
                      color="primary"
                      isDisabled={!input.trim()}
                      isLoading={sendMessageMutation.isPending}
                      size="sm"
                      onPress={handleSendMessage}
                    >
                      Kirim
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Maks 10 pesan/menit, 50 pesan/hari
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Create Ticket Modal */}
        <CreateTicketModal
          isLoading={createTicketMutation.isPending}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTicket}
        />
      </div>
    </DashboardLayout>
  );
}
