import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";

export default function DeanSignupPage() {
  const [, setLocation] = useLocation();
  const { signup, isLoading, error } = useAuth();
  const [name, setName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const role = "dean";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        name,
        enrollmentNumber,
        password,
        department: "", // no department
        role,
      });
      setLocation("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-md space-y-8 relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            College Desk - Dean Signup
          </h1>
          <p className="text-xl text-muted-foreground">Engineering College Edition</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 smooth-transition hover:shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Create Dean Account</h2>
            <p className="text-sm text-muted-foreground mt-2">Sign up as Dean</p>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full smooth-transition" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
