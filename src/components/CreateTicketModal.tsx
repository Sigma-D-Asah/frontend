import type { MaintenanceTicket } from "@/types/api";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";

import { useMachines } from "@/hooks/useApi";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<MaintenanceTicket>) => void;
  machineId?: string;
  isLoading?: boolean;
}

export function CreateTicketModal({
  isOpen,
  onClose,
  onSubmit,
  machineId,
  isLoading,
}: CreateTicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("MEDIUM");
  const [machine, setMachine] = useState(machineId || "");
  const { data: machinesData } = useMachines();
  const machines = machinesData?.allMachines || [];

  const handleSubmit = () => {
    if (!title.trim() || !machine) return;

    onSubmit({
      machineId: machine,
      title: title.trim(),
      description: description.trim() || undefined,
      priority: priority as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      status: "OPEN",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    if (!machineId) setMachine("");
  };

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl font-bold">Buat Tiket Maintenance Baru</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {!machineId && (
              <Select
                required
                label="Pilih Mesin"
                placeholder="Pilih mesin yang memerlukan maintenance"
                selectedKeys={machine ? [machine] : []}
                onSelectionChange={(keys) =>
                  setMachine(Array.from(keys)[0] as string)
                }
              >
                {machines.map((m) => (
                  <SelectItem key={m.machineId}>
                    {m.code} - {m.name}
                  </SelectItem>
                ))}
              </Select>
            )}

            <Input
              required
              label="Judul Tiket"
              placeholder="Contoh: Maintenance Rutin Mesin CNC"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              label="Deskripsi"
              maxRows={5}
              minRows={3}
              placeholder="Deskripsikan masalah atau pekerjaan maintenance yang diperlukan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              label="Prioritas"
              selectedKeys={[priority]}
              onSelectionChange={(keys) =>
                setPriority(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="low">Rendah</SelectItem>
              <SelectItem key="medium">Sedang</SelectItem>
              <SelectItem key="high">Tinggi</SelectItem>
              <SelectItem key="critical">Kritis</SelectItem>
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button
            color="primary"
            isDisabled={!title.trim() || !machine}
            isLoading={isLoading}
            onPress={handleSubmit}
          >
            Buat Tiket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
