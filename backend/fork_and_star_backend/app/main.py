from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import restaurants, recommendation
import uvicorn
import os

app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# CORS - Updated for Railway deployment
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*",  # Allow all origins for deployment (we'll restrict this later)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(restaurants.router)
app.include_router(recommendation.router)

# Root route
@app.get("/")
def root():
    return {"message": "🚀 Fork & Star backend running"}

# Server startup for Railway
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)