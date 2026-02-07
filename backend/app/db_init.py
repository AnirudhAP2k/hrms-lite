from app.database import employee_collection, attendance_collection


async def init_db():
    # Employees
    await employee_collection.create_index(
        "employee_id",
        unique=True
    )
    await employee_collection.create_index(
        "email",
        unique=True
    )

    # Attendance
    await attendance_collection.create_index(
        [("employee_id", 1), ("date", 1)],
        unique=True
    )
