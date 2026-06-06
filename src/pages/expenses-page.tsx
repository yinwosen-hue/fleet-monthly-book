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
import { Plus, Trash2, ArrowDownCircle } from "lucide-react";

const EXPENSE_CATEGORIES = [
  "燃油费",
  "维修保养",
  "过路费",
  "保险费",
  "轮胎更换",
  "司机工资",
  "车辆折旧",
  "停车费",
  "洗车费",
  "其他",
];

export default function ExpensesPage() {
  const {
    selectedMonth,
    setSelectedMonth,
    expenses,
    addExpense,
    isAddingExpense,
    deleteExpense,
  } = useDashboard();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  function handleAdd() {
    const numAmount = parseFloat(amount);
    if (!category.trim() || isNaN(numAmount) || numAmount <= 0) return;

    addExpense({
      category: category.trim(),
      amount: numAmount,
      month: selectedMonth,
      expense_date: expenseDate,
    });
    setCategory(EXPENSE_CATEGORIES[0]);
    setAmount("");
    setExpenseDate(new Date().toISOString().split("T")[0]);
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    if (window.confirm("确定要删除这条支出记录吗？")) {
      deleteExpense(id);
    }
  }

  return (
    <div>
      <Header
        title="支出记录"
        description="管理车队所有支出明细"
        actions={
          <div className="flex items-center gap-3">
            <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              新增支出
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-0">
          {expenses.length === 0 ? (
            <EmptyState
              title="暂无支出记录"
              description="点击右上角「新增支出」添加第一笔记录吧"
              icon={
                <ArrowDownCircle className="h-6 w-6 text-muted-foreground" />
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">
                      类别
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
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-sm font-medium">
                        {expense.category}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-destructive text-right tabular-nums">
                        -{formatCurrency(Number(expense.amount))}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground text-right">
                        {new Date(
                          expense.expense_date || expense.created_at
                        ).toLocaleDateString("zh-CN")}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(expense.id)}
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
                    <td className="px-6 py-3 text-sm font-bold text-destructive text-right tabular-nums">
                      -
                      {formatCurrency(
                        expenses.reduce((s, e) => s + Number(e.amount), 0)
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

      {/* Add Expense Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增支出</DialogTitle>
            <DialogDescription>
              添加一笔新的车队支出记录
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">支出类别</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-amount">金额 (元)</Label>
              <Input
                id="exp-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-date">日期</Label>
              <Input
                id="exp-date"
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={handleAdd}
              disabled={isAddingExpense || !amount}
            >
              {isAddingExpense ? "添加中..." : "确认添加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
