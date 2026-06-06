import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("密码至少需要6个字符");
      return;
    }

    setLoading(true);
    const { error: err } = await signUp(email, password);
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <div className="h-12 w-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-success/10">
            <UserPlus className="h-6 w-6 text-success" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">注册成功！</h1>
          <p className="text-sm text-muted-foreground mb-6">
            我们已向 {email} 发送了确认邮件，请查收后点击确认链接。
          </p>
          <Link to="/login">
            <Button variant="outline">返回登录</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="h-12 w-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--gradient-sidebar)" }}
          >
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">车队记账</h1>
          <p className="text-sm text-muted-foreground mt-1">注册新账号</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="至少6位字符"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "注册中..." : "注册"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          已有账号？{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            登录
          </Link>
        </p>
      </div>
    </div>
  );
}
