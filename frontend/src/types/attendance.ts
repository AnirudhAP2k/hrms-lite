export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  status: AttendanceStatus;
}

export interface AttendanceCreate {
  employee_id: string;
  date: string;
  status: AttendanceStatus;
}
