import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

/**
 * Top app bar that matches the reference layout in the provided screenshot
 */
function TopBar() {
  return (
    <div className="w-full bg-gray-900 text-gray-100 h-12 flex items-center justify-between px-6 border-b border-gray-800">
      <div className="text-sm font-semibold">Accenture Analytics Applications Platform</div>
      <div className="text-sm text-gray-300">Predictive Maintenance Copilot</div>
    </div>
  );
}

export default function DashboardLayout({ children, title, subtitle }: { children?: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex-col">
      <TopBar />

      {/* Main row: sidebar + content area */}
      <div className="flex-1 flex" style={{ minHeight: 'calc(100vh - 48px)' }}>
        <Sidebar />

        {/* Right area: header + page content */}
        <div className="flex-1 flex flex-col">
          {/* page header (dynamic) — pages can pass title/subtitle to change this */}
          <Header title={title} subtitle={subtitle} />
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            {/* If used as nested route, render Outlet, else render children */}
            {children ?? <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}
