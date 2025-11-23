import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import loginIllustration from "@assets/generated_images/College_workflow_automation_illustration_3112c521.png";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";

export default function PrincipalLoginPage() {
  const [, setLocation] = useLocation();
  const { login, isLoading, error } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(identifier, password);
      setLocation("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-md space-y-8 relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            College Desk - Principal Login
          </h1>
          <p className="text-xl text-muted-foreground">Engineering College Edition</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 smooth-transition hover:shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Principal Login</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access your Principal dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier">Enrollment Number</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter your enrollment number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full smooth-transition" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
