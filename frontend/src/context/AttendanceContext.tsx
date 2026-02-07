import { createContext, useContext, useState} from "react";
import type { ReactNode} from "react";
import type { Attendance, AttendanceCreate } from "../types/attendance";
import { getAttendanceByEmployee, markAttendance } from "../api/attendance";

interface AttendanceContextType {
  records: Attendance[];
  loading: boolean;
  error: string | null;
  fetchAttendance: (employeeId: string) => Promise<void>;
  addAttendance: (data: AttendanceCreate) => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined
);

export const AttendanceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = async (employeeId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAttendanceByEmployee(employeeId);
      setRecords(data);
    } catch {
      setError("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const addAttendance = async (data: AttendanceCreate) => {
    try {
      setLoading(true);
      const created = await markAttendance(data);
      setRecords((prev) => [...prev, created]);
    } catch {
      setError("Attendance already marked for this date");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{ records, loading, error, fetchAttendance, addAttendance }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error(
      "useAttendance must be used within AttendanceProvider"
    );
  }
  return context;
};
