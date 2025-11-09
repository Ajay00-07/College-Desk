import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Users, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminSelectionPage() {
  const [, setLocation] = useLocation();

  const adminRoles = [
    {
      title: "HOD",
      description: "Head of Department - Manage department operations and faculty coordination.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      role: "hod",
      onClick: () => {
        localStorage.setItem('selectedRole', 'hod');
        setLocation("/signup/admin");
      }
    },
    {
      title: "Dean",
      description: "Dean - Oversee academic affairs and institutional policies.",
      icon: Award,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      role: "dean",
      onClick: () => {
        localStorage.setItem('selectedRole', 'dean');
        setLocation("/signup/admin");
      }
    },
    {
      title: "Principal",
      description: "Principal - Lead the institution and make strategic decisions.",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      role: "principal",
      onClick: () => {
        localStorage.setItem('selectedRole', 'principal');
        setLocation("/signup/admin");
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl p-8 smooth-transition hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Admin Role</h1>
          <p className="text-muted-foreground">
            Choose your administrative position to continue with registration
          </p>
        </div>

        <div className="grid gap-4">
          {adminRoles.map((role, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-lg transition-all cursor-pointer ${role.bgColor}`}
              onClick={role.onClick}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
