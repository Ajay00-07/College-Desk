import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationPanel from "@/components/NotificationPanel";
import AIChat from "@/components/AIChat";
import UserProfile from "@/components/UserProfile";
import AppSidebar from "@/components/AppSidebar";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import AdminSelectionPage from "@/pages/AdminSelectionPage";
import DashboardPage from "@/pages/dashboard";
import AttendancePage from "@/pages/attendance";
import DocumentsPage from "@/pages/documents";
import ApprovalsPage from "@/pages/approvals";
import TasksPage from "@/pages/tasks";
import AIAssistantPage from "@/pages/ai-assistant";
import WorkflowLibraryPage from "@/pages/workflow-library";
import SettingsPage from "@/pages/settings";
import NotFound from "@/pages/not-found";
import { Badge } from "@/components/ui/badge";
import PrincipalSignupPage from "@/pages/PrincipalSignupPage";
import DeanSignupPage from "@/pages/DeanSignupPage";
import PrincipalLoginPage from "@/pages/PrincipalLoginPage";
import DeanLoginPage from "@/pages/DeanLoginPage";
import AdminRoleLoginSignupSelectionPage from "@/pages/AdminRoleLoginSignupSelectionPage";

function AppLayout() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

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

  if (!isAuthenticated) {
    if (location === "/login") {
      return <LoginPage />;
    }
    if (location === "/signup/student") {
      return <SignupPage role="student" />;
    }
    if (location === "/signup/faculty") {
      return <SignupPage role="faculty" />;
    }
    if (location === "/signup/admin") {
      return <AdminSelectionPage />;
    }
    if (location === "/signup") {
      return <SignupPage />;
    }
    if (location === "/admin-selection") {
      return <AdminSelectionPage />;
    }
    return <LandingPage />;
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={user?.role as "admin" | "faculty" | "student" || "student"} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Badge variant="outline" className="hidden md:flex">
                {user?.role.toUpperCase()}
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
              <UserProfile />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-8">
            <Switch>
              <Route path="/" component={LandingPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/attendance" component={AttendancePage} />
            <Route path="/documents" component={DocumentsPage} />
            <Route path="/approvals" component={ApprovalsPage} />
            <Route path="/workflow-library" component={WorkflowLibraryPage} />
            <Route path="/tasks" component={TasksPage} />
            <Route path="/ai-assistant" component={AIAssistantPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/signup/principal" component={PrincipalSignupPage} />
            <Route path="/signup/dean" component={DeanSignupPage} />
            <Route path="/signup/hod" component={() => <SignupPage role="hod" />} />
            <Route path="/login/principal" component={PrincipalLoginPage} />
            <Route path="/login/dean" component={DeanLoginPage} />
            <Route path="/login/hod" component={() => <LoginPage role="hod" />} />
            <Route path="/admin-role-select/:role" component={AdminRoleLoginSignupSelectionPage} />
            <Route component={NotFound} />
          </Switch>
          </main>
        </div>

        {location !== "/ai-assistant" && (
          <div className="fixed bottom-6 right-6 z-50">
            <AIChat suggestedPrompts={aiPrompts} />
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}

function Website() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AuthProvider>
            <AppLayout />
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Website;
