from fastapi import APIRouter, status
from app.config import settings
from app.models.employee import NewEmployeeCreation
from app.services.employee_service import (
    create_employee,
    list_employees,
    delete_employee
)

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post(
    "/",
    status_code=status.HTTP_201_CREATED
)
async def add_employee(payload: NewEmployeeCreation):
    return await create_employee(payload)


@router.get("/")
async def get_employees():
    return await list_employees()


@router.delete("/{employee_id}")
async def remove_employee(employee_id: str):
    return await delete_employee(employee_id)
