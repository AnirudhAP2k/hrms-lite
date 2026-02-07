from pydantic import BaseModel, Field
from datetime import datetime


class AttendanceCreate(BaseModel):
    employee_id: str = Field(..., example="EMP001")
    date: datetime = Field(..., example="2024-06-01T09:00:00Z")
    status: str = Field(..., example="PRESENT")
