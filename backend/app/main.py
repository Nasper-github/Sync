from fastapi import FastAPI
from app.api.endpoints import documents

app = FastAPI()

app.include_router(documents.router, prefix="/documents", tags=["documents"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
