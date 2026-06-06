import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Users,
  CircleUserRound,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { Header } from "@/components/layout/header";
import { MonthPicker } from "@/components/month-picker";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { RecentRecords } from "@/components/dashboard/recent-records";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const {
    selectedMonth,
    setSelectedMonth,
    totalIncome,
    totalExpense,
    netProfit,
    driverShare,
    ownerShare,
    recentTransactions,
  } = useDashboard();

  return (
    <div>
      <Header
        title="仪表盘"
        description="本月车队收支与利润总览"
        actions={
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        }
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <SummaryCard
          label="本月收入"
          value={formatCurrency(totalIncome)}
          rawValue={totalIncome}
          icon={<ArrowUpCircle className="h-4 w-4" />}
          tone="primary"
        />
        <SummaryCard
          label="本月支出"
          value={formatCurrency(totalExpense)}
          rawValue={totalExpense}
          icon={<ArrowDownCircle className="h-4 w-4" />}
          tone="destructive"
        />
        <SummaryCard
          label="本月净利润"
          value={formatCurrency(netProfit)}
          rawValue={netProfit}
          icon={<Wallet className="h-4 w-4" />}
          tone={netProfit >= 0 ? "success" : "destructive"}
          highlight
          isProfit
        />
        <SummaryCard
          label="司机分得 (50%)"
          value={formatCurrency(driverShare)}
          rawValue={driverShare}
          icon={<Users className="h-4 w-4" />}
          tone="muted"
        />
        <SummaryCard
          label="自家分得 (50%)"
          value={formatCurrency(ownerShare)}
          rawValue={ownerShare}
          icon={<CircleUserRound className="h-4 w-4" />}
          tone="muted"
        />
      </div>

      {/* Recent records */}
      <RecentRecords transactions={recentTransactions} />
    </div>
  );
}
