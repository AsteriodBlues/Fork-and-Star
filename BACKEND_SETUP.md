# 🛠️ Backend Startup Instructions

## Quick Start

### Option 1: Use the startup script (Recommended)
```bash
# From the project root directory
./start_backend.sh
```

### Option 2: Manual startup
```bash
# Navigate to backend directory
cd backend/fork_and_star_backend

# Activate virtual environment (if it exists)
source venv/bin/activate
# OR
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Verification

Once the backend is running, you should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using StatReload
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Testing the Backend

### Test in terminal:
```bash
curl http://127.0.0.1:8000/
```

### Test in browser:
- Main API: http://127.0.0.1:8000/
- API Documentation: http://127.0.0.1:8000/docs
- Interactive docs: http://127.0.0.1:8000/redoc

## Troubleshooting

### If you get "Connection refused":
1. Make sure you're in the right directory
2. Check if the virtual environment is activated
3. Verify all dependencies are installed
4. Check if the `.fork_env` file exists (for database connections)

### If you get permission errors:
```bash
chmod +x start_backend.sh
```

### If you get Python/dependency errors:
```bash
# Create fresh virtual environment
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Environment Variables

The backend requires a `.fork_env` file for database and Google Cloud configurations. Make sure this file exists in the `backend/fork_and_star_backend/` directory.

## Frontend Integration

Once the backend is running, the frontend will automatically connect to `http://127.0.0.1:8000`. You'll see a green status indicator in the top-right corner of the explore page when the connection is successful.
