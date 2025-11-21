import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <main className="container mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold mb-4">Predictive Maintenance Copilot</h1>
      <p className="text-sm text-gray-600 mb-6">Welcome — the main application is the Dashboard. Click below to go to the dashboard.</p>
      <Link to="/dashboard" className="px-4 py-2 bg-slate-900 text-white rounded">Go to Dashboard</Link>
    </main>
  );
}
