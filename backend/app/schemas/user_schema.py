from pydantic import BaseModel, EmailStr, constr, Field
from typing import Type

# Alias als Typ, Pylance akzeptiert das besser
UsernameStr = constr(min_length=3, max_length=50)
PasswordStr = constr(min_length=6)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
