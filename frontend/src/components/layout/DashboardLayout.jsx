// Import Sidebar component
// Left navigation panel for the dashboard system
import Sidebar from "./Sidebar";

// Import Navbar component
// Top header showing page title + user info
import Navbar from "./Navbar";

/**
 * DashboardLayout Component
 *
 * This is the main layout wrapper used across all pages.
 * It ensures consistent structure:
 *
 *  ┌──────── Sidebar ────────┬──────── Navbar ─────────┐
 *  │                         │                         │
 *  │                         │     Page Content        │
 *  │                         │                         │
 *  └─────────────────────────┴─────────────────────────┘
 *
 * Benefits:
 * - Reusable layout
 * - Consistent UI
 * - Centralized styling
 */
function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar (fixed navigation) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">

        {/* Top navbar */}
        <Navbar />

        {/* Page content wrapper */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;