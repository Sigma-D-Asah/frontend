import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

import DashboardLayout from "@/layouts/dashboard-layout";
import {
  useMachines,
  useFailurePredictions,
  useUnprocessedSensors,
} from "@/hooks/useApi";

export default function DashboardPage() {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null,
  );

  const { data: machinesData, isLoading: machinesLoading } = useMachines();
  const { data: failuresData } = useFailurePredictions({ limit: 10 });
  const { data: unprocessedData } = useUnprocessedSensors();

  const machines = machinesData?.allMachines || [];
  const failures = failuresData?.predictions || [];
  const unprocessedCount = unprocessedData?.readings?.length || 0;

  const selectedMachine =
    machines.find((m) => m.machineId === selectedMachineId) || machines[0];

  const getStatusColor = (
    type: string,
  ): "danger" | "warning" | "success" | "default" => {
    switch (type) {
      case "H":
        return "danger";
      case "M":
        return "warning";
      case "L":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (type: string) => {
    switch (type) {
      case "H":
        return "High Risk";
      case "M":
        return "Medium Risk";
      case "L":
        return "Low Risk";
      default:
        return type;
    }
  };

  if (machinesLoading) {
    return (
      <DashboardLayout subtitle="Loading data..." title="Dashboard">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center p-12">
            <Spinner label="Memuat data mesin..." size="lg" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (machines.length === 0) {
    return (
      <DashboardLayout subtitle="No machines found" title="Dashboard">
        <div className="container mx-auto max-w-7xl">
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Belum ada data mesin. Silakan tambahkan mesin untuk memulai
                  monitoring.
                </p>
                <p className="text-sm text-gray-400">
                  Gunakan API endpoint POST /api/v1/machines untuk menambahkan
                  mesin baru.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const isHighRisk = selectedMachine?.type === "H";
  const isMediumRisk = selectedMachine?.type === "M";

  return (
    <DashboardLayout
      subtitle={`${selectedMachine?.location || "Unknown"} · ${selectedMachine?.name || "Unknown"}`}
      title={`Investigation ${selectedMachine?.code || ""}`}
    >
      <div className="container mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Machine Overview Card */}
            <Card>
              <CardBody className="p-6">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-500 uppercase">
                      Health Score
                    </div>
                    <div className="text-4xl font-extrabold mt-1 text-blue-600">
                      {selectedMachine?.metadata?.healthScore || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Machine Type:{" "}
                      {getStatusLabel(selectedMachine?.type || "L")}
                    </div>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-lg border flex flex-col items-end ${
                      isHighRisk
                        ? "bg-red-50 border-red-100 text-red-700"
                        : isMediumRisk
                          ? "bg-yellow-50 border-yellow-100 text-yellow-700"
                          : "bg-green-50 border-green-100 text-green-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-lg">
                      {isHighRisk ? (
                        <FiAlertTriangle />
                      ) : isMediumRisk ? (
                        <FiAlertTriangle />
                      ) : (
                        <FiCheckCircle />
                      )}
                      {getStatusLabel(
                        selectedMachine?.type || "L",
                      ).toUpperCase()}
                    </div>
                    <div className="text-xs opacity-80 mt-1">
                      Status: {selectedMachine?.status || "ACTIVE"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Code</div>
                    <div className="font-semibold">
                      {selectedMachine?.code || "-"}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="font-semibold">
                      {selectedMachine?.location || "-"}
                    </div>
                  </div>
                  {selectedMachine?.metadata?.manufacturer && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">
                        Manufacturer
                      </div>
                      <div className="font-semibold">
                        {selectedMachine.metadata.manufacturer}
                      </div>
                    </div>
                  )}
                  {selectedMachine?.metadata?.model && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Model</div>
                      <div className="font-semibold">
                        {selectedMachine.metadata.model}
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Failure Predictions */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FiAlertTriangle className="text-red-500" />
                  Prediksi Kegagalan Aktif
                </h3>
                {failures.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Tidak ada prediksi kegagalan saat ini
                  </p>
                ) : (
                  <div className="space-y-3">
                    {failures.slice(0, 5).map((prediction) => (
                      <div
                        key={prediction.predictionId}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">
                              Machine:{" "}
                              {machines.find(
                                (m) => m.machineId === prediction.machineId,
                              )?.code || prediction.machineId}
                            </h4>
                            {prediction.failureType && (
                              <p className="text-sm text-gray-600">
                                Tipe: {prediction.failureType}
                              </p>
                            )}
                          </div>
                          <Chip
                            color={prediction.isFailure ? "danger" : "success"}
                            size="sm"
                            variant="flat"
                          >
                            {prediction.isFailure ? "Kegagalan" : "Normal"}
                          </Chip>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            Confidence:{" "}
                            {((prediction.confidenceScore || 0) * 100).toFixed(
                              1,
                            )}
                            %
                          </span>
                          <span className="text-gray-400">
                            {new Date(prediction.createdAt).toLocaleDateString(
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

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Total Machines
                    </span>
                    <span className="text-2xl font-bold">
                      {machines.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Active Failures
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      {failures.filter((f) => f.isFailure).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Unprocessed Data
                    </span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {unprocessedCount}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Machine List */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-bold mb-4">Monitored Assets</h3>
                <div className="space-y-3">
                  {machines.map((machine) => {
                    const machineStatus = getStatusLabel(machine.type);

                    return (
                      <div
                        key={machine.machineId}
                        className={`p-3 rounded-lg border cursor-pointer transition ${
                          selectedMachine?.machineId === machine.machineId
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                            : "hover:border-gray-400"
                        }`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedMachineId(machine.machineId)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedMachineId(machine.machineId);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-sm">
                            {machine.name}
                          </div>
                          <Chip
                            color={getStatusColor(machine.type)}
                            size="sm"
                            variant="dot"
                          >
                            {machineStatus}
                          </Chip>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {machine.code}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Health</span>
                          <span className="text-sm font-bold">
                            {machine.metadata?.healthScore || "N/A"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
