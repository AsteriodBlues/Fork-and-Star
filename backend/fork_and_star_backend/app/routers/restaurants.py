from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.crud import crud_restaurant
from app import schemas
from app.database import get_db

router = APIRouter(
    prefix="/restaurants",
    tags=["restaurants"],
)

@router.post("/", response_model=schemas.restaurant.RestaurantOut)
def create_restaurant(restaurant: schemas.restaurant.RestaurantCreate, db: Session = Depends(get_db)):
    return crud_restaurant.create_restaurant(db=db, restaurant=restaurant)

@router.get("/{restaurant_id}", response_model=schemas.restaurant.RestaurantOut)
def read_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    db_restaurant = crud_restaurant.get_restaurant(db=db, restaurant_id=restaurant_id)
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return db_restaurant

@router.get("/", response_model=List[schemas.restaurant.RestaurantOut])
def read_restaurants(
    skip: int = 0,
    limit: int = 100,
    country: Optional[str] = None,
    city: Optional[str] = None,
    cuisine: Optional[str] = None,
    award: Optional[str] = None,
    source_list: Optional[str] = None,
    db: Session = Depends(get_db)
):
    restaurants = crud_restaurant.get_restaurants(
        db,
        skip=skip,
        limit=limit,
        country=country,
        city=city,
        cuisine=cuisine,
        award=award,
        source_list=source_list
    )
    return restaurants

@router.put("/{restaurant_id}", response_model=schemas.restaurant.RestaurantOut)
def update_restaurant(restaurant_id: int, updates: schemas.restaurant.RestaurantUpdate, db: Session = Depends(get_db)):
    updated = crud_restaurant.update_restaurant(db=db, restaurant_id=restaurant_id, updates=updates)
    if updated is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return updated

@router.delete("/{restaurant_id}")
def delete_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    success = crud_restaurant.delete_restaurant(db=db, restaurant_id=restaurant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return {"ok": True}