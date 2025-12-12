import { Button, Card, CardBody } from "@heroui/react";
import { FiCheckCircle, FiClock, FiFileText, FiStar } from "react-icons/fi";

import DashboardLayout from "@/layouts/dashboard-layout";
import { useTickets } from "@/hooks/useApi";

export default function ClaimsPage() {
  const { data: ticketsData } = useTickets({ limit: 100 });
  const tickets = ticketsData?.tickets || [];

  // Since no auth system, all tickets are "my claims"
  // Starred = HIGH or CRITICAL priority tickets
  const starredTickets = tickets.filter(
    (t) => t.priority === "HIGH" || t.priority === "CRITICAL",
  );
  const inProgressTickets = tickets.filter(
    (t) => t.status === "IN_PROGRESS" || t.status === "ASSIGNED",
  );
  const completedTickets = tickets.filter(
    (t) => t.status === "RESOLVED" || t.status === "CLOSED",
  );

  return (
    <DashboardLayout
      subtitle="Track and manage maintenance tickets"
      title="Claims Management"
    >
      <div className="container mx-auto max-w-7xl p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FiStar size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {starredTickets.length}
                </div>
                <div className="text-sm text-gray-500">Prioritas Tinggi</div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                <FiClock size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {inProgressTickets.length}
                </div>
                <div className="text-sm text-gray-500">Dalam Proses</div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <FiCheckCircle size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {completedTickets.length}
                </div>
                <div className="text-sm text-gray-500">Selesai</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Kanban Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Column 1: Starred Claims (Critical Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Starred Claims
              </h3>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                {starredTickets.length}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
              {starredTickets.map((machine: any) => (
                <div
                  key={machine.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 border-l-2 border-l-red-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {machine.name}
                    </span>
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <FiFileText size={10} /> ID: {machine.id} •{" "}
                    {machine.location}
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-300 bg-red-50 dark:bg-red-900/10 p-2 rounded mb-3 border border-red-100 dark:border-red-900/20">
                    <strong>Rec:</strong> {machine.recommendation}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-400 font-mono">
                      Risk: {machine.riskScore}%
                    </span>
                    <Button
                      className="text-xs h-7 min-w-0 px-3"
                      color="danger"
                      size="sm"
                      variant="solid"
                    >
                      Process
                    </Button>
                  </div>
                </div>
              ))}
              {starredTickets.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-10">
                  No starred claims
                </div>
              )}
            </div>
          </div>

          {/* Column 2: In Progress (Warning Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                In Progress
              </h3>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">
                {inProgressTickets.length}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
              {inProgressTickets.map((machine: any) => (
                <div
                  key={machine.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 border-l-2 border-l-yellow-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {machine.name}
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase font-bold">
                      WIP
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {machine.id} • {machine.location}
                  </p>

                  {/* List Alerts Kecil */}
                  <div className="flex flex-col gap-1 mb-3">
                    {machine.alerts?.map((alert: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-[10px] text-gray-500"
                      >
                        <span className="w-1 h-1 rounded-full bg-yellow-500" />{" "}
                        {alert}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-400">
                      Op: {machine.operator}
                    </span>
                    <Button
                      className="text-xs h-7 min-w-0 px-3"
                      size="sm"
                      variant="flat"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              {inProgressTickets.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-10">
                  No active tasks
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Completed (Normal Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Completed
              </h3>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                {completedTickets.length}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
              {completedTickets.map((machine: any) => (
                <div
                  key={machine.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 border-l-2 border-l-green-500 shadow-sm opacity-80 hover:opacity-100 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800 dark:text-gray-100">
                      {machine.name}
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase font-bold">
                      Done
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{machine.id}</p>
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                    <FiCheckCircle size={14} /> Maintenance Complete
                  </div>
                </div>
              ))}
              {completedTickets.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-10">
                  No history
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
