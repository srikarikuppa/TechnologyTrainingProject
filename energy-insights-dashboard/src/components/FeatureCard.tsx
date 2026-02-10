import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  variant?: "blue" | "green" | "orange" | "purple";
  className?: string;
}

const variantStyles = {
  blue: {
    bg: "bg-energy-blue-light hover:bg-energy-blue-light/80",
    icon: "bg-energy-blue/10 text-energy-blue",
    arrow: "text-energy-blue",
  },
  green: {
    bg: "bg-energy-green-light hover:bg-energy-green-light/80",
    icon: "bg-energy-green/10 text-energy-green",
    arrow: "text-energy-green",
  },
  orange: {
    bg: "bg-energy-orange-light hover:bg-energy-orange-light/80",
    icon: "bg-energy-orange/10 text-energy-orange",
    arrow: "text-energy-orange",
  },
  purple: {
    bg: "bg-energy-purple-light hover:bg-energy-purple-light/80",
    icon: "bg-energy-purple/10 text-energy-purple",
    arrow: "text-energy-purple",
  },
};

const FeatureCard = ({
  title,
  description,
  icon,
  href,
  variant = "blue",
  className,
}: FeatureCardProps) => {
  const styles = variantStyles[variant];

  return (
    <Link
      to={href}
      className={cn(
        "group block rounded-xl border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        styles.bg,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            styles.icon
          )}
        >
          {icon}
        </div>
        <ArrowRight
          className={cn(
            "h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1",
            styles.arrow
          )}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Link>
  );
};

export default FeatureCard;
