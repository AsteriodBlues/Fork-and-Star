from google.cloud import bigquery
from google.oauth2 import service_account
from typing import Optional, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=".fork_env")

# Get configuration from environment variables
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
DATASET_ID = os.getenv("BQ_DATASET_ID", "fork_and_star_cleaned")
TABLE_ID = os.getenv("BQ_TABLE_ID", "master_restaurants_with_clusters")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Validate required environment variables
if not PROJECT_ID:
    raise ValueError("GCP_PROJECT_ID is not set in .fork_env file")
if not CREDENTIALS_PATH:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is not set in .fork_env file")

# Verify credentials file exists
if not os.path.exists(CREDENTIALS_PATH):
    raise ValueError(f"Credentials file not found at: {CREDENTIALS_PATH}")

# Load BigQuery credentials
try:
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
except Exception as e:
    raise ValueError(f"Failed to load Google Cloud credentials: {e}")


def query_restaurants(
    skip: int = 0,
    limit: int = 100,
    name: Optional[str] = None,
    country: Optional[str] = None,
    cuisine: Optional[str] = None,
    badge: Optional[str] = None,
    reputation_label: Optional[str] = None,
    cluster: Optional[int] = None,
    order_by: Optional[str] = "Recalculated_Score DESC"
) -> List[dict]:
    """
    Query restaurants with available filters and sorting.
    """
    query = f"""
    SELECT *
    FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
    WHERE TRUE
    """

    if name:
        query += f" AND LOWER(Name) LIKE '%{name.lower()}%'"
    if country:
        query += f" AND LOWER(Country) LIKE '%{country.lower()}%'"
    if cuisine:
        query += f" AND LOWER(Cuisine) LIKE '%{cuisine.lower()}%'"
    if badge:
        query += f" AND LOWER(Badge_List) LIKE '%{badge.lower()}%'"
    if reputation_label:
        query += f" AND LOWER(Reputation_Label) LIKE '%{reputation_label.lower()}%'"
    if cluster is not None:
        query += f" AND Cluster = {cluster}"

    query += f" ORDER BY {order_by} LIMIT {limit} OFFSET {skip}"

    rows = client.query(query).result()
    return [dict(row) for row in rows]


def search_restaurants(query_text: str, limit: int = 50) -> List[dict]:
    """
    Fuzzy search across searchable fields.
    """
    query = f"""
    SELECT *
    FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
    WHERE
        LOWER(Name) LIKE '%{query_text.lower()}%' OR
        LOWER(Cuisine) LIKE '%{query_text.lower()}%' OR
        LOWER(Badge_List) LIKE '%{query_text.lower()}%' OR
        LOWER(Reputation_Label) LIKE '%{query_text.lower()}%'
    LIMIT {limit}
    """
    rows = client.query(query).result()
    return [dict(row) for row in rows]