from fastapi import APIRouter, Query
from datetime import date, datetime

from app.models.attendance import AttendanceCreate
from app.services.attendance_service import (
    mark_attendance,
    get_attendance_by_employee,
    get_attendance_by_date
)

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/")
async def create_attendance(payload: AttendanceCreate):
    return await mark_attendance(payload)


@router.get("/{employee_id}")
async def list_attendance(employee_id: str):
    return await get_attendance_by_employee(employee_id)


@router.get("/")
async def filter_attendance(
    date: date = Query(None)
):
    if date:
        return await get_attendance_by_date(date.isoformat())
    return []
