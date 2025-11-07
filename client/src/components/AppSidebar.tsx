import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  MessageSquare,
  ClipboardList,
  Settings,
  LogOut,
  GitBranch
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";

interface AppSidebarProps {
  role: "admin" | "faculty" | "student";
}

export default function AppSidebar({ role }: AppSidebarProps) {
  const [location] = useLocation();
  const { logout } = useAuth();

  const menuItems = {
    admin: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Attendance", url: "/attendance", icon: Users },
      { title: "Documents", url: "/documents", icon: FileText },
      { title: "Approvals", url: "/approvals", icon: CheckSquare },
      { title: "Workflows", url: "/workflow-library", icon: GitBranch },
      { title: "Task Tracker", url: "/tasks", icon: ClipboardList },
      { title: "AI Assistant", url: "/ai-assistant", icon: MessageSquare },
    ],
    faculty: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Attendance", url: "/attendance", icon: Users },
      { title: "Documents", url: "/documents", icon: FileText },
      { title: "Approvals", url: "/approvals", icon: CheckSquare },
      { title: "Workflows", url: "/workflow-library", icon: GitBranch },
      { title: "AI Assistant", url: "/ai-assistant", icon: MessageSquare },
    ],
    student: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Attendance", url: "/attendance", icon: Users },
      { title: "Documents", url: "/documents", icon: FileText },
      { title: "Workflows", url: "/workflow-library", icon: GitBranch },
      { title: "My Requests", url: "/tasks", icon: ClipboardList },
      { title: "AI Assistant", url: "/ai-assistant", icon: MessageSquare },
    ],
  };

  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6">
            <h1 className="text-xl font-bold text-primary">College Desk</h1>
            <p className="text-xs text-muted-foreground mt-1">Engineering Edition</p>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="link-settings">
              <Link href="/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
