import express from "express";

// ======================================================
// CONTROLLER IMPORT
// ------------------------------------------------------
// This controller contains business logic for:
// - fetching department data from backend source
// ======================================================
import { getDepartments } from "../controllers/departmentController.js";

/*
  ======================================================
  EXPRESS ROUTER SETUP
  ------------------------------------------------------
  Purpose:
  - Creates a modular route handler
  - Keeps routes separated from main server file (app.js/server.js)
  - Improves scalability and maintainability
  ======================================================
*/
const router = express.Router();

/*
  ======================================================
  GET ALL DEPARTMENTS ROUTE
  ------------------------------------------------------
  Method: GET
  Path: /

  Full Endpoint (when mounted in server):
  /api/departments

  Purpose:
  - Returns list of all available departments
  - Used in frontend dropdowns (Add/Edit Student forms)

  Flow:
  Request → Route → Controller → Response
  ======================================================
*/
router.get("/", getDepartments);

/*
  ======================================================
  EXPORT ROUTER
  ------------------------------------------------------
  This allows the router to be imported in main server file:

  Example:
  app.use("/api/departments", departmentRoutes);
  ======================================================
*/
export default router;