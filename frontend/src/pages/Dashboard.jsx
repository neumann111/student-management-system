import { useEffect, useState } from "react";

// ======================================================
// Layout wrapper
// Provides consistent dashboard structure (sidebar/header)
import DashboardLayout from "../components/layout/DashboardLayout";

// Dashboard UI components
import StatCard from "../components/dashboard/StatCard";
import RecentStudents from "../components/dashboard/RecentStudents";

// Icons used in stat cards (visual indicators for metrics)
import {
  FaUserGraduate,
  FaUserCheck,
  FaUserTimes,
  FaBuilding,
  FaUserPlus,
} from "react-icons/fa";

// API service for fetching student data
import { getStudents } from "../services/studentService";

// ======================================================
// Dashboard Component
// Purpose:
// - Displays system-wide student analytics
// - Shows stats, recent activity, and overview summary
// ======================================================
function Dashboard() {

  // ======================================================
  // STATE: students list from backend API
  // This is the single source of truth for dashboard metrics
  // ======================================================
  const [students, setStudents] = useState([]);

  // ======================================================
  // EFFECT: Fetch students once on component mount
  // Purpose:
  // - Load all student data from backend
  // - Populate dashboard metrics dynamically
  // ======================================================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        // Error handling for API failure (network/server issues)
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  // ======================================================
  // DERIVED METRICS (computed from students array)
  // These values automatically update when students change
  // ======================================================

  // Total number of students in system
  const totalStudents = students.length;

  // Number of active students
  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  // Number of inactive students
  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  // Number of unique departments
  // Set removes duplicates automatically
  const departments = new Set(
    students.map((student) => student.department)
  ).size;

  // Latest 20 students (recent activity feed)
  const recentStudents = students.slice(-20);

  return (
    <DashboardLayout>

      {/* ======================================================
          DASHBOARD HEADER SECTION
          Purpose:
          - Provides context of page
          - Shows system status + overview title
          - Styled with gradient for modern SaaS feel
      ====================================================== */}
      <div className="mb-4">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-md">

          <div className="flex flex-col md:flex-row justify-between items-center">

            {/* LEFT SIDE: Title + description */}
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Student Overview
              </h1>

              <p className="mt-0.5 text-xs font-semibold text-blue-100">
                Monitor student activity, admissions, and academic records in real time.
              </p>
            </div>

            {/* RIGHT SIDE: System status badge */}
            <div className="mt-3 md:mt-0">

              <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-center">

                <p className="text-xs font-bold text-blue-100">
                  System Status
                </p>

                <p className="text-sm font-bold">
                  Active
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          STATISTICS GRID SECTION
          Purpose:
          - Displays key metrics in visual cards
          - Responsive grid adjusts per screen size
      ====================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

        {/* Total Students Card */}
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<FaUserGraduate />}
          color="bg-blue-600"
        />

        {/* Active Students Card */}
        <StatCard
          title="Active Students"
          value={activeStudents}
          icon={<FaUserCheck />}
          color="bg-green-600"
        />

        {/* Inactive Students Card */}
        <StatCard
          title="Inactive Students"
          value={inactiveStudents}
          icon={<FaUserTimes />}
          color="bg-red-600"
        />

        {/* Departments Card */}
        <StatCard
          title="Departments"
          value={departments}
          icon={<FaBuilding />}
          color="bg-orange-500"
        />

        {/* New Admissions Card */}
        <StatCard
          title="New Admissions"
          value={recentStudents.length}
          icon={<FaUserPlus />}
          color="bg-purple-600"
        />

      </div>

      {/* ======================================================
          RECENT STUDENTS SECTION
          Purpose:
          - Displays latest 20 students
          - Acts as quick activity feed
      ====================================================== */}
      <RecentStudents students={recentStudents} />

    </DashboardLayout>
  );
}

// Export component for routing usage
export default Dashboard;