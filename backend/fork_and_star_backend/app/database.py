from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Dummy DB config (only needed if you use local DB features)
SQLALCHEMY_DATABASE_URL = "sqlite:///./dummy.db"  # Replace with real DB if needed

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    Dummy DB dependency for compatibility — replace if you use local DB.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()