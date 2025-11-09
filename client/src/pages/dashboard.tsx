import MetricCard from "@/components/MetricCard";
import TaskCard from "@/components/TaskCard";
import { FileText, Users, CheckCircle, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";

export default function DashboardPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const tasks = [
    {
      id: "1",
      title: "Attendance Condonation Request - Priya Singh",
      type: "Attendance Report",
      submittedBy: "Priya Singh (ECE Dept)",
      date: "Nov 5, 2025",
      status: "pending" as const,
    },
    {
      id: "2",
      title: "Medical Leave Approval - Rahul Kumar",
      type: "Leave Application",
      submittedBy: "Rahul Kumar (CSE Dept)",
      date: "Nov 4, 2025",
      status: "in_progress" as const,
    },
    {
      id: "3",
      title: "Project Extension Request",
      type: "Project Approval",
      submittedBy: "Anjali Sharma (EEE Dept)",
      date: "Nov 3, 2025",
      status: "approved" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Pending Approvals"
          value={12}
          icon={Clock}
          trend="3 new today"
          accentColor="border-amber-500"
        />
        <MetricCard
          title="Total Documents"
          value={234}
          icon={FileText}
          accentColor="border-blue-500"
        />
        <MetricCard
          title="Approved This Week"
          value={42}
          icon={CheckCircle}
          trend="+12 from last week"
          accentColor="border-green-500"
        />
        {user?.role !== 'student' && (
          <MetricCard
            title="Active Students"
            value={1250}
            icon={Users}
            accentColor="border-purple-500"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>
            <Button variant="outline" size="sm" data-testid="button-view-all-tasks">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onApprove={(id) => console.log('Approved:', id)}
                onReject={(id) => console.log('Rejected:', id)}
                onView={(id) => console.log('Viewing:', id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Card className="p-6 space-y-4 smooth-transition hover:shadow-lg shine-hover">
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg w-fit smooth-transition group-hover:scale-110">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Generate Document</h3>
              <p className="text-sm text-muted-foreground">
                Create attendance reports, condonation letters, or circulars
              </p>
              <Button className="w-full" data-testid="button-generate-document" onClick={() => setLocation('/settings')}>
                Generate
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4 smooth-transition hover:shadow-lg shine-hover">
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg w-fit smooth-transition group-hover:scale-110">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Attendance Record Layout</h3>
              <p className="text-sm text-muted-foreground">
                View attendance records and identify students below threshold
              </p>
              <Button variant="outline" className="w-full" data-testid="button-check-attendance" onClick={() => setLocation('/attendance')}>
                View Records
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
