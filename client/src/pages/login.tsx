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
      <div className="hidden lg:flex bg-primary/5 items-center justify-center p-12">
        <div className="max-w-md space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">College Desk</h1>
            <p className="text-xl text-muted-foreground">Engineering College Edition</p>
          </div>
          <img 
            src={loginIllustration} 
            alt="College workflow automation" 
            className="w-full rounded-lg"
          />
          <div className="space-y-2 text-sm">
            <p className="font-medium">AI-Powered Workflow Automation</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Automated attendance management</li>
              <li>• Intelligent document generation</li>
              <li>• Streamlined approval workflows</li>
              <li>• Compliance assistance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1">
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

            <Button type="submit" className="w-full" data-testid="button-login">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials available for all roles</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
