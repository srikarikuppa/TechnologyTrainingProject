import DashboardLayout from "@/components/DashboardLayout";
import FeatureCard from "@/components/FeatureCard";
import { Zap, LineChart, BarChart3, TrendingUp, Activity } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Hero Section */}
      <section className="mb-16 pt-8 animate-fade-in">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary mb-8 shadow-sm">
            <Activity className="h-4 w-4 animate-pulse" />
            Next-Gen LSTM Insights
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 sm:text-6xl lg:text-7xl tracking-tight">
            Smart Energy
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">
              Consumption Prediction
            </span>
          </h1>
          <p className="mt-8 text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium">
            Leverage LSTM deep learning to forecast your energy usage patterns with precision.
            Optimize performance, reduce waste, and embrace a sustainable future.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">LSTM</p>
            <p className="text-sm text-muted-foreground mt-1">Deep Learning</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-accent">6-24h</p>
            <p className="text-sm text-muted-foreground mt-1">Input Range</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-energy-orange">1h</p>
            <p className="text-sm text-muted-foreground mt-1">Prediction</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-energy-purple">Real-time</p>
            <p className="text-sm text-muted-foreground mt-1">Analytics</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Explore Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Energy Prediction"
            description="Enter hourly consumption data and get LSTM-powered predictions for your next-hour energy usage."
            icon={<TrendingUp className="h-6 w-6" />}
            href="/prediction"
            variant="blue"
          />
          <FeatureCard
            title="Analytics"
            description="View analysis of your consumption patterns, peak hours, and energy-saving recommendations."
            icon={<BarChart3 className="h-6 w-6" />}
            href="/analysis"
            variant="green"
          />
          <FeatureCard
            title="Visualizations"
            description="Interactive charts showing historical consumption trends and predicted values."
            icon={<LineChart className="h-6 w-6" />}
            href="/visualization"
            variant="orange"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-foreground mb-2">Input Data</h3>
            <p className="text-sm text-muted-foreground">
              Enter 6 to 24 hourly energy consumption values from your historical data.
            </p>
          </div>
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-foreground mb-2">LSTM Processing</h3>
            <p className="text-sm text-muted-foreground">
              Our LSTM model analyzes temporal patterns and trends in your consumption data.
            </p>
          </div>
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-energy-orange text-energy-orange font-bold mb-4 bg-opacity-20">
              3
            </div>
            <h3 className="font-semibold text-foreground mb-2">Get Insights</h3>
            <p className="text-sm text-muted-foreground">
              Receive accurate predictions and actionable recommendations to optimize usage.
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Index;
