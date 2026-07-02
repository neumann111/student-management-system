import { useState } from "react";
import Pagination from "../students/Pagination";

/**
 * RecentStudents Component
 *
 * This component displays a paginated table of the most recent students.
 * It is mainly used in the Dashboard to give a quick overview of latest entries.
 *
 * Features:
 * - Client-side pagination
 * - Dynamic "rows per page" selection
 * - Reverse ordering (latest students shown first)
 */
function RecentStudents({ students }) {

  /**
   * Tracks the current page in pagination.
   * Default = 1 (first page).
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Controls how many students are shown per page.
   * This is user-adjustable via dropdown in Pagination component.
   */
  const [studentsPerPage, setStudentsPerPage] = useState(5);

  /**
   * Pagination Calculation:
   *
   * lastIndex → determines where the current page ends
   * firstIndex → determines where the current page starts
   *
   * Example:
   * Page 1, 5 per page → 0–5
   * Page 2, 5 per page → 5–10
   */
  const lastIndex = currentPage * studentsPerPage;
  const firstIndex = lastIndex - studentsPerPage;

  /**
   * Prepare data for display:
   *
   * 1. Spread operator creates a copy to avoid mutating props
   * 2. reverse() shows newest students first
   * 3. slice() applies pagination window
   */
  const currentStudents = [...students]
    .reverse()
    .slice(firstIndex, lastIndex);

  /**
   * Total number of pages based on dataset size
   * and selected rows per page.
   */
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-4">

      {/* Section Header */}
      <h2 className="text-lg font-semibold mb-3 text-slate-800">
        Recent Students
      </h2>

      {/* Table wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">

        <table className="min-w-full text-left">

          {/* Table Header */}
          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 font-semibold text-sm">ID</th>
              <th className="px-4 py-3 font-semibold text-sm">Name</th>
              <th className="px-4 py-3 font-semibold text-sm">Department</th>
              <th className="px-4 py-3 font-semibold text-sm">Year</th>
              <th className="px-4 py-3 font-semibold text-sm">Status</th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {currentStudents.length > 0 ? (

              currentStudents.map((student) => (

                <tr
                  key={student.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="px-3 py-2 text-base">
                    {student.id}
                  </td>

                  <td className="px-3 py-2 text-base font-medium">
                    {student.name}
                  </td>

                  <td className="px-3 py-2 text-base">
                    {student.department}
                  </td>

                  <td className="px-3 py-2 text-base">
                    {student.year}
                  </td>

                  <td className="px-3 py-2">

                    {/* Status Badge
                        Green = Active
                        Red = Inactive */}
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              // Empty state UI when no students exist
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-slate-500 text-sm"
                >
                  No students found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination Section */}
      {students.length > 0 && (
        <div className="mt-3">

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            studentsPerPage={studentsPerPage}
            setStudentsPerPage={setStudentsPerPage}
            onPageChange={setCurrentPage}
          />

        </div>
      )}

    </div>
  );
}

export default RecentStudents;