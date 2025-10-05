import os
from backend.main import app as fastapi_app

# Vercel expects a WSGI/ASGI app named 'app' at the function entry.
app = fastapi_app

# Optional: initialize DB if using an externally mounted DB URL
db_url = os.environ.get('DATABASE_URL')
if db_url:
    try:
        # If the project uses SQLAlchemy db module, init tables
        from db.db import init_db
        init_db()
    except Exception:
        # ignore init errors in serverless environment
        pass
