
import DashboardLayout from "../components/layout/DashboardLayout";
import StudentForm from "../components/students/StudentForm";

// ======================================================
// AddStudent Page Component
//
// Purpose:
// - Provides a page for creating a new student
// - Uses reusable DashboardLayout for consistent app UI
// - Uses StudentForm in "add mode"
// ======================================================
function AddStudent() {
  return (
    // ======================================================
    // DASHBOARD LAYOUT WRAPPER
    //
    // Purpose:
    // - Ensures this page inherits sidebar/header layout
    // - Keeps UI consistent across all dashboard pages
    // ======================================================
    <DashboardLayout>

      {/* ======================================================
          PAGE HEADER SECTION
          Purpose:
          - Displays page title + description
          - Helps user understand current action context
          - Styled for hierarchy (title > subtitle)
      ====================================================== */}
      <div className="mb-8">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Add Student
        </h1>

        {/* PAGE DESCRIPTION / CONTEXT TEXT */}
        <p className="text-slate-500 mt-2 text-sm">
          Register a new student in the system. Fill in all required details below.
        </p>

      </div>

      {/* ======================================================
          STUDENT FORM COMPONENT
          Purpose:
          - Reusable form used for both ADD and EDIT operations
          - mode="add" ensures:
              → empty form state
              → submit triggers "create student" API
      ====================================================== */}
      <StudentForm mode="add" />

    </DashboardLayout>
  );
}

export default AddStudent;