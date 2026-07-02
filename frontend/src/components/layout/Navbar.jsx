/**
 * Navbar Component
 *
 * Displays:
 * - Page title
 * - Subtitle
 * - User profile section
 *
 * This is a presentational component (no state logic).
 */
function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">

      {/* Left: Page Info */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Student Management System
        </p>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold text-slate-800">
            Administrator
          </p>
          <p className="text-sm text-slate-500">
            Welcome back 👋
          </p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
          A
        </div>

      </div>

    </header>
  );
}

export default Navbar;