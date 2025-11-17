import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { mockMachineData, mockSensorData } from '../services/mock-data';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Predictive Maintenance Copilot - Accenture" },
    { name: "description", content: "Predictive Maintenance Dashboard" },
  ];
}

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Kolom Utama (Kiri) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Kartu Status Mesin */}
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

        {/* 2. Grafik Sensor */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Live Sensor Trends (T-102)</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-[300px]">
            {/* INI ADALAH PLACEHOLDER UNTUK REACT CHARTS */}
            <p className="text-center text-gray-500">[Placeholder untuk Grafik Suhu & Getaran]</p>
            <pre className="mt-4 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">
              {JSON.stringify(mockSensorData, null, 2)}
            </pre>
          </div>
        </section>

      </div>

      {/* Kolom Samping (Kanan) */}
      <div className="lg:col-span-1 space-y-6">

        {/* 3. Antarmuka Chatbot [cite: 87] */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Agentic Copilot</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm">
                <span className="font-bold text-blue-600">Copilot:</span> Selamat datang! Ada yang bisa saya bantu?
              </p>
              <p className="text-sm mt-2">
                <span className="font-bold text-blue-600">Copilot:</span> Saya mendeteksi <span className="text-yellow-500">Warning</span> di <span className="font-medium">Mesin 2 (T-102)</span>.
              </p>
            </div>
            <input 
              type="text" 
              placeholder="Tanya sesuatu ke Copilot..." 
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </section>
        
      </div>

    </div>
  );
}
