from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Add a root endpoint for health check (optional)
@app.get("/")
def read_root():
    return {"status": "ok"}
