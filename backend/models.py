from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
import datetime
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class MentalAssessment(Base):
    __tablename__ = "mental_assessment"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    coping_strategies = Column(Float)
    appetite = Column(Float)
    relationships = Column(Float)
    energy = Column(Float)
    sleep = Column(Float)
    mood = Column(String)
    sentiment = Column(String)
    overall_score = Column(Float)
    improvement_suggestion = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
