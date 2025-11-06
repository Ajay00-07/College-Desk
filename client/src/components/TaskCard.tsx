import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { FileText, Calendar, User } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  id: string;
  title: string;
  type: string;
  submittedBy: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "in_progress";
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function TaskCard({ 
  id, 
  title, 
  type, 
  submittedBy, 
  date, 
  status,
  onApprove,
  onReject,
  onView
}: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className="p-4 hover-elevate cursor-pointer smooth-transition hover:shadow-md" 
      onClick={() => setExpanded(!expanded)}
      data-testid={`card-task-${id}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-md">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1" data-testid="text-task-title">{title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{type}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{submittedBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
        </div>
      </div>

      {expanded && status === "pending" && (
        <div className="mt-4 pt-4 border-t flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            size="sm" 
            onClick={() => onView?.(id)}
            data-testid="button-view-task"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            variant="default"
            onClick={() => onApprove?.(id)}
            data-testid="button-approve-task"
          >
            Approve
          </Button>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => onReject?.(id)}
            data-testid="button-reject-task"
          >
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}
