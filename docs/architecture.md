# Frontend React Query + Zustand Architecture

## Penjelasan Folder `src/services/api/`

Folder `services/api/` berisi **API client modules** yang bertanggung jawab untuk komunikasi dengan backend API. Ini BUKAN mock data, melainkan fungsi-fungsi real yang melakukan HTTP requests ke backend.

### Struktur:

```
src/
├── services/
│   └── api/              # API client layer
│       ├── machines.ts   # Machine CRUD operations
│       ├── sensors.ts    # Sensor readings API
│       ├── predictions.ts # AI predictions API
│       ├── tickets.ts    # Maintenance tickets API
│       ├── chat.ts       # Chatbot integration
│       └── jobs.ts       # Background jobs trigger
├── hooks/
│   └── useApi.ts         # React Query hooks (useQuery/useMutation)
├── stores/
│   ├── useMachineStore.ts    # Machine global state (Zustand)
│   ├── usePredictionStore.ts # Prediction state
│   ├── useTicketStore.ts     # Ticket state
│   └── useChatStore.ts       # Chat state with persistence
├── lib/
│   ├── api.ts            # Base API fetch utility
│   └── queryClient.ts    # TanStack Query configuration
└── types/
    └── api.ts            # TypeScript types for all entities

```

## Alur Data Flow

```
Component → useApi Hook → TanStack Query → API Service → Backend
                                ↓
                          Zustand Store (global state)
```

### Contoh Penggunaan:

**1. Fetching data dengan React Query:**
```tsx
import { useMachines } from "@/hooks/useApi";

const { data, isLoading } = useMachines();
const machines = data?.machines || [];
```

**2. Menggunakan Zustand untuk global state:**
```tsx
import { useChatStore } from "@/stores/useChatStore";

const { messages, addMessage, conversationId } = useChatStore();
```

**3. Mutation (Create/Update):**
```tsx
import { useCreateTicket } from "@/hooks/useApi";

const createTicket = useCreateTicket();
await createTicket.mutateAsync({
  title: "Urgent maintenance",
  machineCode: "MCH-001",
  priority: "high"
});
```

## Perbedaan Services vs Stores

| **services/api/** | **stores/** |
|-------------------|-------------|
| HTTP communication | Global state management |
| API calls ke backend | In-memory state |
| Tidak menyimpan state | Persist state dengan localStorage |
| Pure functions | Reactive state dengan Zustand |

## Environment Variables

File `.env.example`:
```bash
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_ENV=development
```

## Mock Data Sudah Dihapus

File `services/mock-data.ts` **sudah dihapus**. Semua pages sekarang menggunakan:
- ✅ Real API data dari backend
- ✅ TanStack Query untuk caching & fetching
- ✅ Zustand untuk global state management

---

**Kesimpulan:** Folder `services/api/` adalah **API client** yang wajib ada untuk berkomunikasi dengan backend. Jangan dihapus!
