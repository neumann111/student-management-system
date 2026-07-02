import express from "express";
import cors from "cors";

// ======================================================
// ROUTE IMPORTS
// ------------------------------------------------------
// These modules contain all endpoint definitions:
// - studentRoutes → CRUD operations for students
// - departmentRoutes → list of departments
// ======================================================
import studentRoutes from "./routes/studentRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

/*
  ======================================================
  EXPRESS APP INITIALIZATION
  ------------------------------------------------------
  Purpose:
  - Creates an Express application instance
  - Acts as the main server object handling all requests
  ======================================================
*/
const app = express();

/*
  ======================================================
  MIDDLEWARE: CORS
  ------------------------------------------------------
  Purpose:
  - Enables Cross-Origin Resource Sharing
  - Allows frontend (React on different port) to call backend API

  Example:
  Frontend: http://localhost:5173
  Backend : http://localhost:5000
  Without CORS → requests would be blocked by browser
  ======================================================
*/
app.use(cors());

/*
  ======================================================
  MIDDLEWARE: JSON PARSER
  ------------------------------------------------------
  Purpose:
  - Automatically parses incoming JSON request bodies
  - Makes req.body available in POST/PUT requests

  Example:
  POST /api/students → req.body contains student data
  ======================================================
*/
app.use(express.json());

/*
  ======================================================
  ROUTE REGISTRATION
  ------------------------------------------------------
  Purpose:
  - Connects route modules to base API paths

  ROUTES STRUCTURE:
  ----------------------------------
  /api/students     → studentRoutes
  /api/departments  → departmentRoutes
  ======================================================
*/

/*
  STUDENT ROUTES
  - Handles all CRUD operations for students
  - Example endpoints:
      GET    /api/students
      POST   /api/students
      PUT    /api/students/:id
      DELETE /api/students/:id
*/
app.use("/api/students", studentRoutes);

/*
  DEPARTMENT ROUTES
  - Handles department-related data
  - Example endpoint:
      GET /api/departments
*/
app.use("/api/departments", departmentRoutes);

/*
  ======================================================
  SERVER CONFIGURATION
  ------------------------------------------------------
  PORT:
  - Defines where backend server will run
  - 5000 is commonly used for development servers
  ======================================================
*/
const PORT = 5000;

/*
  ======================================================
  START SERVER
  ------------------------------------------------------
  Purpose:
  - Starts listening for incoming HTTP requests
  - Logs server URL for developer reference

  Flow:
  app → listen → ready to accept API calls
  ======================================================
*/
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});