import pandas as pd
from flask import Flask, render_template, jsonify

app = Flask(__name__)

df = pd.read_csv("crime_dataset_india.csv")

@app.route("/crime/<crime_type>")
def get_crime(crime_type):

    filtered = df[df["Crime Description"] == crime_type]

    counts = filtered.groupby("City").size().to_dict()

    return jsonify(counts)

@app.route("/")
def home():

    crimes = df["Crime Description"].unique().tolist()

    return render_template("index.html", crimes=crimes)

if __name__ == "__main__":
    app.run(debug=True)