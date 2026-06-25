#!/bin/bash

# Navigate to backend directory
cd "$(dirname "$0")"

# Activate virtualenv
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "Virtual environment not found, creating..."
    python3 -m venv venv
    source venv/bin/activate
fi

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Seed database
echo "Seeding database with mock records..."
python seed.py

# Run FastAPI server
echo "Starting FastAPI server on http://127.0.0.1:8000..."
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
