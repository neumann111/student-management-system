import express from "express";

// ======================================================
// CONTROLLER IMPORTS
// ------------------------------------------------------
// These functions contain the business logic for:
// - reading/writing students
// - validation
// - CRUD operations
// ======================================================
import {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

/*
  ======================================================
  EXPRESS ROUTER SETUP
  ------------------------------------------------------
  Purpose:
  - Creates a modular routing layer for student APIs
  - Keeps route definitions separate from server setup
  - Improves maintainability and scalability
  ======================================================
*/
const router = express.Router();

/*
  ======================================================
  ROUTE: GET ALL STUDENTS
  ------------------------------------------------------
  Method: GET
  Path: /

  Full Endpoint:
  /api/students

  Purpose:
  - Fetch all student records from backend storage
  - Used in:
      → Students listing page
      → Dashboard statistics
  ======================================================
*/
router.get("/", getStudents);

/*
  ======================================================
  ROUTE: GET SINGLE STUDENT
  ------------------------------------------------------
  Method: GET
  Path: /:id

  Full Endpoint:
  /api/students/:id

  Example:
  /api/students/ST001

  Purpose:
  - Fetch details of a specific student by ID
  - Used in:
      → Student Details page
      → Edit Student form prefill
  ======================================================
*/
router.get("/:id", getStudent);

/*
  ======================================================
  ROUTE: ADD NEW STUDENT
  ------------------------------------------------------
  Method: POST
  Path: /

  Full Endpoint:
  /api/students

  Purpose:
  - Create a new student record
  - Performs validation + duplicate checks in controller
  ======================================================
*/
router.post("/", addStudent);

/*
  ======================================================
  ROUTE: UPDATE STUDENT
  ------------------------------------------------------
  Method: PUT
  Path: /:id

  Full Endpoint:
  /api/students/:id

  Example:
  /api/students/ST001

  Purpose:
  - Update existing student details
  - Keeps student ID immutable
  ======================================================
*/
router.put("/:id", updateStudent);

/*
  ======================================================
  ROUTE: DELETE STUDENT
  ------------------------------------------------------
  Method: DELETE
  Path: /:id

  Full Endpoint:
  /api/students/:id

  Purpose:
  - Permanently removes student from system
  - Used in:
      → Student table delete action
  ======================================================
*/
router.delete("/:id", deleteStudent);

/*
  ======================================================
  EXPORT ROUTER
  ------------------------------------------------------
  This router is imported into main server file:

  Example:
  app.use("/api/students", studentRoutes);
  ======================================================
*/
export default router;