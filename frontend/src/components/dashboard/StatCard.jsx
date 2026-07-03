// ======================================================
// Component: StatCard
//
// Purpose:
// ------------------------------------------------------
// A reusable, highly flexible dashboard statistic card
// used to display key performance indicators (KPIs).
//
// This component is designed to be visually consistent
// across the dashboard while remaining fully reusable
// for different data types (students, departments, etc.)
//
// Design Philosophy:
// ------------------------------------------------------
// - Clean SaaS-style UI
// - Minimal but expressive design
// - Hover-based interactivity for modern feel
// - Responsive and resilient to browser zoom / display scaling
//
// Used In:
// ------------------------------------------------------
// Dashboard.jsx (Stat overview section)
//
// Example Use Cases:
// ------------------------------------------------------
// - Total Students
// - Active Students
// - Department Count
// - New Admissions
// ======================================================

/**
 * StatCard Component
 *
 * @param {string} title
 *   - Label displayed above the main value
 *   - Represents what metric this card is showing
 *
 * @param {number|string} value
 *   - Primary numeric/statistical value displayed prominently
 *   - Defaults to 0 for safe rendering
 *
 * @param {JSX.Element} icon
 *   - React icon element passed dynamically
 *   - Used to visually represent the metric category
 *
 * @param {string} color
 *   - Tailwind background color class
 *   - Defines icon container theme (e.g., blue, green, purple)
 */
function StatCard({
  title,
  value = 0,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
      aria-label={title}
    >
      {/* ==================================================
          MAIN LAYOUT CONTAINER
          --------------------------------------------------
          Uses flexbox to separate:
          - Left: Textual information (title + value)
          - Right: Icon container

          gap-4:
          Prevents content from touching the icon when the
          browser is zoomed or Windows display scaling is used.
          ================================================== */}
      <div className="flex items-center justify-between gap-4">
        {/* ==================================================
            LEFT SECTION (TEXT CONTENT)
            --------------------------------------------------
            flex-1:
              Allows this section to occupy available space.

            min-w-0:
              Enables truncation inside flex layouts.
            ================================================== */}
        <div className="flex-1 min-w-0">
          {/* Metric Title / Label */}
          <p
            className="
              text-sm
              font-medium
              text-slate-500
              truncate
            "
            title={title}
          >
            {title}
          </p>

          {/* Main Statistic Value */}
          <h2
            className="
              mt-1
              text-3xl
              font-bold
              text-slate-800
              truncate
            "
            title={String(value)}
          >
            {value}
          </h2>
        </div>

        {/* ==================================================
            RIGHT SECTION (ICON DISPLAY)
            --------------------------------------------------
            shrink-0:
              Prevents the icon container from shrinking when
              space becomes limited due to zoom or scaling.
            ================================================== */}
        <div
          className={`
            w-14
            h-14
            shrink-0
            rounded-2xl
            flex
            items-center
            justify-center
            text-2xl
            text-white
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;