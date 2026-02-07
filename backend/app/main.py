from fastapi import FastAPI
from app.database import database
from app.db_init import init_db
from app.routes.employees import router as employee_router
from app.routes.attendance import router as attendace_router
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware
import os

version = settings.version
s = slice(0, version.find(".")) if "." in version else slice(0, len(version))
major = version[s]

app = FastAPI(
    title="HRMS Lite",
    description="Lightweight HR Management System",
    version=version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(",") if settings.cors_origins else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/db-test")
async def db_test():
    collections = await database.list_collection_names()
    return {"collections": collections}

@app.get("/")
async def health_check():
    return {"status": "HRMS Lite backend running"}

app.include_router(employee_router, prefix=f"/api/v{major}")
app.include_router(attendace_router, prefix=f"/api/v{major}")
