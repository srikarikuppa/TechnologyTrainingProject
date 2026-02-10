import { useState } from "react";
import { LineChart as LineChartIcon, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Area,
  AreaChart
} from "recharts";

// ✅ USE RELATIVE IMPORTS (MATCHES YOUR FILE NAMES EXACTLY)
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import ChartPlaceholder from "../components/ChartPlaceholder";
import { usePrediction } from "../hooks/usePrediction";

export default function Prediction() {
  const { runPrediction, prediction: result, isLoading: loading } = usePrediction();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateInput = (input: string): number[] | null => {
    setValidationError(null);

    if (!input.trim()) {
      setValidationError("Please enter hourly consumption values.");
      return null;
    }

    const valueStrings = input.split(/[\s,]+/).filter(v => v.trim() !== "");

    if (valueStrings.length < 6 || valueStrings.length > 24) {
      setValidationError(`Please enter between 6 and 24 values.You entered ${valueStrings.length}.`);
      return null;
    }

    const numbers = valueStrings.map(v => Number(v));

    if (numbers.some(n => isNaN(n))) {
      setValidationError("All values must be valid numbers (e.g., 1.2, 0.5).");
      return null;
    }

    return numbers;
  };

  const handlePredict = async () => {
    const values = validateInput(inputValue);
    if (!values) return;

    setError(null);

    try {
      const data = await runPrediction(values);
      if (data.status !== "success") {
        setError(data.message || "Prediction failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  // Prepare chart data
  const chartData = result?.analytics
    ? [
      ...result.analytics.historical.map((val, i) => ({
        hour: `H - ${result.analytics!.historical.length - i} `,
        value: val,
        type: 'historical'
      })),
      {
        hour: 'Predicted',
        value: result.predicted_energy,
        type: 'predicted'
      }
    ]
    : [];

  return (
    <DashboardLayout title="Energy Prediction">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Energy Consumption Prediction
          </h2>
          <p className="text-slate-500 max-w-2xl font-medium">
            Enter your hourly energy consumption data to forecast future usage patterns using our AI model.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white p-8 rounded-2xl border border-border shadow-xl shadow-slate-200/50 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <label htmlFor="energy-input" className="block font-bold text-slate-800 text-lg">
                Hourly Energy Consumption (kWh)
              </label>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Enter 6 to 24 numbers, separated by commas or spaces.
            </p>
            <textarea
              id="energy-input"
              rows={4}
              className={`w-full p-4 rounded-xl border-2 transition-all outline-none resize-none font-medium text-slate-700 shadow-inner ${validationError
                  ? 'border-red-200 bg-red-50/30'
                  : 'border-slate-100 bg-slate-50/20 focus:border-primary focus:bg-white'
                }`}
              placeholder="e.g., 1.2, 2.0, 1.8, 2.3, 1.5, 0.9"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (validationError) setValidationError(null);
              }}
              disabled={loading}
            />
            {validationError && (
              <p className="text-sm text-red-600 font-bold animate-pulse flex items-center gap-1">
                <span>⚠</span> {validationError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              {inputValue.split(/[\s,]+/).filter(v => v.trim() !== "").length} values entered
            </div>
            <button
              onClick={handlePredict}
              disabled={loading}
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:bg-slate-300 transition-all active:scale-95 flex items-center gap-2 text-base shadow-md"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Processing..." : "Run Prediction"}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg flex items-center gap-2 font-medium">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {result && result.status === "success" && (
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in-up">
            <StatCard
              title="Predicted Energy Consumption"
              value={result.predicted_energy ?? 0}
              unit="kWh"
              variant="blue"
              className="md:col-span-2 border-primary/20 shadow-lg shadow-primary/5"
            />

            <div className="md:col-span-2 p-6 border border-emerald-100 bg-emerald-50/30 rounded-2xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-emerald-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                AI Recommendation
              </h3>
              <p className="text-slate-700 leading-relaxed font-medium">{result.recommendation}</p>
            </div>
          </div>
        )}

        <ChartPlaceholder
          title="Energy Trends"
          description="Historical usage vs LSTM prediction"
          className="shadow-xl shadow-slate-200/50"
        >
          {result?.analytics ? (
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    unit=" kWh"
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    dot={(props: any) => {
                      if (props.payload.type === 'predicted') {
                        return <circle cx={props.cx} cy={props.cy} r={6} fill="hsl(var(--accent))" stroke="white" strokeWidth={2} />;
                      }
                      return <circle cx={props.cx} cy={props.cy} r={2} fill="hsl(var(--primary))" />;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
              <LineChartIcon className="h-12 w-12 opacity-20 mb-2" />
              <p className="font-medium">Run prediction to see trends</p>
            </div>
          )}
        </ChartPlaceholder>
      </div>
    </DashboardLayout>
  );
}
