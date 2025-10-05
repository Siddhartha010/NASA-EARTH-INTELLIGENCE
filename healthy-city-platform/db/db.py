import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import metadata

# Allow DATABASE_URL to be provided by environment (e.g. Vercel env vars).
DATABASE_URL = os.environ.get('DATABASE_URL')

if not DATABASE_URL:
    # default to a local sqlite file for development
    DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'db')
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR, exist_ok=True)
    DB_PATH = os.path.join(DB_DIR, 'app.db')
    DATABASE_URL = f'sqlite:///{DB_PATH}'

# Use connect_args only for sqlite
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith('sqlite:') else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # create tables
    metadata.create_all(bind=engine)
