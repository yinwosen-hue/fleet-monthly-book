import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface MonthPickerProps {
  value: string; // format: "YYYY-MM"
  onChange: (value: string) => void;
}

const MONTH_NAMES = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [year, month] = value.split("-").map(Number);

  function handlePrevMonth() {
    const d = new Date(year, month - 1, 1);
    d.setMonth(d.getMonth() - 1);
    onChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  function handleNextMonth() {
    const d = new Date(year, month - 1, 1);
    d.setMonth(d.getMonth() + 1);
    onChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  return (
    <div className="inline-flex items-center gap-2 bg-card border rounded-lg px-3 py-1.5 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={handlePrevMonth}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium min-w-[90px] text-center tabular-nums select-none">
        {year}年 {MONTH_NAMES[month - 1]}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={handleNextMonth}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
