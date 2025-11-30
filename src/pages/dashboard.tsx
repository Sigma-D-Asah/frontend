import { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Button } from "@heroui/button";
import { mockMachineData, mockSensorData } from "@/services/mock-data";
import SensorChart from "@/components/charts/SensorChart";
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiActivity, FiUser, FiZap, FiThermometer, FiCpu } from 'react-icons/fi';

export default function DashboardPage() {
  // Default pilih T-103 (Critical) agar user langsung melihat contoh kasus
  const [selectedMachineId, setSelectedMachineId] = useState<string>('T-103');

  const currentChartData = mockSensorData[selectedMachineId] || [];
  
  // Mengambil data lengkap mesin yang dipilih
  const machine = mockMachineData.find(m => m.id === selectedMachineId)!;

  // Helper boolean untuk menentukan styling
  const isAnomaly = machine.status === 'critical';
  const isWarning = machine.status === 'warning';
  
  // Menentukan warna chart dinamis
  const chartColor = isAnomaly ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';

  return (
    <DashboardLayout title={`Investigation ${machine.id}`} subtitle={`${machine.location} · ${machine.name}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          
          {/* --- KOLOM KIRI (UTAMA) --- */}
          <div className="flex-1 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-100 dark:border-gray-700">
              
              {/* Header: Risk Score & Status Badge */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-500 uppercase">Anomaly Risk Score</div>
                  <div className={`text-4xl font-extrabold mt-1 ${
                      isAnomaly ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {machine.riskScore}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Based on vibration & temp sensors</div>
                </div>
                
                {/* Status Badge Besar */}
                <div className={`px-4 py-2 rounded-lg border flex flex-col items-end ${
                    isAnomaly ? 'bg-red-50 border-red-100 text-red-700' : 
                    isWarning ? 'bg-yellow-50 border-yellow-100 text-yellow-700' : 
                    'bg-green-50 border-green-100 text-green-700'
                }`}>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        {isAnomaly ? <FiAlertTriangle /> : isWarning ? <FiInfo /> : <FiCheckCircle />}
                        {machine.status.toUpperCase()}
                    </div>
                    <div className="text-xs opacity-80 mt-1">Last check: {new Date(machine.lastCheck).toLocaleTimeString()}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* --- CHART SECTION --- */}
                <div className="col-span-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiActivity /> Live Sensor Trend
                    </h3>
                  </div>
                  <SensorChart data={currentChartData} color={chartColor} />
                </div>

                {/* --- AI RECOMMENDATION & ACTION --- */}
                <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FiCpu /> AI Analysis
                    </h4>
                    <div className={`p-3 rounded-lg text-sm leading-relaxed mb-4 ${
                        isAnomaly ? 'bg-red-50 text-red-800 border border-red-100' : 
                        isWarning ? 'bg-yellow-50 text-yellow-800 border border-yellow-100' : 
                        'bg-green-50 text-green-800 border border-green-100'
                    }`}>
                        <span className="font-bold">Recommendation:</span><br/>
                        {machine.recommendation}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="text-xs text-gray-500">Suggested Action:</div>
                     <Button 
                        className={`w-full font-medium shadow-sm ${
                            isAnomaly ? 'bg-red-600 text-white' : 
                            isWarning ? 'bg-yellow-600 text-white' :
                            'bg-gray-800 text-white'
                        }`}
                     >
                        {isAnomaly ? 'Create Urgent Ticket' : isWarning ? 'Schedule Inspection' : 'View Log'}
                     </Button>
                  </div>
                </div>
              </div>

              {/* --- INFO DETAIL MESIN (DINAMIS) --- */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card 1: Operator Info */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
                    <FiUser className="text-gray-400"/> Operator
                  </h4>
                  <div className="text-sm font-medium">{machine.operator}</div>
                  <div className="text-xs text-gray-500 mt-1">Shift Pagi • {machine.location}</div>
                </div>

                {/* Card 2: Technical Specs */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-3">
                    <FiActivity className="text-gray-400"/> Technical Specs
                  </h4>
                  <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><FiZap size={10}/> Voltage</span> 
                        <span className="font-mono font-bold bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{machine.technicalSpecs.voltage}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><FiActivity size={10}/> Vibration</span> 
                        <span className="font-mono font-bold bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{machine.technicalSpecs.vibration}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="flex items-center gap-1"><FiThermometer size={10}/> Temp</span> 
                        <span className="font-mono font-bold bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{machine.technicalSpecs.temperature}</span>
                    </li>
                  </ul>
                </div>

                {/* Card 3: Active Alerts (Hanya muncul jika ada alert) */}
                <div className={`p-4 rounded-lg border ${
                    machine.alerts.length > 0 
                    ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30' 
                    : 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30'
                }`}>
                  <h4 className={`font-semibold text-sm flex items-center gap-2 mb-2 ${
                      machine.alerts.length > 0 ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {machine.alerts.length > 0 ? <FiAlertTriangle/> : <FiCheckCircle/>} 
                    {machine.alerts.length > 0 ? `${machine.alerts.length} Active Alerts` : 'System Healthy'}
                  </h4>
                  
                  {machine.alerts.length > 0 ? (
                      <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                        {machine.alerts.map((alert, idx) => (
                            <li key={idx} className="leading-snug">{alert}</li>
                        ))}
                      </ul>
                  ) : (
                      <div className="text-xs text-green-700 leading-snug">
                          All systems nominal. No maintenance required at this time.
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- LIST MESIN (SELECTOR) --- */}
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Monitored Assets (Select to View)</h3>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockMachineData.map((m) => (
                <div 
                    key={m.id} 
                    onClick={() => setSelectedMachineId(m.id)}
                    className={`
                        cursor-pointer transition-all duration-200 p-4 rounded-xl border shadow-sm relative overflow-hidden group
                        ${selectedMachineId === m.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'
                        }
                    `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{m.id}</span>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        m.status === 'critical' ? 'bg-red-100 text-red-700' : 
                        m.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                    }`}>
                      {m.status}
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{m.name}</div>
                  <div className="flex items-center justify-between mt-3">
                     <div className="text-xs text-gray-500">Risk Score</div>
                     <div className={`text-sm font-bold ${
                         m.riskScore > 80 ? 'text-red-600' : m.riskScore > 50 ? 'text-yellow-600' : 'text-green-600'
                     }`}>{m.riskScore}%</div>
                  </div>
                  {/* Indikator bar kecil di bawah */}
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full ${
                             m.riskScore > 80 ? 'bg-red-500' : m.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${m.riskScore}%` }} 
                      />
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* --- KOLOM KANAN (SIDEBAR) --- */}
          <aside className="w-full lg:w-80">
            <div className="sticky top-20 space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</div>
                <div className="flex flex-col gap-2">
                  <Button className="w-full justify-start text-gray-700 dark:text-gray-200" variant="ghost" size="sm">Download Report</Button>
                  <Button className="w-full justify-start text-gray-700 dark:text-gray-200" variant="ghost" size="sm">Contact Operator</Button>
                  <Button className="w-full justify-start text-red-600 hover:bg-red-50" variant="ghost" size="sm">Emergency Stop</Button>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="font-semibold text-sm mb-3">Attachments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-xs text-gray-400">IMG_0{i}.jpg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}