import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StageStatus = "pending" | "approved" | "rejected" | "current";

interface WorkflowStage {
  name: string;
  status: StageStatus;
}

interface WorkflowStepperProps {
  stages: WorkflowStage[];
  className?: string;
}

export default function WorkflowStepper({ stages, className }: WorkflowStepperProps) {
  return (
    <div className={cn("flex items-center justify-between", className)} data-testid="workflow-stepper">
      {stages.map((stage, index) => (
        <div key={stage.name} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                stage.status === "approved" && "bg-green-500 border-green-500 text-white",
                stage.status === "rejected" && "bg-red-500 border-red-500 text-white",
                stage.status === "current" && "bg-primary border-primary text-white",
                stage.status === "pending" && "bg-background border-muted-foreground/30 text-muted-foreground"
              )}
              data-testid={`stage-${stage.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {stage.status === "approved" ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <p className={cn(
              "mt-2 text-xs font-medium text-center",
              stage.status === "current" && "text-foreground font-semibold",
              stage.status === "pending" && "text-muted-foreground"
            )}>
              {stage.name}
            </p>
          </div>
          {index < stages.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2 mb-6",
              (stage.status === "approved" || stages[index + 1].status === "approved") 
                ? "bg-green-500" 
                : "bg-muted-foreground/30"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
