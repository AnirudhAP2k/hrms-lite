import api from "./api";
import type { Attendance, AttendanceCreate } from "../types/attendance";

export const getAttendanceByEmployee = async (
  employeeId: string
): Promise<Attendance[]> => {
  const res = await api.get<Attendance[]>(`/attendance/${employeeId}`);
  return res.data;
};

export const markAttendance = async (
  payload: AttendanceCreate
): Promise<Attendance> => {
  const res = await api.post<Attendance>("/attendance", payload);
  return res.data;
};
