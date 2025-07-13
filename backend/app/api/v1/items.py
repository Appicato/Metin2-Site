from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.item_schema import Item, ItemCreate
from app.crud import crud_items
from app.core.database import get_db

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/", response_model=List[Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_items.get_items(db, skip=skip, limit=limit)

@router.post("/", response_model=Item)
def create_new_item(item: ItemCreate, db: Session = Depends(get_db)):
    return crud_items.create_item_with_price(db, item)

@router.get("/by-server/{server_id}", response_model=List[Item])
def read_items_by_server(
    server_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    items = crud_items.get_items_by_server(db, server_id=server_id, skip=skip, limit=limit)
    return items

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = crud_items.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item nicht gefunden")
    return item

