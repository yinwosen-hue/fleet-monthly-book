import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { AnimatedCounter, ProfitCounter } from "@/components/animated-counter";

interface SummaryCardProps {
  label: string;
  value: string;
  rawValue?: number;
  icon: React.ReactNode;
  tone: "primary" | "destructive" | "success" | "muted";
  highlight?: boolean;
  isProfit?: boolean;
}

const TONE_CLASSES: Record<SummaryCardProps["tone"], string> = {
  primary: "bg-primary-soft text-primary",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
  muted: "bg-muted text-muted-foreground",
};

export function SummaryCard({
  label,
  value,
  rawValue,
  icon,
  tone,
  highlight,
  isProfit,
}: SummaryCardProps) {
  const textColorClass =
    highlight && tone === "success"
      ? "text-success"
      : highlight && tone === "destructive"
        ? "text-destructive"
        : "text-foreground";

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm card-accent">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <span
            className={cn(
              "h-7 w-7 rounded-md grid place-items-center",
              TONE_CLASSES[tone]
            )}
          >
            {icon}
          </span>
        </div>
        <p
          className={cn(
            "text-xl md:text-2xl font-semibold tabular-nums tracking-tight",
            textColorClass
          )}
        >
          {isProfit && rawValue !== undefined ? (
            <ProfitCounter value={rawValue} format={formatCurrency} />
          ) : rawValue !== undefined ? (
            <AnimatedCounter value={rawValue} format={formatCurrency} />
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
}
