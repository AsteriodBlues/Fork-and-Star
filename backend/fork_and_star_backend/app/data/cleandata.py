import os
import pandas as pd

# Define data directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DATA_DIR = os.path.join(BASE_DIR, "raw")
CLEANED_DATA_DIR = os.path.join(BASE_DIR, "cleaned")

# Create cleaned directory if it doesn't exist
os.makedirs(CLEANED_DATA_DIR, exist_ok=True)

# Define expected columns
columns = [
    "ID",
    "Name",
    "City",
    "Country",
    "Award",
    "Source List",
    "Years Featured",
    "Cuisine",
    "Score"
]

# Function to clean and standardize a single dataframe
def clean_df(df, source_list_name, years_featured=None):
    df.columns = [col.strip() for col in df.columns]

    # Fill missing expected columns
    for col in columns:
        if col not in df.columns:
            df[col] = ""

    # Fill Source List and Years Featured
    df["Source List"] = source_list_name
    df["Years Featured"] = years_featured if years_featured else ""

    # Clean Award column
    if "Award" in df.columns:
        df["Award"] = df["Award"].fillna("")
        df["Award"] = df["Award"].str.strip()

    # Clean Score column if exists
    if "Score" in df.columns:
        df["Score"] = df["Score"].fillna("")
        df["Score"] = df["Score"].astype(str)

    # Remove duplicates based on Name + City
    df = df.drop_duplicates(subset=["Name", "City"])

    # Reset index
    df = df.reset_index(drop=True)

    return df

# Process all files
for filename in os.listdir(RAW_DATA_DIR):
    if filename.endswith(".csv"):
        print(f"Processing: {filename}")

        # Try reading, skip bad lines
        try:
            df = pd.read_csv(os.path.join(RAW_DATA_DIR, filename), on_bad_lines="skip")
        except Exception as e:
            print(f"❌ Failed to read {filename}: {e}")
            continue

        # You can set source list name and years featured dynamically if needed
        source_list_name = filename.replace(".csv", "").replace("_", " ").title()
        years_featured = ""  # Optional: Parse years if needed

        # Clean dataframe
        cleaned_df = clean_df(df, source_list_name, years_featured)

        # Save cleaned file
        output_path = os.path.join(CLEANED_DATA_DIR, filename)
        cleaned_df.to_csv(output_path, index=False)
        print(f"✅ Saved cleaned data to {output_path}")

print("🎉 All CSV files processed and cleaned!")
