from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.routers import restaurants, recommendation

app = FastAPI(
    title="Fork & Star API",
    description="Backend for Fork & Star — premium restaurant recommendation system",
    version="1.0.0",
)

# Custom middleware to handle OPTIONS requests
class OptionsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            origin = request.headers.get("origin", "http://localhost:3000")
            allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://192.0.0.2:3000"]
            if origin not in allowed_origins:
                origin = "http://localhost:3000"
            return Response(
                status_code=200,
                headers={
                    "Access-Control-Allow-Origin": origin,
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            )
        return await call_next(request)

# CORS - Must be added before routers (middlewares are applied in reverse order)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://192.0.0.2:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Add OPTIONS middleware AFTER CORS (it will be applied first due to reverse order)
app.add_middleware(OptionsMiddleware)

# Routers
app.include_router(restaurants.router)
app.include_router(recommendation.router)

# Root route
@app.get("/")
def root():
    return {"message": "🚀 Fork & Star backend running"}

# Health check endpoint
@app.get("/health")
def health():
    return {"status": "healthy"}