import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "blue" | "green" | "orange" | "purple";
  className?: string;
}

const variantStyles = {
  default: "bg-white border-border",
  blue: "bg-blue-50/30 border-blue-100",
  green: "bg-emerald-50/30 border-emerald-100",
  orange: "bg-amber-50/30 border-amber-100",
  purple: "bg-purple-50/30 border-purple-100",
};

const iconVariantStyles = {
  default: "bg-slate-100 text-slate-600 shadow-sm",
  blue: "bg-blue-100 text-blue-600 shadow-sm shadow-blue-100",
  green: "bg-emerald-100 text-emerald-600 shadow-sm shadow-emerald-100",
  orange: "bg-amber-100 text-amber-600 shadow-sm shadow-amber-100",
  purple: "bg-purple-100 text-purple-600 shadow-sm shadow-purple-100",
};

const StatCard = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = "default",
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-6 border shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
            {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1 pt-1">
              <span
                className={cn(
                  "text-xs font-semibold px-1.5 py-0.5 rounded-full",
                  trend === "up" && "bg-teal-50 text-teal-600",
                  trend === "down" && "bg-rose-50 text-rose-600",
                  trend === "neutral" && "bg-slate-100 text-slate-600"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trend === "neutral" && "→"} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconVariantStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
