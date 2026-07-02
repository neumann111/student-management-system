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
  // ======================================================
  if (!student) {

    return (

      <DashboardLayout>

        <div className="text-center mt-20">
          Loading...
        </div>

      </DashboardLayout>

    );

  }

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
        <div className="bg-white rounded-2xl shadow-md border border-slate-100">

          {/* ======================================================
              HEADER SECTION
              - Page title and subtitle
          ====================================================== */}
          <div className="border-b px-8 py-6">

            <h1 className="text-3xl font-bold text-slate-800">
              Student Details
            </h1>

            <p className="text-slate-500 mt-1">
              View complete student information.
            </p>

          </div>

          {/* ======================================================
              STUDENT INFORMATION GRID
              - Displays key-value pairs in responsive grid layout
              - 1 column on mobile, 2 columns on larger screens
          ====================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

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

              <h3 className="font-semibold text-slate-700 mb-2">
                Address
              </h3>

              <div className="bg-slate-50 rounded-xl p-4">
                {student.address}
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 mt-8">

              {/* BACK BUTTON */}
              <button
                onClick={() => navigate("/students")}
                className="px-6 py-3 border rounded-xl"
              >
                Back
              </button>

              {/* EDIT BUTTON */}
              <button
                onClick={() =>
                  navigate(`/students/edit/${student.id}`)
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-xl"
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

    <div>

      {/* FIELD LABEL */}
      <p className="text-sm text-slate-500">
        {label}
      </p>

      {/* FIELD VALUE */}
      <p className="mt-2 text-lg font-semibold text-slate-800">
        {value}
      </p>

    </div>

  );

}

// ======================================================
// EXPORT COMPONENT
// ======================================================
export default StudentDetails;