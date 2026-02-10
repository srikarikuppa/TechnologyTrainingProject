const API_BASE_URL = "http://localhost:5000";

export interface PredictionRequest {
  values: number[];
}

export interface PredictionResponse {
  status: "success" | "error";
  predicted_energy?: number;
  recommendation?: string;
  message?: string;
  details?: string;
  analytics?: {
    historical: number[];
    predicted: number;
    average: number;
    peak_hour_index: number;
    average_consumption: number;
    peak_total: number;
    off_peak_total: number;
    peak_off_peak: {
      peak: number;
      off_peak: number;
    };
  };
}

export async function predictEnergy(values: number[]): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });

    const data: PredictionResponse = await response.json();

    if (!response.ok) {
      // Even if response is not ok, we might have a structured error message
      throw new Error(data.message || "Prediction failed");
    }

    return data;
  } catch (error) {
    console.error("API Call Failed:", error);
    // Return a structured error response even if the network fails
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
