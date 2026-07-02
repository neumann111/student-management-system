// ======================================================
// Component: DeleteModal
//
// Purpose:
// ------------------------------------------------------
// A confirmation modal used before permanently deleting
// a student record from the system.
//
// This is a critical UX component designed to:
// - Prevent accidental deletions
// - Clearly communicate destructive action
// - Require explicit user confirmation
//
// Design Principles:
// ------------------------------------------------------
// - Modal overlay blocks background interaction
// - Clear warning messaging
// - Simple confirm/cancel actions
// - High emphasis on destructive action (red styling)
//
// Used In:
// ------------------------------------------------------
// StudentTable.jsx (Delete student flow)
// ======================================================


/**
 * DeleteModal Component
 *
 * @param {boolean} open
 *   - Controls visibility of the modal
 *   - If false, component returns null (not rendered)
 *
 * @param {Object} student
 *   - The currently selected student object
 *   - Used to display name in confirmation message
 *
 * @param {Function} onClose
 *   - Callback triggered when user cancels deletion
 *
 * @param {Function} onConfirm
 *   - Callback triggered when user confirms deletion
 *   - Usually calls API to delete student record
 */
function DeleteModal({
  open,
  student,
  onClose,
  onConfirm,
}) {

  /**
   * Conditional rendering:
   * If modal is not open, do not render anything.
   * This improves performance and avoids unnecessary DOM nodes.
   */
  if (!open) return null;

  return (
    /**
     * Overlay Layer
     * --------------------------------------------------
     * Full-screen semi-transparent background that:
     * - Focuses user attention on modal
     * - Prevents interaction with underlying UI
     * - Provides visual separation from main content
     */
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* ==================================================
          MODAL CONTAINER
          --------------------------------------------------
          Central dialog box containing:
          - Title
          - Warning message
          - Action buttons
          ================================================== */}
      <div className="bg-white rounded-2xl w-[420px] p-6 shadow-lg">

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-slate-800">
          Delete Student
        </h2>

        {/* Confirmation Message */}
        <p className="mt-4 text-slate-600 leading-relaxed">
          Are you sure you want to delete
          <span className="font-semibold text-slate-800">
            {" "}
            {student?.name}
          </span>
          ?
        </p>

        {/* Warning Message */}
        <p className="text-red-600 text-sm mt-2 font-medium">
          This action cannot be undone.
        </p>

        {/* ==================================================
            ACTION BUTTONS
            --------------------------------------------------
            - Cancel: closes modal safely
            - Delete: triggers destructive API action
            ================================================== */}
        <div className="flex justify-end gap-3 mt-8">

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="
              px-5 py-2
              border border-slate-300
              rounded-xl
              text-slate-700
              hover:bg-slate-100
              transition
            "
          >
            Cancel
          </button>

          {/* Confirm Delete Button */}
          <button
            onClick={onConfirm}
            className="
              px-5 py-2
              bg-red-600
              text-white
              rounded-xl
              hover:bg-red-700
              transition
              shadow-sm
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;