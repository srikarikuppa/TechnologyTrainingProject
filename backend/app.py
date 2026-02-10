from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from ml.predict import predict_energy
from ml.recommend import energy_recommendation

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Smart Energy Prediction API is running", "status": "online"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        
        if not data or "values" not in data:
            return jsonify({
                "status": "error",
                "message": "Missing 'values' in request body"
            }), 400
        
        values = data.get("values")
        
        # Validation: Ensure values is a list, contains numbers, and has length 6-24
        if not isinstance(values, list) or not all(isinstance(x, (int, float)) for x in values):
             return jsonify({
                "status": "error",
                "message": "'values' must be a list of numbers"
            }), 400
        
        if len(values) < 6 or len(values) > 24:
            return jsonify({
                "status": "error",
                "message": "Input length must be between 6 and 24 values"
            }), 400

        # Call prediction model
        prediction = float(predict_energy(values))
        
        # Compute Analytics
        average_val = sum(values) / len(values)
        peak_val = max(values)
        peak_hour_index = values.index(peak_val)

        # Peak vs Off-Peak derivation
        peak_usage = sum(v for v in values if v > average_val)
        off_peak_usage = sum(v for v in values if v <= average_val)

        # Enhanced Rule-based recommendation
        if prediction > average_val * 1.2:
            recommendation = "High consumption predicted. Consider shifting non-essential appliance use to later hours."
        elif prediction < average_val * 0.8:
            recommendation = "Low consumption predicted. Your current usage pattern is energy-efficient."
        else:
            recommendation = "Stable consumption predicted. maintain your current energy habits."

        return jsonify({
            "status": "success",
            "predicted_energy": round(prediction, 2),
            "recommendation": recommendation,
            "analytics": {
                "historical": [round(v, 2) for v in values],
                "predicted": round(prediction, 2),
                "average": round(average_val, 2),
                "peak_hour_index": peak_hour_index,
                "average_consumption": round(average_val, 2),
                "peak_total": round(peak_usage, 2),
                "off_peak_total": round(off_peak_usage, 2),
                "peak_off_peak": {
                    "peak": round(peak_usage, 2),
                    "off_peak": round(off_peak_usage, 2)
                }
            }
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Internal Server Error", 
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
