import os
from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from jose import JWTError, jwt  # bessere JWT lib für FastAPI, falls du sie nutzen willst
from sqlalchemy.orm import Session
from app.models.user import User
from fastapi import HTTPException, status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY") or "fallback_secret_key"  # aus env laden oder Fallback
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 Tag

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    # Wichtig: User-ID als sub speichern
    if "sub" not in to_encode:
        # Beispiel, falls du data z.B. {"user_id": 3} übergibst, dann hier umwandeln:
        to_encode["sub"] = str(data.get("user_id") or data.get("sub") or "")
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token_and_get_user(token: str, db: Session) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str = payload.get("sub")

        if user_id_str is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token enthält keine User-ID",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # User-ID aus Token in int wandeln
        user_id = int(user_id_str)

    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Ungültiges Token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Benutzer nicht gefunden",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user