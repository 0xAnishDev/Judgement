import pandas as pd

# Load dataset
df = pd.read_csv("crime_dataset_india.csv")

# Print all unique cities
unique_cities = df["City"].unique()

print(unique_cities)