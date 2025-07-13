# app/api/v1/auth.py

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user_schema import Token, UserCreate, UserOut
from app.utils.security import hash_password, verify_password, create_access_token
from app.schemas.user_schema import Token  # Dein Pydantic Schema

router = APIRouter()

# Registrierung
@router.post("/auth/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_create: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.username == user_create.username) | (User.email == user_create.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Benutzername oder Email bereits vergeben")

    user = User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=hash_password(user_create.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Login (JWT erzeugen)
@router.post("/auth/login", response_model=Token)
def login(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Falscher Benutzername oder Passwort"
        )
    
    # 👉 Hier wichtig: User-ID ins Token schreiben!
    access_token_expires = timedelta(days=1)
    access_token = create_access_token(
        data={"sub": str(user.id)},  # User-ID statt Username!
        expires_delta=access_token_expires,
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# Logout (optional, meist Frontend: Token löschen)
@router.post("/auth/logout")
def logout():
    # Backend-seitig muss meist nichts passieren, da JWT stateless ist.
    # Im Frontend löscht man den Token einfach (localStorage.clear etc.).
    return {"msg": "Logout erfolgreich"}
