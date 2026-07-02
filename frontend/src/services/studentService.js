import axios from "axios";

/*
  ======================================================
  API BASE URL
  ------------------------------------------------------
  This is the base endpoint for all student-related APIs.

  Backend assumed:
  http://localhost:5000/api/students
  ======================================================
*/
const API_URL = "http://localhost:5000/api/students";

/*
  ======================================================
  GET ALL STUDENTS
  ------------------------------------------------------
  Method: GET
  Endpoint: /api/students

  Purpose:
  - Fetches the complete list of students from backend
  - Used in:
      → Students page (table listing)
      → Dashboard statistics
  ======================================================
*/
export const getStudents = () => axios.get(API_URL);

/*
  ======================================================
  GET SINGLE STUDENT
  ------------------------------------------------------
  Method: GET
  Endpoint: /api/students/:id

  Parameters:
  - id: unique student identifier

  Purpose:
  - Fetch detailed information of a single student
  - Used in:
      → Student Details page
      → Edit Student form prefill
  ======================================================
*/
export const getStudent = (id) =>
  axios.get(`${API_URL}/${id}`);

/*
  ======================================================
  GET ALL DEPARTMENTS
  ------------------------------------------------------
  Method: GET
  Endpoint: /api/departments

  Purpose:
  - Fetch list of available departments
  - Used in dropdown menus (Add/Edit Student forms)
  - NOTE: Separate API from students resource
  ======================================================
*/
export const getDepartments = () =>
  axios.get("http://localhost:5000/api/departments");

/*
  ======================================================
  ADD NEW STUDENT
  ------------------------------------------------------
  Method: POST
  Endpoint: /api/students

  Payload:
  - student object containing all form fields

  Purpose:
  - Creates a new student record in backend database
  - Used in Add Student form
  ======================================================
*/
export const addStudent = (student) =>
  axios.post(API_URL, student);

/*
  ======================================================
  UPDATE EXISTING STUDENT
  ------------------------------------------------------
  Method: PUT
  Endpoint: /api/students/:id

  Parameters:
  - id: student ID to update
  - student: updated student object

  Purpose:
  - Updates existing student data in database
  - Used in Edit Student form
  ======================================================
*/
export const updateStudent = (id, student) =>
  axios.put(`${API_URL}/${id}`, student);

/*
  ======================================================
  DELETE STUDENT
  ------------------------------------------------------
  Method: DELETE
  Endpoint: /api/students/:id

  Parameters:
  - id: student ID to delete

  Purpose:
  - Permanently removes student from database
  - Used in StudentTable delete action
  ======================================================
*/
export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/${id}`);