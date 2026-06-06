import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "仪表盘",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "收入记录",
    href: "/incomes",
    icon: ArrowUpCircle,
  },
  {
    label: "支出记录",
    href: "/expenses",
    icon: ArrowDownCircle,
  },
  {
    label: "报表",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "设置",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col"
      style={{ width: "var(--sidebar-width)", background: "var(--gradient-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight">
            车队记账
          </h1>
          <p className="text-[10px] text-white/60">Fleet Monthly Book</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <p className="text-[10px] text-white/40 text-center">
          车队月度记账管理系统 v1.0
        </p>
      </div>
    </aside>
  );
}
