from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import restaurants
from app.database import engine
from app.models import restaurant

# Create tables
restaurant.Base.metadata.create_all(bind=engine)

# Init FastAPI app
app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# Add CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(restaurants.router)

# Root health check
@app.get("/")
def read_root():
    return {"message": "Fork & Star backend running 🚀"}