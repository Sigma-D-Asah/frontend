import DashboardLayout from "@/layouts/dashboard-layout";

export default function ClaimsPage() {
  return (
    <DashboardLayout title="Claims" subtitle="All claims and workflows">
      <div className="container mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded border">Starred Claims</div>
          <div className="p-4 bg-white rounded border">In Progress</div>
          <div className="p-4 bg-white rounded border">Completed</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
