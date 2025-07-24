from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import uvicorn

#Load .fork_env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".fork_env"))

if not os.getenv("GCP_PROJECT_ID"):
    raise ValueError("GCP_PROJECT_ID environment variable is required")

#Single FastAPI app instance with metadata
app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# CORS Middleware setup
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://fork-and-star.vercel.app",
    "https://*.vercel.app",  
    "*"  # You can later restrict this to production frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Routers
from app.routers import restaurants, recommendation
app.include_router(restaurants.router)
app.include_router(recommendation.router)

#Root route
@app.get("/")
def root():
    return {"message": "🚀 Fork & Star backend running"}

#Server startup for local or Railway
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)