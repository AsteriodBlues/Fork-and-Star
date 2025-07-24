from fastapi import APIRouter, HTTPException, Query
from google.cloud import bigquery
from google.oauth2 import service_account
import os
import json

router = APIRouter(prefix="/restaurants", tags=["restaurants"])

# Get all config from environment variables - NO hardcoded values
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
DATASET_ID = os.getenv("BQ_DATASET_ID", "fork_and_star_cleaned")
TABLE_ID = os.getenv("BQ_TABLE_ID", "master_restaurants_with_clusters")

# Validate required environment variables
if not PROJECT_ID:
    raise ValueError("GCP_PROJECT_ID environment variable is required")

def get_bigquery_client():
    creds_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if creds_json:
        try:
            creds_info = json.loads(creds_json)
            credentials = service_account.Credentials.from_service_account_info(creds_info)
            return bigquery.Client(credentials=credentials, project=PROJECT_ID)
        except Exception as e:
            print(f"Error with JSON credentials: {e}")
    
    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if creds_path and os.path.exists(creds_path):
        credentials = service_account.Credentials.from_service_account_file(creds_path)
        return bigquery.Client(credentials=credentials, project=PROJECT_ID)
    
    raise ValueError("No valid GCP credentials found")

try:
    client = get_bigquery_client()
except Exception as e:
    print(f"Failed to initialize BigQuery client: {e}")
    client = None

@router.get("/")
def get_restaurants(
    limit: int = Query(10, le=100),
    skip: int = Query(0, ge=0),
    country: str = None,
    cuisine: str = None,
    badge: str = None,
    reputation_label: str = None,
    cluster: int = None,
    order_by: str = "Recalculated_Score DESC"
):
    if not client:
        raise HTTPException(status_code=503, detail="Service unavailable")
    
    try:
        query = f"""
            SELECT *
            FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
            WHERE TRUE
        """
        
        parameters = []
        
        if country:
            query += " AND LOWER(Country) LIKE @country"
            parameters.append(bigquery.ScalarQueryParameter("country", "STRING", f"%{country.lower()}%"))
        if cuisine:
            query += " AND LOWER(Cuisine) LIKE @cuisine"
            parameters.append(bigquery.ScalarQueryParameter("cuisine", "STRING", f"%{cuisine.lower()}%"))
        if badge:
            query += " AND LOWER(Badge_List) LIKE @badge"
            parameters.append(bigquery.ScalarQueryParameter("badge", "STRING", f"%{badge.lower()}%"))
        if reputation_label:
            query += " AND LOWER(Reputation_Label) = @reputation"
            parameters.append(bigquery.ScalarQueryParameter("reputation", "STRING", reputation_label.lower()))
        if cluster is not None:
            query += " AND Cluster = @cluster"
            parameters.append(bigquery.ScalarQueryParameter("cluster", "INT64", cluster))

        allowed_orders = ["Recalculated_Score DESC", "Name ASC", "Country ASC"]
        if order_by not in allowed_orders:
            order_by = "Recalculated_Score DESC"
            
        query += f" ORDER BY {order_by} LIMIT @limit OFFSET @skip"
        parameters.extend([
            bigquery.ScalarQueryParameter("limit", "INT64", limit),
            bigquery.ScalarQueryParameter("skip", "INT64", skip)
        ])

        job_config = bigquery.QueryJobConfig(query_parameters=parameters)
        rows = client.query(query, job_config=job_config).result()
        return [dict(row) for row in rows]

    except Exception as e:
        raise HTTPException(status_code=500, detail="Query failed")

@router.get("/search")
def search_restaurants(q: str = Query(..., max_length=100), limit: int = Query(10, le=50)):
    if not client:
        raise HTTPException(status_code=503, detail="Service unavailable")
    
    try:
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
                LOWER(Name) LIKE @search_term OR
                LOWER(Cuisine) LIKE @search_term OR
                LOWER(Country) LIKE @search_term
            ORDER BY Name
            LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("search_term", "STRING", f"%{q.lower()}%"),
                bigquery.ScalarQueryParameter("limit", "INT64", limit)
            ]
        )
        
        rows = client.query(query, job_config=job_config).result()
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Search failed")

@router.get("/stats")
def get_stats():
    if not client:
        raise HTTPException(status_code=503, detail="Service unavailable")
    
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
        raise HTTPException(status_code=500, detail="Stats unavailable")