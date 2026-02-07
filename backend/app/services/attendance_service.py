from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError

from app.database import attendance_collection, employee_collection
from app.models.attendance import AttendanceCreate
from app.utils.mongo import serialize_mongo_document
from datetime import date, datetime, timedelta

async def mark_attendance(payload: AttendanceCreate):
    employee = await employee_collection.find_one(
        {"employee_id": payload.employee_id}
    )
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    try:
        attendance_data = payload.dict()
        result = await attendance_collection.insert_one(attendance_data)
        attendance_data["_id"] = result.inserted_id
        return serialize_mongo_document(attendance_data)

    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Attendance already marked for this employee on this date"
        )


async def get_attendance_by_employee(employee_id: str):
    records = []
    cursor = attendance_collection.find(
        {"employee_id": employee_id}
    ).sort("date")

    async for record in cursor:
        records.append(serialize_mongo_document(record))

    return records

async def get_attendance_by_date(date_str: datetime):
    start = datetime.fromisoformat(date_str)
    end = start + timedelta(days=1)

    records = []
    allRecords = attendance_collection.find({
        "date": {
            "$gte": start,
            "$lt": end
        }
    }).sort("date")

    async for record in allRecords:
        records.append(serialize_mongo_document(record))

    return records
