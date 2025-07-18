from fastapi import APIRouter, HTTPException, Response, Depends, Cookie
from passlib.hash import bcrypt
from auth.models import *
from auth.jwt_token import *
from sqlalchemy.orm import Session
from database import get_db, Base, engine
from auth.email_integration import send_reset_email

router = APIRouter()


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    email = db.query(User).filter_by(email=data.email).first()
    if email:
        raise HTTPException(status_code=409, detail="Este email já está em uso")
    cpf = db.query(User).filter_by(cpf=data.cpf).first()
    if cpf:
        raise HTTPException(status_code=409, detail="Este CPF já está em uso")

    new_user = User(
        hashed_password=get_password_hash(data.password),
        email=data.email,
        cpf=data.cpf,
        telefone=data.telefone,
        tipo_chave_pix=data.tipo_chave_pix,
        chave_pix=data.chave_pix,
        isadmin=False,
        issuperadmin=False,
        cantransaction=True,
    )
    db.add(new_user)
    db.commit()
    return {"message": "Usuário registrado com sucesso"}


@router.post("/login")
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    # define se o data.emailOrCpf é um email ou cpf
    if "@" in data.emailOrCpf:
        user = db.query(User).filter_by(email=data.emailOrCpf).first()
    else:
        user = db.query(User).filter_by(cpf=data.emailOrCpf).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": user.email})
    response.set_cookie(key="access_token", value=token, httponly=True)
    return {"message": "Login bem-sucedido"}


# rout para verficiar o token com o cookie do jwt
@router.get("/verify")
def verify(db: Session = Depends(get_db), access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Token não fornecido")

    payload = verify_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(User).filter_by(email=payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return {
        "id": user.id,
        "email": user.email,
        "isadmin": user.isadmin,
        "balance": str(user.balance),
    }


# rout para criar token de reset password
@router.post("/forgot-password")
def forgot_password(data: ResetPasswordEmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Este email não está cadastrado")

    token = create_reset_token(user.email)
    reset_link = f"http://localhost:8081/redefinir-senha?token={token}"
    send_reset_email(user.email, reset_link)
    return {"message": "Instruções de redefinição enviadas por e-mail"}


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        payload = decode_access_token(data.token)
        email = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token expirado")
    except jwt.JWTError:
        raise HTTPException(status_code=400, detail="Token inválido")

    user = db.query(User).filter_by(email=email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Senha redefinida com sucesso"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout efetuado com sucesso"}
