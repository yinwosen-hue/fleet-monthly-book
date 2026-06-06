import { useDashboard } from "@/hooks/use-dashboard";
import { Header } from "@/components/layout/header";
import { MonthPicker } from "@/components/month-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function ReportsPage() {
  const {
    selectedMonth,
    setSelectedMonth,
    totalIncome,
    totalExpense,
    netProfit,
    driverShare,
    ownerShare,
    incomes,
    expenses,
  } = useDashboard();

  const profitMargin =
    totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0.0";

  return (
    <div>
      <Header
        title="报表"
        description="本月车队财务数据汇总"
        actions={
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Income breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              收入明细
            </CardTitle>
          </CardHeader>
          <CardContent>
            {incomes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                暂无数据
              </p>
            ) : (
              <div className="space-y-3">
                {incomes.map((inc) => (
                  <div
                    key={inc.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm truncate flex-1 mr-4">
                      {inc.customer}
                    </span>
                    <span className="text-sm font-semibold text-success tabular-nums shrink-0">
                      +{formatCurrency(inc.amount)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">收入合计</span>
                  <span className="text-sm font-bold text-success tabular-nums">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expense breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              支出明细
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                暂无数据
              </p>
            ) : (
              <div className="space-y-3">
                {expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm truncate flex-1 mr-4">
                      {exp.category}
                    </span>
                    <span className="text-sm font-semibold text-destructive tabular-nums shrink-0">
                      -{formatCurrency(exp.amount)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">支出合计</span>
                  <span className="text-sm font-bold text-destructive tabular-nums">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-muted-foreground">
                净利润
              </span>
            </div>
            <p
              className={`text-xl font-bold tabular-nums ${
                netProfit >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {formatCurrency(netProfit)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              利润率 {profitMargin}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-soft/50 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                司机分得 (50%)
              </span>
            </div>
            <p className="text-xl font-bold tabular-nums text-foreground">
              {formatCurrency(driverShare)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              按50%比例分配
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-soft/50 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                自家分得 (50%)
              </span>
            </div>
            <p className="text-xl font-bold tabular-nums text-foreground">
              {formatCurrency(ownerShare)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              按50%比例分配
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
