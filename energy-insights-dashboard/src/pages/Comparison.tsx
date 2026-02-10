import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Zap, TrendingUp, CheckCircle2, Target, Database } from "lucide-react";

const lstmBenefits = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Temporal Pattern Recognition",
    description: "Energy consumption data is sequential and time-dependent. LSTM excels at recognizing these temporal patterns.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Trend Capture",
    description: "LSTM captures temporal patterns and trends effectively, learning from historical consumption data.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Long-Term Dependencies",
    description: "LSTM handles long-term dependencies better than traditional models, remembering important patterns over time.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Stable & Reliable",
    description: "LSTM provides stable and reliable predictions for time-series data, making it ideal for energy forecasting.",
  },
];

const Comparison = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">
          Model Used: Long Short-Term Memory (LSTM)
        </h1>
        <p className="mt-2 text-muted-foreground">
          Understanding the deep learning model powering your energy predictions.
        </p>
      </div>

      {/* Main Model Card */}
      <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Long Short-Term Memory (LSTM)</CardTitle>
                <CardDescription className="text-sm mt-1">
                  Deep Learning Neural Network for Time-Series Forecasting
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Active Model
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-card border border-border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Model Name</p>
              <p className="text-lg font-semibold text-foreground mt-1">LSTM</p>
              <p className="text-xs text-muted-foreground mt-1">Long Short-Term Memory</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Problem Type</p>
              <p className="text-lg font-semibold text-foreground mt-1">Time-Series</p>
              <p className="text-xs text-muted-foreground mt-1">Forecasting</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Input</p>
              <p className="text-lg font-semibold text-foreground mt-1">6–24 Hours</p>
              <p className="text-xs text-muted-foreground mt-1">Historical consumption values</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Output</p>
              <p className="text-lg font-semibold text-foreground mt-1">Next Hour</p>
              <p className="text-xs text-muted-foreground mt-1">Predicted energy consumption</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why LSTM Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Why LSTM is the Best Choice for This Project
          </CardTitle>
          <CardDescription>
            LSTM networks are specifically designed for sequential data and excel at energy consumption forecasting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {lstmBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 rounded-xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">About LSTM Networks</h3>
        <p className="text-muted-foreground leading-relaxed">
          Long Short-Term Memory (LSTM) is a type of recurrent neural network (RNN) architecture that is 
          specifically designed to learn long-term dependencies in sequential data. Unlike traditional 
          neural networks, LSTM has a unique internal structure with gates that control the flow of 
          information, allowing it to remember important patterns over extended time periods while 
          forgetting irrelevant data. This makes LSTM particularly well-suited for time-series 
          forecasting tasks like energy consumption prediction, where understanding historical 
          patterns is crucial for making accurate future predictions.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Comparison;
