import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import loginIllustration from "@assets/generated_images/College_workflow_automation_illustration_3112c521.png";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage({ role: defaultRole }: { role?: string }) {
  const [, setLocation] = useLocation();
  const { signup, isLoading, error } = useAuth();
  const [name, setName] = useState("");
    const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>(() => {
    // Check localStorage first, then fall back to defaultRole or "student"
    const storedRole = localStorage.getItem('selectedRole');
    return storedRole || defaultRole || "student";
  });

  const [department, setDepartment] = useState<string>(() => {
    // Pre-fill department from localStorage if available
    const storedDepartment = localStorage.getItem('selectedDepartment');
    return storedDepartment || "";
  });

  // Auto-assign role based on department selection for admin users
  const handleDepartmentChange = (dept: string) => {
    setDepartment(dept);
    if (role === "hod" || role === "dean" || role === "principal") {
      // Keep the role as selected from admin portal
      return;
    }
    // For student users, no special role assignment needed
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        name,
        enrollmentNumber,
        password,
        department,
        role,
      });
      setLocation("/dashboard");
    } catch (error) {
      // Error is handled by the auth context
      console.error('Signup failed:', error);
    }
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
            <p className="font-semibold text-lg">Join Our Community</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Create your account to get started
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Access personalized dashboards
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Manage your academic workflows
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                Connect with faculty and admins
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 smooth-transition hover:shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign up to join College Desk
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                data-testid="input-name"
                className="transition-all duration-200 focus:scale-105 focus:shadow-md"
              />
            </div>

            
            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
              <Input
                id="enrollmentNumber"
                type="text"
                placeholder="Enter your enrollment number"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
                disabled={isLoading}
                data-testid="input-enrollmentNumber"
                className="transition-all duration-200 focus:scale-105 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={handleDepartmentChange} disabled={isLoading}>
                <SelectTrigger data-testid="select-department" className="transition-all duration-200 focus:scale-105 focus:shadow-md">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="information-technology">Information Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="input-password"
                  className="transition-all duration-200 focus:scale-105 focus:shadow-md pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    const input = document.getElementById('password') as HTMLInputElement;
                    input.type = input.type === 'password' ? 'text' : 'password';
                  }}
                >
                  👁️
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full smooth-transition" disabled={isLoading} data-testid="button-signup">
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setLocation("/login")}
                className="text-primary hover:underline font-medium"
                disabled={isLoading}
                data-testid="link-login"
              >
                Login
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
