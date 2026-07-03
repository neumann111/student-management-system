import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ======================================================
// LAYOUT COMPONENT
// ------------------------------------------------------
// Provides consistent dashboard layout (sidebar, navbar, etc.)
// Wraps the page content inside a unified UI structure
// ======================================================
import DashboardLayout from "../components/layout/DashboardLayout";

// ======================================================
// API SERVICE
// ------------------------------------------------------
// Function to fetch a single student's details from backend
// GET /api/students/:id
// ======================================================
import { getStudent } from "../services/studentService";

function StudentDetails() {

  // ======================================================
  // ROUTE PARAMETER
  // ------------------------------------------------------
  // Extracts "id" from URL (e.g., /students/101)
  // This ID is used to fetch specific student data
  // ======================================================
  const { id } = useParams();

  // ======================================================
  // NAVIGATION HOOK
  // ------------------------------------------------------
  // Used to programmatically navigate between pages
  // Example: go back to students list or edit page
  // ======================================================
  const navigate = useNavigate();

  // ======================================================
  // STATE: STUDENT DATA
  // ------------------------------------------------------
  // Stores fetched student details from backend API
  // Initially null until API response is received
  // ======================================================
  const [student, setStudent] = useState(null);

  // ======================================================
  // SIDE EFFECT: FETCH STUDENT DATA ON LOAD
  // ------------------------------------------------------
  // Runs when component mounts or when "id" changes
  // Fetches student details from backend API
  // ======================================================
  useEffect(() => {

    (async () => {

      try {

        // API CALL: Fetch student by ID
        const response = await getStudent(id);

        // Store response data in state
        setStudent(response.data);

      } catch (error) {

        // Error handling for API failure
        console.error(error);

      }

    })();

  }, [id]);

  // ======================================================
  // LOADING STATE HANDLING
  // ------------------------------------------------------
  // While student data is not yet loaded,
  // show a loading message inside layout
  // (Upgraded to a skeleton shimmer for a more polished feel,
  // functionality/condition is unchanged)
  // ======================================================
  if (!student) {

    return (

      <DashboardLayout>

        <div className="max-w-5xl mx-auto animate-pulse">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

            <div className="h-28 bg-gradient-to-r from-slate-100 to-slate-50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-4 w-40 bg-slate-200 rounded" />
                </div>
              ))}
            </div>

          </div>

        </div>

      </DashboardLayout>

    );

  }

  // ======================================================
  // HELPER: STATUS BADGE COLOR MAPPING
  // ------------------------------------------------------
  // Purely presentational — maps a status string to a
  // color scheme for the badge. Falls back to slate for
  // any unrecognized status value.
  // ======================================================
  const statusStyles = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    inactive: "bg-rose-50 text-rose-700 ring-rose-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  };

  const statusClass =
    statusStyles[String(student.status).toLowerCase()] ||
    "bg-slate-100 text-slate-600 ring-slate-500/20";

  // ======================================================
  // HELPER: INITIALS FOR AVATAR
  // ------------------------------------------------------
  // Derives up to 2 initials from the student's name for
  // the avatar badge shown in the header.
  // ======================================================
  const initials = (student.name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  // ======================================================
  // MAIN RENDER: STUDENT DETAILS UI
  // ------------------------------------------------------
  // Displays complete information of selected student
  // ======================================================
  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* ======================================================
            MAIN CARD CONTAINER
            - White card with shadow and border styling
        ====================================================== */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 overflow-hidden">

          {/* ======================================================
              HEADER SECTION
              - Page title and subtitle
              - Upgraded with a subtle gradient backdrop, avatar
                initials badge, and a status pill for quick scanning
          ====================================================== */}
          <div className="relative px-8 py-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-b border-slate-100">

            <div className="flex items-center justify-between gap-4 flex-wrap">

              <div className="flex items-center gap-4">

                {/* AVATAR BADGE */}
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-md shadow-blue-600/20">
                  {initials || "?"}
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                    {student.name || "Student Details"}
                  </h1>

                  <p className="text-slate-500 mt-1 text-sm">
                    View complete student information.
                  </p>
                </div>

              </div>

              {/* STATUS PILL */}
              {student.status && (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${statusClass}`}
                >
                  {student.status}
                </span>
              )}

            </div>

          </div>

          {/* ======================================================
              STUDENT INFORMATION GRID
              - Displays key-value pairs in responsive grid layout
              - 1 column on mobile, 2 columns on larger screens
          ====================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-8">

            <Detail label="Student ID" value={student.id} />
            <Detail label="Student Name" value={student.name} />
            <Detail label="Email" value={student.email} />
            <Detail label="Phone" value={student.phone} />
            <Detail label="Gender" value={student.gender} />
            <Detail label="Date of Birth" value={student.dob} />
            <Detail label="Department" value={student.department} />
            <Detail label="Academic Year" value={student.year} />
            <Detail label="Status" value={student.status} />

          </div>

          {/* ======================================================
              ADDRESS + ACTION BUTTONS SECTION
          ====================================================== */}
          <div className="px-8 pb-8">

            {/* ADDRESS BLOCK */}
            <div>

              <h3 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">
                Address
              </h3>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-700 leading-relaxed">
                {student.address}
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 mt-8">

              {/* BACK BUTTON */}
              <button
                onClick={() => navigate("/students")}
                className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-150"
              >
                Back
              </button>

              {/* EDIT BUTTON */}
              <button
                onClick={() =>
                  navigate(`/students/edit/${student.id}`)
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-sm shadow-blue-600/30 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-150"
              >
                Edit Student
              </button>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}

/*
  ======================================================
  DETAIL COMPONENT (REUSABLE UI BLOCK)
  ------------------------------------------------------
  PURPOSE:
  - Displays a label-value pair in a clean format
  - Used for rendering student attributes consistently

  EXAMPLE:
    Label: "Email"
    Value: "student@example.com"
  ======================================================
*/
function Detail({ label, value }) {

  return (

    <div className="group">

      {/* FIELD LABEL */}
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </p>

      {/* FIELD VALUE */}
      <p className="mt-1.5 text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-150">
        {value || "—"}
      </p>

    </div>

  );

}

// ======================================================
// EXPORT COMPONENT
// ======================================================
export default StudentDetails;