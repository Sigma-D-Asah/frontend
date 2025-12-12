import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";

import DashboardLayout from "@/layouts/dashboard-layout";
import { useMachines } from "@/hooks/useApi";

export default function HomePage() {
  const { data: machinesData, isLoading } = useMachines();
  const machines = machinesData?.allMachines || [];

  return (
    <DashboardLayout subtitle="Overview & Copilot" title="Home">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-4">Status Mesin</h3>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner label="Memuat data mesin..." />
              </div>
            ) : machines.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-gray-500 text-center py-8">
                    Belum ada data mesin. Tambahkan mesin untuk mulai
                    monitoring.
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {machines.map((machine) => (
                  <Card key={machine.machineId} className="shadow-md">
                    <CardBody>
                      <h4 className="font-bold text-lg">{machine.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {machine.code}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm">Health Score:</span>
                        <Chip
                          color={
                            (machine.metadata?.healthScore ?? 0) >= 80
                              ? "success"
                              : (machine.metadata?.healthScore ?? 0) >= 60
                                ? "warning"
                                : "danger"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {machine.metadata?.healthScore ?? 0}%
                        </Chip>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {machine.location}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-4">Agentic Copilot</h3>
              <div className="flex flex-col space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm">
                    <span className="font-bold text-blue-600">Copilot:</span>{" "}
                    Selamat datang! Ada yang bisa saya bantu?
                  </p>
                </div>
                <Input
                  className="w-full"
                  placeholder="Tanya sesuatu ke Copilot..."
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
