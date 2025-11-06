import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "below_threshold" | "completed" | "in_progress";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" },
  approved: { label: "Approved", className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" },
  below_threshold: { label: "Below Threshold", className: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20" },
  completed: { label: "Completed", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" },
  in_progress: { label: "In Progress", className: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20" },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("border", config.className, className)} data-testid={`badge-status-${status}`}>
      {config.label}
    </Badge>
  );
}
