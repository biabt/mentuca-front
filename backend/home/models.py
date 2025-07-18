from pydantic import BaseModel
from sqlalchemy import Column, String, ForeignKey, Numeric, TIMESTAMP, JSON
from typing import Any
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class Macroarea(Base):
    __tablename__ = "macroarea"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String, nullable=True)

class MacroareaResponse(BaseModel):
    nome: str

class Mesoarea(Base):
    __tablename__ = "mesoarea"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_macroarea = Column(UUID(as_uuid=True), ForeignKey("macroarea.id"), nullable=False)
    nome = Column(String, nullable=True)

class MesoreaResponse(BaseModel):
    id_macroarea: str
    nome: str

class Microarea(Base):
    __tablename__ = "microarea"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_mesoarea = Column(UUID(as_uuid=True), ForeignKey("mesoarea.id"), nullable=False)
    nome = Column(String, nullable=True)

class MicroareaResponse(BaseModel):
    id_mesoarea: str
    nome: str

class Lesson(Base):
    __tablename__ = "lesson"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_mesoarea = Column(UUID(as_uuid=True), ForeignKey("mesoarea.id"), nullable=False)
    id_microarea = Column(UUID(as_uuid=True), ForeignKey("microarea.id"), nullable=False)
    nivel_associado = Column(Numeric, nullable=False)
    orden_no_nivel = Column(Numeric, nullable=False)
    type = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default="now()")

class LessonResponse(BaseModel):
    id_mesoarea: str
    id_microarea: str
    nivel_associado: int
    orden_no_nivel: int
    type: str

class Question(Base):
    __tablename__ = "question"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_microarea = Column(UUID(as_uuid=True), ForeignKey("microarea.id"), nullable=False)
    type = Column(String, nullable=False)
    source = Column(String, nullable=True)
    prova = Column(String, nullable=True)
    question_json = Column(JSON, nullable=False)
    difficulty = Column(Numeric, nullable=False)
    created_at = Column(TIMESTAMP, server_default="now()")

class QuestionResponse(BaseModel):
    id_microarea: str
    type: str
    source: str
    prova: str
    question: Any
    difficulty: int