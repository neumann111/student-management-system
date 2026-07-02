import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// PAGE COMPONENTS
// These represent different screens in the application
// ======================================================
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

/*
  ======================================================
  MAIN APPLICATION ROUTER
  ------------------------------------------------------
  Purpose:
  - Defines all frontend routes for the application
  - Controls navigation between pages
  - Uses React Router (BrowserRouter + Routes + Route)

  Structure:
  - "/" → Dashboard (home page)
  - "/students" → Student listing page
  - "/students/add" → Add new student form
  - "/students/edit/:id" → Edit student form (dynamic route)
  ======================================================
*/
function App() {
  return (

    /*
      ======================================================
      BROWSER ROUTER WRAPPER
      ------------------------------------------------------
      Purpose:
      - Enables client-side routing (no page reloads)
      - Uses HTML5 history API internally
      ======================================================
    */
    <BrowserRouter>

      {/*
        ======================================================
        ROUTES CONTAINER
        ------------------------------------------------------
        Purpose:
        - Holds all route definitions
        - Matches URL → renders correct component
        ======================================================
      */}
      <Routes>

        {/*
          ======================================================
          DASHBOARD ROUTE
          Path: "/"
          Purpose:
          - Landing page of the application
          - Shows analytics and overview
          ======================================================
        */}
        <Route path="/" element={<Dashboard />} />

        {/*
          ======================================================
          STUDENTS LIST ROUTE
          Path: "/students"
          Purpose:
          - Displays all students in table format
          - Supports search, filter, sort, pagination
          ======================================================
        */}
        <Route path="/students" element={<Students />} />

        {/*
          ======================================================
          ADD STUDENT ROUTE
          Path: "/students/add"
          Purpose:
          - Opens form to create a new student
          - Uses StudentForm in "add mode"
          ======================================================
        */}
        <Route path="/students/add" element={<AddStudent />} />

        {/*
          ======================================================
          EDIT STUDENT ROUTE (DYNAMIC ROUTE)
          Path: "/students/edit/:id"

          Example:
          /students/edit/123

          Purpose:
          - Loads existing student data by ID
          - Opens form in "edit mode"
          - Allows updating student details
          ======================================================
        */}
        <Route path="/students/edit/:id" element={<EditStudent />} />

      </Routes>

    </BrowserRouter>
  );
}

// Export main App component
export default App;