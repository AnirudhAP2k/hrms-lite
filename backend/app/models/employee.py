from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., example="EMP001")
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(EmployeeCreate):
    id: str
    created_at: datetime

class NewEmployeeCreation(BaseModel):
    full_name: str
    email: EmailStr
    department: str