from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import restaurants, recommendation

app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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