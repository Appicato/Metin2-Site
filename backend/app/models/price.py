from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.base_class import Base  # statt database.py importieren
import datetime

class Price(Base):
    __tablename__ = "item_prices"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    price = Column(Integer)
    currency = Column(String)
    trust_level = Column(Integer)
    server_id = Column(Integer, ForeignKey("servers.id"), nullable=True)
    #created_at = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    item = relationship("Item", back_populates="prices")