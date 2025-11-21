// Home page: dashboard widgets & chatbot placeholder
import { mockMachineData, mockSensorData } from "@/services/mock-data";

import DashboardLayout from "@/layouts/dashboard-layout";
import { Input } from "@heroui/input";

export default function HomePage() {
  return (
    <DashboardLayout title="Home" subtitle="Overview & Copilot">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-4">Machine Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockMachineData.map((machine) => (
              <div key={machine.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{machine.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{machine.id}</p>
                <p className="mt-2">
                  Status:
                  <span className={`font-bold ${
                    machine.status === 'critical' ? 'text-red-500' :
                    machine.status === 'warning' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {machine.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Live Sensor Trends (T-102)</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-[300px]">
            <p className="text-center text-gray-500">[Placeholder untuk Grafik Suhu & Getaran]</p>
            <pre className="mt-4 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">
              {JSON.stringify(mockSensorData, null, 2)}
            </pre>
          </div>
        </section>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-4">Agentic Copilot</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm">
                <span className="font-bold text-blue-600">Copilot:</span> Selamat datang! Ada yang bisa saya bantu?
              </p>
            </div>
            <Input placeholder="Tanya sesuatu ke Copilot..." className="w-full" />
          </div>
        </section>
      </div>
    </div>
    </DashboardLayout>
  );
}
