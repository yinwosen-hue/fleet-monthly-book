import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  format = (v) => String(v),
  duration = 800,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const startValue = 0;

            function animate(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(startValue + (value - startValue) * eased);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            }

            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  // If value changed externally after initial animation, update immediately
  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(displayValue)}
    </span>
  );
}

interface ProfitCounterProps {
  value: number;
  format?: (value: number) => string;
  className?: string;
  animate?: boolean;
}

export function ProfitCounter({
  value,
  format = (v) => String(v),
  className,
  animate = true,
}: ProfitCounterProps) {
  const isPositive = value >= 0;
  const prevValue = useRef(value);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (prevValue.current !== value && value < 0) {
      forceUpdate((n) => n + 1);
    }
    prevValue.current = value;
  }, [value]);

  return (
    <span
      className={cn(
        "tabular-nums inline-block",
        isPositive ? "profit-positive" : "profit-negative",
        !isPositive && "profit-pulse",
        className
      )}
    >
      {animate ? (
        <AnimatedCounter value={value} format={format} />
      ) : (
        format(value)
      )}
    </span>
  );
}
