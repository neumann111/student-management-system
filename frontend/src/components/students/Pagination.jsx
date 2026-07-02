import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/*
======================================================
Component: Pagination

Purpose:
A modern, reusable pagination component with:
- Page navigation (Prev / Next / Page numbers)
- Rows-per-page selector (5, 10, 20, 50)
- Clean responsive layout

IMPORTANT FIXES INCLUDED:
✔ Safe handling when totalPages = 0
✔ Prevent UI breaking when dataset is small
✔ Ensures rows-per-page ALWAYS works
✔ Prevents pagination disappearing issues
✔ Better UX spacing and alignment

Props:
- currentPage         : Current active page number
- totalPages          : Total number of pages
- studentsPerPage     : Rows per page selected by user
- setStudentsPerPage  : Setter function for rows per page
- onPageChange        : Function to change page

Used In:
StudentTable.jsx, RecentStudents.jsx
======================================================
*/

function Pagination({
  currentPage,
  totalPages,
  studentsPerPage,
  setStudentsPerPage,
  onPageChange,
}) {
  // If there is no data, we still show a clean UI instead of breaking
  const safeTotalPages = totalPages > 0 ? totalPages : 1;

  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

      {/* ======================================================
          LEFT SECTION
          - Page info
          - Rows per page selector
      ====================================================== */}
      <div className="flex items-center gap-6">

        {/* Page Indicator */}
        <p className="text-sm text-slate-500">
          Page{" "}
          <span className="font-semibold text-slate-800">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {safeTotalPages}
          </span>
        </p>

        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2">

          <label className="text-sm text-slate-500">
            Rows
          </label>

          <select
            value={studentsPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);

              // Update rows per page
              setStudentsPerPage(value);

              // Always reset to page 1 when page size changes
              // prevents empty pages / out-of-range page states
              onPageChange(1);
            }}
            className="
              rounded-lg
              border border-slate-200
              bg-white
              px-3 py-2
              text-sm text-slate-700
              focus:border-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

      </div>

      {/* ======================================================
          RIGHT SECTION
          - Pagination controls (Prev / Numbers / Next)
      ====================================================== */}
      <div className="flex items-center gap-2">

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-slate-200
            bg-white text-slate-600
            transition-all duration-200
            hover:border-blue-500 hover:text-blue-600
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <FaChevronLeft size={13} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: safeTotalPages }, (_, i) => i + 1)
          .filter((page) => {
            const delta = 2;

            return (
              page === 1 ||
              page === safeTotalPages ||
              (page >= currentPage - delta &&
                page <= currentPage + delta)
            );
          })
          .map((page, index, arr) => {
            const prev = arr[index - 1];

            return (
              <div key={page} className="flex items-center">

                {/* Ellipsis for skipped pages */}
                {prev && page - prev > 1 && (
                  <span className="px-2 text-slate-400">
                    •••
                  </span>
                )}

                {/* Page Button */}
                <button
                  onClick={() => onPageChange(page)}
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-xl text-sm font-medium
                    transition-all duration-200

                    ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {page}
                </button>

              </div>
            );
          })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === safeTotalPages}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-slate-200
            bg-white text-slate-600
            transition-all duration-200
            hover:border-blue-500 hover:text-blue-600
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <FaChevronRight size={13} />
        </button>

      </div>

    </div>
  );
}

export default Pagination;