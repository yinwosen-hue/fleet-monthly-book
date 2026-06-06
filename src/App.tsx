import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import DashboardPage from "@/pages/dashboard-page";
import IncomesPage from "@/pages/incomes-page";
import ExpensesPage from "@/pages/expenses-page";
import ReportsPage from "@/pages/reports-page";
import SettingsPage from "@/pages/settings-page";

export default function App() {
  return (
    <div
      className="flex h-full"
      style={{ paddingLeft: "var(--sidebar-width)" }}
    >
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/incomes" element={<IncomesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
