import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "../context/AttendanceContext";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { fetchAttendance } = useAttendance();

  useEffect(() => {
    if (employeeId) {
      fetchAttendance(employeeId);
    }
  }, [employeeId]);

  if (!employeeId) return <p>Invalid employee</p>;

  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceForm employeeId={employeeId} />
      <AttendanceTable />
    </div>
  );
}
