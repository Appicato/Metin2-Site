from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.schemas.price_schema import Price
from app.schemas.price_schema import PriceCreate

# ----- Price Schemas -----
class PriceBase(BaseModel):
    price: float
    currency: str
    trust_level: Optional[float] = None
    server_id: Optional[int] = None

class PriceCreate(BaseModel):
    amount: int  # z.B. 50000 für 50k Yang
    currency: str = "Yang"  # falls du verschiedene Währungen hast

class Price(PriceBase):
    id: int
    item_id: int
    created_at: Optional[datetime]

    class Config:
        orm_mode = True

# ----- Item Schemas -----
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon_url: Optional[str] = None
    server_id: int  # Server zuordnen

class ItemCreate(ItemBase):
    price: PriceCreate

class Item(ItemBase):
    id: int
    description: Optional[str] = None
    icon_url: Optional[str] = None
    prices: List[Price] = []

    class Config:
        orm_mode = True