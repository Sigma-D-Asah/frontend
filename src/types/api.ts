// ============================================
// Machine Types
// ============================================
export interface Machine {
  machineId: string;
  code: string;
  name: string;
  type: "L" | "M" | "H";
  location?: string;
  status: "ACTIVE" | "MAINTENANCE" | "DECOMMISSIONED";
  metadata?: Record<string, any>;
  createdAt: string;
}

// ============================================
// Sensor Reading Types
// ============================================
export interface SensorReading {
  readingId: string;
  machineId: string;
  airTemperatureK: number;
  processTemperatureK: number;
  rotationalSpeedRpm: number;
  torqueNm: number;
  toolWearMin: number;
  isProcessed: boolean;
  processedAt?: string;
  timestamp: string;
}

// ============================================
// AI Prediction Types
// ============================================
export interface AIPrediction {
  predictionId: string;
  readingId: string;
  machineId: string;
  isFailure: boolean;
  failureType: string | null;
  confidenceScore: number;
  explanationData?: Record<string, any>;
  naturalLanguageReason?: string;
  createdAt: string;
}

// ============================================
// Maintenance Ticket Types
// ============================================
export interface MaintenanceTicket {
  ticketId: string;
  ticketNumber: number;
  machineId: string;
  predictionId?: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  aiRecommendation?: string;
  createdAt: string;
  updatedAt?: string;
}

// ============================================
// Pagination Types
// ============================================
export interface PaginationMeta {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

// Alternative response format (some endpoints use different structure)
export interface ApiResponse<T> {
  success?: boolean;
  [key: string]: T | any; // readings, predictions, tickets, etc.
  pagination?: PaginationMeta;
}

// ============================================
// Chat Types
// ============================================
export interface ChatMessage {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    response: string;
    conversationId: string;
  };
}

// Extended chat message for UI state management (Zustand)
export interface ChatMessageUI {
  role: "user" | "assistant";
  content: string;
  conversationId?: string;
  timestamp?: string;
}

// ============================================
// Query Parameters
// ============================================
export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

// ============================================
// Background Job Types
// ============================================
export interface ProcessResult {
  total: number;
  successful: number;
  failed: number;
  results: Array<{
    success: boolean;
    readingId?: string;
    machineId?: string;
    error?: string;
  }>;
}
