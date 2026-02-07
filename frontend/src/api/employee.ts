import api from "./api";
import type { Employee, EmployeeCreate } from "../types/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
};

export const createEmployee = async (
  payload: EmployeeCreate
): Promise<Employee> => {
  const res = await api.post<Employee>("/employees", payload);
  return res.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};
