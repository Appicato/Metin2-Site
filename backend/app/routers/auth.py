# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserOut, Token
from app.utils.security import hash_password, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user_create: UserCreate, db: Session = Depends(get_db)):
    user_by_username = db.query(User).filter(User.username == user_create.username).first()
    user_by_email = db.query(User).filter(User.email == user_create.email).first()
    if user_by_username or user_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Benutzername oder Email bereits vergeben")

    hashed_pw = hash_password(user_create.password)
    new_user = User(username=user_create.username, email=user_create.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Falscher Benutzername oder Passwort")

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
