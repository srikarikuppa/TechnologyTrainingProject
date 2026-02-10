import { useMutation, useQueryClient } from "@tanstack/react-query";
import { predictEnergy, PredictionResponse } from "../lib/energyApi";

const PREDICTION_KEY = ["energy-prediction"];

export function usePrediction() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: number[]) => predictEnergy(values),
        onSuccess: (data) => {
            if (data.status === "success") {
                queryClient.setQueryData(PREDICTION_KEY, data);
            }
        },
    });

    const predictionData = queryClient.getQueryData<PredictionResponse>(PREDICTION_KEY);

    return {
        runPrediction: mutation.mutateAsync,
        prediction: predictionData,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
