import pandas as pd
from flask import Flask, render_template, jsonify
import sklearn
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

app = Flask(__name__)

df = pd.read_csv("crime_dataset_india.csv")
# convert date column to datetime
df["Date of Occurrence"] = pd.to_datetime(df["Date of Occurrence"], errors="coerce")
df["Victim Age"] = df["Victim Age"].fillna(df["Victim Age"].median())
# create year column
df["Year"] = df["Date of Occurrence"].dt.year

le_city = LabelEncoder()
le_crime = LabelEncoder()

df["City_enc"] = le_city.fit_transform(df["City"])
df["Crime_enc"] = le_crime.fit_transform(df["Crime Description"])

X = df[["City_enc","Crime_enc","Year","Victim Age"]]
y = df["Crime Domain"]

model = RandomForestClassifier()
model.fit(X,y)

print(df.columns)

@app.route("/crime/<crime>")
def crime_data(crime):

    filtered = df[df["Crime Description"] == crime]

    # ---- HEATMAP DATA ----
    crime_counts = filtered["City"].value_counts().to_dict()

    max_val = max(crime_counts.values()) if crime_counts else 0

    if max_val == 0:
        normalized = {city: 0 for city in crime_counts}
    else:
        normalized = {city: val / max_val for city, val in crime_counts.items()}

    # ---- YEA R TREND DATA ----
    filtered["Year"] = pd.to_datetime(filtered["Date of Occurrence"]).dt.year

    yearly_counts = (
        filtered["Year"]
        .value_counts()
        .sort_index()
        .reindex([2020, 2021, 2022, 2023, 2024], fill_value=0)
        .to_dict()
    )

    return jsonify({
        "normalized": normalized,
        "raw": crime_counts,
        "yearly": yearly_counts
    })

@app.route("/ml_data/<crime>")
def ml_data(crime):
    filtered = df[df["Crime Description"] == crime]

    raw_counts = filtered["City"].value_counts().to_dict()
    max_val = max(raw_counts.values()) if raw_counts else 0
    normalized = {city: val/max_val if max_val else 0 for city,val in raw_counts.items()}

    # Fix: parse with correct format (DD-MM-YYYY HH:MM)
    filtered["Year"] = pd.to_datetime(
        filtered["Date Reported"],
        format="%d-%m-%Y %H:%M",
        errors='coerce'  # invalid parsing will be NaT
    ).dt.year

    by_year = filtered.groupby("Year").size().to_dict()

    return jsonify({
        "normalized": normalized,
        "raw": raw_counts,
        "byYear": by_year
    })

@app.route("/predict/<crime>")
def predict(crime):

    crime_id = le_crime.transform([crime])[0]

    cities = df["City"].unique()

    predictions = {}

    for city in cities:

        city_id = le_city.transform([city])[0]

        sample = [[city_id, crime_id, 2025, 30]]

        prob = model.predict_proba(sample).max()

        predictions[city] = float(prob)

    # top predicted cities
    top = dict(sorted(predictions.items(), key=lambda x: x[1], reverse=True))

    return jsonify(top)
# Landing page
@app.route("/")
def landing():
    return render_template("index2.html")

# Heatmap page
@app.route("/index")
def heatmap_page():
    crimes = df["Crime Description"].unique().tolist()
    return render_template("index.html", crimes=crimes)

# ML page (we can make crime optional for landing)
@app.route("/ml")
@app.route("/ml/<crime>")
def ml_page(crime=None):
    crimes = df["Crime Description"].unique().tolist()
    return render_template("ml.html", crimes=crimes, selected_crime=crime)
if __name__ == "__main__":
    app.run(debug=True)