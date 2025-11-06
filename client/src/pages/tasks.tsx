import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allTasks = [
    { id: "1", title: "Attendance Condonation Request", type: "Attendance Report", submittedBy: "Priya Singh", date: "Nov 5, 2025", status: "pending" as const },
    { id: "2", title: "Medical Leave Application", type: "Leave Request", submittedBy: "Rahul Kumar", date: "Nov 4, 2025", status: "in_progress" as const },
    { id: "3", title: "Project Extension Approval", type: "Project Approval", submittedBy: "Anjali Sharma", date: "Nov 3, 2025", status: "approved" as const },
    { id: "4", title: "Exam Rescheduling Request", type: "Exam Related", submittedBy: "Vikram Patel", date: "Nov 2, 2025", status: "rejected" as const },
    { id: "5", title: "Monthly Attendance Summary", type: "Attendance Report", submittedBy: "System Generated", date: "Nov 1, 2025", status: "approved" as const },
  ];

  const pendingTasks = allTasks.filter(t => t.status === "pending" || t.status === "in_progress");
  const approvedTasks = allTasks.filter(t => t.status === "approved");
  const rejectedTasks = allTasks.filter(t => t.status === "rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Task Tracker</h1>
        <p className="text-muted-foreground mt-1">Monitor all requests and their approval status</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Button variant="outline" data-testid="button-filter">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({allTasks.length})
            </TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved ({approvedTasks.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" data-testid="tab-rejected">
              Rejected ({rejectedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {allTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onApprove={(id) => console.log('Approved:', id)}
                onReject={(id) => console.log('Rejected:', id)}
                onView={(id) => console.log('Viewing:', id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onApprove={(id) => console.log('Approved:', id)}
                onReject={(id) => console.log('Rejected:', id)}
                onView={(id) => console.log('Viewing:', id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-3">
            {approvedTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-3">
            {rejectedTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
