import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import WorkflowStepper from "@/components/WorkflowStepper";
import StatusBadge from "@/components/StatusBadge";
import { FileText, User, Calendar } from "lucide-react";

export default function ApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>("1");
  const [comments, setComments] = useState("");

  const requests = [
    {
      id: "1",
      title: "Attendance Condonation - Priya Singh",
      type: "Attendance Report",
      submittedBy: "Priya Singh",
      department: "ECE",
      date: "Nov 5, 2025",
      currentStage: "HOD",
      workflow: [
        { name: "Faculty", status: "approved" as const },
        { name: "HOD", status: "current" as const },
        { name: "Principal", status: "pending" as const },
      ],
      details: {
        studentName: "Priya Singh",
        rollNumber: "21ECE045",
        currentAttendance: "68%",
        requiredAttendance: "75%",
        reason: "Medical leave from Sept 12-15, 2025",
        facultyComments: "Student has valid medical certificate. Recommend approval.",
      },
    },
    {
      id: "2",
      title: "Project Extension - Rahul Kumar",
      type: "Project Approval",
      submittedBy: "Rahul Kumar",
      department: "CSE",
      date: "Nov 4, 2025",
      currentStage: "Faculty",
      workflow: [
        { name: "Faculty", status: "current" as const },
        { name: "HOD", status: "pending" as const },
        { name: "Principal", status: "pending" as const },
      ],
      details: {
        studentName: "Rahul Kumar",
        rollNumber: "21CSE089",
        projectTitle: "AI-Based Traffic Management System",
        extensionDuration: "2 weeks",
        reason: "Additional time needed for model training and optimization",
      },
    },
  ];

  const selectedReq = requests.find(r => r.id === selectedRequest);

  const handleApprove = () => {
    console.log('Approved with comments:', comments);
    setComments("");
  };

  const handleReject = () => {
    console.log('Rejected with comments:', comments);
    setComments("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Approval Workflow</h1>
        <p className="text-muted-foreground mt-1">Review and approve pending requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h2 className="font-semibold">Pending Requests</h2>
          {requests.map((request) => (
            <Card
              key={request.id}
              className={`p-4 cursor-pointer hover-elevate transition-all ${
                selectedRequest === request.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedRequest(request.id)}
              data-testid={`card-request-${request.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{request.title}</h3>
                  <p className="text-xs text-muted-foreground">{request.type}</p>
                  <div className="mt-2">
                    <StatusBadge status="pending" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedReq && (
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">{selectedReq.title}</h2>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedReq.submittedBy} ({selectedReq.department})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedReq.date}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Approval Progress</h3>
                  <WorkflowStepper stages={selectedReq.workflow} />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Request Details</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedReq.details).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="col-span-2 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add your comments or feedback..."
                    rows={4}
                    data-testid="input-comments"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={handleApprove}
                    data-testid="button-approve"
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={handleReject}
                    data-testid="button-reject"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
