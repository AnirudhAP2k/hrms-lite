export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  created_at: string;
}

export interface EmployeeCreate {
  full_name: string;
  email: string;
  department: string;
}
