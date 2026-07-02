import { FaSearch } from "react-icons/fa";

/*
======================================================
Component: SearchBar

Purpose:
A reusable search input component used to filter
student records in real-time.

Features:
✔ Controlled input (React state driven)
✔ Instant search filtering
✔ Clean icon-based UI
✔ Responsive width (mobile → desktop)

Props:
- searchTerm      : Current search text from parent state
- setSearchTerm   : Function to update search state

Used In:
Students.jsx
======================================================
*/

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    /*
      Container Wrapper

      Purpose:
      Positions the search icon inside the input field
      using relative positioning.

      Tailwind:
      - relative: allows absolute positioning of icon
      - w-full: full width on mobile
      - md:w-80: fixed width on medium+ screens for clean layout
    */
    <div className="relative w-full md:w-80">

      {/* Search Icon */}
      <FaSearch
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />

      {/* Search Input */}
      <input
        type="text"

        /*
          Placeholder:
          Guides the user on what they can search for
        */
        placeholder="Search by name, ID, email..."

        /*
          Controlled Input:
          Value is controlled by parent state
        */
        value={searchTerm}

        /*
          On Change:
          Updates parent state in real-time
          enabling live filtering of student list
        */
        onChange={(e) => setSearchTerm(e.target.value)}

        /*
          Styling:

          UI Goals:
          - Clean modern input field
          - Comfortable spacing for icon
          - Smooth focus experience

          Tailwind:
          - pl-11: space for icon
          - rounded-xl: modern soft corners
          - focus:ring-2: modern focus feedback
        */
        className="
          w-full
          pl-11 pr-4 py-3
          bg-white
          border border-slate-300
          rounded-xl
          text-slate-700
          placeholder-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

    </div>
  );
}

export default SearchBar;
