from sqlalchemy.orm import Session
from app.models.server import Server
from app.schemas.server_schema import ServerCreate

def get_servers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Server).offset(skip).limit(limit).all()

def get_server(db: Session, server_id: int):
    return db.query(Server).filter(Server.id == server_id).first()

def get_server_by_name(db: Session, name: str):
    return db.query(Server).filter(Server.name == name).first()

def create_server(db: Session, server: ServerCreate):
    db_server = Server(name=server.name)
    db.add(db_server)
    db.commit()
    db.refresh(db_server)
    return db_server
