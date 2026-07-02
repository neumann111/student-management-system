import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// PAGE COMPONENTS
// These represent different screens in the application
// ======================================================
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails"; // NEW: Student details page

/*
  ======================================================
  MAIN APPLICATION ROUTER
  ------------------------------------------------------
  Purpose:
  - Defines all frontend routes for the application
  - Handles navigation between pages (SPA routing)
  - Uses React Router DOM for client-side routing

  Route Summary:
  "/"                     → Dashboard (home page)
  "/students"            → Students list page
  "/students/add"       → Add new student
  "/students/edit/:id"   → Edit student (dynamic route)
  "/students/:id"        → View student details (dynamic route)
  ======================================================
*/
function App() {
  return (

    /*
      ======================================================
      BROWSER ROUTER WRAPPER
      ------------------------------------------------------
      Purpose:
      - Enables client-side routing using HTML5 history API
      - Prevents full page reloads when navigating
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
        - Only one route renders at a time
        ======================================================
      */}
      <Routes>

        {/* DASHBOARD */}
        <Route path="/" element={<Dashboard />} />

        {/* STUDENTS LIST */}
        <Route path="/students" element={<Students />} />

        {/* ADD STUDENT */}
        <Route path="/students/add" element={<AddStudent />} />

        {/* EDIT STUDENT (DYNAMIC ROUTE) */}
        <Route path="/students/edit/:id" element={<EditStudent />} />

        {/* VIEW STUDENT DETAILS (DYNAMIC ROUTE) */}
        <Route path="/students/:id" element={<StudentDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

// ======================================================
// EXPORT ROOT APP COMPONENT
// ======================================================
export default App;