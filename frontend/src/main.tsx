import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";
import { AttendanceProvider } from "./context/AttendanceContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EmployeeProvider>
      <AttendanceProvider>
        <App />
      </AttendanceProvider>
    </EmployeeProvider>
  </React.StrictMode>
);
