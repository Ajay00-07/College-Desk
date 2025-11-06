import AppSidebar from '../AppSidebar';
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="admin" />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold">Sidebar Navigation Example</h2>
          <p className="text-muted-foreground mt-2">Click on menu items to navigate</p>
        </main>
      </div>
    </SidebarProvider>
  );
}
