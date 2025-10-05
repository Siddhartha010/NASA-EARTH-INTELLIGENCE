from fastapi import APIRouter, HTTPException
from typing import Dict
from db.db import SessionLocal, init_db
from db.models import User
from passlib.hash import bcrypt as bcrypt_hasher

router = APIRouter()

# Ensure DB initialized
init_db()

@router.post('/signup')
def signup(user_data: Dict):
    session = SessionLocal()
    try:
        email = user_data.get('email')
        name = user_data.get('name') or (email.split('@')[0] if email else 'user')
        password = user_data.get('password')
        if not email or not password:
            raise HTTPException(status_code=400, detail='email and password are required')

        # Check existing
        existing = session.query(User).filter(User.email == email).first()
        if existing:
            raise HTTPException(status_code=400, detail='User already exists')

        password_hash = bcrypt_hasher.hash(password)
        user = User(name=name, email=email, password_hash=password_hash, role='astronaut')
        session.add(user)
        session.commit()
        session.refresh(user)

        # Return a simple token (demo) and user info
        return { 'token': f'user_token_{user.id}', 'user': { 'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role } }
    finally:
        session.close()


@router.post('/login')
def login(creds: Dict):
    session = SessionLocal()
    try:
        email = creds.get('email')
        password = creds.get('password')
        if not email or not password:
            raise HTTPException(status_code=400, detail='email and password required')

        user = session.query(User).filter(User.email == email).first()
        if not user or not bcrypt_hasher.verify(password, user.password_hash):
            raise HTTPException(status_code=401, detail='Invalid credentials')

        return { 'token': f'user_token_{user.id}', 'user': { 'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role } }
    finally:
        session.close()
