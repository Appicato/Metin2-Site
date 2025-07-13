from sqlalchemy.orm import Session
from app.models.item import Item
from app.models.price import Price
from app.schemas.item_schema import ItemCreate
from typing import List
from sqlalchemy.orm import Session, joinedload
from app.models.item import Item
from sqlalchemy.orm import joinedload

def get_item(db: Session, item_id: int):
    return db.query(Item).filter(Item.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Item)
        .options(joinedload(Item.prices))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_items_by_server(db: Session, server_id: int, skip: int = 0, limit: int = 100) -> List[Item]:
    items = (
        db.query(Item)
        .options(joinedload(Item.prices))  # Preise mitladen
        .filter(Item.server_id == server_id)  # Items für den Server
        .offset(skip)
        .limit(limit)
        .all()
    )
    
    # Optional: Preise filtern, damit nur Preise des Servers in `prices` sind
    for item in items:
        item.prices = [p for p in item.prices if p.server_id == server_id]
    
    return items

def create_item(db: Session, item: ItemCreate):
    db_item = Item(
        name=item.name,
        description=item.description,
        icon_url=item.icon_url,
        server_id=item.server_id  # <-- hier!
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_item_with_price(db: Session, item: ItemCreate):
    db_item = Item(
        name=item.name,
        description=item.description,
        icon_url=item.icon_url,
        server_id=item.server_id,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    # Preis anlegen
    if item.price:
        new_price = Price(
            price=item.price.amount,
            currency=item.price.currency,
            server_id=item.server_id,
            item_id=db_item.id,
        )
        db.add(new_price)
        db.commit()
        db.refresh(new_price)

    return db_item