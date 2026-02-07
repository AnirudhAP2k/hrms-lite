from datetime import datetime
from app.utils.employee_id import generate_next_emp_id
from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError
from app.database import employee_collection
from app.models.employee import EmployeeCreate
from app.utils.mongo import serialize_mongo_document
from bson import ObjectId

async def create_employee(payload: EmployeeCreate):
    employee_data = payload.dict()
    employee_data["created_at"] = datetime.utcnow()

    last_emp_id = await get_last_employee_id()
    employee_data["employee_id"] = generate_next_emp_id(last_emp_id)

    try:
        result = await employee_collection.insert_one(employee_data)
        employee_data["_id"] = result.inserted_id
        return serialize_mongo_document(employee_data)

    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with same ID or email already exists"
        )


async def list_employees():
    employees = []
    cursor = employee_collection.find()

    async for employee in cursor:
        employees.append(serialize_mongo_document(employee))

    return employees


async def delete_employee(employee_id: str):
    try:
        object_id = ObjectId(employee_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await employee_collection.delete_one(
        {"_id": object_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return {"message": "Employee deleted successfully"}

async def get_last_employee_id():
    last_employee = await employee_collection.find_one(
        {},
        sort=[("employee_id", -1)]
    )
    return last_employee["employee_id"] if last_employee else None

