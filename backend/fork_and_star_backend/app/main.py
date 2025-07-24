from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import base64
import uvicorn
from dotenv import load_dotenv

# Local .fork_env load (skip this on Render)
if os.getenv("RENDER") != "true" and os.path.exists(".fork_env"):
    load_dotenv(".fork_env")

# Handle base64 credentials
cred_path = "/app/credentials.json"
if not os.path.exists(cred_path) and "GOOGLE_CREDENTIALS_B64" in os.environ:
    with open(cred_path, "wb") as f:
        f.write(base64.b64decode(os.environ["GOOGLE_CREDENTIALS_B64"]))

# ✅ Always set
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path

# Required project ID
if not os.getenv("GCP_PROJECT_ID"):
    raise ValueError("GCP_PROJECT_ID environment variable is required")

# FastAPI App
app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://fork-and-star.vercel.app",
    "https://*.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
from app.routers import restaurants, recommendation
app.include_router(restaurants.router)
app.include_router(recommendation.router)

@app.get("/")
def root():
    return {"message": "🚀 Fork & Star backend running"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)