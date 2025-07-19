
-- 1. Basic Exploration
SELECT 
  COUNT(*) AS total_rows,
  COUNT(DISTINCT Name) AS unique_restaurants,
  COUNTIF(`Green Star` = TRUE) AS green_star_count,
  AVG(SAFE_CAST(`La Liste Score` AS FLOAT64)) AS avg_la_liste
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_dataset`;

-- 2. Add Combined Awards Column
SELECT
  *,
  ARRAY_TO_STRING(
    ARRAY(
      SELECT award FROM UNNEST([
        NULLIF(Award, ''),
        IF(`Green Star` = TRUE, 'Green Star', NULL)
      ]) AS award
      WHERE award IS NOT NULL
    ),
    ', '
  ) AS Awards_Summary
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_dataset`
LIMIT 25;

-- 3. Extract Years
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_enriched` AS
SELECT
  *,
  ARRAY(
    SELECT CAST(y AS INT64)
    FROM UNNEST(REGEXP_EXTRACT_ALL(`Years Featured`, r'\d{4}')) AS y
    WHERE SAFE_CAST(y AS INT64) BETWEEN 2002 AND 2025
  ) AS Years_Array,
  (
    SELECT MIN(SAFE_CAST(y AS INT64))
    FROM UNNEST(REGEXP_EXTRACT_ALL(`Years Featured`, r'\d{4}')) AS y
    WHERE SAFE_CAST(y AS INT64) BETWEEN 2002 AND 2025
  ) AS Earliest_Year,
  (
    SELECT MAX(SAFE_CAST(y AS INT64))
    FROM UNNEST(REGEXP_EXTRACT_ALL(`Years Featured`, r'\d{4}')) AS y
    WHERE SAFE_CAST(y AS INT64) BETWEEN 2002 AND 2025
  ) AS Latest_Year,
  ARRAY_LENGTH(
    ARRAY(
      SELECT DISTINCT CAST(y AS INT64)
      FROM UNNEST(REGEXP_EXTRACT_ALL(`Years Featured`, r'\d{4}')) AS y
      WHERE SAFE_CAST(y AS INT64) BETWEEN 2002 AND 2025
    )
  ) AS Active_Years_Count
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_dataset`;

-- 4. Clean String Fields
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_enriched_cleaned` AS
SELECT
  *,
  TRIM(REGEXP_REPLACE(Cuisine, r'[\\}]$', '')) AS Cuisine_Cleaned,
  REGEXP_REPLACE(Name, r'\\.|\'\d+', '') AS Clean_Name
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_enriched`;

-- 5. Weight Awards
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_with_award_score` AS
SELECT
  *,
  CASE
    WHEN LOWER(Award) LIKE '%3 michelin%' THEN 10
    WHEN LOWER(Award) LIKE '%2 michelin%' THEN 7
    WHEN LOWER(Award) LIKE '%1 michelin%' THEN 5
    WHEN LOWER(Award) LIKE '%bib gourmand%' THEN 2
    WHEN LOWER(Award) LIKE '%green star%' THEN 3
    WHEN LOWER(Award) LIKE '%tabelog gold%' THEN 4
    WHEN LOWER(Award) LIKE '%tabelog silver%' THEN 2
    WHEN LOWER(Award) LIKE '%tabelog bronze%' THEN 1
    WHEN LOWER(Award) LIKE '%selected restaurant%' THEN 1
    ELSE 0
  END AS Award_Score,
  CASE
    WHEN LOWER(Award) LIKE '%3 michelin%' THEN 'Legendary'
    WHEN LOWER(Award) LIKE '%2 michelin%' THEN 'World-Class'
    WHEN LOWER(Award) LIKE '%1 michelin%' THEN 'Highly Acclaimed'
    WHEN LOWER(Award) LIKE '%bib gourmand%' THEN 'Recognized'
    ELSE 'Emerging'
  END AS Award_Tier
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_enriched_cleaned`;

-- 6. Star Score with La Liste and Award Weight
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_scored` AS
SELECT
  *,
  SAFE_CAST(`La Liste Score` AS FLOAT64) AS La_Liste_Numeric,
  Award_Score AS Award_Numeric,
  SAFE_DIVIDE(SAFE_CAST(`La Liste Score` AS FLOAT64), 100) * 30 +
  SAFE_DIVIDE(Award_Score, 10) * 70 AS Overall_Star_Score
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_with_award_score`;

-- 7. Add Momentum, Signals, Score Color
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_supercharged` AS
SELECT
  *,
  CASE
    WHEN Latest_Year < 2022 THEN 'Fading'
    WHEN Latest_Year >= 2024 THEN 'Rising'
    ELSE 'Stable'
  END AS Momentum_Score,
  CASE
    WHEN Overall_Star_Score >= 9 THEN 'Gold'
    WHEN Overall_Star_Score >= 7 THEN 'Silver'
    WHEN Overall_Star_Score >= 5 THEN 'Bronze'
    ELSE 'Gray'
  END AS Score_Color,
  CASE WHEN Award_Score >= 7 THEN TRUE ELSE FALSE END AS Is_High_Value,
  CASE WHEN Award_Tier = 'Recognized' AND Award_Score <= 3 THEN TRUE ELSE FALSE END AS Is_Underrated,
  CASE WHEN `Green Star` = TRUE THEN TRUE ELSE FALSE END AS Is_Green_Leader,
  CASE
    WHEN Overall_Star_Score >= 9 THEN 5
    WHEN Overall_Star_Score >= 7 THEN 4
    WHEN Overall_Star_Score >= 5 THEN 3
    WHEN Overall_Star_Score >= 3 THEN 2
    ELSE 1
  END AS Star_Rating
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_scored`;

-- 8. God Tier Feature Vectors + Tags
CREATE OR REPLACE TABLE `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_god_tier_v2` AS
SELECT
  *,
  CONCAT(
    '{ "overall": ', ROUND(Norm_Overall_Score, 3),
    ', "award": ', ROUND(Norm_Award_Score, 3),
    ', "la_liste": ', ROUND(Norm_La_Liste_Score, 3),
    ', "michelin": ', Michelin_Level,
    ', "tenure": ', Active_Years_Count, ' }'
  ) AS Feature_Vector,
  CASE
    WHEN Michelin_Level = 3 AND Active_Years_Count >= 3 THEN 'Fine Dining Institution'
    WHEN Award_Tier = 'Legendary' AND Region = 'Asia' THEN 'Global Icon'
    WHEN Is_High_Value = TRUE AND Active_Years_Count < 3 THEN 'Rising Star'
    WHEN Award_Score < 3 AND `La Liste Score` >= 90 THEN 'Hidden Gem'
    ELSE 'Recognized Table'
  END AS Reputation_Label,
  ARRAY(
    SELECT CAST(y AS INT64)
    FROM UNNEST(REGEXP_EXTRACT_ALL(`Years Featured`, r'\d{4}')) AS y
    WHERE SAFE_CAST(y AS INT64) BETWEEN 2002 AND 2025
  ) AS Featured_Years_Array,
  ARRAY_TO_STRING(
    ARRAY(
      SELECT badge FROM UNNEST([
        IF(LOWER(Award) LIKE '%3 michelin%', '3 Michelin Stars', NULL),
        IF(LOWER(Award) LIKE '%2 michelin%', '2 Michelin Stars', NULL),
        IF(LOWER(Award) LIKE '%1 michelin%', '1 Michelin Star', NULL),
        IF(`Green Star`, 'Green Star', NULL),
        Award_Tier,
        Momentum_Score,
        Score_Color
      ]) AS badge
      WHERE badge IS NOT NULL
    ),
    ', '
  ) AS Badge_List
FROM `peppy-cosmos-466201-n2.fork_and_star_cleaned.master_restaurant_god_tier`;
