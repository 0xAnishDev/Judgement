import pandas as pd
from flask import Flask, render_template, jsonify

app = Flask(__name__)

df = pd.read_csv("crime_dataset_india.csv")

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

@app.route("/")
def home():

    crimes = df["Crime Description"].unique().tolist()

    return render_template("index.html", crimes=crimes)

if __name__ == "__main__":
    app.run(debug=True)