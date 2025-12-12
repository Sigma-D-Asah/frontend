import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import type { ChatMessage, ChatMessageUI } from "@/types/api";

import DashboardLayout from "@/layouts/dashboard-layout";
import {
  useTickets,
  useCreateTicket,
  useSendChatMessage,
  useFailurePredictions,
} from "@/hooks/useApi";
import { useChatStore } from "@/stores/useChatStore";

export default function MaintenancePage() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, conversationId, addMessage, setConversationId } =
    useChatStore();

  const { data: ticketsData, isLoading: ticketsLoading } = useTickets({
    limit: 10,
  });
  const { data: failuresData } = useFailurePredictions({ limit: 5 });
  const createTicketMutation = useCreateTicket();
  const sendMessageMutation = useSendChatMessage();

  const tickets = ticketsData?.tickets || [];
  const failures = failuresData?.predictions || [];

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

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "primary";
      case "in-progress":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const getTicketStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Terbuka";
      case "in-progress":
        return "Dalam Proses";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Tinggi";
      case "medium":
        return "Sedang";
      case "low":
        return "Rendah";
      default:
        return priority;
    }
  };

  return (
    <DashboardLayout subtitle="Manajemen & AI Copilot" title="Maintenance">
      <div className="container mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tickets & Predictions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Failure Predictions */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-xl font-bold">Prediksi Kegagalan Aktif</h2>
              </CardHeader>
              <CardBody>
                {failures.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Tidak ada prediksi kegagalan saat ini
                  </p>
                ) : (
                  <div className="space-y-3">
                    {failures.map((prediction) => (
                      <div
                        key={prediction.predictionId}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {prediction.machineId}
                            </h3>
                            {prediction.failureType && (
                              <p className="text-sm text-gray-600">
                                Tipe Kegagalan: {prediction.failureType}
                              </p>
                            )}
                          </div>
                          <Chip
                            color={
                              prediction.isFailure ? "danger" : "success"
                            }
                            size="sm"
                            variant="flat"
                          >
                            {prediction.isFailure
                              ? "Kegagalan"
                              : "Normal"}
                          </Chip>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            Confidence:{" "}
                            {((prediction.confidenceScore || 0) * 100).toFixed(1)}%
                          </span>
                          <span className="text-gray-400">
                            {new Date(
                              prediction.createdAt,
                            ).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Maintenance Tickets */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl font-bold">Tiket Maintenance</h2>
                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => {
                      /* TODO: Open create ticket modal */
                    }}
                  >
                    Buat Tiket Baru
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {ticketsLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner label="Memuat tiket..." />
                  </div>
                ) : tickets.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada tiket maintenance
                  </p>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.ticketId}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{ticket.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {ticket.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Chip
                              color={getPriorityColor(ticket.priority)}
                              size="sm"
                              variant="flat"
                            >
                              {getPriorityLabel(ticket.priority)}
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
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>Mesin: {ticket.machineId}</span>
                          <span>
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "id-ID",
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
              <CardHeader className="pb-3">
                <div className="w-full">
                  <h2 className="text-xl font-bold">AI Maintenance Copilot</h2>
                  <p className="text-sm text-gray-500">
                    Tanyakan tentang kondisi mesin dan rekomendasi perawatan
                  </p>
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
                      onKeyPress={handleKeyPress}
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
      </div>
    </DashboardLayout>
  );
}
