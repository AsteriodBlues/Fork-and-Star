import random
from app.crud import crud_restaurant
from app.database import SessionLocal
from app.schemas.restaurant import RestaurantCreate

db = SessionLocal()

def get_random_image_url():
    num = random.randint(1, 1000)
    return f"/images/kaggle-dataset/food{num}.jpg"

restaurant_data = [
    {
        "name": "Narisawa",
        "country": "Japan",
        "city": "Tokyo",
        "latitude": 35.6655,
        "longitude": 139.7297,
        "cuisine": "Japanese",
        "description": "Innovative Japanese fine dining focused on nature.",
        "awards": ["Michelin 2 Stars"],
        "source_lists": ["World's 50 Best 2024"]
    },
    {
        "name": "Eleven Madison Park",
        "country": "USA",
        "city": "New York",
        "latitude": 40.7416,
        "longitude": -73.9874,
        "cuisine": "Modern American",
        "description": "Plant-based fine dining with stunning presentation.",
        "awards": ["Michelin 3 Stars"],
        "source_lists": ["NYT Top 100 2023"]
    },
    {
        "name": "Atelier Crenn",
        "country": "USA",
        "city": "San Francisco",
        "latitude": 37.7984,
        "longitude": -122.4368,
        "cuisine": "French",
        "description": "Artistic French cuisine by Chef Dominique Crenn.",
        "awards": ["Michelin 3 Stars"],
        "source_lists": ["SF Chronicle Top 100 2023"]
    },
]

for data in restaurant_data:
    data["image_url"] = get_random_image_url()
    restaurant_in = RestaurantCreate(**data)
    crud_restaurant.create_restaurant(db=db, restaurant=restaurant_in)

db.close()

print("✅ Restaurants seeded with random local images!")