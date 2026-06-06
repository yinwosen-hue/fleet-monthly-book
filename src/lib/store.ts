import { supabase } from "./supabase";
import { Income, Expense } from "./types";

// ============================================================
// Incomes API
// ============================================================

export async function fetchIncomes(month?: string) {
  let query = supabase
    .from("incomes")
    .select("*")
    .order("created_at", { ascending: false });

  if (month) {
    query = query.eq("month", month);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Income[];
}

export async function addIncome(
  income: Omit<Income, "id" | "created_at" | "user_id">
): Promise<Income | null> {
  const { data, error } = await supabase
    .from("incomes")
    .insert({
      customer: income.customer,
      amount: income.amount,
      month: income.month,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Income;
}

export async function updateIncome(
  id: string,
  updates: Partial<Pick<Income, "customer" | "amount" | "month">>
): Promise<Income> {
  const { data, error } = await supabase
    .from("incomes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Income;
}

export async function deleteIncome(id: string): Promise<void> {
  const { error } = await supabase.from("incomes").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// Expenses API
// ============================================================

export async function fetchExpenses(month?: string) {
  let query = supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: false });

  if (month) {
    query = query.eq("month", month);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Expense[];
}

export async function addExpense(
  expense: Omit<Expense, "id" | "created_at" | "user_id">
): Promise<Expense | null> {
  const { data, error } = await supabase
    .from("expenses")
    .insert({
      category: expense.category,
      amount: expense.amount,
      month: expense.month,
      expense_date: expense.expense_date,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Expense;
}

export async function updateExpense(
  id: string,
  updates: Partial<Pick<Expense, "category" | "amount" | "month" | "expense_date">>
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Expense;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}
