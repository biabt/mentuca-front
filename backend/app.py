from fastapi import FastAPI
from auth.auth import router as auth_router
from database import get_db, Base, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em desenvolvimento pode ser "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    GZipMiddleware, minimum_size=500
)  # Comprime respostas maiores que 500 bytes

Base.metadata.create_all(bind=engine)

# inclui as rotas da pasta já com um prefixo
app.include_router(auth_router, prefix="/auth")
