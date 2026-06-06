import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchIncomes,
  fetchExpenses,
  addIncome,
  deleteIncome,
  addExpense,
  deleteExpense,
} from "@/lib/store";
import { Transaction, Income, Expense } from "@/lib/types";
import { toast } from "sonner";

export function useDashboard() {
  const queryClient = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // Fetch incomes
  const { data: incomes = [] } = useQuery({
    queryKey: ["incomes", selectedMonth],
    queryFn: () => fetchIncomes(selectedMonth),
    staleTime: 30_000,
  });

  // Fetch expenses
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", selectedMonth],
    queryFn: () => fetchExpenses(selectedMonth),
    staleTime: 30_000,
  });

  // Mutations: Add income
  const addIncomeMutation = useMutation({
    mutationFn: (income: Omit<Income, "id" | "created_at">) =>
      addIncome(income),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast.success("收入记录已添加");
    },
    onError: (error: Error) => {
      toast.error(`添加失败: ${error.message}`);
    },
  });

  // Mutations: Delete income
  const deleteIncomeMutation = useMutation({
    mutationFn: (id: string) => deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      toast.success("收入记录已删除");
    },
    onError: (error: Error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  // Mutations: Add expense
  const addExpenseMutation = useMutation({
    mutationFn: (expense: Omit<Expense, "id" | "created_at">) =>
      addExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("支出记录已添加");
    },
    onError: (error: Error) => {
      toast.error(`添加失败: ${error.message}`);
    },
  });

  // Mutations: Delete expense
  const deleteExpenseMutation = useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("支出记录已删除");
    },
    onError: (error: Error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  // Computed values
  const totalIncome = useMemo(
    () => incomes.reduce((sum, i) => sum + Number(i.amount), 0),
    [incomes]
  );
  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  );
  const netProfit = totalIncome - totalExpense;
  const driverShare = netProfit / 2;
  const ownerShare = netProfit / 2;

  const recentTransactions: Transaction[] = useMemo(() => {
    const all: Transaction[] = [
      ...incomes.map((i) => ({
        id: i.id,
        type: "income" as const,
        label: i.customer,
        amount: Number(i.amount),
        date: i.created_at,
      })),
      ...expenses.map((e) => ({
        id: e.id,
        type: "expense" as const,
        label: e.category,
        amount: Number(e.amount),
        date: e.expense_date || e.created_at,
      })),
    ];

    return all
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 5);
  }, [incomes, expenses]);

  return {
    selectedMonth,
    setSelectedMonth,
    incomes,
    expenses,
    totalIncome,
    totalExpense,
    netProfit,
    driverShare,
    ownerShare,
    recentTransactions,
    // Mutations
    addIncome: addIncomeMutation.mutate,
    isAddingIncome: addIncomeMutation.isPending,
    deleteIncome: deleteIncomeMutation.mutate,
    addExpense: addExpenseMutation.mutate,
    isAddingExpense: addExpenseMutation.isPending,
    deleteExpense: deleteExpenseMutation.mutate,
  };
}
