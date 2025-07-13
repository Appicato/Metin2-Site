from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.server_schema import Server, ServerCreate
from app.crud import crud_servers
from app.core.database import get_db

from app.schemas.server_schema import Server

router = APIRouter()

@router.get("/servers/", response_model=List[Server])
def read_servers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_servers.get_servers(db, skip=skip, limit=limit)

@router.post("/servers/", response_model=Server)
def create_server(server: ServerCreate, db: Session = Depends(get_db)):
    db_server = crud_servers.get_server_by_name(db, name=server.name)
    if db_server:
        raise HTTPException(status_code=400, detail="Server already exists")
    return crud_servers.create_server(db, server)

@router.get("/servers/{server_id}", response_model=Server)
def read_server(server_id: int, db: Session = Depends(get_db)):
    server = crud_servers.get_server(db, server_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server nicht gefunden")
    return server