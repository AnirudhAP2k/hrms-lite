# HRMS Lite – Full Stack Application

## Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
The application allows an to manage employee records and track daily attendance.

The goal of this project is to demonstrate end-to-end full-stack development skills, including:
- RESTful API design
- Frontend state management
- Database modeling
- Error handling and validations
- Deployment readiness

---

## Features

### Employee Management
- Add new employees
- View list of employees
- Delete employees
- Server-side validation for required fields, email format, and duplicate employee IDs

### Attendance Management
- Mark daily attendance (Present / Absent)
- Prevent duplicate attendance for the same employee on the same date
- View attendance history per employee

---

## Tech Stack Used

### Frontend
- React (with TypeScript)
- Context API for state management
- Axios for API communication
- React Router for navigation

### Backend
- FastAPI (Python)
- RESTful API design
- Pydantic for validation
- Motor (Async MongoDB driver)

### Database
- MongoDB Atlas (cloud-hosted)

### Deployment
- Backend: Render / Railway
- Frontend: Vercel / Netlify
- Environment-based configuration using `.env` files


## Steps to Run the Project Locally

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.10+)
- MongoDB Atlas account


### Clone the repository
```bash
git clone https://github.com/AnirudhAP2k/hrms-lite
cd hrms-lite
```

### Backend Setup
```bash
cd backend
python -m venv venv
Ubuntu:source venv/bin/activate  
Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Create a .env file in the backend directory:
```bash
MONGODB_URL=<your-mongodb-atlas-url>
DATABASE_NAME=hrms_lite
CORS_ORIGINS=http://localhost:5173
```

### Run the backend:
```bash
uvicorn app.main:app --reload
```
### Frontend Setup
```bash
cd frontend
npm install
```

### Create a .env file in the frontend directory:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

### Run the frontend:
```bash
npm run dev
```