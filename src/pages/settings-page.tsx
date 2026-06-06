import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [cleared, setCleared] = useState(false);

  function handleClearData() {
    if (window.confirm("确定要清除所有数据吗？此操作不可撤销。")) {
      localStorage.removeItem("fleet_monthly_book_incomes");
      localStorage.removeItem("fleet_monthly_book_expenses");
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  }

  return (
    <div>
      <Header
        title="设置"
        description="管理应用数据和偏好"
      />

      <div className="space-y-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              应用信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">应用名称</span>
              <span className="font-medium">车队记账</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">版本</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">技术栈</span>
              <span className="font-medium">React + TypeScript + Tailwind CSS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">数据存储</span>
              <span className="font-medium">本地浏览器存储 (LocalStorage)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              危险操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              清除所有本地存储的车队记账数据。此操作不可撤销。
            </p>
            <Button variant="destructive" size="sm" onClick={handleClearData}>
              清除所有数据
            </Button>
            {cleared && (
              <p className="text-sm text-success mt-2">数据已成功清除！刷新后将加载演示数据。</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
