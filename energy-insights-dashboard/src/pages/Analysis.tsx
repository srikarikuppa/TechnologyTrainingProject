import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Lightbulb, Zap, ThermometerSun, Timer, AlertCircle } from "lucide-react";
import { usePrediction } from "@/hooks/usePrediction";

const energySavingTips = [
  {
    icon: <ThermometerSun className="h-5 w-5" />,
    title: "Optimize HVAC Usage",
    description: "Set your thermostat 2°F higher in summer and lower in winter to save up to 10% on heating/cooling costs.",
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: "Schedule High-Usage Appliances",
    description: "Run dishwashers, washing machines, and dryers during off-peak hours (typically 9 PM - 7 AM).",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Switch to LED Lighting",
    description: "LED bulbs use 75% less energy and last 25 times longer than incandescent lighting.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Unplug Idle Electronics",
    description: "Phantom loads from idle electronics can account for up to 10% of your home's energy use.",
  },
];

const Analysis = () => {
  const { prediction: result } = usePrediction();

  const averageVal = result?.analytics?.average ?? "--";
  const peakHour = result?.analytics?.peak_hour_index !== undefined
    ? `${result.analytics.peak_hour_index}:00`
    : "--:00";

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-10 animate-fade-in pt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Consumption Analysis
        </h1>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl font-medium">
          High-level insights into your energy usage patterns and optimization opportunities.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-8">
        <StatCard
          title="Average Consumption"
          value={typeof averageVal === 'number' ? averageVal.toFixed(2) : averageVal}
          unit="kWh"
          subtitle="Based on recent input data"
          icon={<Activity className="h-5 w-5" />}
          variant="blue"
          className="shadow-lg shadow-blue-100/50 rounded-2xl border-blue-100"
        />
        <StatCard
          title="Peak Usage Hour"
          value={peakHour}
          subtitle="Highest consumption recorded"
          icon={<Clock className="h-5 w-5" />}
          variant="orange"
          className="shadow-lg shadow-orange-100/50 rounded-2xl border-orange-100"
        />
      </div>

      {/* Recommendation Card */}
      {result?.recommendation && (
        <Card className="mb-8 border-emerald-100 bg-emerald-50/20 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Activity className="h-5 w-5 text-emerald-600" />
              AI Energy Optimization Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 font-medium leading-relaxed">
              {result.recommendation}
            </p>
          </CardContent>
        </Card>
      )}

      {!result && (
        <div className="mb-8 p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 py-12">
          <AlertCircle className="h-12 w-12 opacity-20 mb-3" />
          <p className="font-bold text-lg text-slate-500">No Insights Available Yet</p>
          <p className="text-sm">Run a prediction to generate personalized analysis.</p>
        </div>
      )}

      {/* Energy Saving Tips */}
      <Card className="rounded-2xl shadow-sm border-border overflow-hidden">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            General Energy Saving Tips
          </CardTitle>
          <CardDescription className="font-medium">
            Standard best practices to reduce your utility bills
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {energySavingTips.map((tip, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md hover:-translate-y-1 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{tip.title}</h4>
                  <p className="mt-1 text-sm text-slate-500 font-medium leading-normal">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Analysis;
