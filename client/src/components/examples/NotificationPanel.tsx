import NotificationPanel from '../NotificationPanel';

export default function NotificationPanelExample() {
  const notifications = [
    {
      id: "1",
      type: "approval" as const,
      message: "Your attendance condonation request has been approved by HOD",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "document" as const,
      message: "New document generated: Monthly Attendance Report",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "alert" as const,
      message: "Attendance below 75% threshold - Action required",
      time: "2 hours ago",
      read: true,
    },
  ];

  return (
    <div className="p-8">
      <NotificationPanel
        notifications={notifications}
        unreadCount={2}
        onMarkAsRead={(id) => console.log('Mark as read:', id)}
        onViewAll={() => console.log('View all notifications')}
      />
    </div>
  );
}
