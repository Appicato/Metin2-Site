from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.price_schema import Price, PriceCreate  # <--- hier korrigiert
import app.crud.crud_prices as crud_prices
import app.crud.crud_items as crud_items

router = APIRouter()

@router.post("/items/{item_id}/prices/", response_model=Price)
def create_price_for_item(item_id: int, price: PriceCreate, db: Session = Depends(get_db)):
    db_item = crud_items.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud_prices.create_price(db, price=price, item_id=item_id)

@router.get("/items/{item_id}/prices/", response_model=List[Price])
def read_prices_for_item(item_id: int, db: Session = Depends(get_db)):
    return crud_prices.get_prices_by_item(db, item_id=item_id)
