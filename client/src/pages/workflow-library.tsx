import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WORKFLOW_TEMPLATES, WorkflowType } from "@/lib/workflows";
import { FileText, Clock, CheckSquare, ArrowRight } from "lucide-react";

export default function WorkflowLibraryPage() {
  const workflows = Object.values(WORKFLOW_TEMPLATES);

  const handleStartRequest = (workflowType: WorkflowType) => {
    console.log('Starting request for:', workflowType);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">
          Workflow Library
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse and initiate approval workflows for various academic requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className="p-6 smooth-transition hover:shadow-xl hover:-translate-y-1 flex flex-col"
            data-testid={`card-workflow-${workflow.id}`}
          >
            <div className="space-y-4 flex-1">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {workflow.stages.length} stages
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {workflow.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{workflow.estimatedDays} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckSquare className="w-3 h-3" />
                  <span>{workflow.requiredDocuments.length} docs</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Approval Path:
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {workflow.stages.map((stage, index) => (
                    <div key={stage.name} className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {stage.name}
                      </Badge>
                      {index < workflow.stages.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-primary font-medium hover:underline">
                  Required Documents
                </summary>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {workflow.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                      <span className="text-xs">{doc}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            <Button 
              className="w-full mt-4"
              onClick={() => handleStartRequest(workflow.id)}
              data-testid={`button-start-${workflow.id}`}
            >
              Start Request
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Need a Custom Workflow?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If your request doesn't match any of the above workflows, you can submit a custom approval request to the administration.
            </p>
            <Button variant="outline" data-testid="button-custom-request">
              Submit Custom Request
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
