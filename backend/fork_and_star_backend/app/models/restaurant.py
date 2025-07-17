from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY
from sqlalchemy.ext.mutable import MutableList

from app.database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    city = Column(String, nullable=False)
    latitude = Column(Float)
    longitude = Column(Float)
    cuisine = Column(String)
    description = Column(String)
    image_url = Column(String)
    awards = Column(MutableList.as_mutable(PG_ARRAY(String)), default=[])
    source_lists = Column(MutableList.as_mutable(PG_ARRAY(String)), default=[])