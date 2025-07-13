# app/api/v1/users.py (neues File oder in deinem Users-API)

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User  # SQLAlchemy User-Model
from app.schemas.user_schema import UserOut  # Pydantic Schema für Response
from app.utils.security import verify_token_and_get_user  # Beispiel-Funktion für JWT-Validierung

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  # Tokenquelle

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    user = verify_token_and_get_user(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ungültiger Authentifizierungs-Token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.get("/users/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
