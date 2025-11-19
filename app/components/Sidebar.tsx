import { NavLink } from "react-router-dom";
// Kita akan tambahkan ikon dari library (mis: Lucide-React dari Shadcn) nanti

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-950 border-r dark:border-gray-800">
      <div className="h-16 flex items-center px-6 border-b dark:border-gray-800">
        <h1 className="text-xl font-bold text-blue-700 dark:text-blue-500">PdM Copilot</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {/* React Router NavLink */}
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          {/* ikon Dashboard */}
          <span>Dashboard</span>
        </NavLink>
        {/* Link lain (mis: Maintenance, Reporting) akan ditambah di sini */}
      </nav>
    </div>
  );
}