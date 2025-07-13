# models/item.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.base_class import Base  # statt database.py importieren

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    icon_url = Column(String, nullable=True)
    server_id = Column(Integer, ForeignKey("servers.id"))  # <-- hier FK hinzufügen

    server = relationship("Server", back_populates="items")  # <-- Gegenbeziehung

    prices = relationship("Price", back_populates="item")
