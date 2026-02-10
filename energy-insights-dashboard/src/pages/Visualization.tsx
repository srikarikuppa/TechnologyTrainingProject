import DashboardLayout from "@/components/DashboardLayout";
import ChartPlaceholder from "@/components/ChartPlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart as LineChartIcon,
  BarChart3 as BarChartIcon,
  Activity
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { usePrediction } from "@/hooks/usePrediction";

const Visualization = () => {
  const { prediction: result } = usePrediction();

  // Prepare bar chart data for Average vs Predicted
  const avgVsPredData = result?.analytics
    ? [
      { name: 'Average', value: result.analytics.average, type: 'average' },
      { name: 'Predicted', value: result.predicted_energy, type: 'predicted' }
    ]
    : [];

  // Prepare bar chart data for Peak vs Off-Peak
  const peakOffPeakData = result?.analytics
    ? [
      { name: 'Peak Usage', value: result.analytics.peak_total, type: 'peak' },
      { name: 'Off-Peak Usage', value: result.analytics.off_peak_total, type: 'off-peak' }
    ]
    : [];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-10 animate-fade-in pt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Advanced Analytics Visualizations
        </h1>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl font-medium">
          Deeper insights into your energy consumption patterns and classification.
        </p>
      </div>

      {/* Chart Legend */}
      <Card className="mb-8 border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-slate-600">Peak / High Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-sm font-semibold text-slate-600">Off-Peak / Avg Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-sm font-semibold text-slate-600">LSTM Prediction</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts */}
      <div className="grid gap-8 lg:grid-cols-1 mb-8">
        {/* Peak vs Off-Peak Usage Comparison */}
        <ChartPlaceholder
          title="Peak vs Off-Peak Usage Comparison"
          description="Total energy consumed during high-demand (above average) vs low-demand hours"
          type="bar"
          height="h-[400px]"
          className="shadow-lg shadow-slate-200/50"
        >
          {result?.analytics ? (
            <div className="h-[300px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakOffPeakData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit=" kWh" />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                    {peakOffPeakData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'peak' ? 'hsl(var(--primary))' : 'hsl(var(--energy-orange, #f59e0b))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
              <BarChartIcon className="h-16 w-16 opacity-10 mb-4" />
              <p className="font-bold text-lg">No consumption data available</p>
              <p className="text-sm">Run a prediction to analyze usage categories.</p>
            </div>
          )}
        </ChartPlaceholder>
      </div>

      {/* Comparison Chart */}
      <div className="grid gap-8 lg:grid-cols-1">
        <ChartPlaceholder
          title="Average vs Predicted Consumption"
          description="Comparative analysis of your average historical consumption against the AI forecast"
          type="bar"
          height="h-[400px]"
          className="shadow-lg shadow-slate-200/50"
        >
          {result?.analytics ? (
            <div className="h-[300px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgVsPredData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit=" kWh" />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                    {avgVsPredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'average' ? 'hsl(var(--energy-orange, #f59e0b))' : 'hsl(var(--accent))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
              <BarChartIcon className="h-16 w-16 opacity-10 mb-4" />
              <p className="font-bold text-lg">No analysis available</p>
            </div>
          )}
        </ChartPlaceholder>
      </div>
    </DashboardLayout>
  );
};

export default Visualization;
