from sqlalchemy import Table, Column, Integer, String, DateTime, Text, Float, MetaData
from sqlalchemy.orm import registry
from datetime import datetime

mapper_registry = registry()
metadata = MetaData()

users_table = Table(
    'users', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('name', String, nullable=False),
    Column('email', String, nullable=False, unique=True),
    Column('password_hash', String, nullable=False),
    Column('role', String, nullable=True),
    Column('created_at', DateTime, default=datetime.utcnow)
)

reports_table = Table(
    'reports', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('report_id', String, nullable=False, unique=True),
    Column('category', String, nullable=False),
    Column('description', Text),
    Column('lat', Float),
    Column('lon', Float),
    Column('reporter_id', String),
    Column('timestamp', DateTime, default=datetime.utcnow),
    Column('status', String, default='submitted')
)

class User:
    def __init__(self, name, email, password_hash, role='astronaut'):
        self.name = name
        self.email = email
        self.password_hash = password_hash
        self.role = role
        self.created_at = datetime.utcnow()

class Report:
    def __init__(self, report_id, category, description, lat=None, lon=None, reporter_id='anonymous'):
        self.report_id = report_id
        self.category = category
        self.description = description
        self.lat = lat
        self.lon = lon
        self.reporter_id = reporter_id
        self.timestamp = datetime.utcnow()
        self.status = 'submitted'

mapper_registry.map_imperatively(User, users_table)
mapper_registry.map_imperatively(Report, reports_table)
