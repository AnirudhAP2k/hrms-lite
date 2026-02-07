import { useAttendance } from "../context/AttendanceContext";

export default function AttendanceTable() {
  const { records, loading, error } = useAttendance();

  if (loading) return <p>Loading attendance...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!records.length) return <p>No attendance records</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.date ? new Date(record.date).toLocaleDateString() : "N/A"}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
