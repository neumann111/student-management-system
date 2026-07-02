// ======================================================
// Department Controller
//
// Purpose:
// Handles all department-related API requests.
//
// Current Endpoints:
// - GET /api/departments
//
// Data Source:
// backend/data/departments.json
// ======================================================


// Import Node.js File System module
// Used to read JSON files.
import fs from "fs";


// Import Path module
// Used for creating cross-platform file paths.
import path from "path";


// Converts ES Module URL into a file path.
// Required because __dirname is not available
// by default in ES Modules.
import { fileURLToPath } from "url";


// Recreate __filename and __dirname
// for ES Module compatibility.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Absolute path to departments.json
const dataFile = path.join(
  __dirname,
  "../data/departments.json"
);


// ======================================================
// GET Departments
//
// Route:
// GET /api/departments
//
// Purpose:
// Returns the complete list of departments.
//
// Workflow:
// 1. Read departments.json
// 2. Convert JSON text into JavaScript array
// 3. Return data to frontend
//
// Response:
// [
//   {
//     "id": "CS",
//     "name": "Computer Science"
//   },
//   ...
// ]
// ======================================================
export const getDepartments = (req, res) => {

  // Read JSON file
  const data = fs.readFileSync(
    dataFile,
    "utf8"
  );

  // Convert JSON string to JavaScript object
  const departments = JSON.parse(data);

  // Send department list to client
  res.json(departments);

};