from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.MONGODB_CONNECTION_URI)
database = client[settings.DB_NAME]

employee_collection = database.get_collection("employees")
attendance_collection = database.get_collection("attendance")
