import { useEffect, useState } from "react";

// ======================================================
// Layout wrapper for consistent dashboard structure
import DashboardLayout from "../components/layout/DashboardLayout";

// Reusable UI components for student management
import SearchBar from "../components/students/SearchBar";
import FilterBar from "../components/students/FilterBar";
import StudentTable from "../components/students/StudentTable";

// Router hook for navigation actions
import { useNavigate } from "react-router-dom";

// API service to fetch students from backend
import { getStudents } from "../services/studentService";

// ======================================================
// Students Page Component
//
// Purpose:
// - Displays full list of students
// - Supports search, filter, sort
// - Handles navigation to Add Student page
// - Passes processed data to StudentTable
// ======================================================
function Students() {

  // ======================================================
  // STATE: All students fetched from backend
  // This is the base dataset used for filtering/searching
  // ======================================================
  const [students, setStudents] = useState([]);

  // ======================================================
  // STATE: Search input value
  // Filters students by name or ID
  // ======================================================
  const [searchTerm, setSearchTerm] = useState("");

  // ======================================================
  // STATE: Department filter
  // Filters students by selected department
  // ======================================================
  const [departmentFilter, setDepartmentFilter] = useState("");

  // ======================================================
  // STATE: Status filter (Active / Inactive)
  // ======================================================
  const [statusFilter, setStatusFilter] = useState("");

  // ======================================================
  // STATE: Sorting option
  // Controls alphabetical / department sorting
  // ======================================================
  const [sortBy, setSortBy] = useState("");

  // Router navigation instance
  const navigate = useNavigate();

  // ======================================================
  // FUNCTION: Refresh students from backend
  // Used after delete or update operations
  // ======================================================
  const refreshStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================================
  // EFFECT: Load students on page mount
  // Purpose:
  // - Initial data fetch
  // - Populates table on first render
  // ======================================================
  useEffect(() => {
    (async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // ======================================================
  // DERIVED DATA: Unique departments list
  //
  // Purpose:
  // - Used in filter dropdown
  // - Set removes duplicates automatically
  // ======================================================
  const departments = [
    ...new Set(students.map((student) => student.department)),
  ];

  // ======================================================
  // FILTERING LOGIC (SEARCH + FILTERS)
  //
  // Step 1: Search filter (name or ID match)
  // Step 2: Department filter
  // Step 3: Status filter
  // ======================================================
  let filteredStudents = students
    .filter((student) => {
      const search = searchTerm.toLowerCase();

      return (
        student.name.toLowerCase().includes(search) ||
        student.id.toLowerCase().includes(search)
      );
    })
    .filter((student) =>
      departmentFilter ? student.department === departmentFilter : true
    )
    .filter((student) =>
      statusFilter ? student.status === statusFilter : true
    );

  // ======================================================
  // SORTING LOGIC
  //
  // Controls ordering of filtered results
  // ======================================================

  // Sort A → Z by name
  if (sortBy === "nameAsc") {
    filteredStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  // Sort Z → A by name
  if (sortBy === "nameDesc") {
    filteredStudents.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // Sort by department name
  if (sortBy === "department") {
    filteredStudents.sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  }

  return (
    <DashboardLayout>

      {/* ======================================================
          PAGE CONTAINER
          Purpose:
          - Wraps all page content in vertical layout
          - Adds spacing between sections
      ====================================================== */}
      <div className="flex flex-col gap-7">

        {/* ======================================================
            HEADER SECTION
            Purpose:
            - Page title + description
            - Action button (Add Student)
            - Responsive layout (stack → row)
        ====================================================== */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

          {/* TITLE BLOCK */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Students
            </h1>

            <p className="text-slate-500 mt-1 text-sm">
              Manage, search, and organize all student records efficiently.
            </p>
          </div>

          {/* ADD STUDENT BUTTON */}
          <button
            onClick={() => navigate("/students/add")}

            // Polished button styling (hover + smooth transition)
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition
                       text-white px-5 py-3 rounded-xl font-medium shadow-sm"
          >
            + Add Student
          </button>

        </div>

        {/* ======================================================
            SEARCH BAR COMPONENT
            Purpose:
            - Filters students by name or ID
        ====================================================== */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* ======================================================
            FILTER + SORT BAR
            Purpose:
            - Department filter
            - Status filter
            - Sorting options
        ====================================================== */}
        <FilterBar
          departments={departments}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* ======================================================
            STUDENT TABLE
            Purpose:
            - Displays final filtered + sorted data
            - Handles delete/update via refreshStudents()
        ====================================================== */}
        <StudentTable
          students={filteredStudents}
          refreshStudents={refreshStudents}
        />

      </div>
    </DashboardLayout>
  );
}

export default Students;