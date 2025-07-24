from fastapi import APIRouter, HTTPException
from google.cloud import bigquery
from google.oauth2 import service_account
import os
from dotenv import load_dotenv
import time
import math
from typing import List, Dict, Any

# Load environment variables
load_dotenv(".fork_env")

# Get configuration from environment variables
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
RECOMMENDATIONS_TABLE = os.getenv("BQ_RECOMMENDATIONS_TABLE")
CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Validate required environment variables
if not PROJECT_ID:
    raise ValueError("GCP_PROJECT_ID is not set in .fork_env")
if not RECOMMENDATIONS_TABLE:
    raise ValueError("BQ_RECOMMENDATIONS_TABLE is not set in .fork_env")
if not CREDENTIALS_PATH:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS is not set in .fork_env")

# Verify credentials file exists
if not os.path.exists(CREDENTIALS_PATH):
    raise ValueError(f"Credentials file not found at: {CREDENTIALS_PATH}")

# Load credentials
try:
    credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_PATH)
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
except Exception as e:
    raise ValueError(f"Failed to load Google Cloud credentials: {e}")

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

# DEBUG ENDPOINTS - Add these first to understand your data
@router.get("/debug/sample-data")
def get_sample_data():
    """Get sample data to understand what's actually in the database"""
    try:
        query = f"""
            SELECT 
                Base_ID,
                Base_Name,
                Base_Cuisine,
                Base_Country,
                Base_Reputation_Label,
                Base_Star_Rating,
                Base_Badge_List,
                Base_Score_Color,
                Base_Cluster,
                Base_Momentum_Score_Num
            FROM `{RECOMMENDATIONS_TABLE}`
            LIMIT 10
        """
        results = list(client.query(query).result())
        return [dict(row) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/debug/momentum-check")
def check_momentum_data():
    """Check momentum score data"""
    try:
        query = f"""
            SELECT 
                COUNT(*) as total_rows,
                COUNT(Base_Momentum_Score_Num) as non_null_momentum,
                MIN(Base_Momentum_Score_Num) as min_momentum,
                MAX(Base_Momentum_Score_Num) as max_momentum,
                AVG(Base_Momentum_Score_Num) as avg_momentum
            FROM `{RECOMMENDATIONS_TABLE}`
        """
        result = list(client.query(query).result())[0]
        return dict(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# IMPORTANT: Define specific routes BEFORE parameterized routes

# 4. Get Filter Options (ORIGINAL - WORKING)
@router.get("/filters/options")
def get_filters():
    try:
        # Get unique cuisines
        cuisines_query = f"""
            SELECT DISTINCT Base_Cuisine AS cuisine
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cuisine IS NOT NULL
            ORDER BY Base_Cuisine
        """
        cuisines = [row["cuisine"] for row in client.query(cuisines_query).result()]
        
        # Get unique countries
        countries_query = f"""
            SELECT DISTINCT Base_Country AS country
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Country IS NOT NULL
            ORDER BY Base_Country
        """
        countries = [row["country"] for row in client.query(countries_query).result()]
        
        # Get unique reputation labels
        reputations_query = f"""
            SELECT DISTINCT Base_Reputation_Label AS reputation
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Reputation_Label IS NOT NULL
            ORDER BY Base_Reputation_Label
        """
        reputations = [row["reputation"] for row in client.query(reputations_query).result()]
        
        # Get unique badges
        badges_query = f"""
            SELECT DISTINCT Base_Badge_List AS badge
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Badge_List IS NOT NULL
            ORDER BY Base_Badge_List
        """
        badges = [row["badge"] for row in client.query(badges_query).result()]
        
        # Get unique clusters
        clusters_query = f"""
            SELECT DISTINCT Base_Cluster AS cluster
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cluster IS NOT NULL
            ORDER BY Base_Cluster
        """
        clusters = [row["cluster"] for row in client.query(clusters_query).result()]
        
        return {
            "cuisines": cuisines,
            "countries": countries,
            "reputations": reputations,
            "badges": badges,
            "clusters": clusters
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8. Search by Partial Match (ORIGINAL - WORKING)
@router.get("/search")
def search_restaurants(q: str = None):
    try:
        if not q:
            raise HTTPException(status_code=400, detail="Query parameter 'q' is required")
            
        query = """
            SELECT DISTINCT Base_Name as restaurant_name, Base_ID as id
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Name) LIKE LOWER(@search_term)
            ORDER BY Base_Name
            LIMIT 20
        """
        search_term = f"%{q}%"
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("search_term", "STRING", search_term)
        ])
        results = list(client.query(query, job_config=job_config).result())
        return [{"restaurant_name": row["restaurant_name"], "id": row["id"]} for row in results]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2. Get Explanation for Restaurant (ORIGINAL - WORKING)
@router.get("/explanation/{restaurant_name}")
def get_explanation(restaurant_name: str):
    try:
        query = """
            SELECT DISTINCT Explainability_Text
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Name = @restaurant_name
            LIMIT 1
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name)
        ])
        row = list(client.query(query, job_config=job_config).result())
        if not row:
            raise HTTPException(status_code=404, detail="No explanation found.")
        return {
            "restaurant_name": restaurant_name,
            "explanation": row[0]["Explainability_Text"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. Explore Cluster-Based Restaurants (ORIGINAL - WORKING)
@router.get("/cluster/{cluster_id}")
def get_restaurants_in_cluster(cluster_id: int, limit: int = 10):
    try:
        query = """
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
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Rec_Cluster = @cluster_id
            ORDER BY final_inclusive_score DESC
            LIMIT @limit
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("cluster_id", "INT64", cluster_id),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        rows = list(client.query(query, job_config=job_config).result())
        if not rows:
            raise HTTPException(status_code=404, detail="No cluster matches found.")
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. Similarity Matrix Scores (ORIGINAL - WORKING)
@router.get("/similarity_matrix/{restaurant_name}")
def similarity_matrix(restaurant_name: str):
    try:
        query = """
            SELECT
              Rec_Name,
              region_score,
              cuisine_score,
              green_focus_score,
              reputation_score,
              year_diff_penalty,
              similarity_score,
              final_inclusive_score
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Name = @restaurant_name
            ORDER BY final_inclusive_score DESC
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name)
        ])
        rows = list(client.query(query, job_config=job_config).result())
        if not rows:
            raise HTTPException(status_code=404, detail="No similarity data found.")
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. Get Restaurant by Base ID (ORIGINAL - WORKING)
@router.get("/restaurant/{id}")
def get_restaurant_by_id(id: int):
    try:
        query = """
            SELECT
              Base_Name AS name,
              Base_Cuisine AS cuisine,
              Base_Country AS country,
              Base_Reputation_Label AS reputation,
              Base_Star_Rating AS stars,
              Base_Score_Color AS score_color,
              Base_Badge_List AS badges,
              Base_Momentum_Score AS momentum,
              Base_Cluster AS cluster,
              Explainability_Text AS explanation
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_ID = @id
            LIMIT 1
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("id", "INT64", id)
        ])
        rows = list(client.query(query, job_config=job_config).result())
        if not rows:
            raise HTTPException(status_code=404, detail="Restaurant not found.")
        return dict(rows[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. Diversity-Aware Recommendations (ORIGINAL - WORKING)
@router.get("/diversity/{restaurant_name}")
def get_diverse_recommendations(restaurant_name: str, limit: int = 10):
    try:
        query = """
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
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Name = @restaurant_name
            ORDER BY final_inclusive_score DESC
            LIMIT @limit
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        rows = list(client.query(query, job_config=job_config).result())
        if not rows:
            raise HTTPException(status_code=404, detail="No recommendations found.")
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 9. FIXED - Multi-Filter Search
@router.get("/filter")
def filter_restaurants(
    cuisine: str = None,
    country: str = None,
    reputation: str = None,
    min_stars: float = None,
    max_stars: float = None,
    badge: str = None,
    cluster: int = None,
    score_color: str = None,
    page: int = 1,
    limit: int = 20
):
    """Filter restaurants by multiple criteria with pagination - FIXED VERSION"""
    try:
        conditions = ["1=1"]  # Base condition
        params = []
        
        if cuisine:
            conditions.append("LOWER(Base_Cuisine) = LOWER(@cuisine)")
            params.append(bigquery.ScalarQueryParameter("cuisine", "STRING", cuisine))
        if country:
            conditions.append("LOWER(Base_Country) = LOWER(@country)")
            params.append(bigquery.ScalarQueryParameter("country", "STRING", country))
        if reputation:
            conditions.append("LOWER(Base_Reputation_Label) LIKE LOWER(@reputation)")
            params.append(bigquery.ScalarQueryParameter("reputation", "STRING", f"%{reputation}%"))
        if min_stars is not None:
            conditions.append("Base_Star_Rating >= @min_stars")
            params.append(bigquery.ScalarQueryParameter("min_stars", "FLOAT64", min_stars))
        if max_stars is not None:
            conditions.append("Base_Star_Rating <= @max_stars")
            params.append(bigquery.ScalarQueryParameter("max_stars", "FLOAT64", max_stars))
        if badge:
            conditions.append("LOWER(Base_Badge_List) LIKE LOWER(@badge)")
            params.append(bigquery.ScalarQueryParameter("badge", "STRING", f"%{badge}%"))
        if cluster is not None:
            conditions.append("Base_Cluster = @cluster")
            params.append(bigquery.ScalarQueryParameter("cluster", "INT64", cluster))
        if score_color:
            conditions.append("LOWER(Base_Score_Color) = LOWER(@score_color)")
            params.append(bigquery.ScalarQueryParameter("score_color", "STRING", score_color))
        
        offset = (page - 1) * limit
        params.extend([
            bigquery.ScalarQueryParameter("limit", "INT64", limit),
            bigquery.ScalarQueryParameter("offset", "INT64", offset)
        ])
        
        where_clause = " AND ".join(conditions)
        
        # Add debugging: count total matches first
        count_query = f"""
            SELECT COUNT(DISTINCT Base_ID) as total_count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {where_clause}
        """
        
        count_job_config = bigquery.QueryJobConfig(query_parameters=params[:-2])  # Exclude limit/offset for count
        total_count = list(client.query(count_query, job_config=count_job_config).result())[0]["total_count"]
        
        if total_count == 0:
            return {
                "restaurants": [],
                "page": page,
                "limit": limit,
                "total_results": 0,
                "message": "No restaurants match the specified filters"
            }
        
        query = f"""
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Reputation_Label as reputation,
                Base_Star_Rating as stars,
                Base_Score_Color as score_color,
                Base_Badge_List as badges,
                Base_Momentum_Score as momentum,
                Base_Cluster as cluster,
                Base_Recalculated_Score as score
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {where_clause}
            ORDER BY Base_Recalculated_Score DESC
            LIMIT @limit OFFSET @offset
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=params)
        results = list(client.query(query, job_config=job_config).result())
        
        return {
            "restaurants": [dict(row) for row in results],
            "page": page,
            "limit": limit,
            "total_results": total_count,
            "filters_applied": {
                "cuisine": cuisine,
                "country": country,
                "reputation": reputation,
                "min_stars": min_stars,
                "max_stars": max_stars,
                "badge": badge,
                "cluster": cluster,
                "score_color": score_color
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 10. Get restaurant statistics and analytics
@router.get("/analytics/overview")
def get_analytics_overview():
    """Get overall statistics about the restaurant database"""
    try:
        query = """
            SELECT
                COUNT(DISTINCT Base_ID) as total_restaurants,
                COUNT(DISTINCT Base_Cuisine) as total_cuisines,
                COUNT(DISTINCT Base_Country) as total_countries,
                COUNT(DISTINCT Base_Cluster) as total_clusters,
                AVG(Base_Star_Rating) as avg_star_rating,
                MIN(Base_Star_Rating) as min_stars,
                MAX(Base_Star_Rating) as max_stars,
                COUNT(DISTINCT Base_Reputation_Label) as reputation_types
            FROM `{RECOMMENDATIONS_TABLE}`
        """
        result = list(client.query(query).result())[0]
        return dict(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 11. Get top restaurants by various metrics
@router.get("/top/{metric}")
def get_top_restaurants(metric: str, limit: int = 10):
    """Get top restaurants by specified metric (stars, score, momentum)"""
    try:
        valid_metrics = {
            "stars": "Base_Star_Rating",
            "score": "Base_Recalculated_Score", 
            "momentum": "Base_Momentum_Score_Num"
        }
        
        if metric not in valid_metrics:
            raise HTTPException(status_code=400, detail=f"Invalid metric. Choose from: {list(valid_metrics.keys())}")
        
        order_column = valid_metrics[metric]
        
        query = f"""
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as score,
                Base_Momentum_Score_Num as momentum,
                Base_Reputation_Label as reputation,
                Base_Badge_List as badges
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {order_column} IS NOT NULL
            ORDER BY {order_column} DESC
            LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        return {
            "metric": metric,
            "restaurants": [dict(row) for row in results]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 12. FIXED - Compare two restaurants directly
@router.get("/compare/{restaurant1_id}/{restaurant2_id}")
def compare_restaurants(restaurant1_id: int, restaurant2_id: int):
    """Compare two restaurants side by side - FIXED VERSION"""
    try:
        # First check if the IDs exist
        check_query = """
            SELECT Base_ID
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_ID IN (@id1, @id2)
            GROUP BY Base_ID
        """
        
        check_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("id1", "INT64", restaurant1_id),
            bigquery.ScalarQueryParameter("id2", "INT64", restaurant2_id)
        ])
        existing_ids = [row["Base_ID"] for row in client.query(check_query, job_config=check_job_config).result()]
        
        if restaurant1_id not in existing_ids:
            raise HTTPException(status_code=404, detail=f"Restaurant with ID {restaurant1_id} not found")
        if restaurant2_id not in existing_ids:
            raise HTTPException(status_code=404, detail=f"Restaurant with ID {restaurant2_id} not found")
        
        query = """
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as score,
                Base_Momentum_Score_Num as momentum,
                Base_Reputation_Label as reputation,
                Base_Badge_List as badges,
                Base_Cluster as cluster,
                Base_Score_Color as score_color
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_ID IN (@id1, @id2)
            ORDER BY Base_ID
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("id1", "INT64", restaurant1_id),
            bigquery.ScalarQueryParameter("id2", "INT64", restaurant2_id)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        restaurant1 = next((dict(r) for r in results if r["id"] == restaurant1_id), None)
        restaurant2 = next((dict(r) for r in results if r["id"] == restaurant2_id), None)
        
        return {
            "restaurant1": restaurant1,
            "restaurant2": restaurant2,
            "comparison": {
                "star_difference": restaurant1["stars"] - restaurant2["stars"] if restaurant1["stars"] and restaurant2["stars"] else None,
                "score_difference": restaurant1["score"] - restaurant2["score"] if restaurant1["score"] and restaurant2["score"] else None
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 13. Get restaurants by geographic clustering (UMAP coordinates)
@router.get("/geographic/nearby")
def get_nearby_restaurants(umap1: float, umap2: float, radius: float = 0.5, limit: int = 10):
    """Find restaurants near specific UMAP coordinates"""
    try:
        query = """
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_UMAP_1 as umap1,
                Base_UMAP_2 as umap2,
                SQRT(POW(Base_UMAP_1 - @umap1, 2) + POW(Base_UMAP_2 - @umap2, 2)) as distance
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE SQRT(POW(Base_UMAP_1 - @umap1, 2) + POW(Base_UMAP_2 - @umap2, 2)) <= @radius
            ORDER BY distance ASC
            LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("umap1", "FLOAT64", umap1),
            bigquery.ScalarQueryParameter("umap2", "FLOAT64", umap2),
            bigquery.ScalarQueryParameter("radius", "FLOAT64", radius),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        return [dict(row) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 14. Get cluster analysis and explainability
@router.get("/clusters/analysis")
def get_cluster_analysis():
    """Get analysis of all clusters with their characteristics"""
    try:
        query = """
            SELECT
                Base_Cluster as cluster_id,
                Base_Cluster_Explainability_Label as cluster_description,
                COUNT(DISTINCT Base_ID) as restaurant_count,
                AVG(Base_Star_Rating) as avg_stars,
                AVG(Base_Recalculated_Score) as avg_score,
                STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 5) as top_cuisines,
                STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 5) as top_countries
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cluster IS NOT NULL
            GROUP BY Base_Cluster, Base_Cluster_Explainability_Label
            ORDER BY restaurant_count DESC
        """
        
        results = list(client.query(query).result())
        return [dict(row) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 15. Get recommendation quality metrics
@router.get("/quality/{restaurant_name}")
def get_recommendation_quality(restaurant_name: str):
    """Get detailed quality metrics for recommendations"""
    try:
        query = """
            SELECT
                Base_Name as base_restaurant,
                Rec_Name as recommended_restaurant,
                region_score,
                cuisine_score,
                green_focus_score,
                reputation_score,
                year_diff_penalty,
                similarity_score,
                final_inclusive_score,
                sim_rank,
                Explainability_Text as explanation
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Name = @restaurant_name
            ORDER BY final_inclusive_score DESC
            LIMIT 10
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        if not results:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        return {
            "base_restaurant": restaurant_name,
            "recommendations": [dict(row) for row in results]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 16. Random restaurant discovery
@router.get("/discover/random")
def discover_random_restaurants(
    count: int = 5,
    min_stars: float = None,
    cuisine: str = None,
    country: str = None
):
    """Discover random restaurants with optional filters"""
    try:
        conditions = ["1=1"]
        params = [bigquery.ScalarQueryParameter("count", "INT64", count)]
        
        if min_stars:
            conditions.append("Base_Star_Rating >= @min_stars")
            params.append(bigquery.ScalarQueryParameter("min_stars", "FLOAT64", min_stars))
        if cuisine:
            conditions.append("Base_Cuisine = @cuisine")
            params.append(bigquery.ScalarQueryParameter("cuisine", "STRING", cuisine))
        if country:
            conditions.append("Base_Country = @country")
            params.append(bigquery.ScalarQueryParameter("country", "STRING", country))
        
        where_clause = " AND ".join(conditions)
        
        query = f"""
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Score_Color as score_color,
                Base_Badge_List as badges,
                Base_Reputation_Label as reputation
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {where_clause}
            ORDER BY RAND()
            LIMIT @count
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=params)
        results = list(client.query(query, job_config=job_config).result())
        
        return [dict(row) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 17. FIXED - Trending restaurants (high momentum)
@router.get("/trending")
def get_trending_restaurants(limit: int = 10):
    """Get restaurants with highest momentum scores - FIXED VERSION"""
    try:
        # First check if momentum data exists
        check_query = f"""
            SELECT COUNT(*) as count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Momentum_Score_Num IS NOT NULL AND Base_Momentum_Score_Num > 0
        """
        
        count_result = list(client.query(check_query).result())[0]
        
        if count_result["count"] == 0:
            # Fallback to recalculated score
            query = f"""
                SELECT DISTINCT
                    Base_ID as id,
                    Base_Name as name,
                    Base_Cuisine as cuisine,
                    Base_Country as country,
                    Base_Star_Rating as stars,
                    Base_Recalculated_Score as calculated_score,
                    Base_Badge_List as badges,
                    Base_Reputation_Label as reputation
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Recalculated_Score IS NOT NULL
                ORDER BY Base_Recalculated_Score DESC
                LIMIT @limit
            """
            message = "Using calculated score as momentum data not available"
        else:
            query = f"""
                SELECT DISTINCT
                    Base_ID as id,
                    Base_Name as name,
                    Base_Cuisine as cuisine,
                    Base_Country as country,
                    Base_Star_Rating as stars,
                    Base_Momentum_Score_Num as momentum_score,
                    Base_Badge_List as badges,
                    Base_Reputation_Label as reputation
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Momentum_Score_Num IS NOT NULL AND Base_Momentum_Score_Num > 0
                ORDER BY Base_Momentum_Score_Num DESC
                LIMIT @limit
            """
            message = "Showing trending restaurants by momentum score"
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        if not results:
            raise HTTPException(status_code=404, detail="No trending restaurants found")
        
        return {
            "message": message,
            "trending_restaurants": [dict(row) for row in results]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Additional 4 endpoints to add to your existing API code
# Add these BEFORE the final parameterized route (/{restaurant_name})

# 18. Get all unique tags for filters or badges
@router.get("/tags")
def get_all_tags():
    """Get all unique tags for filters or badges"""
    try:
        # Get all unique badge tags (split by common delimiters)
        badges_query = """
            SELECT DISTINCT
                TRIM(badge) as tag,
                'badge' as tag_type,
                COUNT(*) as usage_count
            FROM (
                SELECT 
                    SPLIT(Base_Badge_List, ',') as badge_array
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Badge_List IS NOT NULL AND Base_Badge_List != ''
            ), UNNEST(badge_array) as badge
            WHERE TRIM(badge) != ''
            GROUP BY TRIM(badge)
            ORDER BY usage_count DESC
        """
        
        # Get cuisine tags
        cuisine_query = """
            SELECT DISTINCT
                Base_Cuisine as tag,
                'cuisine' as tag_type,
                COUNT(*) as usage_count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cuisine IS NOT NULL
            GROUP BY Base_Cuisine
            ORDER BY usage_count DESC
        """
        
        # Get reputation tags
        reputation_query = """
            SELECT DISTINCT
                Base_Reputation_Label as tag,
                'reputation' as tag_type,
                COUNT(*) as usage_count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Reputation_Label IS NOT NULL
            GROUP BY Base_Reputation_Label
            ORDER BY usage_count DESC
        """
        
        # Get country tags
        country_query = """
            SELECT DISTINCT
                Base_Country as tag,
                'country' as tag_type,
                COUNT(*) as usage_count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Country IS NOT NULL
            GROUP BY Base_Country
            ORDER BY usage_count DESC
        """
        
        # Execute all queries
        badges = [dict(row) for row in client.query(badges_query).result()]
        cuisines = [dict(row) for row in client.query(cuisine_query).result()]
        reputations = [dict(row) for row in client.query(reputation_query).result()]
        countries = [dict(row) for row in client.query(country_query).result()]
        
        # Combine all tags
        all_tags = badges + cuisines + reputations + countries
        
        return {
            "total_tags": len(all_tags),
            "tags_by_type": {
                "badges": badges,
                "cuisines": cuisines,
                "reputations": reputations,
                "countries": countries
            },
            "all_tags": all_tags
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 19. Check BigQuery connection health
@router.get("/health")
def health_check():
    """Check BigQuery connection health"""
    try:
        # Simple query to test connection
        test_query = """
            SELECT 
                COUNT(*) as total_records,
                COUNT(DISTINCT Base_ID) as unique_restaurants,
                MAX(Base_Star_Rating) as max_stars,
                MIN(Base_Star_Rating) as min_stars
            FROM `{RECOMMENDATIONS_TABLE}`
            LIMIT 1
        """
        
        start_time = time.time()
        result = list(client.query(test_query).result())[0]
        query_time = time.time() - start_time
        
        return {
            "status": "healthy",
            "bigquery_connection": "connected",
            "query_response_time_seconds": round(query_time, 3),
            "database_info": {
                "total_records": result["total_records"],
                "unique_restaurants": result["unique_restaurants"],
                "star_rating_range": {
                    "min": result["min_stars"],
                    "max": result["max_stars"]
                }
            },
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "bigquery_connection": "failed",
            "error": str(e),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
        }


# 20. Get restaurant by name (full info)
@router.get("/restaurant/name/{restaurant_name}")
def get_restaurant_by_name(restaurant_name: str):
    """Return full info about a restaurant by name (not ID)"""
    try:
        query = """
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Reputation_Label as reputation,
                Base_Star_Rating as stars,
                Base_Score_Color as score_color,
                Base_Badge_List as badges,
                Base_Momentum_Score as momentum,
                Base_Momentum_Score_Num as momentum_numeric,
                Base_Cluster as cluster,
                Base_Recalculated_Score as calculated_score,
                Base_UMAP_1 as umap_x,
                Base_UMAP_2 as umap_y,
                Base_Cluster_Explainability_Label as cluster_description
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Name) = LOWER(@restaurant_name)
            LIMIT 1
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name)
        ])
        results = list(client.query(query, job_config=job_config).result())
        
        if not results:
            # Try partial match as fallback
            partial_query = """
                SELECT DISTINCT
                    Base_ID as id,
                    Base_Name as name,
                    Base_Cuisine as cuisine,
                    Base_Country as country,
                    Base_Reputation_Label as reputation,
                    Base_Star_Rating as stars,
                    Base_Score_Color as score_color,
                    Base_Badge_List as badges,
                    Base_Momentum_Score as momentum,
                    Base_Momentum_Score_Num as momentum_numeric,
                    Base_Cluster as cluster,
                    Base_Recalculated_Score as calculated_score,
                    Base_UMAP_1 as umap_x,
                    Base_UMAP_2 as umap_y,
                    Base_Cluster_Explainability_Label as cluster_description
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE LOWER(Base_Name) LIKE LOWER(@restaurant_name_partial)
                ORDER BY Base_Recalculated_Score DESC
                LIMIT 5
            """
            
            partial_job_config = bigquery.QueryJobConfig(query_parameters=[
                bigquery.ScalarQueryParameter("restaurant_name_partial", "STRING", f"%{restaurant_name}%")
            ])
            partial_results = list(client.query(partial_query, job_config=partial_job_config).result())
            
            if not partial_results:
                raise HTTPException(status_code=404, detail=f"Restaurant '{restaurant_name}' not found")
            
            return {
                "exact_match": False,
                "searched_for": restaurant_name,
                "suggestions": [dict(row) for row in partial_results],
                "message": f"No exact match found for '{restaurant_name}'. Here are similar restaurants:"
            }
        
        restaurant_data = dict(results[0])
        
        # Add additional computed fields
        restaurant_data["has_badges"] = bool(restaurant_data["badges"])
        restaurant_data["badge_count"] = len(restaurant_data["badges"].split(",")) if restaurant_data["badges"] else 0
        restaurant_data["coordinates"] = {
            "umap_x": restaurant_data["umap_x"],
            "umap_y": restaurant_data["umap_y"]
        }
        
        return {
            "exact_match": True,
            "restaurant": restaurant_data
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 21. Get score distribution buckets for graphs or UI heatmaps
@router.get("/metrics/score-distribution")
def get_score_distribution():
    """Get score distribution buckets for graphs or UI heatmaps"""
    try:
        # Star rating distribution
        star_distribution_query = """
            SELECT
                CAST(FLOOR(Base_Star_Rating * 2) / 2 AS FLOAT64) as star_bucket,
                COUNT(*) as count,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_calculated_score
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Star_Rating IS NOT NULL
            GROUP BY star_bucket
            ORDER BY star_bucket
        """
        
        # Calculated score distribution (10 buckets)
        score_distribution_query = """
            SELECT
                CASE 
                    WHEN Base_Recalculated_Score < 10 THEN '0-10'
                    WHEN Base_Recalculated_Score < 20 THEN '10-20'
                    WHEN Base_Recalculated_Score < 30 THEN '20-30'
                    WHEN Base_Recalculated_Score < 40 THEN '30-40'
                    WHEN Base_Recalculated_Score < 50 THEN '40-50'
                    WHEN Base_Recalculated_Score < 60 THEN '50-60'
                    WHEN Base_Recalculated_Score < 70 THEN '60-70'
                    WHEN Base_Recalculated_Score < 80 THEN '70-80'
                    WHEN Base_Recalculated_Score < 90 THEN '80-90'
                    ELSE '90-100'
                END as score_bucket,
                COUNT(*) as count,
                MIN(Base_Recalculated_Score) as min_score,
                MAX(Base_Recalculated_Score) as max_score,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Recalculated_Score IS NOT NULL
            GROUP BY score_bucket
            ORDER BY min_score
        """
        
        # Cluster distribution
        cluster_distribution_query = """
            SELECT
                Base_Cluster as cluster_id,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                MAX(Base_Cluster_Explainability_Label) as cluster_description
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cluster IS NOT NULL
            GROUP BY Base_Cluster
            ORDER BY restaurant_count DESC
        """
        
        # Country distribution (top 15)
        country_distribution_query = """
            SELECT
                Base_Country as country,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Country IS NOT NULL
            GROUP BY Base_Country
            ORDER BY restaurant_count DESC
            LIMIT 15
        """
        
        # Execute all queries
        star_dist = [dict(row) for row in client.query(star_distribution_query).result()]
        score_dist = [dict(row) for row in client.query(score_distribution_query).result()]
        cluster_dist = [dict(row) for row in client.query(cluster_distribution_query).result()]
        country_dist = [dict(row) for row in client.query(country_distribution_query).result()]
        
        # Calculate totals
        total_restaurants = sum(bucket["count"] for bucket in star_dist)
        
        return {
            "total_restaurants": total_restaurants,
            "distributions": {
                "star_rating": {
                    "buckets": star_dist,
                    "description": "Distribution by star rating (0.5 increments)"
                },
                "calculated_score": {
                    "buckets": score_dist,
                    "description": "Distribution by calculated score (10-point buckets)"
                },
                "clusters": {
                    "buckets": cluster_dist,
                    "description": "Distribution by restaurant clusters"
                },
                "countries": {
                    "buckets": country_dist,
                    "description": "Top 15 countries by restaurant count"
                }
            },
            "summary_stats": {
                "avg_star_rating": round(sum(b["star_bucket"] * b["count"] for b in star_dist) / total_restaurants, 2),
                "total_clusters": len(cluster_dist),
                "total_countries": len(country_dist)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 22. Recommend nearby clusters or overlapping themes
@router.get("/related-clusters/{cluster_id}")
def get_related_clusters(cluster_id: int, limit: int = 3):
    """Recommend nearby clusters or overlapping themes"""
    try:
        # First, get characteristics of the input cluster
        cluster_info_query = """
            SELECT
                Base_Cluster as cluster_id,
                ANY_VALUE(Base_Cluster_Explainability_Label) as cluster_description,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 5) as top_cuisines,
                STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 5) as top_countries,
                STRING_AGG(DISTINCT Base_Reputation_Label ORDER BY Base_Reputation_Label LIMIT 3) as top_reputations,
                AVG(Base_UMAP_1) as avg_umap_x,
                AVG(Base_UMAP_2) as avg_umap_y
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cluster = @cluster_id
            GROUP BY Base_Cluster
        """
        
        cluster_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("cluster_id", "INT64", cluster_id)
        ])
        cluster_info = list(client.query(cluster_info_query, job_config=cluster_job_config).result())
        
        if not cluster_info:
            raise HTTPException(status_code=404, detail=f"Cluster {cluster_id} not found")
        
        source_cluster = dict(cluster_info[0])
        
        # Find related clusters using multiple similarity measures
        related_clusters_query = """
            WITH cluster_stats AS (
                SELECT
                    Base_Cluster as cluster_id,
                    ANY_VALUE(Base_Cluster_Explainability_Label) as cluster_description,
                    COUNT(*) as restaurant_count,
                    ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                    ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                    STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 5) as top_cuisines,
                    STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 5) as top_countries,
                    STRING_AGG(DISTINCT Base_Reputation_Label ORDER BY Base_Reputation_Label LIMIT 3) as top_reputations,
                    AVG(Base_UMAP_1) as avg_umap_x,
                    AVG(Base_UMAP_2) as avg_umap_y
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Cluster IS NOT NULL AND Base_Cluster != @cluster_id
                GROUP BY Base_Cluster
            ),
            cluster_similarity AS (
                SELECT
                    cluster_id,
                    cluster_description,
                    restaurant_count,
                    avg_stars,
                    avg_score,
                    top_cuisines,
                    top_countries,
                    top_reputations,
                    -- Geographic similarity (UMAP distance)
                    SQRT(POW(avg_umap_x - @source_umap_x, 2) + POW(avg_umap_y - @source_umap_y, 2)) as umap_distance,
                    -- Star rating similarity
                    ABS(avg_stars - @source_avg_stars) as star_diff,
                    -- Score similarity
                    ABS(avg_score - @source_avg_score) as score_diff,
                    -- Size similarity (restaurant count)
                    ABS(restaurant_count - @source_restaurant_count) as size_diff
                FROM cluster_stats
            )
            SELECT
                cluster_id,
                cluster_description,
                restaurant_count,
                avg_stars,
                avg_score,
                top_cuisines,
                top_countries,
                top_reputations,
                umap_distance,
                star_diff,
                score_diff,
                size_diff,
                -- Calculate overall similarity score (lower is more similar)
                (umap_distance * 0.4 + star_diff * 0.3 + (score_diff/10) * 0.2 + (size_diff/50) * 0.1) as similarity_score,
                CASE 
                    WHEN umap_distance < 1.0 THEN 'Geographically Similar'
                    WHEN star_diff < 0.3 THEN 'Similar Quality Level'
                    WHEN score_diff < 5 THEN 'Similar Overall Score'
                    ELSE 'Thematically Related'
                END as similarity_reason
            FROM cluster_similarity
            ORDER BY similarity_score ASC
            LIMIT @limit
        """
        
        related_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("cluster_id", "INT64", cluster_id),
            bigquery.ScalarQueryParameter("source_umap_x", "FLOAT64", source_cluster["avg_umap_x"]),
            bigquery.ScalarQueryParameter("source_umap_y", "FLOAT64", source_cluster["avg_umap_y"]),
            bigquery.ScalarQueryParameter("source_avg_stars", "FLOAT64", source_cluster["avg_stars"]),
            bigquery.ScalarQueryParameter("source_avg_score", "FLOAT64", source_cluster["avg_score"]),
            bigquery.ScalarQueryParameter("source_restaurant_count", "INT64", source_cluster["restaurant_count"]),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        
        related_clusters = [dict(row) for row in client.query(related_clusters_query, job_config=related_job_config).result()]
        
        # Get sample restaurants from each related cluster
        for cluster in related_clusters:
            sample_query = """
                SELECT
                    Base_Name as name,
                    Base_Cuisine as cuisine,
                    Base_Country as country,
                    Base_Star_Rating as stars,
                    Base_Recalculated_Score as score
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Cluster = @cluster_id
                ORDER BY Base_Recalculated_Score DESC
                LIMIT 3
            """
            
            sample_job_config = bigquery.QueryJobConfig(query_parameters=[
                bigquery.ScalarQueryParameter("cluster_id", "INT64", cluster["cluster_id"])
            ])
            cluster["sample_restaurants"] = [dict(row) for row in client.query(sample_query, job_config=sample_job_config).result()]
        
        return {
            "source_cluster": source_cluster,
            "related_clusters": related_clusters,
            "recommendation_message": f"Based on Cluster {cluster_id}, you might also enjoy these similar clusters"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 23a. Curated discovery by country
@router.get("/explore/geo/{country}")
def explore_by_country(country: str, limit: int = 15, sort_by: str = "score"):
    """Curated discovery per region/country"""
    try:
        valid_sorts = {
            "score": "Base_Recalculated_Score",
            "stars": "Base_Star_Rating", 
            "momentum": "Base_Momentum_Score_Num"
        }
        
        if sort_by not in valid_sorts:
            sort_by = "score"
        
        sort_column = valid_sorts[sort_by]
        
        # Get country overview
        overview_query = """
            SELECT
                Base_Country as country,
                COUNT(DISTINCT Base_ID) as total_restaurants,
                COUNT(DISTINCT Base_Cuisine) as cuisines_available,
                COUNT(DISTINCT Base_Cluster) as clusters_represented,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 8) as top_cuisines,
                STRING_AGG(DISTINCT Base_Reputation_Label ORDER BY Base_Reputation_Label LIMIT 5) as reputation_types
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Country) = LOWER(@country)
            GROUP BY Base_Country
        """
        
        overview_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("country", "STRING", country)
        ])
        overview_result = list(client.query(overview_query, job_config=overview_job_config).result())
        
        if not overview_result:
            raise HTTPException(status_code=404, detail=f"No restaurants found for country: {country}")
        
        overview = dict(overview_result[0])
        
        # Get top restaurants
        restaurants_query = f"""
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as score,
                Base_Momentum_Score_Num as momentum,
                Base_Reputation_Label as reputation,
                Base_Badge_List as badges,
                Base_Cluster as cluster,
                Base_Score_Color as score_color
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Country) = LOWER(@country)
            AND {sort_column} IS NOT NULL
            ORDER BY {sort_column} DESC
            LIMIT @limit
        """
        
        restaurants_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("country", "STRING", country),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        restaurants = [dict(row) for row in client.query(restaurants_query, job_config=restaurants_job_config).result()]
        
        # Get cuisine breakdown
        cuisine_query = """
            SELECT 
                Base_Cuisine as cuisine,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Country) = LOWER(@country)
            GROUP BY Base_Cuisine
            ORDER BY restaurant_count DESC
            LIMIT 10
        """
        
        cuisine_breakdown = [dict(row) for row in client.query(cuisine_query, job_config=overview_job_config).result()]
        
        return {
            "country": country,
            "overview": overview,
            "top_restaurants": restaurants,
            "cuisine_breakdown": cuisine_breakdown,
            "sorted_by": sort_by,
            "message": f"Exploring top restaurants in {country}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 23b. Curated discovery by cuisine
@router.get("/explore/cuisine/{cuisine}")
def explore_by_cuisine(cuisine: str, limit: int = 15, sort_by: str = "score"):
    """Curated discovery per cuisine type"""
    try:
        valid_sorts = {
            "score": "Base_Recalculated_Score",
            "stars": "Base_Star_Rating", 
            "momentum": "Base_Momentum_Score_Num"
        }
        
        if sort_by not in valid_sorts:
            sort_by = "score"
        
        sort_column = valid_sorts[sort_by]
        
        # Get cuisine overview
        overview_query = """
            SELECT
                Base_Cuisine as cuisine,
                COUNT(DISTINCT Base_ID) as total_restaurants,
                COUNT(DISTINCT Base_Country) as countries_available,
                COUNT(DISTINCT Base_Cluster) as clusters_represented,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 8) as top_countries,
                STRING_AGG(DISTINCT Base_Reputation_Label ORDER BY Base_Reputation_Label LIMIT 5) as reputation_types
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Cuisine) = LOWER(@cuisine)
            GROUP BY Base_Cuisine
        """
        
        overview_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("cuisine", "STRING", cuisine)
        ])
        overview_result = list(client.query(overview_query, job_config=overview_job_config).result())
        
        if not overview_result:
            raise HTTPException(status_code=404, detail=f"No restaurants found for cuisine: {cuisine}")
        
        overview = dict(overview_result[0])
        
        # Get top restaurants
        restaurants_query = f"""
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as score,
                Base_Momentum_Score_Num as momentum,
                Base_Reputation_Label as reputation,
                Base_Badge_List as badges,
                Base_Cluster as cluster,
                Base_Score_Color as score_color
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Cuisine) = LOWER(@cuisine)
            AND {sort_column} IS NOT NULL
            ORDER BY {sort_column} DESC
            LIMIT @limit
        """
        
        restaurants_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("cuisine", "STRING", cuisine),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        restaurants = [dict(row) for row in client.query(restaurants_query, job_config=restaurants_job_config).result()]
        
        # Get country breakdown
        country_query = """
            SELECT 
                Base_Country as country,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Cuisine) = LOWER(@cuisine)
            GROUP BY Base_Country
            ORDER BY restaurant_count DESC
            LIMIT 10
        """
        
        country_breakdown = [dict(row) for row in client.query(country_query, job_config=overview_job_config).result()]
        
        return {
            "cuisine": cuisine,
            "overview": overview,
            "top_restaurants": restaurants,
            "country_breakdown": country_breakdown,
            "sorted_by": sort_by,
            "message": f"Exploring top {cuisine} restaurants worldwide"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 24. Market Gap Analysis - Find opportunity zones
@router.get("/analytics/market-gaps")
def market_gap_analysis(
    min_restaurants_threshold: int = 3,
    umap_grid_size: float = 1.0,
    min_star_rating: float = 3.0
):
    """Analyze market gaps and investment opportunities"""
    try:
        # Analyze geographic gaps using grid-based approach
        geographic_gaps_query = """
            WITH grid_analysis AS (
                SELECT
                    FLOOR(Base_UMAP_1 / @grid_size) * @grid_size as grid_x,
                    FLOOR(Base_UMAP_2 / @grid_size) * @grid_size as grid_y,
                    COUNT(*) as restaurant_count,
                    AVG(Base_Star_Rating) as avg_stars,
                    AVG(Base_Recalculated_Score) as avg_score,
                    COUNT(DISTINCT Base_Cuisine) as cuisine_diversity,
                    STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 5) as cuisines_present,
                    STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 3) as countries_present
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_UMAP_1 IS NOT NULL AND Base_UMAP_2 IS NOT NULL
                GROUP BY grid_x, grid_y
            ),
            neighboring_grids AS (
                SELECT 
                    g1.grid_x,
                    g1.grid_y,
                    g1.restaurant_count,
                    g1.avg_stars,
                    g1.avg_score,
                    g1.cuisine_diversity,
                    g1.cuisines_present,
                    g1.countries_present,
                    AVG(g2.restaurant_count) as neighbor_avg_count,
                    AVG(g2.avg_stars) as neighbor_avg_stars
                FROM grid_analysis g1
                LEFT JOIN grid_analysis g2 ON (
                    ABS(g1.grid_x - g2.grid_x) <= @grid_size AND 
                    ABS(g1.grid_y - g2.grid_y) <= @grid_size AND
                    (g1.grid_x != g2.grid_x OR g1.grid_y != g2.grid_y)
                )
                GROUP BY g1.grid_x, g1.grid_y, g1.restaurant_count, g1.avg_stars, g1.avg_score, g1.cuisine_diversity, g1.cuisines_present, g1.countries_present
            ),
            opportunity_analysis AS (
                SELECT
                    grid_x,
                    grid_y,
                    restaurant_count,
                    avg_stars,
                    avg_score,
                    cuisine_diversity,
                    cuisines_present,
                    countries_present,
                    neighbor_avg_count,
                    neighbor_avg_stars,
                    CASE 
                        WHEN restaurant_count < @min_threshold AND neighbor_avg_count >= @min_threshold AND neighbor_avg_stars >= 4.0 THEN 'High Opportunity'
                        WHEN restaurant_count < @min_threshold AND neighbor_avg_count >= 2 THEN 'Medium Opportunity'
                        WHEN restaurant_count = 0 AND neighbor_avg_count > 0 THEN 'Underserved Area'
                        ELSE 'Saturated'
                    END as opportunity_level,
                    -- Calculate opportunity score
                    CASE 
                        WHEN restaurant_count < @min_threshold AND neighbor_avg_count >= @min_threshold AND neighbor_avg_stars >= 4.0 THEN 100
                        WHEN restaurant_count < @min_threshold AND neighbor_avg_count >= 2 THEN 75
                        WHEN restaurant_count = 0 AND neighbor_avg_count > 0 THEN 50
                        ELSE 10
                    END as opportunity_score
                FROM neighboring_grids
            )
            SELECT
                grid_x,
                grid_y,
                restaurant_count,
                ROUND(avg_stars, 2) as avg_stars,
                ROUND(avg_score, 2) as avg_score,
                cuisine_diversity,
                cuisines_present,
                countries_present,
                ROUND(neighbor_avg_count, 1) as neighbor_avg_count,
                ROUND(neighbor_avg_stars, 2) as neighbor_avg_stars,
                opportunity_level,
                opportunity_score
            FROM opportunity_analysis
            WHERE opportunity_level != 'Saturated'
            ORDER BY 
                opportunity_score DESC,
                neighbor_avg_stars DESC
            LIMIT 20
        """
        
        gap_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("grid_size", "FLOAT64", umap_grid_size),
            bigquery.ScalarQueryParameter("min_threshold", "INT64", min_restaurants_threshold)
        ])
        geographic_gaps = [dict(row) for row in client.query(geographic_gaps_query, job_config=gap_job_config).result()]
        
        # Analyze cuisine gaps
        cuisine_gap_query = """
            WITH cuisine_country_matrix AS (
                SELECT 
                    Base_Country as country,
                    Base_Cuisine as cuisine,
                    COUNT(*) as restaurant_count,
                    AVG(Base_Star_Rating) as avg_stars,
                    AVG(Base_Recalculated_Score) as avg_score
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Country IS NOT NULL AND Base_Cuisine IS NOT NULL
                GROUP BY Base_Country, Base_Cuisine
            ),
            country_stats AS (
                SELECT 
                    country,
                    COUNT(DISTINCT cuisine) as total_cuisines,
                    SUM(restaurant_count) as total_restaurants,
                    AVG(avg_stars) as country_avg_stars
                FROM cuisine_country_matrix
                GROUP BY country
                HAVING total_restaurants >= 5  -- Focus on countries with sufficient data
            ),
            popular_cuisines AS (
                SELECT 
                    cuisine,
                    COUNT(DISTINCT country) as countries_present,
                    SUM(restaurant_count) as global_count
                FROM cuisine_country_matrix
                GROUP BY cuisine
                HAVING countries_present >= 3  -- Cuisines present in multiple countries
                ORDER BY global_count DESC
                LIMIT 10
            )
            SELECT 
                cs.country,
                pc.cuisine,
                cs.total_restaurants as country_total_restaurants,
                ROUND(cs.country_avg_stars, 2) as country_avg_stars,
                pc.global_count as cuisine_global_popularity,
                'Missing Popular Cuisine' as gap_type,
                ROUND(cs.country_avg_stars * pc.global_count / 100, 2) as opportunity_score
            FROM country_stats cs
            CROSS JOIN popular_cuisines pc
            WHERE NOT EXISTS (
                SELECT 1 FROM cuisine_country_matrix ccm 
                WHERE ccm.country = cs.country AND ccm.cuisine = pc.cuisine
            )
            AND cs.total_restaurants >= 10  -- Focus on established markets
            ORDER BY opportunity_score DESC
            LIMIT 15
        """
        
        cuisine_gaps = [dict(row) for row in client.query(cuisine_gap_query).result()]
        
        # Calculate overall market metrics
        market_overview_query = """
            SELECT
                COUNT(DISTINCT Base_ID) as total_restaurants,
                COUNT(DISTINCT Base_Cuisine) as total_cuisines,
                COUNT(DISTINCT Base_Country) as total_countries,
                COUNT(DISTINCT Base_Cluster) as total_clusters,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(MIN(Base_UMAP_1), 2) as min_umap_x,
                ROUND(MAX(Base_UMAP_1), 2) as max_umap_x,
                ROUND(MIN(Base_UMAP_2), 2) as min_umap_y,
                ROUND(MAX(Base_UMAP_2), 2) as max_umap_y
            FROM `{RECOMMENDATIONS_TABLE}`
        """
        
        market_overview = dict(list(client.query(market_overview_query).result())[0])
        
        # Add some derived insights
        high_opportunity_zones = [g for g in geographic_gaps if g["opportunity_level"] == "High Opportunity"]
        underserved_areas = [g for g in geographic_gaps if g["opportunity_level"] == "Underserved Area"]
        
        return {
            "market_overview": market_overview,
            "geographic_opportunities": {
                "analysis_method": f"Grid-based analysis with {umap_grid_size} unit squares",
                "opportunities": geographic_gaps,
                "total_opportunities_found": len(geographic_gaps)
            },
            "cuisine_gaps": {
                "analysis_method": "Popular cuisines missing in established markets",
                "gaps": cuisine_gaps,
                "total_gaps_found": len(cuisine_gaps)
            },
            "investment_insights": {
                "high_opportunity_zones": len(high_opportunity_zones),
                "underserved_areas": len(underserved_areas),
                "top_missing_cuisines": list(set([gap["cuisine"] for gap in cuisine_gaps[:5]])),
                "geographic_coverage": {
                    "umap_x_range": market_overview["max_umap_x"] - market_overview["min_umap_x"],
                    "umap_y_range": market_overview["max_umap_y"] - market_overview["min_umap_y"]
                }
            },
            "recommendations": [
                f"Found {len(high_opportunity_zones)} high-opportunity geographic zones",
                f"Identified {len(cuisine_gaps)} cuisine gap opportunities",
                f"Geographic analysis covers {market_overview['max_umap_x'] - market_overview['min_umap_x']:.1f} x {market_overview['max_umap_y'] - market_overview['min_umap_y']:.1f} UMAP units"
            ]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 25. Rising Stars Prediction - Momentum-based forecasting
@router.get("/predictions/rising-stars")
def predict_rising_stars(
    limit: int = 15,
    momentum_threshold: float = None,
    current_star_max: float = 4.5
):
    """Predict restaurants likely to gain recognition using momentum analysis"""
    try:
        # Analyze momentum patterns and predict rising stars
        rising_stars_query = """
            WITH momentum_analysis AS (
                SELECT
                    Base_ID as id,
                    Base_Name as name,
                    Base_Cuisine as cuisine,
                    Base_Country as country,
                    Base_Star_Rating as current_stars,
                    Base_Recalculated_Score as current_score,
                    Base_Momentum_Score_Num as momentum,
                    Base_Cluster as cluster,
                    Base_Badge_List as badges,
                    Base_Reputation_Label as current_reputation,
                    Base_UMAP_1 as umap_x,
                    Base_UMAP_2 as umap_y,
                    -- Calculate momentum percentile
                    PERCENT_RANK() OVER (ORDER BY Base_Momentum_Score_Num) as momentum_percentile,
                    -- Calculate score vs stars ratio (undervalued indicator)
                    CASE 
                        WHEN Base_Star_Rating > 0 THEN Base_Recalculated_Score / Base_Star_Rating
                        ELSE 0
                    END as score_star_ratio
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE Base_Momentum_Score_Num IS NOT NULL
                AND Base_Star_Rating IS NOT NULL
                AND Base_Star_Rating <= @current_star_max  -- Focus on restaurants not already at the top
                AND Base_Recalculated_Score IS NOT NULL
            ),
            cluster_performance AS (
                SELECT 
                    cluster,
                    AVG(current_stars) as cluster_avg_stars,
                    AVG(momentum) as cluster_avg_momentum,
                    COUNT(*) as cluster_size
                FROM momentum_analysis
                WHERE cluster IS NOT NULL
                GROUP BY cluster
            ),
            predictions AS (
                SELECT 
                    ma.*,
                    cp.cluster_avg_stars,
                    cp.cluster_avg_momentum,
                    -- Rising star prediction score
                    (
                        (ma.momentum_percentile * 0.4) +  -- High momentum weight
                        (CASE WHEN ma.score_star_ratio > 20 THEN 0.3 ELSE ma.score_star_ratio/20 * 0.3 END) +  -- Undervalued weight
                        (CASE WHEN ma.current_stars >= cp.cluster_avg_stars THEN 0.2 ELSE 0.1 END) +  -- Cluster comparison
                        (CASE WHEN ma.momentum > cp.cluster_avg_momentum THEN 0.1 ELSE 0.05 END)  -- Above cluster momentum
                    ) as rising_star_score,
                    CASE 
                        WHEN ma.momentum_percentile > 0.8 AND ma.score_star_ratio > 15 THEN 'Very High Potential'
                        WHEN ma.momentum_percentile > 0.6 AND ma.score_star_ratio > 10 THEN 'High Potential'
                        WHEN ma.momentum_percentile > 0.4 OR ma.score_star_ratio > 8 THEN 'Medium Potential'
                        ELSE 'Low Potential'
                    END as potential_category,
                    CASE 
                        WHEN ma.current_stars < 3.5 THEN 'Breakthrough Candidate'
                        WHEN ma.current_stars < 4.0 THEN 'Recognition Candidate'
                        ELSE 'Elite Advancement Candidate'
                    END as advancement_type
                FROM momentum_analysis ma
                LEFT JOIN cluster_performance cp ON ma.cluster = cp.cluster
            )
            SELECT 
                id, name, cuisine, country, current_stars, current_score, momentum,
                cluster, badges, current_reputation, umap_x, umap_y,
                momentum_percentile, score_star_ratio, rising_star_score,
                potential_category, advancement_type,
                cluster_avg_stars, cluster_avg_momentum
            FROM predictions
            WHERE potential_category IN ('Very High Potential', 'High Potential', 'Medium Potential')
            ORDER BY rising_star_score DESC
            LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("current_star_max", "FLOAT64", current_star_max),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        rising_stars = [dict(row) for row in client.query(rising_stars_query, job_config=job_config).result()]
        
        # Get momentum distribution for context
        momentum_stats_query = """
            SELECT 
                COUNT(*) as total_restaurants,
                AVG(Base_Momentum_Score_Num) as avg_momentum,
                MIN(Base_Momentum_Score_Num) as min_momentum,
                MAX(Base_Momentum_Score_Num) as max_momentum,
                APPROX_QUANTILES(Base_Momentum_Score_Num, 10)[OFFSET(8)] as momentum_80th_percentile,
                APPROX_QUANTILES(Base_Momentum_Score_Num, 10)[OFFSET(9)] as momentum_90th_percentile
            FROM `{MOMENTUM_STATS_TABLE}`
            WHERE Base_Momentum_Score_Num IS NOT NULL
        """
        
        momentum_stats = dict(list(client.query(momentum_stats_query).result())[0])
        
        # Categorize predictions
        predictions_by_category = {
            "very_high": [r for r in rising_stars if r["potential_category"] == "Very High Potential"],
            "high": [r for r in rising_stars if r["potential_category"] == "High Potential"],
            "medium": [r for r in rising_stars if r["potential_category"] == "Medium Potential"]
        }
        
        return {
            "prediction_methodology": {
                "factors": [
                    "Momentum percentile (40% weight)",
                    "Score-to-stars ratio - undervalued indicator (30% weight)", 
                    "Performance vs cluster average (20% weight)",
                    "Momentum vs cluster average (10% weight)"
                ],
                "focus": f"Restaurants with ≤{current_star_max} stars showing high momentum"
            },
            "momentum_context": momentum_stats,
            "rising_stars": rising_stars,
            "predictions_by_category": predictions_by_category,
            "summary": {
                "total_predictions": len(rising_stars),
                "very_high_potential": len(predictions_by_category["very_high"]),
                "high_potential": len(predictions_by_category["high"]),
                "medium_potential": len(predictions_by_category["medium"])
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 26. Interactive Discovery Maps - Visual clustering data
@router.get("/maps/discovery")
def discovery_maps_data(
    cluster_focus: int = None,
    min_stars: float = None,
    cuisine_filter: str = None,
    include_boundaries: bool = True
):
    """Generate data for interactive discovery maps with visual clustering"""
    try:
        # Build dynamic WHERE clause
        conditions = ["Base_UMAP_1 IS NOT NULL", "Base_UMAP_2 IS NOT NULL"]
        params = []
        
        if cluster_focus is not None:
            conditions.append("Base_Cluster = @cluster_focus")
            params.append(bigquery.ScalarQueryParameter("cluster_focus", "INT64", cluster_focus))
        
        if min_stars is not None:
            conditions.append("Base_Star_Rating >= @min_stars")
            params.append(bigquery.ScalarQueryParameter("min_stars", "FLOAT64", min_stars))
            
        if cuisine_filter:
            conditions.append("LOWER(Base_Cuisine) = LOWER(@cuisine_filter)")
            params.append(bigquery.ScalarQueryParameter("cuisine_filter", "STRING", cuisine_filter))
        
        where_clause = " AND ".join(conditions)
        
        # Get restaurant points for mapping
        restaurants_query = f"""
            SELECT
                Base_ID as id,
                Base_Name as name,
                Base_UMAP_1 as x,
                Base_UMAP_2 as y,
                Base_Cuisine as cuisine,
                Base_Country as country,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as score,
                Base_Cluster as cluster,
                Base_Score_Color as score_color,
                Base_Badge_List as badges,
                Base_Reputation_Label as reputation,
                Base_Momentum_Score_Num as momentum
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {where_clause}
            ORDER BY Base_Recalculated_Score DESC
        """
        
        job_config = bigquery.QueryJobConfig(query_parameters=params)
        restaurants = [dict(row) for row in client.query(restaurants_query, job_config=job_config).result()]
        
        # Get cluster centroids and boundaries
        cluster_analysis_query = f"""
            SELECT
                Base_Cluster as cluster_id,
                ANY_VALUE(Base_Cluster_Explainability_Label) as cluster_name,
                COUNT(*) as restaurant_count,
                AVG(Base_UMAP_1) as centroid_x,
                AVG(Base_UMAP_2) as centroid_y,
                MIN(Base_UMAP_1) as min_x,
                MAX(Base_UMAP_1) as max_x,
                MIN(Base_UMAP_2) as min_y,
                MAX(Base_UMAP_2) as max_y,
                AVG(Base_Star_Rating) as avg_stars,
                AVG(Base_Recalculated_Score) as avg_score,
                STRING_AGG(DISTINCT Base_Cuisine ORDER BY Base_Cuisine LIMIT 5) as top_cuisines,
                STRING_AGG(DISTINCT Base_Country ORDER BY Base_Country LIMIT 5) as top_countries
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE {where_clause}
            AND Base_Cluster IS NOT NULL
            GROUP BY Base_Cluster
            ORDER BY restaurant_count DESC
        """
        
        clusters = [dict(row) for row in client.query(cluster_analysis_query, job_config=job_config).result()]
        
        # Calculate map boundaries
        if restaurants:
            all_x = [r["x"] for r in restaurants if r["x"] is not None]
            all_y = [r["y"] for r in restaurants if r["y"] is not None]
            
            map_bounds = {
                "min_x": min(all_x) if all_x else 0,
                "max_x": max(all_x) if all_x else 0,
                "min_y": min(all_y) if all_y else 0,
                "max_y": max(all_y) if all_y else 0,
                "center_x": sum(all_x) / len(all_x) if all_x else 0,
                "center_y": sum(all_y) / len(all_y) if all_y else 0
            }
        else:
            map_bounds = {"min_x": 0, "max_x": 0, "min_y": 0, "max_y": 0, "center_x": 0, "center_y": 0}
        
        # Create density heatmap data (grid-based)
        grid_size = 0.5
        density_data = {}
        for restaurant in restaurants:
            if restaurant["x"] is not None and restaurant["y"] is not None:
                grid_x = round(restaurant["x"] / grid_size) * grid_size
                grid_y = round(restaurant["y"] / grid_size) * grid_size
                grid_key = f"{grid_x},{grid_y}"
                
                if grid_key not in density_data:
                    density_data[grid_key] = {
                        "x": grid_x,
                        "y": grid_y,
                        "count": 0,
                        "avg_stars": 0,
                        "avg_score": 0,
                        "cuisines": set()
                    }
                
                density_data[grid_key]["count"] += 1
                density_data[grid_key]["avg_stars"] += restaurant["stars"] or 0
                density_data[grid_key]["avg_score"] += restaurant["score"] or 0
                if restaurant["cuisine"]:
                    density_data[grid_key]["cuisines"].add(restaurant["cuisine"])
        
        # Finalize density calculations
        for grid in density_data.values():
            if grid["count"] > 0:
                grid["avg_stars"] = round(grid["avg_stars"] / grid["count"], 2)
                grid["avg_score"] = round(grid["avg_score"] / grid["count"], 2)
                grid["cuisines"] = list(grid["cuisines"])
        
        heatmap_data = list(density_data.values())
        
        return {
            "map_config": {
                "bounds": map_bounds,
                "total_points": len(restaurants),
                "filters_applied": {
                    "cluster_focus": cluster_focus,
                    "min_stars": min_stars,
                    "cuisine_filter": cuisine_filter
                }
            },
            "restaurants": restaurants,
            "clusters": clusters,
            "heatmap_data": heatmap_data,
            "visualization_layers": {
                "restaurants": "Individual restaurant points with details",
                "clusters": "Cluster centroids and boundaries", 
                "heatmap": f"Density grid ({grid_size} unit squares)",
                "suggested_visualizations": [
                    "Scatter plot colored by cluster",
                    "Heatmap showing restaurant density",
                    "Cluster boundary polygons",
                    "Star rating size mapping",
                    "Cuisine type filtering"
                ]
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 27. Green Focus Intelligence - Sustainability trends and insights
@router.get("/analytics/sustainability/trends")
def sustainability_trends(min_green_score: float = 0.0, limit: int = 50):
    """Analyze sustainability trends across restaurants"""
    try:
        # Green focus by country analysis
        country_green_query = """
            SELECT
                Base_Country as country,
                COUNT(DISTINCT Base_ID) as restaurant_count,
                ROUND(AVG(green_focus_score), 3) as avg_green_score,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_overall_score,
                COUNT(CASE WHEN green_focus_score > 0.7 THEN 1 END) as high_green_restaurants,
                ROUND(COUNT(CASE WHEN green_focus_score > 0.7 THEN 1 END) * 100.0 / COUNT(*), 1) as green_percentage
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Country IS NOT NULL 
            AND green_focus_score IS NOT NULL
            AND green_focus_score >= @min_green_score
            GROUP BY Base_Country
            HAVING restaurant_count >= 5
            ORDER BY avg_green_score DESC
            LIMIT 15
        """
        
        # Green focus by cuisine analysis
        cuisine_green_query = """
            SELECT
                Base_Cuisine as cuisine,
                COUNT(DISTINCT Base_ID) as restaurant_count,
                ROUND(AVG(green_focus_score), 3) as avg_green_score,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                COUNT(CASE WHEN green_focus_score > 0.7 THEN 1 END) as high_green_restaurants,
                ROUND(COUNT(CASE WHEN green_focus_score > 0.7 THEN 1 END) * 100.0 / COUNT(*), 1) as green_percentage
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cuisine IS NOT NULL 
            AND green_focus_score IS NOT NULL
            AND green_focus_score >= @min_green_score
            GROUP BY Base_Cuisine
            HAVING restaurant_count >= 5
            ORDER BY avg_green_score DESC
            LIMIT 10
        """
        
        # Green vs Star Rating correlation
        correlation_query = """
            SELECT
                CASE 
                    WHEN green_focus_score >= 0.8 THEN 'Very High Green (0.8+)'
                    WHEN green_focus_score >= 0.6 THEN 'High Green (0.6-0.8)'
                    WHEN green_focus_score >= 0.4 THEN 'Medium Green (0.4-0.6)'
                    WHEN green_focus_score >= 0.2 THEN 'Low Green (0.2-0.4)'
                    ELSE 'Very Low Green (0-0.2)'
                END as green_level,
                COUNT(*) as restaurant_count,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                ROUND(AVG(Base_Recalculated_Score), 2) as avg_score,
                ROUND(AVG(Base_Momentum_Score_Num), 2) as avg_momentum
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE green_focus_score IS NOT NULL 
            AND Base_Star_Rating IS NOT NULL
            GROUP BY green_level
            ORDER BY 
                CASE green_level
                    WHEN 'Very High Green (0.8+)' THEN 1
                    WHEN 'High Green (0.6-0.8)' THEN 2
                    WHEN 'Medium Green (0.4-0.6)' THEN 3
                    WHEN 'Low Green (0.2-0.4)' THEN 4
                    WHEN 'Very Low Green (0-0.2)' THEN 5
                END
        """
        
        # Top green restaurants
        top_green_query = """
            SELECT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                ROUND(green_focus_score, 3) as green_score,
                Base_Star_Rating as stars,
                ROUND(Base_Recalculated_Score, 2) as overall_score,
                Base_Badge_List as badges,
                Base_Cluster as cluster
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE green_focus_score IS NOT NULL
            AND green_focus_score >= @min_green_score
            GROUP BY Base_ID, Base_Name, Base_Cuisine, Base_Country, green_focus_score, Base_Star_Rating, Base_Recalculated_Score, Base_Badge_List, Base_Cluster
            ORDER BY green_focus_score DESC
            LIMIT @limit
        """
        
        # Green clusters analysis
        cluster_green_query = """
            SELECT
                Base_Cluster as cluster_id,
                ANY_VALUE(Base_Cluster_Explainability_Label) as cluster_description,
                COUNT(DISTINCT Base_ID) as restaurant_count,
                ROUND(AVG(green_focus_score), 3) as avg_green_score,
                ROUND(AVG(Base_Star_Rating), 2) as avg_stars,
                COUNT(CASE WHEN green_focus_score > 0.6 THEN 1 END) as high_green_count,
                ROUND(COUNT(CASE WHEN green_focus_score > 0.6 THEN 1 END) * 100.0 / COUNT(*), 1) as green_percentage
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Cluster IS NOT NULL 
            AND green_focus_score IS NOT NULL
            GROUP BY Base_Cluster
            HAVING restaurant_count >= 10
            ORDER BY avg_green_score DESC
            LIMIT 10
        """
        
        # Overall sustainability statistics
        overall_stats_query = """
            SELECT
                COUNT(*) as total_restaurants,
                ROUND(AVG(green_focus_score), 3) as global_avg_green_score,
                ROUND(MIN(green_focus_score), 3) as min_green_score,
                ROUND(MAX(green_focus_score), 3) as max_green_score,
                COUNT(CASE WHEN green_focus_score > 0.8 THEN 1 END) as very_high_green_count,
                COUNT(CASE WHEN green_focus_score > 0.6 THEN 1 END) as high_green_count,
                COUNT(CASE WHEN green_focus_score > 0.4 THEN 1 END) as medium_green_count,
                ROUND(COUNT(CASE WHEN green_focus_score > 0.6 THEN 1 END) * 100.0 / COUNT(*), 1) as high_green_percentage
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE green_focus_score IS NOT NULL
        """
        
        # Execute all queries
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("min_green_score", "FLOAT64", min_green_score),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        
        country_results = [dict(row) for row in client.query(country_green_query, job_config=job_config).result()]
        cuisine_results = [dict(row) for row in client.query(cuisine_green_query, job_config=job_config).result()]
        correlation_results = [dict(row) for row in client.query(correlation_query).result()]
        top_green_results = [dict(row) for row in client.query(top_green_query, job_config=job_config).result()]
        cluster_results = [dict(row) for row in client.query(cluster_green_query).result()]
        overall_stats = dict(list(client.query(overall_stats_query).result())[0])
        
        return {
            "sustainability_overview": {
                "analysis_scope": f"Restaurants with green score >= {min_green_score}",
                "global_statistics": overall_stats
            },
            "green_leaders_by_country": {
                "analysis": "Countries with highest average green focus scores",
                "data": country_results
            },
            "green_leaders_by_cuisine": {
                "analysis": "Cuisine types with highest sustainability focus", 
                "data": cuisine_results
            },
            "green_performance_correlation": {
                "analysis": "How green focus correlates with star ratings and scores",
                "data": correlation_results
            },
            "top_sustainable_restaurants": {
                "analysis": f"Top {limit} most sustainable restaurants",
                "data": top_green_results
            },
            "sustainable_clusters": {
                "analysis": "Restaurant clusters with highest green focus",
                "data": cluster_results
            },
            "sustainability_insights": {
                "most_sustainable_country": country_results[0]["country"] if country_results else None,
                "most_sustainable_cuisine": cuisine_results[0]["cuisine"] if cuisine_results else None,
                "green_rating_correlation": "Positive" if correlation_results and correlation_results[0]["avg_stars"] > correlation_results[-1]["avg_stars"] else "Negative",
                "sustainability_adoption_rate": f"{overall_stats['high_green_percentage']}% of restaurants have high green focus (>0.6)"
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 28. Green Restaurant Recommendations - FIXED VERSION
# Place this BEFORE the catch-all /{restaurant_name} route

@router.get("/green/{restaurant_name}")  # REMOVED "/recommendations" prefix
def get_green_recommendations(
    restaurant_name: str, 
    min_green_score: float = 0.5,
    limit: int = 10,
    prioritize_green: bool = True
):
    """Recommend similar green restaurants to users browsing green-focused places"""
    try:
        # First, get the base restaurant's green characteristics
        base_restaurant_query = """
            SELECT DISTINCT
                Base_ID as id,
                Base_Name as name,
                Base_Cuisine as cuisine,
                Base_Country as country,
                green_focus_score as green_score,
                Base_Star_Rating as stars,
                Base_Recalculated_Score as overall_score,
                Base_Cluster as cluster,
                Base_UMAP_1 as umap_x,
                Base_UMAP_2 as umap_y,
                Base_Badge_List as badges
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE LOWER(Base_Name) = LOWER(@restaurant_name)
            AND green_focus_score IS NOT NULL
            LIMIT 1
        """
        
        base_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name)
        ])
        base_result = list(client.query(base_restaurant_query, job_config=base_job_config).result())
        
        if not base_result:
            raise HTTPException(status_code=404, detail=f"Green restaurant '{restaurant_name}' not found")
        
        base_restaurant = dict(base_result[0])
        
        # Check if the base restaurant is actually green-focused
        if base_restaurant["green_score"] < min_green_score:
            return {
                "base_restaurant": base_restaurant,
                "message": f"'{restaurant_name}' has low green focus ({base_restaurant['green_score']:.2f}). Showing general green recommendations instead.",
                "green_recommendations": [],
                "alternative_action": "Try /analytics/sustainability/trends for top green restaurants"
            }
        
        # Find green restaurants with similar characteristics
        if prioritize_green:
            # Prioritize green score similarity with cuisine/location matching
            green_recommendations_query = """
                WITH green_candidates AS (
                    SELECT
                        Base_ID as id,
                        Base_Name as name,
                        Base_Cuisine as cuisine,
                        Base_Country as country,
                        green_focus_score as green_score,
                        Base_Star_Rating as stars,
                        Base_Recalculated_Score as overall_score,
                        Base_Cluster as cluster,
                        Base_UMAP_1 as umap_x,
                        Base_UMAP_2 as umap_y,
                        Base_Badge_List as badges,
                        Base_Reputation_Label as reputation,
                        -- Calculate green similarity score
                        ABS(green_focus_score - @base_green_score) as green_diff,
                        -- Geographic similarity (UMAP distance)
                        SQRT(POW(Base_UMAP_1 - @base_umap_x, 2) + POW(Base_UMAP_2 - @base_umap_y, 2)) as geo_distance,
                        -- Cuisine match bonus
                        CASE WHEN Base_Cuisine = @base_cuisine THEN 0.3 ELSE 0.0 END as cuisine_bonus,
                        -- Country match bonus
                        CASE WHEN Base_Country = @base_country THEN 0.2 ELSE 0.0 END as country_bonus
                    FROM `{RECOMMENDATIONS_TABLE}`
                    WHERE green_focus_score >= @min_green_score
                    AND Base_ID != @base_id
                    AND Base_Name IS NOT NULL
                    GROUP BY Base_ID, Base_Name, Base_Cuisine, Base_Country, green_focus_score, Base_Star_Rating, Base_Recalculated_Score, Base_Cluster, Base_UMAP_1, Base_UMAP_2, Base_Badge_List, Base_Reputation_Label
                ),
                scored_recommendations AS (
                    SELECT
                        *,
                        -- Calculate overall green recommendation score
                        (
                            (1.0 - green_diff) * 0.4 +  -- Green similarity (40%)
                            (1.0 / (1.0 + geo_distance)) * 0.2 +  -- Geographic proximity (20%)
                            cuisine_bonus +  -- Cuisine match (30%)
                            country_bonus +  -- Country match (20%)
                            (stars / 5.0) * 0.1  -- Quality factor (10%)
                        ) as recommendation_score,
                        CASE 
                            WHEN green_diff < 0.1 THEN 'Very Similar Green Focus'
                            WHEN green_diff < 0.2 THEN 'Similar Green Focus'
                            WHEN green_diff < 0.3 THEN 'Moderately Green'
                            ELSE 'Different Green Level'
                        END as green_similarity_level
                    FROM green_candidates
                )
                SELECT
                    id, name, cuisine, country, green_score, stars, overall_score,
                    cluster, badges, reputation, recommendation_score, green_similarity_level,
                    ROUND(geo_distance, 2) as geographic_distance,
                    ROUND(green_diff, 3) as green_score_difference
                FROM scored_recommendations
                ORDER BY recommendation_score DESC
                LIMIT @limit
            """
        else:
            # Use existing recommendation data but filter for green restaurants
            green_recommendations_query = """
                SELECT
                    Rec_ID as id,
                    Rec_Name as name,
                    Rec_Cuisine as cuisine,
                    Rec_Country as country,
                    green_focus_score as green_score,
                    Rec_Star_Rating as stars,
                    Rec_Recalculated_Score as overall_score,
                    Rec_Cluster as cluster,
                    Rec_Badge_List as badges,
                    Rec_Reputation_Label as reputation,
                    final_inclusive_score as recommendation_score,
                    similarity_score,
                    Explainability_Text as explanation
                FROM `{RECOMMENDATIONS_TABLE}`
                WHERE restaurant_name = @restaurant_name
                AND green_focus_score >= @min_green_score
                GROUP BY Rec_ID, Rec_Name, Rec_Cuisine, Rec_Country, green_focus_score, Rec_Star_Rating, Rec_Recalculated_Score, Rec_Cluster, Rec_Badge_List, Rec_Reputation_Label, final_inclusive_score, similarity_score, Explainability_Text
                ORDER BY final_inclusive_score DESC
                LIMIT @limit
            """
        
        # Execute the recommendation query
        rec_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name),
            bigquery.ScalarQueryParameter("base_id", "INT64", base_restaurant["id"]),
            bigquery.ScalarQueryParameter("base_green_score", "FLOAT64", base_restaurant["green_score"]),
            bigquery.ScalarQueryParameter("base_umap_x", "FLOAT64", base_restaurant["umap_x"]),
            bigquery.ScalarQueryParameter("base_umap_y", "FLOAT64", base_restaurant["umap_y"]),
            bigquery.ScalarQueryParameter("base_cuisine", "STRING", base_restaurant["cuisine"]),
            bigquery.ScalarQueryParameter("base_country", "STRING", base_restaurant["country"]),
            bigquery.ScalarQueryParameter("min_green_score", "FLOAT64", min_green_score),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        
        recommendations = [dict(row) for row in client.query(green_recommendations_query, job_config=rec_job_config).result()]
        
        # Get green context for the recommendations
        green_context_query = """
            SELECT
                ROUND(AVG(green_focus_score), 3) as avg_green_score,
                COUNT(DISTINCT Base_ID) as total_green_restaurants,
                COUNT(CASE WHEN green_focus_score > 0.8 THEN 1 END) as very_high_green_count,
                COUNT(CASE WHEN green_focus_score > 0.6 THEN 1 END) as high_green_count
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE green_focus_score >= @min_green_score
        """
        
        context_job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("min_green_score", "FLOAT64", min_green_score)
        ])
        green_context = dict(list(client.query(green_context_query, job_config=context_job_config).result())[0])
        
        # Categorize recommendations by green level
        green_categories = {
            "very_high_green": [r for r in recommendations if r.get("green_score", 0) >= 0.8],
            "high_green": [r for r in recommendations if 0.6 <= r.get("green_score", 0) < 0.8],
            "medium_green": [r for r in recommendations if 0.4 <= r.get("green_score", 0) < 0.6]
        }
        
        return {
            "base_restaurant": base_restaurant,
            "green_recommendations": recommendations,
            "green_categories": green_categories,
            "recommendation_context": {
                "method": "Green-focused similarity matching" if prioritize_green else "Existing recommendations filtered for green",
                "min_green_threshold": min_green_score,
                "base_restaurant_green_level": base_restaurant["green_score"],
                "green_market_context": green_context
            },
            "sustainability_insights": {
                "total_recommendations": len(recommendations),
                "very_high_green_options": len(green_categories["very_high_green"]),
                "high_green_options": len(green_categories["high_green"]),
                "average_green_score": round(sum(r.get("green_score", 0) for r in recommendations) / len(recommendations), 3) if recommendations else 0,
                "sustainability_message": f"Found {len(recommendations)} eco-conscious alternatives to {restaurant_name}"
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# 1. Get Recommendations by Restaurant Name (CATCH-ALL - MUST BE LAST)
@router.get("/{restaurant_name}")
def get_recommendations(restaurant_name: str, limit: int = 10):
    """Get recommendations for a restaurant by name"""
    try:
        query = """
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
            FROM `{RECOMMENDATIONS_TABLE}`
            WHERE Base_Name = @restaurant_name
            ORDER BY final_inclusive_score DESC
            LIMIT @limit
        """
        job_config = bigquery.QueryJobConfig(query_parameters=[
            bigquery.ScalarQueryParameter("restaurant_name", "STRING", restaurant_name),
            bigquery.ScalarQueryParameter("limit", "INT64", limit)
        ])
        rows = list(client.query(query, job_config=job_config).result())
        if not rows:
            raise HTTPException(status_code=404, detail="No recommendations found.")
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))