import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";

interface RecentRecordsProps {
  transactions: Transaction[];
}

export function RecentRecords({ transactions }: RecentRecordsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">最近记录</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.length === 0 ? (
          <EmptyState
            title="本月暂无记录"
            description="去添加第一笔收入或支出吧"
          />
        ) : (
          <ul className="divide-y divide-border">
            {transactions.map((tx) => (
              <li
                key={`${tx.type}-${tx.id}`}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "shrink-0",
                      tx.type === "income"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    )}
                  >
                    {tx.type === "income" ? "收入" : "支出"}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{tx.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    tx.type === "income" ? "text-success" : "text-destructive"
                  )}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
