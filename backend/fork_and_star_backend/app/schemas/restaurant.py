from pydantic import BaseModel
from typing import List, Optional

class RestaurantBase(BaseModel):
    name: str
    country: str
    city: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cuisine: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    awards: List[str] = []
    source_lists: List[str] = []

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(RestaurantBase):
    pass

class RestaurantOut(RestaurantBase):
    id: int

    class Config:
        from_attributes = True  # ✅ This is the new way in Pydantic v2