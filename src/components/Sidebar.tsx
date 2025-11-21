import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiFileText, FiUsers, FiTool, FiBarChart, FiMenu } from 'react-icons/fi';
import { Button } from "@heroui/button";
import accentureLogo from "@/assets/logo-accenture.svg";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col transition-all duration-200 ${
        collapsed ? 'w-20' : 'w-64'
      } bg-white text-gray-900 border-r border-gray-200 sticky top-12`}
    >
      <div className={`h-16 flex items-center border-b border-gray-200 ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src={accentureLogo} alt="Accenture" className="h-6 w-auto" />
          </div>
        )}
        <Button
          aria-label="Toggle sidebar"
          onPress={() => setCollapsed((s) => !s)}
          variant="light"
          radius="full"
          size="sm"
          className={collapsed ? "mx-auto" : ""}
          startContent={<FiMenu className="h-4 w-4" />}
        >
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="px-1 text-xs text-gray-400 uppercase tracking-wider mb-2">
          {!collapsed && 'My Dashboard'}
        </div>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900 border-l-2 border-indigo-600'
                : 'hover:bg-gray-50'
            }`
          }
        >
          <FiHome className="h-4 w-4 text-gray-500" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <div className="mt-3 px-1 text-xs text-gray-400 uppercase tracking-wider mb-2">
          {!collapsed && 'My Claims'}
        </div>

        <NavLink
          to="/claims"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900 border-l-2 border-indigo-600'
                : 'hover:bg-gray-50'
            }`
          }
        >
          <FiFileText className="h-4 w-4 text-gray-500" />
          {!collapsed && <span>All Claims</span>}
        </NavLink>

        <div className="mt-3 px-1 text-xs text-gray-400 uppercase tracking-wider mb-2">
          {!collapsed && 'Groups'}
        </div>
        <div className="flex flex-col gap-2">
          <NavLink to="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"><FiUsers className="h-4 w-4 text-gray-500" />{!collapsed && <span>Smart Group A</span>}</NavLink>
          <NavLink to="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"><FiUsers className="h-4 w-4 text-gray-500" />{!collapsed && <span>Smart Group B</span>}</NavLink>
        </div>

        <NavLink
          to="/maintenance"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900 border-l-2 border-indigo-600'
                : 'hover:bg-gray-50'
            }`
          }
        >
          <FiTool className="h-4 w-4 text-gray-500" />
          {!collapsed && <span>Maintenance</span>}
        </NavLink>

        <NavLink
          to="/reporting"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900 border-l-2 border-indigo-600'
                : 'hover:bg-gray-50'
            }`
          }
        >
          <FiBarChart className="h-4 w-4 text-gray-500" />
          {!collapsed && <span>Reporting</span>}
        </NavLink>

      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
        {!collapsed && <div>v1.0 · Predictive Maintenance</div>}
      </div>
    </aside>
  );
}

export default Sidebar;
