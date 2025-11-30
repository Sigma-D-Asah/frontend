import DashboardLayout from "@/layouts/dashboard-layout";
import { mockMachineData } from "@/services/mock-data";
import { Button } from "@heroui/button";
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFileText, FiStar } from "react-icons/fi";

export default function ClaimsPage() {
  // Mapping Data Mesin ke Kategori Klaim:
  // Critical -> Masuk ke "Starred Claims" (Prioritas Tinggi)
  // Warning  -> Masuk ke "In Progress"
  // Normal   -> Masuk ke "Completed"
  const starredClaims = mockMachineData.filter(m => m.status === 'critical');
  const inProgressClaims = mockMachineData.filter(m => m.status === 'warning');
  const completedClaims = mockMachineData.filter(m => m.status === 'normal');

  return (
    <DashboardLayout title="Claims Management" subtitle="Track and manage maintenance tickets">
      <div className="container mx-auto max-w-7xl p-6">
        
        {/* Summary Cards (Opsional: Statistik Cepat) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-full"><FiStar size={24}/></div>
                <div>
                    <div className="text-2xl font-bold">{starredClaims.length}</div>
                    <div className="text-sm text-gray-500">Starred Claims</div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><FiClock size={24}/></div>
                <div>
                    <div className="text-2xl font-bold">{inProgressClaims.length}</div>
                    <div className="text-sm text-gray-500">In Progress</div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full"><FiCheckCircle size={24}/></div>
                <div>
                    <div className="text-2xl font-bold">{completedClaims.length}</div>
                    <div className="text-sm text-gray-500">Completed</div>
                </div>
            </div>
        </div>

        {/* Kanban Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          
          {/* Column 1: Starred Claims (Critical Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">Starred Claims</h3>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">{starredClaims.length}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
                {starredClaims.map(machine => (
                    <div key={machine.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 dark:text-gray-100">{machine.name}</span>
                            <FiStar className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                            <FiFileText size={10}/> ID: {machine.id} • {machine.location}
                        </p>
                        <div className="text-xs text-gray-600 dark:text-gray-300 bg-red-50 dark:bg-red-900/10 p-2 rounded mb-3 border border-red-100 dark:border-red-900/20">
                            <strong>Rec:</strong> {machine.recommendation}
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-xs text-gray-400 font-mono">Risk: {machine.riskScore}%</span>
                            <Button size="sm" color="danger" variant="solid" className="text-xs h-7 min-w-0 px-3">Process</Button>
                        </div>
                    </div>
                ))}
                {starredClaims.length === 0 && <div className="text-center text-gray-400 text-sm py-10">No starred claims</div>}
            </div>
          </div>

          {/* Column 2: In Progress (Warning Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">In Progress</h3>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">{inProgressClaims.length}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
                {inProgressClaims.map(machine => (
                    <div key={machine.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 dark:text-gray-100">{machine.name}</span>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase font-bold">WIP</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{machine.id} • {machine.location}</p>
                        
                        {/* List Alerts Kecil */}
                        <div className="flex flex-col gap-1 mb-3">
                            {machine.alerts.map((alert, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-[10px] text-gray-500">
                                    <span className="w-1 h-1 rounded-full bg-yellow-500"></span> {alert}
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-xs text-gray-400">Op: {machine.operator}</span>
                            <Button size="sm" variant="flat" className="text-xs h-7 min-w-0 px-3">Details</Button>
                        </div>
                    </div>
                ))}
                 {inProgressClaims.length === 0 && <div className="text-center text-gray-400 text-sm py-10">No active tasks</div>}
            </div>
          </div>

          {/* Column 3: Completed (Normal Machines) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">Completed</h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">{completedClaims.length}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl min-h-[500px] space-y-4 border border-gray-100 dark:border-gray-800">
                {completedClaims.map(machine => (
                    <div key={machine.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-l-green-500 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                         <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 dark:text-gray-100">{machine.name}</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase font-bold">Done</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{machine.id}</p>
                        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                            <FiCheckCircle size={14}/> Maintenance Complete
                        </div>
                    </div>
                ))}
                 {completedClaims.length === 0 && <div className="text-center text-gray-400 text-sm py-10">No history</div>}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}