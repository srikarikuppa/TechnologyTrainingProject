import os
import numpy as np
import joblib
from tensorflow.keras.models import load_model

# =================================================
# Resolve absolute paths correctly
# =================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "energy_lstm_model.h5")
SCALER_PATH = os.path.join(ARTIFACTS_DIR, "energy_scaler.pkl")

# =================================================
# Load model and scaler (once)
# =================================================

model = load_model(MODEL_PATH, compile=False)
scaler = joblib.load(SCALER_PATH)

# =================================================
# Prediction function
# =================================================

def predict_energy(values):
    try:
        # Ensure input is a numpy array
        values = np.array(values).reshape(-1, 1)
        
        # Transform input using the loaded scaler
        scaled_values = scaler.transform(values)

        # Reshape for LSTM [samples, time steps, features]
        # Assuming the model expects (1, sequence_length, 1)
        # We need to make sure the input matches what the model was trained on.
        # If the input `values` is the sequence, then:
        scaled_values = scaled_values.reshape(1, scaled_values.shape[0], 1)
        
        # Predict using scaled input
        scaled_prediction = model.predict(scaled_values, verbose=0)
        
        # IMPORTANT: The model outputs a scaled value. 
        # We MUST apply inverse_transform to return the value in physical units (kWh).
        # We reshape to (1, 1) to match the scaler's expected input format.
        physical_prediction = scaler.inverse_transform(scaled_prediction.reshape(-1, 1))

        return float(physical_prediction[0][0])
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise e
