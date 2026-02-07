import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Employee, EmployeeCreate } from "../types/employee";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../api/employee";

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (data: EmployeeCreate) => Promise<void>;
  removeEmployee: (id: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (data: EmployeeCreate) => {
    try {
      setLoading(true);
      const created = await createEmployee(data);
      setEmployees((prev) => [...prev, created]);
    } catch {
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  const removeEmployee = async (id: string) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        addEmployee,
        removeEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within EmployeeProvider");
  }
  return context;
};
