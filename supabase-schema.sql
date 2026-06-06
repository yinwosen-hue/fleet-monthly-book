-- ============================================================
-- 车队记账 (Fleet Monthly Book) - Supabase 数据库 Schema
-- 复制以下 SQL 到 Supabase SQL Editor 中运行
-- ============================================================

-- 1. 收入表 (Incomes)
CREATE TABLE IF NOT EXISTS incomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  month TEXT NOT NULL, -- 格式: "YYYY-MM"
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. 支出表 (Expenses)
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  month TEXT NOT NULL, -- 格式: "YYYY-MM"
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. 索引 (提升查询性能)
CREATE INDEX IF NOT EXISTS idx_incomes_month ON incomes(month);
CREATE INDEX IF NOT EXISTS idx_incomes_created_at ON incomes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_month ON expenses(month);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at DESC);

-- 4. 启用 Row Level Security (RLS)
ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- 5. 创建允许所有操作的策略 (公开访问模式)
-- 如果你需要用户认证，请修改以下策略
CREATE POLICY "Allow all operations on incomes"
  ON incomes FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on expenses"
  ON expenses FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6. 插入演示数据 (可选)
INSERT INTO incomes (customer, amount, month, created_at) VALUES
  ('顺丰物流 - 华南线路运费', 85000, '2026-06', '2026-06-05 10:30:00+08'),
  ('京东快运 - 城际配送', 62000, '2026-06', '2026-06-04 14:20:00+08'),
  ('菜鸟驿站 - 末端配送', 38000, '2026-06', '2026-06-03 09:15:00+08'),
  ('美团优选 - 冷链运输', 45000, '2026-06', '2026-06-02 16:00:00+08'),
  ('德邦物流 - 长途干线', 73000, '2026-06', '2026-06-01 08:00:00+08');

INSERT INTO expenses (category, amount, month, expense_date, created_at) VALUES
  ('燃油费', 28000, '2026-06', '2026-06-05', '2026-06-05 18:00:00+08'),
  ('维修保养', 15000, '2026-06', '2026-06-04', '2026-06-04 10:00:00+08'),
  ('过路费', 8500, '2026-06', '2026-06-03', '2026-06-03 20:00:00+08'),
  ('保险费', 12000, '2026-06', '2026-06-02', '2026-06-02 09:00:00+08'),
  ('轮胎更换', 6000, '2026-06', '2026-06-01', '2026-06-01 15:00:00+08');
