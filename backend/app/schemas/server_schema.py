# schemas/server_schema.py
from pydantic import BaseModel

class ServerBase(BaseModel):
    name: str

class ServerCreate(ServerBase):
    pass

class Server(ServerBase):
    id: int

    class Config:
        orm_mode = True
