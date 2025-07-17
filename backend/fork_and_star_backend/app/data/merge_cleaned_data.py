import os
import pandas as pd
from collections import defaultdict

CLEANED_DIR = "backend/fork_and_star_backend/app/data/cleaned"
OUTPUT_FILE = os.path.join(CLEANED_DIR, "master_restaurants.csv")

# Create a dictionary to hold merged info
merged_data = {}

def make_key(row):
    return (str(row["Name"]).strip().lower(), str(row["City"]).strip().lower(), str(row["Country"]).strip().lower())

# Iterate over all CSVs
for filename in os.listdir(CLEANED_DIR):
    if not filename.endswith(".csv") or filename == "master_restaurants.csv":
        continue

    print(f"Processing: {filename}")
    df = pd.read_csv(os.path.join(CLEANED_DIR, filename))

    for _, row in df.iterrows():
        key = make_key(row)
        if key not in merged_data:
            merged_data[key] = {
                "Name": row["Name"],
                "City": row["City"],
                "Country": row["Country"],
                "Cuisine": set(),
                "Awards": set(),
                "Source Lists": defaultdict(set),
            }

        # Merge cuisine
        if pd.notna(row.get("Cuisine")) and row["Cuisine"]:
            merged_data[key]["Cuisine"].add(row["Cuisine"])

        # Merge awards
        if pd.notna(row.get("Awards")) and row["Awards"]:
            merged_data[key]["Awards"].add(row["Awards"])

        # Merge source list with years if mentioned
        if pd.notna(row.get("Source Lists")) and row["Source Lists"]:
            raw_sources = row["Source Lists"].split(";")
            for src in raw_sources:
                src = src.strip()
                if not src:
                    continue
                # Try to extract year if it exists
                year = ""
                if any(c.isdigit() for c in src):
                    tokens = src.split()
                    possible_years = [t for t in tokens if t.isdigit() and len(t) == 4]
                    if possible_years:
                        year = possible_years[0]
                        list_name = src.replace(year, "").strip()
                        merged_data[key]["Source Lists"][list_name].add(year)
                    else:
                        merged_data[key]["Source Lists"][src].add("")
                else:
                    merged_data[key]["Source Lists"][src].add("")

# Prepare final rows
final_rows = []
for data in merged_data.values():
    cuisine = "; ".join(sorted(data["Cuisine"])) if data["Cuisine"] else ""
    awards = "; ".join(sorted(data["Awards"])) if data["Awards"] else ""

    source_list_entries = []
    for src, years in data["Source Lists"].items():
        if years and all(year.isdigit() for year in years if year):
            years_sorted = sorted(year for year in years if year)
            years_str = ", ".join(years_sorted)
            entry = f"{src} ({years_str})"
        else:
            entry = src
        source_list_entries.append(entry)
    sources_str = "; ".join(sorted(source_list_entries))

    final_rows.append({
        "Name": data["Name"],
        "City": data["City"],
        "Country": data["Country"],
        "Cuisine": cuisine,
        "Awards": awards,
        "Source Lists": sources_str
    })

# Save to master CSV
master_df = pd.DataFrame(final_rows)
master_df.to_csv(OUTPUT_FILE, index=False)
print(f"✅ Master merged dataset saved to {OUTPUT_FILE}")
