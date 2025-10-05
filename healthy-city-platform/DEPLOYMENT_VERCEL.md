# Deploying Healthy City Platform to Vercel (Full App)

This document explains how to deploy the entire `healthy-city-platform` (frontend + FastAPI backend) to Vercel.

Important note about persistence
- Vercel serverless functions have an ephemeral filesystem. Do NOT rely on a local SQLite file for production persistence.
- Provide a cloud database (Postgres) and set its connection string in the `DATABASE_URL` environment variable in the Vercel dashboard.

Quick steps
1. Commit and push your repo to GitHub (or connect your Git provider to Vercel).
2. In the Vercel dashboard, create a new project and import the repository. Set the root directory to `healthy-city-platform`.
3. Add environment variables in Vercel for the project:
   - `DATABASE_URL` — a full SQLAlchemy-compatible DB URL (e.g. `postgresql://user:pass@host:5432/dbname`).
   - (Optional) `SECRET_KEY` — used by any auth/token mechanisms you add later.
4. Deploy. Vercel will run the `api/index.py` Python ASGI entrypoint and serve static files from `/frontend`.

Local development (recommended)
1. Create a Python virtualenv and install dependencies:
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
2. Start the backend locally (development):
   uvicorn backend.main:app --reload --port 8000
3. Open the frontend by serving the `frontend` folder (or open `frontend/index.html` directly).

Notes and recommended follow-ups
- Use a managed Postgres (Render, Neon, Heroku Postgres, Supabase) and set the `DATABASE_URL` in Vercel.
- Consider switching from demo tokens to JWTs and add auth middleware to protect endpoints.
- For larger workloads, host the backend on a platform designed for persistent ASGI apps (Render, Fly, Railway) and keep frontend on Vercel.
