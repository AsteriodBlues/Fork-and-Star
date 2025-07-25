from fastapi import APIRouter, HTTPException, Query
from google.cloud import bigquery
from google.oauth2 import service_account
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(".fork_env")

# Get configuration from environment variables
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
DATASET_ID = os.getenv("BQ_DATASET_ID", "fork_and_star_cleaned")
TABLE_ID = os.getenv("BQ_TABLE_ID", "master_restaurants_with_clusters")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Validate required environment variables
if not PROJECT_ID:
    raise ValueError("GCP_PROJECT_ID is not set in .fork_env")
if not CREDENTIALS_PATH:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is not set in .fork_env")

# Verify credentials file exists
if not os.path.exists(CREDENTIALS_PATH):
    raise ValueError(f"Credentials file not found at: {CREDENTIALS_PATH}")

# Load BigQuery credentials
try:
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
except Exception as e:
    raise ValueError(f"Failed to load Google Cloud credentials: {e}")

router = APIRouter(prefix="/restaurants", tags=["restaurants"])

@router.get("/")
def get_restaurants(
    limit: int = 10,
    skip: int = 0,
    country: str = None,
    cuisine: str = None,
    badge: str = None,
    reputation_label: str = None,
    cluster: int = None,
    order_by: str = "Recalculated_Score DESC"
):
    try:
        query = f"""
            SELECT *
            FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
            WHERE TRUE
        """
        if country:
            query += f" AND LOWER(Country) LIKE '%{country.lower()}%'"
        if cuisine:
            query += f" AND LOWER(Cuisine) LIKE '%{cuisine.lower()}%'"
        if badge:
            query += f" AND LOWER(Badge_List) LIKE '%{badge.lower()}%'"
        if reputation_label:
            query += f" AND LOWER(Reputation_Label) = '{reputation_label.lower()}'"
        if cluster is not None:
            query += f" AND Cluster = {cluster}"

        query += f" ORDER BY {order_by} LIMIT {limit} OFFSET {skip}"

        rows = client.query(query).result()
        return [dict(row) for row in rows]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
def search_restaurants(q: str, limit: int = 10):
    try:
        # Return complete restaurant data for search results
        query = f"""
            SELECT 
                ID as id,
                Name as name,
                Cuisine as cuisine,
                Country as country,
                City as city,
                Reputation_Label as reputation,
                Badge_List as badges,
                Cluster as cluster
            FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
            WHERE
                LOWER(Name) LIKE '%{q.lower()}%' OR
                LOWER(Cuisine) LIKE '%{q.lower()}%' OR
                LOWER(Country) LIKE '%{q.lower()}%'
            ORDER BY Name
            LIMIT {limit}
        """
        rows = client.query(query).result()
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
def get_stats():
    try:
        query = f"""
            SELECT
                COUNT(*) AS total_restaurants,
                COUNT(DISTINCT Country) AS unique_countries,
                COUNT(DISTINCT Cuisine) AS unique_cuisines,
                COUNT(DISTINCT Reputation_Label) AS unique_reputation_labels
            FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
        """
        row = list(client.query(query).result())[0]
        return dict(row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))