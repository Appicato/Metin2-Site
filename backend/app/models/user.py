from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.core.base_class import Base  # statt database.py importieren

# Association Table Many-to-Many User <-> Server
user_server = Table(
    'user_server',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('server_id', Integer, ForeignKey('servers.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

    servers = relationship(
        "Server",
        secondary=user_server,
        back_populates="users"
    )
