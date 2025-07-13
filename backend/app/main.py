from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import items, prices, servers, users  # servers importieren
from fastapi import FastAPI
from app.routers import auth
# create tables from app.core.database import Base, engine
# # create tables from app.models import item, price  # oder wo immer deine Models sind

app = FastAPI(
    title="MetaDrop API",
    version="1.0.0"
)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # falls du mit http://localhost:8000 vom Frontend aus arbeitest:
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# create tables Base.metadata.create_all(bind=engine)

app.include_router(items.router, prefix="/api/v1")
app.include_router(prices.router, prefix="/api/v1")
app.include_router(servers.router, prefix="/api/v1")  # prefix /api/v1 setzen!

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1")