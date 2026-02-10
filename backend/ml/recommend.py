def energy_recommendation(predicted_value, avg=1.2, peak=2.5):
    if predicted_value > peak:
        return "High energy usage predicted. Shift heavy appliances to off-peak hours."
    elif predicted_value > avg:
        return "Moderate usage predicted. Consider reducing unnecessary consumption."
    else:
        return "Energy usage is optimal. Keep it up."
