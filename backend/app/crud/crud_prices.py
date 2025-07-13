from sqlalchemy.orm import Session
from app.models.price import Price
from app.schemas.item_schema import PriceCreate

def create_price(db: Session, price: PriceCreate, item_id: int):
    db_price = Price(
        price=price.price,
        item_id=item_id,
        currency=price.currency if hasattr(price, "currency") else "yang",
        user_id=price.user_id if hasattr(price, "user_id") else None,
        server_id=price.server_id if hasattr(price, "server_id") else None,
        trust_level=price.trust_level if hasattr(price, "trust_level") else 1.0,
        # !!! Entferne hier server=price.server !!!
    )
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price

def get_prices_by_item(db: Session, item_id: int):
    return db.query(Price).filter(Price.item_id == item_id).all()
