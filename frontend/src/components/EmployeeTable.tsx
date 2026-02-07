import { useEmployees } from "../context/EmployeeContext";
import { Link } from "react-router-dom";

export default function EmployeeTable() {
  const { employees, loading, error, removeEmployee } = useEmployees();

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!employees.length) return <p>No employees found</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Dept</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id}>
            <td>{e.employee_id}</td>
            <td>{e.full_name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <Link to={`/attendance/${e.employee_id}`}>Attendance</Link>
              {" | "}
              <button onClick={() => removeEmployee(e.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
