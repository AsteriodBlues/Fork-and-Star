#!/bin/bash
# Backend Startup Script for Fork & Star

echo "🚀 Starting Fork & Star Backend..."

# Change to backend directory
cd "$(dirname "$0")/backend/fork_and_star_backend"

# Check if we're in the right directory
if [ ! -f "app/main.py" ]; then
    echo "❌ Error: Cannot find app/main.py. Make sure you're running this from the project root."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ] && [ ! -d ".venv" ]; then
    echo "📦 Virtual environment not found. Creating one..."
    python3 -m venv venv
fi

# Activate virtual environment
if [ -d "venv" ]; then
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
elif [ -d ".venv" ]; then
    echo "🔧 Activating virtual environment..."
    source .venv/bin/activate
fi

# Install requirements if needed
echo "📦 Installing/updating dependencies..."
pip install -r requirements.txt

# Check if environment file exists
if [ ! -f ".fork_env" ]; then
    echo "⚠️  Warning: .fork_env file not found. Some features may not work properly."
    echo "💡 Make sure to create .fork_env with your Google Cloud credentials and database settings."
fi

# Start the server
echo "🌟 Starting FastAPI server on http://127.0.0.1:8000"
echo "📝 API docs will be available at http://127.0.0.1:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
