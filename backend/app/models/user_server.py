# models/user_server.py

from sqlalchemy import Table, Column, Integer, ForeignKey
from app.core.base_class import Base  # statt database.py importieren

user_server_table = Table(
    "user_server",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("server_id", Integer, ForeignKey("servers.id"), primary_key=True),
)
