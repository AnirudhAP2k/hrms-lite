import { useState } from "react";
import type { EmployeeCreate } from "../types/employee";
import { useEmployees } from "../context/EmployeeContext";

const initialState: EmployeeCreate = {
  full_name: "",
  email: "",
  department: "",
};

export default function EmployeeForm() {
  const [form, setForm] = useState<EmployeeCreate>(initialState);
  const { addEmployee, loading } = useEmployees();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmployee(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" placeholder="Full Name" onChange={handleChange} value={form.full_name} />
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
      <input name="department" placeholder="Department" onChange={handleChange} value={form.department} />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </form>
  );
}
