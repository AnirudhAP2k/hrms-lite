import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  return (
    <div>
      <h1>Employees</h1>
      <EmployeeForm />
      <EmployeeTable />
    </div>
  );
}
