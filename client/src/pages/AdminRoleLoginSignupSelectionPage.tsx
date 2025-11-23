import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useLocation } from "wouter";
import { useEffect } from "react";

const roleDisplayNames: Record<string, string> = {
  dean: "Dean",
  principal: "Principal",
  hod: "HOD",
};

export default function AdminRoleLoginSignupSelectionPage() {
  const params = useParams<{ role: string }>();
  const role = params.role?.toLowerCase();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!role || !roleDisplayNames[role]) {
      // redirect to admin selection if role invalid
      setLocation("/admin-selection");
    }
  }, [role, setLocation]);

  if (!role || !roleDisplayNames[role]) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">
          {roleDisplayNames[role]} Portal
        </h1>
        <p className="mb-6">Please choose to login or sign up:</p>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setLocation(`/login/${role}`)}
            size="lg"
            variant="outline"
          >
            Login as {roleDisplayNames[role]}
          </Button>
          <Button onClick={() => setLocation(`/signup/${role}`)} size="lg">
            Sign Up as {roleDisplayNames[role]}
          </Button>
          <Button variant="ghost" onClick={() => setLocation("/admin-selection")}>
            Back to Role Selection
          </Button>
        </div>
      </Card>
    </div>
  );
}
