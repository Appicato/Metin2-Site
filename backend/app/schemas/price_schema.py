from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class PriceBase(BaseModel):
    price: float
    currency: Optional[str] = "yang"
    user_id: Optional[int] = None
    server_id: Optional[int] = None
    trust_level: Optional[float] = 1.0

class PriceCreate(BaseModel):
    amount: int
    currency: str = "Yang"
    # server_id nicht nötig – wir nehmen das vom Item

class Price(BaseModel):
    id: int
    price: int
    currency: str
    trust_level: int
    server_id: int | None
    created_at: Optional[datetime] = None
    trust_level: Optional[int] = None

    class Config:
        orm_mode = True
