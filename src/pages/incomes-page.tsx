import { useState } from "react";
import { useDashboard } from "@/hooks/use-dashboard";
import { Header } from "@/components/layout/header";
import { MonthPicker } from "@/components/month-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/empty-state";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash2, ArrowUpCircle } from "lucide-react";

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function IncomesPage() {
  const {
    selectedMonth,
    setSelectedMonth,
    incomes,
    addIncome,
    isAddingIncome,
    deleteIncome,
  } = useDashboard();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  function handleAdd() {
    const numAmount = parseFloat(amount);
    if (!customer.trim() || isNaN(numAmount) || numAmount <= 0) return;

    addIncome({
      customer: customer.trim(),
      amount: numAmount,
      month: selectedMonth,
    });
    setCustomer("");
    setAmount("");
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    if (window.confirm("确定要删除这条收入记录吗？")) {
      deleteIncome(id);
    }
  }

  return (
    <div>
      <Header
        title="收入记录"
        description="管理车队所有收入明细"
        actions={
          <div className="flex items-center gap-3">
            <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              新增收入
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-0">
          {incomes.length === 0 ? (
            <EmptyState
              title="暂无收入记录"
              description="点击右上角「新增收入」添加第一笔记录吧"
              icon={
                <ArrowUpCircle className="h-6 w-6 text-muted-foreground" />
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">
                      客户
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">
                      金额
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">
                      日期
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3 w-[80px]">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {incomes.map((income) => (
                    <tr
                      key={income.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-sm font-medium">
                        {income.customer}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-success text-right tabular-nums">
                        +{formatCurrency(Number(income.amount))}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground text-right">
                        {new Date(income.created_at).toLocaleDateString("zh-CN")}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(income.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border bg-muted/30">
                    <td className="px-6 py-3 text-sm font-semibold">合计</td>
                    <td className="px-6 py-3 text-sm font-bold text-success text-right tabular-nums">
                      +
                      {formatCurrency(
                        incomes.reduce((s, i) => s + Number(i.amount), 0)
                      )}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Income Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增收入</DialogTitle>
            <DialogDescription>
              添加一笔新的车队收入记录
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">客户名称</Label>
              <Input
                id="customer"
                placeholder="例如：顺丰物流 - 华南线路运费"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">金额 (元)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isAddingIncome || !customer.trim() || !amount}
            >
              {isAddingIncome ? "添加中..." : "确认添加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
