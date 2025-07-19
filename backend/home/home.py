from typing import List
from fastapi import APIRouter, HTTPException, Response, Depends, Cookie
from passlib.hash import bcrypt
from home.models import *
from sqlalchemy.orm import Session
from database import get_db, Base, engine

#_______MACROAREA________

macro_router = APIRouter(prefix="/macroareas")

@macro_router.get("/", response_model=List[MacroareaResponse])
def get_all_macros(db: Session = Depends(get_db)):
    print("fazendo query de macroareas")
    return db.query(Macroarea).all()

@macro_router.get("/by-name/{name}", response_model=List[MacroareaResponse])
def get_macro_by_name(name: str, db: Session = Depends(get_db)):
    results = db.query(Macroarea).filter(Macroarea.nome.ilike(f"%{name}%")).all()
    if not results:
        raise HTTPException(status_code=404, detail="Macroarea não encontrada")
    return results

#_______MESOAREA________

meso_router = APIRouter(prefix="/mesoareas")

@meso_router.get("/", response_model=List[MesoreaResponse])
def get_all_mesos(db: Session = Depends(get_db)):
    return db.query(Mesoarea).all()

@meso_router.get("/by-name/{name}", response_model=List[MesoreaResponse])
def get_meso_by_name(name: str, db: Session = Depends(get_db)):
    results = db.query(Mesoarea).filter(Mesoarea.nome.ilike(f"%{name}%")).all()
    if not results:
        raise HTTPException(status_code=404, detail="Mesoarea não encontrada")
    return results

#_______MICROAREA________

micro_router = APIRouter(prefix="/microareas")

@micro_router.get("/", response_model=List[MicroareaResponse])
def get_all_micros(db: Session = Depends(get_db)):
    return db.query(Microarea).all()

@micro_router.get("/by-name/{name}", response_model=List[MicroareaResponse])
def get_micro_by_name(name: str, db: Session = Depends(get_db)):
    results = db.query(Microarea).filter(Microarea.nome.ilike(f"%{name}%")).all()
    if not results:
        raise HTTPException(status_code=404, detail="Microarea não encontrada")
    return results

#_______QUESTION________

question_router = APIRouter(prefix="/questions")

@question_router.get("/", response_model=List[QuestionResponse])
def get_all_questions(db: Session = Depends(get_db)):
    return db.query(Question).all()

@question_router.get("/by-microarea/{microarea_id}", response_model=List[QuestionResponse])
def get_questions_by_microarea_id(microarea_id: str, db: Session = Depends(get_db)):
    return db.query(Question).filter(Question.id_microarea == microarea_id).all()

#_______LESSON________

lesson_router = APIRouter(prefix="/lessons")

@lesson_router.get("/", response_model=List[LessonResponse])
def get_all_lessons(db: Session = Depends(get_db)):
    return db.query(Lesson).all()

@lesson_router.get("/by-mesoarea/{mesoarea_id}", response_model=List[LessonResponse])
def get_lessons_by_mesoarea_id(mesoarea_id: str, db: Session = Depends(get_db)):
    return db.query(Lesson).filter(Lesson.id_mesoarea == mesoarea_id).all()

