from pydantic import BaseModel
from sqlalchemy import Column, String, Boolean, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hashed_password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    telefone = Column(String, nullable=True)
    cpf = Column(String, nullable=False)
    tipo_chave_pix = Column(String, nullable=False)
    chave_pix = Column(String, nullable=False)
    balance = Column(Numeric(12, 2), default=0)
    isadmin = Column(Boolean, default=False)
    issuperadmin = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default="now()")
    cantransaction = Column(Boolean, default=True)


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    username: str
    email: str
    password: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class ResetPasswordEmailRequest(BaseModel):
    email: str
