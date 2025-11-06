import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import loginIllustration from "@assets/generated_images/College_workflow_automation_illustration_3112c521.png";
import { useLocation } from "wouter";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { username, password, role });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-md space-y-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              College Desk
            </h1>
            <p className="text-xl text-muted-foreground">Engineering College Edition</p>
          </div>
          <img 
            src={loginIllustration} 
            alt="College workflow automation" 
            className="w-full rounded-xl shadow-2xl smooth-transition hover:scale-105 float-animation"
          />
          <div className="space-y-4">
            <p className="font-semibold text-lg">AI-Powered Workflow Automation</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Automated attendance management
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Intelligent document generation
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Streamlined approval workflows
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                AI compliance assistance
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 smooth-transition hover:shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="role" data-testid="select-role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
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
                data-testid="input-password"
              />
            </div>

            <Button type="submit" className="w-full smooth-transition" data-testid="button-login">
              Sign In
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold">Demo Access:</span> Use any username/password with your selected role
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
