import React from "react";
import ReactDOM from "react-dom/client";

// Main application component
import App from "./App";

// Global styles (Tailwind CSS or custom styles)
import "./index.css";

/*
  ======================================================
  APPLICATION ENTRY POINT
  ------------------------------------------------------
  Purpose:
  - This file is the starting point of the React app
  - It mounts the React application into the DOM
  - Connects React component tree to the HTML root element

  Flow:
  1. Find <div id="root"> in index.html
  2. Create React root using React 18 API
  3. Render <App /> inside it
  ======================================================
*/

/*
  ======================================================
  CREATE ROOT & RENDER APP
  ------------------------------------------------------
  React 18 uses createRoot API for concurrent rendering
  instead of legacy ReactDOM.render()
  ======================================================
*/
ReactDOM.createRoot(document.getElementById("root")).render(

  /*
    ======================================================
    STRICT MODE WRAPPER
    ------------------------------------------------------
    Purpose:
    - Helps detect potential problems in development
    - Activates additional checks and warnings
    - Does NOT affect production build

    Example behaviors:
    - Double-invokes certain lifecycle methods (dev only)
    - Warns about unsafe React patterns
    ======================================================
  */
  <React.StrictMode>

    {/* ======================================================
        MAIN APPLICATION COMPONENT
        ------------------------------------------------------
        This is the root of the entire UI tree.
        All pages, routes, and components originate from here.
    ====================================================== */}
    <App />

  </React.StrictMode>
);