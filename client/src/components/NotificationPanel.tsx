import { Bell, Check, FileText, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "approval" | "document" | "alert";
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead?: (id: string) => void;
  onViewAll?: () => void;
}

const notificationIcons = {
  approval: UserCheck,
  document: FileText,
  alert: AlertCircle,
};

export default function NotificationPanel({ 
  notifications, 
  unreadCount, 
  onMarkAsRead,
  onViewAll 
}: NotificationPanelProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              data-testid="badge-unread-count"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-4 py-2 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>
        <ScrollArea className="max-h-96">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            return (
              <DropdownMenuItem 
                key={notification.id} 
                className="px-4 py-3 cursor-pointer flex items-start gap-3"
                onClick={() => onMarkAsRead?.(notification.id)}
                data-testid={`notification-${notification.id}`}
              >
                <div className="p-2 bg-primary/10 rounded-md">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </DropdownMenuItem>
            );
          })}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="justify-center text-primary cursor-pointer"
          onClick={onViewAll}
          data-testid="button-view-all-notifications"
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
