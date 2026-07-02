

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";
import { deleteStudent } from "../../services/studentService";

// ======================================================
// StudentTable Component
// Purpose:
// Displays a paginated list of students with actions:
// - View
// - Edit
// - Delete
//
// No business logic changed — only UI + readability improved
// ======================================================
function StudentTable({ students, refreshStudents }) {
  const navigate = useNavigate();

  // =========================
  // DELETE MODAL STATE
  // Controls modal visibility + selected student
  // =========================
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // =========================
  // PAGINATION STATE
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Total number of pages based on data size
  const totalPages = Math.ceil(students.length / itemsPerPage) || 1;

  // Ensures page never exceeds available pages (safe fallback)
  const safeCurrentPage =
    currentPage > totalPages ? totalPages : currentPage;

  // Calculates starting index for current page
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  // Slice data for pagination
  const paginatedStudents = students.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =========================
  // OPEN DELETE MODAL
  // Stores selected student for deletion confirmation
  // =========================
  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  // =========================
  // DELETE HANDLER
  // Calls backend delete API
  // Then refreshes list and resets pagination
  // =========================
  const handleDelete = async () => {
    try {
      await deleteStudent(selectedStudent.id);

      setShowDeleteModal(false);

      // Refresh parent data after deletion
      await refreshStudents();

      // Reset to page 1 to avoid empty page issues
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* ======================================================
          TABLE CONTAINER (CARD STYLE)
          - Soft shadow
          - Rounded corners
          - Clean border
      ====================================================== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">

        {/* ======================================================
            TABLE WRAPPER
            Purpose:
            - Card container for table
            - Adds rounded corners, shadow, border
            - Keeps UI clean like a dashboard panel
        ====================================================== */}
        <div className="overflow-x-auto">

          {/* ======================================================
              TABLE ELEMENT
              Purpose:
              - Displays student list in structured format
              - text-base increases readability slightly (important UX upgrade)
          ====================================================== */}
          <table className="min-w-full text-base">

            {/* ======================================================
                TABLE HEADER (COLUMN TITLES)
                Purpose:
                - Defines structure of data columns
                - Slightly larger font (text-sm) improves clarity
                - Uppercase styling improves hierarchy
            ====================================================== */}
            <thead className="bg-slate-50 text-slate-700 uppercase text-sm tracking-wide">

              <tr>

                {/* ID COLUMN */}
                <th className="px-6 py-5 text-left">
                  ID
                </th>

                {/* NAME COLUMN */}
                <th className="px-6 py-5 text-left">
                  Name
                </th>

                {/* DEPARTMENT COLUMN */}
                <th className="px-6 py-5 text-left">
                  Department
                </th>

                {/* YEAR COLUMN */}
                <th className="px-6 py-5 text-left">
                  Year
                </th>

                {/* STATUS COLUMN */}
                <th className="px-6 py-5 text-left">
                  Status
                </th>

                {/* ACTIONS COLUMN */}
                <th className="px-6 py-5 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            {/* ======================================================
                TABLE BODY
                Purpose:
                - Dynamically renders student rows
                - Each row represents one student record
            ====================================================== */}
            <tbody>

              {paginatedStudents.map((student) => (

                <tr
                  key={student.id}

                  // Row hover effect improves UX clarity
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  {/* =========================
                      STUDENT ID CELL
                      - Slightly muted text color for hierarchy
                  ========================= */}
                  <td className="px-6 py-5 text-slate-600">
                    {student.id}
                  </td>

                  {/* =========================
                      STUDENT NAME CELL
                      - Bold + slightly larger text for emphasis
                      - Helps users quickly scan names
                  ========================= */}
                  <td className="px-6 py-5 font-semibold text-slate-800 text-[1.05rem]">
                    {student.name}
                  </td>

                  {/* =========================
                      DEPARTMENT CELL
                  ========================= */}
                  <td className="px-6 py-5 text-slate-600">
                    {student.department}
                  </td>

                  {/* =========================
                      YEAR CELL
                  ========================= */}
                  <td className="px-6 py-5 text-slate-600">
                    {student.year}
                  </td>

                  {/* =========================
                      STATUS BADGE
                      Purpose:
                      - Visual indicator of student status
                      - Green = Active, Red = Inactive
                      - Rounded pill style improves modern UI feel
                  ========================= */}
                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium
                        ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {student.status}
                    </span>

                  </td>

                  {/* =========================
                      ACTION BUTTONS
                      Purpose:
                      - View student details
                      - Edit student
                      - Delete student
                      UX improvements:
                      - Larger icons (text-lg)
                      - Hover scale effect for interactivity
                  ========================= */}
                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-5 text-lg">

                      {/* VIEW BUTTON */}
                      <button
                        onClick={() =>
                          navigate(`/students/${student.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                        title="View Student"
                      >
                        <FaEye />
                      </button>

                      {/* EDIT BUTTON */}
                      <button
                        onClick={() =>
                          navigate(`/students/edit/${student.id}`)
                        }
                        className="text-amber-600 hover:text-amber-800 transition transform hover:scale-110"
                        title="Edit Student"
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => openDeleteModal(student)}
                        className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        title="Delete Student"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* ======================================================
          PAGINATION COMPONENT
          Controls page navigation + items per page
      ====================================================== */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        studentsPerPage={itemsPerPage}
        setStudentsPerPage={setItemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* ======================================================
          DELETE CONFIRMATION MODAL
          Prevents accidental deletion
      ====================================================== */}
      <DeleteModal
        open={showDeleteModal}
        student={selectedStudent}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default StudentTable