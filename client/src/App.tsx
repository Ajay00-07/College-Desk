import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationPanel from "@/components/NotificationPanel";
import AIChat from "@/components/AIChat";
import AppSidebar from "@/components/AppSidebar";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import AttendancePage from "@/pages/attendance";
import DocumentsPage from "@/pages/documents";
import ApprovalsPage from "@/pages/approvals";
import TasksPage from "@/pages/tasks";
import AIAssistantPage from "@/pages/ai-assistant";
import WorkflowLibraryPage from "@/pages/workflow-library";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

function AppLayout() {
  const [location] = useLocation();
  const [userRole] = useState<"admin" | "faculty" | "student">("admin");

  const notifications = [
    {
      id: "1",
      type: "approval" as const,
      message: "Attendance condonation approved by HOD",
      time: "5 min ago",
      read: false,
    },
    {
      id: "2",
      type: "document" as const,
      message: "New document generated",
      time: "1 hour ago",
      read: false,
    },
  ];

  const aiPrompts = [
    "Can I take leave for 3 days medical?",
    "I have 68% attendance, can I write exams?",
    "What is the project approval workflow?",
  ];

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (location === "/") {
    return <LoginPage />;
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={userRole} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Badge variant="outline" className="hidden md:flex">
                {userRole.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <NotificationPanel
                notifications={notifications}
                unreadCount={2}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
                onViewAll={() => console.log('View all')}
              />
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-8">
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/attendance" component={AttendancePage} />
              <Route path="/documents" component={DocumentsPage} />
              <Route path="/approvals" component={ApprovalsPage} />
              <Route path="/workflow-library" component={WorkflowLibraryPage} />
              <Route path="/tasks" component={TasksPage} />
              <Route path="/ai-assistant" component={AIAssistantPage} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>

        <AIChat suggestedPrompts={aiPrompts} />
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AppLayout />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
