from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.base_class import Base
from app.models.user import user_server

class Server(Base):
    __tablename__ = 'servers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)

    users = relationship(
        "User",
        secondary=user_server,
        back_populates="servers"
    )

    items = relationship("Item", back_populates="server", cascade="all, delete-orphan")  # Items-Beziehung hinzugefügt
