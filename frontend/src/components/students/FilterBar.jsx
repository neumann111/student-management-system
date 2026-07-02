// ======================================================
// Component: FilterBar
//
// Purpose:
// ------------------------------------------------------
// Provides filtering and sorting controls for the
// Students page.
//
// This component allows users to:
// - Filter students by department
// - Filter students by status (Active / Inactive)
// - Sort students by name or department
//
// Why this exists:
// ------------------------------------------------------
// Instead of embedding filter logic UI inside the page,
// we isolate it into a reusable and maintainable component.
//
// Design Philosophy:
// ------------------------------------------------------
// - Clean form-like UI controls
// - Controlled components (state lifted to parent)
// - Fully reusable and scalable filtering system
// ======================================================


/**
 * FilterBar Component
 *
 * This is a controlled UI component.
 * All values and setters are passed from parent (Students.jsx)
 * to keep state centralized and predictable.
 *
 * @param {Array<string>} departments
 *   - List of unique departments for dropdown options
 *
 * @param {string} departmentFilter
 *   - Currently selected department filter value
 *
 * @param {Function} setDepartmentFilter
 *   - Updates selected department filter
 *
 * @param {string} statusFilter
 *   - Currently selected student status filter
 *
 * @param {Function} setStatusFilter
 *   - Updates selected status filter
 *
 * @param {string} sortBy
 *   - Current sorting rule (nameAsc, nameDesc, department)
 *
 * @param {Function} setSortBy
 *   - Updates sorting preference
 */
function FilterBar({
  departments,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) {
  return (
    /**
     * Main container
     * --------------------------------------------------
     * Uses flex layout to allow responsive wrapping.
     * On smaller screens, filters wrap automatically.
     */
    <div className="flex flex-wrap gap-4">

      {/* ==================================================
          DEPARTMENT FILTER
          --------------------------------------------------
          Allows filtering students based on their department.
          Options are dynamically generated from backend data.
          ================================================== */}
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
      >
        <option value="">All Departments</option>

        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      {/* ==================================================
          STATUS FILTER
          --------------------------------------------------
          Filters students based on academic status:
          - Active
          - Inactive
          ================================================== */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* ==================================================
          SORTING CONTROL
          --------------------------------------------------
          Defines ordering of student list:
          - Name (A-Z)
          - Name (Z-A)
          - Department
          ================================================== */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-300 bg-white"
      >
        <option value="">Sort By</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="department">Department</option>
      </select>

    </div>
  );
}

export default FilterBar;