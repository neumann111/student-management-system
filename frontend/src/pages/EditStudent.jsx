import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ======================================================
// Layout wrapper for consistent dashboard UI
import DashboardLayout from "../components/layout/DashboardLayout";

// Reusable form component used for both Add + Edit flows
import StudentForm from "../components/students/StudentForm";

// API service to fetch a single student by ID
import { getStudent } from "../services/studentService";

// ======================================================
// EditStudent Component
//
// Purpose:
// - Fetches a single student using URL param (id)
// - Loads data into StudentForm in "edit mode"
// - Displays loading state until data is ready
// ======================================================
function EditStudent() {

  // ======================================================
  // ROUTE PARAMETER
  // Extracts student ID from URL
  // Example: /students/edit/123 → id = 123
  // ======================================================
  const { id } = useParams();

  // ======================================================
  // STATE: holds selected student data
  // Initially null until API response is received
  // ======================================================
  const [student, setStudent] = useState(null);

  // ======================================================
  // EFFECT: Fetch student data when component loads
  // or when ID changes
  //
  // Flow:
  // 1. Call API getStudent(id)
  // 2. Store response in state
  // 3. Pass to StudentForm for editing
  // ======================================================
  useEffect(() => {
    (async () => {
      try {
        const response = await getStudent(id);
        setStudent(response.data);
      } catch (error) {
        // Logs API errors (network, invalid ID, server issues)
        console.error(error);
      }
    })();
  }, [id]);

  // ======================================================
  // LOADING STATE UI
  //
  // Condition:
  // - If student data is not yet loaded
  // - Show fallback screen inside dashboard layout
  //
  // NOTE:
  // This prevents rendering form with empty data
  // ======================================================
  if (!student) {
    return (
      <DashboardLayout>

        {/* ======================================================
            SIMPLE LOADING STATE
            Purpose:
            - Keeps UI consistent within dashboard layout
            - Prevents blank screen
            - Can be upgraded later to skeleton loader
        ====================================================== */}
        <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
          Loading student data...
        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* ======================================================
          PAGE HEADER
          Purpose:
          - Shows current page context
          - Helps user understand they are editing a record
          - Slightly styled for better hierarchy
      ====================================================== */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Edit Student
        </h1>

        <p className="text-slate-500 mt-2 text-sm">
          Update student details and save changes to the system.
        </p>

      </div>

      {/* ======================================================
          STUDENT FORM (EDIT MODE)
          Purpose:
          - Passes existing student data into form
          - Enables update flow instead of create flow
      ====================================================== */}
      <StudentForm
        mode="edit"
        student={student}
      />

    </DashboardLayout>
  );
}

export default EditStudent;