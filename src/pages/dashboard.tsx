import DashboardLayout from "@/layouts/dashboard-layout";
import { Button } from "@heroui/button";
import { mockMachineData } from "@/services/mock-data";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Investigation 900192" subtitle="Power · Region 1">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-start gap-6">
          {/* Main Column */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start gap-4">
                <div className="text-left">
                  <div className="text-xl text-gray-500">Risk Score</div>
                  <div className="text-3xl font-bold text-red-500">86%</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-2 p-4 bg-gray-50 dark:bg-gray-900 rounded">
                  <h3 className="text-lg font-semibold mb-3">Monthly Consumption</h3>
                  <div className="h-40 bg-white dark:bg-gray-800 rounded border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                    [Chart placeholder]
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="px-2 py-0.5 text-xs bg-gray-100 rounded text-gray-800">In Progress (1 of 4)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="font-semibold mt-1">In Progress</div>
                    </div>
                    <div>
                      <Button size="sm" className="px-3 py-1" variant="solid" style={{backgroundColor: '#16a34a', color: 'white'}}>Finalize Claim</Button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <div className="leading-relaxed">Recommendation: Generate field investigation, review alerts, check attachments, provide feedback</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold">Claimant Information</h4>
                  <div className="text-sm mt-2 text-gray-600">John Doe</div>
                  <div className="text-xs text-gray-400 mt-1">Avg. Monthly Billed Unit • City</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold">3 Alerts</h4>
                  <ul className="mt-2 text-sm text-gray-500 space-y-2">
                    <li>Tariff category change twice: <span className="font-bold text-amber-600">40</span></li>
                    <li>Meter stolen at least once: <span className="font-bold text-rose-600">9</span></li>
                    <li>Service/load reduction done at least once: <span className="font-bold text-slate-500">5</span></li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                  <h4 className="font-semibold">Incident Details</h4>
                  <div className="text-sm text-gray-500 mt-2">6th Ave, C/o John Doe, New York</div>
                </div>
              </div>
            </div>

            {/* Machine cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockMachineData.map((m) => (
                <div key={m.id} className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">{m.id}</div>
                      <div className="font-semibold text-lg">{m.name}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${m.status === 'critical' ? 'bg-red-100 text-red-600' : m.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {m.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Last checked: {new Date(m.lastCheck).toLocaleString()}</div>
                </div>
              ))}
            </section>

          </div>

          {/* Right column */}
          <aside className="w-80">
            <div className="sticky top-20 space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 shadow">
                <div className="text-sm text-gray-500">Actions</div>
                <div className="mt-3 flex flex-col gap-2">
                  <Button className="w-full text-left" variant="light">Review Alerts</Button>
                  <Button className="w-full text-left" variant="light">Assess Risk Level</Button>
                  <Button className="w-full text-left" variant="light">Provide Feedback</Button>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 shadow">
                <h4 className="font-semibold">Attachments</h4>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
