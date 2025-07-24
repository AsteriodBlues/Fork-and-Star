from google.cloud import bigquery
from google.oauth2 import service_account
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(dotenv_path=".fork_env")

# Load configuration from environment
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
BQ_DATASET = os.getenv("BQ_DATASET_ID")
BQ_TABLE = os.getenv("BQ_RECOMMENDATIONS_TABLE")

# Validate required environment variables
if not PROJECT_ID:
    raise ValueError("GCP_PROJECT_ID is not set in .fork_env")
if not CREDENTIALS_PATH:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is not set in .fork_env")
if not BQ_DATASET:
    raise ValueError("BQ_DATASET_ID is not set in .fork_env")
if not BQ_TABLE:
    raise ValueError("BQ_RECOMMENDATIONS_TABLE is not set in .fork_env")

# Check credentials file exists
if not os.path.exists(CREDENTIALS_PATH):
    raise ValueError(f"Credentials file not found at: {CREDENTIALS_PATH}")

# Authenticate BigQuery
try:
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
except Exception as e:
    raise ValueError(f"Failed to load Google Cloud credentials: {e}")

# ✅ Full table path
FULL_TABLE = f"{PROJECT_ID}.{BQ_DATASET}.{BQ_TABLE}"


def get_recommendations(restaurant_name: str, limit: int = 10):
    """
    Get basic recommendations from top10_recommendations_enriched table.
    """
    query = f"""
        SELECT
            Rec_Name AS name,
            final_inclusive_score AS score,
            sim_rank AS rank
        FROM `{FULL_TABLE}`
        WHERE LOWER(Base_Name) = @restaurant_name
        ORDER BY final_inclusive_score DESC
        LIMIT @limit
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name.lower()),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ]
    )
    query_job = client.query(query, job_config=job_config)
    results = list(query_job.result())

    if not results:
        raise ValueError("No recommendations found.")

    return [dict(row) for row in results]


def get_enriched_explainability(restaurant_name: str, limit: int = 10):
    """
    Get recommendations with full metadata and explainability for a restaurant.
    """
    query = f"""
        SELECT
            Rec_Name AS name,
            Rec_Cuisine AS cuisine,
            Rec_Country AS country,
            Rec_Reputation_Label AS reputation,
            Rec_Star_Rating AS stars,
            Rec_Score_Color AS score_color,
            Rec_Badge_List AS badges,
            Rec_Momentum_Score AS momentum,
            Rec_Cluster AS cluster,
            final_inclusive_score AS final_score,
            Explainability_Text AS explanation
        FROM `{FULL_TABLE}`
        WHERE LOWER(Base_Name) = @restaurant_name
        ORDER BY final_inclusive_score DESC
        LIMIT @limit
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name.lower()),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ]
    )
    query_job = client.query(query, job_config=job_config)
    results = list(query_job.result())

    if not results:
        raise ValueError("No recommendations found.")

    return [dict(row) for row in results]