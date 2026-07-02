import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addStudent,
  updateStudent,
  getDepartments,
} from "../../services/studentService";

function StudentForm({ mode = "add", student = null }) {
  const navigate = useNavigate();

  // =========================
  // UI STATE: loading flag for submit button
  // Prevents double submission + shows "Saving..."
  // =========================
  const [loading, setLoading] = useState(false);

  // =========================
  // DATA STATE: list of departments from backend API
  // Used in dropdown select field
  // =========================
  const [departments, setDepartments] = useState([]);

  // =========================
  // TOAST STATE: shows success/error messages
  // show → controls visibility
  // message → text content
  // type → success | error (affects color)
  // =========================
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // =========================
  // FORM STATE: controlled form (React manages input values)
  // If "student" exists → edit mode prefill happens later
  // =========================
  const [formData, setFormData] = useState(
    student || {
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      dob: "",
      department: "",
      year: "1st Year",
      address: "",
      status: "Active",
    }
  );

  // =========================
  // UI STYLE CONSTANTS
  // Prevents repeating long Tailwind classes everywhere
  // Improves readability and maintainability
  // =========================
  const inputClass =
    "w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  const labelClass =
    "block text-sm font-medium text-slate-700 mb-2";

  // =========================
  // EFFECT: LOAD STUDENT DATA (EDIT MODE ONLY)
  // Runs when:
  // - mode changes
  // - student ID changes
  //
  // Purpose:
  // Pre-fills form when editing an existing student
  // =========================
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        if (mode === "edit" && student) {
          setFormData({
            id: student.id || "",
            name: student.name || "",
            email: student.email || "",
            phone: student.phone || "",
            gender: student.gender || "Male",
            dob: student.dob || "",
            department: student.department || "",
            year: student.year || "1st Year",
            address: student.address || "",
            status: student.status || "Active",
          });
        }
      } catch (error) {
        // Defensive logging for debugging API or prop issues
        console.error(error);
      }
    };

    loadStudentData();
  }, [mode, student?.id]);

  // =========================
  // EFFECT: FETCH DEPARTMENTS (ONE TIME ON MOUNT)
  // Used for dropdown selection
  // =========================
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDepartments();
  }, []);

  // =========================
  // HANDLER: Update form state dynamically
  // Works for ALL inputs using name attribute
  //
  // Example:
  // name="email" → updates formData.email
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // TOAST HELPER FUNCTION
  // Shows message for 3 seconds then auto-hides
  // Used for success / error feedback
  // =========================
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // =========================
  // FORM SUBMIT HANDLER
  // Handles BOTH:
  // - Add Student (POST)
  // - Update Student (PUT)
  //
  // Flow:
  // 1. Prevent page refresh
  // 2. Enable loading state
  // 3. Call API
  // 4. Show toast
  // 5. Redirect after delay
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "add") {
        await addStudent(formData);
        showToast("Student added successfully!", "success");
      } else {
        await updateStudent(formData.id, formData);
        showToast("Student updated successfully!", "success");
      }

      // Small delay so user sees toast before redirect
      setTimeout(() => {
        navigate("/students");
      }, 1200);
    } catch (error) {
      // Show backend error message if available
      showToast(
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-10 px-4">

      {/* =========================
          TOAST NOTIFICATION
          Floating message box (top-right)
      ========================= */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white z-50
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      {/* =========================
          MAIN FORM CONTAINER (CARD UI)
          - centered layout
          - soft shadow
          - rounded corners
          ========================= */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-lg border border-slate-100 p-10"
      >

        {/* =========================
            GRID SECTION (RESPONSIVE FORM FIELDS)
            - 1 column mobile
            - 2 columns desktop
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ===================== ID ===================== */}
          <div>
            <label className={labelClass}>Student ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={mode === "edit"} // ID should not change in edit mode
              className={inputClass + " disabled:bg-slate-100"}
            />
          </div>

          {/* ===================== NAME ===================== */}
          <div>
            <label className={labelClass}>Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* ===================== EMAIL ===================== */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* ===================== PHONE ===================== */}
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* ===================== GENDER ===================== */}
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* ===================== DOB ===================== */}
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* ===================== DEPARTMENT ===================== */}
          <div>
            <label className={labelClass}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* ===================== ACADEMIC YEAR ===================== */}
          <div>
            <label className={labelClass}>Academic Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={inputClass}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>

        {/* ===================== ADDRESS ===================== */}
        <div className="mt-6">
          <label className={labelClass}>Address</label>
          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* ===================== STATUS ===================== */}
        <div className="mt-6">
          <label className={labelClass}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* =========================
            ACTION BUTTONS
            - Cancel → navigate back
            - Submit → API call
        ========================= */}
        <div className="flex justify-end gap-4 mt-10">

          <button
            type="button"
            onClick={() => navigate("/students")}
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : mode === "add"
              ? "Save Student"
              : "Update Student"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default StudentForm;
