import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LineChart, BarChart3 } from "lucide-react";

interface ChartPlaceholderProps {
  title: string;
  description?: string;
  type?: "line" | "bar";
  height?: string;
  className?: string;
  children?: ReactNode;
}

const ChartPlaceholder = ({
  title,
  description,
  type = "line",
  height = "h-[300px]",
  className,
  children,
}: ChartPlaceholderProps) => {
  const Icon = type === "line" ? LineChart : BarChart3;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children || (
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30",
            height
          )}
        >
          <Icon className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            Chart Placeholder
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Connect to API to display data
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartPlaceholder;
