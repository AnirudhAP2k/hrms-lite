import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <AttendanceProvider>
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route
              path="/attendance/:employeeId"
              element={<Attendance />}
            />
          </Routes>
        </AttendanceProvider>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;
