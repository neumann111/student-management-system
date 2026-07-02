import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/*
  ======================================================
  FILE SYSTEM SETUP (NODE.JS CONTEXT)
  ------------------------------------------------------
  Since this project uses JSON file storage instead of DB:

  We manually resolve file paths using ES module syntax
  ======================================================
*/

// Get current file name (ESM equivalent of __filename)
const __filename = fileURLToPath(import.meta.url);

// Get current directory name (ESM equivalent of __dirname)
const __dirname = path.dirname(__filename);

/*
  ======================================================
  DATA SOURCE FILE
  ------------------------------------------------------
  This JSON file acts as a lightweight database
  Stores all student records persistently
  ======================================================
*/
const dataFile = path.join(__dirname, "../data/students.json");

/*
  ======================================================
  READ STUDENTS FROM FILE
  ------------------------------------------------------
  Purpose:
  - Reads JSON file synchronously
  - Parses string into JavaScript array

  Returns:
  - Array of student objects
  ======================================================
*/
const readStudents = () => {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
};

/*
  ======================================================
  WRITE STUDENTS TO FILE
  ------------------------------------------------------
  Purpose:
  - Converts JS array → JSON string
  - Saves updated data back to file

  Used after:
  - Add student
  - Update student
  - Delete student
  ======================================================
*/
const writeStudents = (students) => {
  fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
};

/*
  ======================================================
  GET ALL STUDENTS
  ------------------------------------------------------
  Endpoint: GET /api/students

  Purpose:
  - Returns full list of students
  - No filtering or transformation applied
  ======================================================
*/
export const getStudents = (req, res) => {
  res.json(readStudents());
};

/*
  ======================================================
  GET SINGLE STUDENT
  ------------------------------------------------------
  Endpoint: GET /api/students/:id

  Purpose:
  - Find student by ID from JSON file
  - Returns 404 if not found
  ======================================================
*/
export const getStudent = (req, res) => {
  const students = readStudents();

  const student = students.find(
    (s) => s.id === req.params.id
  );

  // Handle case where student does not exist
  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
};

/*
  ======================================================
  ADD STUDENT
  ------------------------------------------------------
  Endpoint: POST /api/students

  Purpose:
  - Adds a new student to JSON database
  - Validates required fields
  - Prevents duplicate ID and email
  ======================================================
*/
export const addStudent = (req, res) => {
  const students = readStudents();

  // Extract request body fields
  const {
    id,
    name,
    email,
    phone,
    gender,
    dob,
    department,
    year,
    address,
    status,
  } = req.body;

  /*
    ------------------------------------------------------
    VALIDATION: REQUIRED FIELDS
    ------------------------------------------------------
    Ensures essential fields are not empty before saving
  */
  if (
    !id ||
    !name ||
    !email ||
    !phone ||
    !department ||
    !year
  ) {
    return res.status(400).json({
      message: "Please fill all required fields.",
    });
  }

  /*
    ------------------------------------------------------
    VALIDATION: DUPLICATE STUDENT ID
    ------------------------------------------------------
    Prevents multiple students with same ID (case-insensitive)
  */
  const studentIdExists = students.find(
    (student) =>
      student.id.toLowerCase() === id.toLowerCase()
  );

  if (studentIdExists) {
    return res.status(400).json({
      message: "Student ID already exists.",
    });
  }

  /*
    ------------------------------------------------------
    VALIDATION: DUPLICATE EMAIL
    ------------------------------------------------------
    Ensures each email is unique in system
  */
  const emailExists = students.find(
    (student) =>
      student.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return res.status(400).json({
      message: "Email already exists.",
    });
  }

  /*
    ------------------------------------------------------
    CREATE NEW STUDENT OBJECT
    ------------------------------------------------------
    Builds final student object before saving
  */
  const newStudent = {
    id,
    name,
    email,
    phone,
    gender,
    dob,
    department,
    year,
    address,
    status,
  };

  // Add to in-memory array
  students.push(newStudent);

  // Persist to JSON file
  writeStudents(students);

  // Send success response
  res.status(201).json({
    message: "Student added successfully.",
    student: newStudent,
  });
};

/*
  ======================================================
  UPDATE STUDENT
  ------------------------------------------------------
  Endpoint: PUT /api/students/:id

  Purpose:
  - Updates existing student details
  - Preserves student ID (immutable)
  - Validates email uniqueness
  ======================================================
*/
export const updateStudent = (req, res) => {
  const students = readStudents();

  const currentStudentId = req.params.id;

  // Find index of student to update
  const index = students.findIndex(
    (student) => student.id === currentStudentId
  );

  // Handle student not found
  if (index === -1) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  // Extract updated fields
  const {
    name,
    email,
    phone,
    gender,
    dob,
    department,
    year,
    address,
    status,
  } = req.body;

  /*
    VALIDATION: REQUIRED FIELDS
    Ensures critical fields are not empty
  */
  if (!name || !email || !phone || !department || !year) {
    return res.status(400).json({
      message: "Please fill all required fields.",
    });
  }

  /*
    VALIDATION: EMAIL DUPLICATE CHECK
    Ensures no other student uses same email
    Excludes current student from check
  */
  const emailExists = students.find(
    (student) =>
      student.email.toLowerCase() === email.toLowerCase() &&
      student.id !== currentStudentId
  );

  if (emailExists) {
    return res.status(400).json({
      message: "Email already exists.",
    });
  }

  /*
    UPDATE OPERATION
    - Keeps original ID unchanged
    - Updates only editable fields
  */
  students[index] = {
    ...students[index],
    name,
    email,
    phone,
    gender,
    dob,
    department,
    year,
    address,
    status,
  };

  // Persist changes
  writeStudents(students);

  res.json({
    message: "Student updated successfully.",
    student: students[index],
  });
};

/*
  ======================================================
  DELETE STUDENT
  ------------------------------------------------------
  Endpoint: DELETE /api/students/:id

  Purpose:
  - Removes student from JSON database
  - Uses filter to create new array without target student
  ======================================================
*/
export const deleteStudent = (req, res) => {
  const students = readStudents();

  const updatedStudents = students.filter(
    (s) => s.id !== req.params.id
  );

  // Save updated list
  writeStudents(updatedStudents);

  res.json({
    message: "Student deleted",
  });
};