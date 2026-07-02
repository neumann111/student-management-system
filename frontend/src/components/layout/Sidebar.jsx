import { NavLink } from "react-router-dom";
import { FaChartPie, FaUserGraduate } from "react-icons/fa";

/**
 * Sidebar Component
 *
 * Left navigation panel for the system.
 * Uses NavLink for active route styling.
 */
function Sidebar() {

  /**
   * Dynamic class generator for navigation links.
   * - Active: highlighted blue
   * - Inactive: muted gray with hover effect
   */
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col shadow-xl">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          🎓 EduTrack
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Student Management System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink to="/" className={linkStyle}>
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink to="/students" className={linkStyle}>
          <FaUserGraduate />
          Students
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-slate-800">
        <p className="text-slate-400 text-xs">Logged in as</p>
        <p className="text-white font-semibold">
          Administrator
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;