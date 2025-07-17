from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.restaurant import Restaurant
from app.schemas import restaurant as schemas


def create_restaurant(db: Session, restaurant: schemas.RestaurantCreate) -> Restaurant:
    db_restaurant = Restaurant(
        name=restaurant.name,
        country=restaurant.country,
        city=restaurant.city,
        latitude=restaurant.latitude,
        longitude=restaurant.longitude,
        cuisine=restaurant.cuisine,
        description=restaurant.description,
        image_url=restaurant.image_url,
        awards=restaurant.awards,
        source_lists=restaurant.source_lists
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant


def get_restaurant(db: Session, restaurant_id: int) -> Optional[Restaurant]:
    return db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()


def get_restaurants(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    country: Optional[str] = None,
    city: Optional[str] = None,
    cuisine: Optional[str] = None,
    award: Optional[str] = None,
    source_list: Optional[str] = None
) -> List[Restaurant]:
    query = db.query(Restaurant)

    if country:
        query = query.filter(Restaurant.country.ilike(f"%{country}%"))
    if city:
        query = query.filter(Restaurant.city.ilike(f"%{city}%"))
    if cuisine:
        query = query.filter(Restaurant.cuisine.ilike(f"%{cuisine}%"))
    if award:
        query = query.filter(Restaurant.awards.any(award))
    if source_list:
        query = query.filter(Restaurant.source_lists.any(source_list))

    return query.offset(skip).limit(limit).all()


def update_restaurant(db: Session, restaurant_id: int, updates: schemas.RestaurantUpdate) -> Optional[Restaurant]:
    db_restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not db_restaurant:
        return None

    for var, value in vars(updates).items():
        if value is not None:
            setattr(db_restaurant, var, value)

    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant


def delete_restaurant(db: Session, restaurant_id: int) -> bool:
    db_restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not db_restaurant:
        return False

    db.delete(db_restaurant)
    db.commit()
    return True