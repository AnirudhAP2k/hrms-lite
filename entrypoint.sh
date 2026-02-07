#!/bin/sh
set -e

echo "Starting backend..."
cd backend
pip install --no-cache-dir -r requirements.txt

uvicorn app.main:app \
  --host 0.0.0.0 \
  --port 8000 &

echo "Starting frontend build..."
cd ../frontend
npm install
npm run build

echo "Serving frontend..."
npx serve -s dist -l 3000
