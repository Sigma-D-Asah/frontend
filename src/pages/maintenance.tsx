import DashboardLayout from "@/layouts/dashboard-layout";

export default function MaintenancePage() {
  return (
    <DashboardLayout title="Maintenance" subtitle="Work orders & schedules">
      <div className="container mx-auto max-w-7xl p-4">
        <p className="text-sm text-gray-500">Placeholder page for maintenance features (scheduled jobs, work orders, task lists).</p>
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">Coming soon — UI for creating maintenance tickets, scheduling, and integration with Copilot.</div>
      </div>
    </DashboardLayout>
  );
}
