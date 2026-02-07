import { useState } from "react";
import type { AttendanceCreate } from "../types/attendance";
import { useAttendance } from "../context/AttendanceContext";

export default function AttendanceForm({ employeeId }: { employeeId: string }) {
  const { addAttendance, loading } = useAttendance();

  const [form, setForm] = useState<AttendanceCreate>({
    employee_id: employeeId,
    date: "",
    status: "PRESENT",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAttendance(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="PRESENT">Present</option>
        <option value="ABSENT">Absent</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Mark Attendance"}
      </button>
    </form>
  );
}
