import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import WorkflowStepper from "@/components/WorkflowStepper";
import StatusBadge from "@/components/StatusBadge";
import { FileText, User, Calendar, Clock, FileCheck } from "lucide-react";
import { WorkflowType, getWorkflowByType } from "@/lib/workflows";

export default function ApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>("1");
  const [comments, setComments] = useState("");

  const requests = [
    {
      id: "1",
      title: "Attendance Condonation - Priya Singh",
      workflowType: "attendance_condonation" as WorkflowType,
      submittedBy: "Priya Singh",
      department: "ECE",
      date: "Nov 5, 2025",
      currentStageIndex: 1,
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
      title: "Medical Leave Application - Anjali Verma",
      workflowType: "medical_leave" as WorkflowType,
      submittedBy: "Anjali Verma",
      department: "EEE",
      date: "Nov 4, 2025",
      currentStageIndex: 0,
      details: {
        studentName: "Anjali Verma",
        rollNumber: "21EEE032",
        leaveDuration: "7 days",
        startDate: "Nov 10, 2025",
        endDate: "Nov 17, 2025",
        reason: "Surgery - Medical certificate attached",
      },
    },
    {
      id: "3",
      title: "Exam Revaluation - Rahul Kumar",
      workflowType: "exam_revaluation" as WorkflowType,
      submittedBy: "Rahul Kumar",
      department: "CSE",
      date: "Nov 3, 2025",
      currentStageIndex: 2,
      details: {
        studentName: "Rahul Kumar",
        rollNumber: "21CSE089",
        subject: "Data Structures and Algorithms",
        examDate: "Oct 15, 2025",
        currentMarks: "42/100",
        feeReceiptNo: "RV2025001234",
      },
    },
    {
      id: "4",
      title: "Project Approval - Team Alpha",
      workflowType: "project_approval" as WorkflowType,
      submittedBy: "Vikram Patel (Team Lead)",
      department: "CSE",
      date: "Nov 2, 2025",
      currentStageIndex: 1,
      details: {
        projectTitle: "AI-Based Traffic Management System",
        teamMembers: "Vikram Patel, Neha Reddy, Amit Sharma",
        duration: "6 months",
        estimatedBudget: "₹25,000",
        facultyComments: "Innovative project with clear objectives",
      },
    },
    {
      id: "5",
      title: "Fee Concession - Meera Iyer",
      workflowType: "fee_concession" as WorkflowType,
      submittedBy: "Meera Iyer",
      department: "MECH",
      date: "Nov 1, 2025",
      currentStageIndex: 2,
      details: {
        studentName: "Meera Iyer",
        rollNumber: "21MECH056",
        requestedConcession: "50%",
        familyIncome: "₹2,50,000/year",
        cgpa: "8.9",
        reason: "Financial hardship due to medical emergency in family",
      },
    },
  ];

  const selectedReq = requests.find(r => r.id === selectedRequest);
  
  const getWorkflowStages = (req: typeof requests[0]) => {
    const template = getWorkflowByType(req.workflowType);
    return template.stages.map((stage, index) => ({
      name: stage.name,
      status: index < req.currentStageIndex ? "approved" as const :
              index === req.currentStageIndex ? "current" as const :
              "pending" as const,
    }));
  };

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
          <h2 className="font-semibold">Pending Requests ({requests.length})</h2>
          {requests.map((request) => {
            const workflow = getWorkflowByType(request.workflowType);
            return (
              <Card
                key={request.id}
                className={`p-4 cursor-pointer hover-elevate smooth-transition hover:shadow-md ${
                  selectedRequest === request.id ? 'border-primary border-2' : ''
                }`}
                onClick={() => setSelectedRequest(request.id)}
                data-testid={`card-request-${request.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md smooth-transition">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{request.title}</h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {workflow.name}
                      </Badge>
                      <StatusBadge status="pending" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {request.department} • {request.date}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedReq && (() => {
          const workflow = getWorkflowByType(selectedReq.workflowType);
          const workflowStages = getWorkflowStages(selectedReq);
          
          return (
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 smooth-transition">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{selectedReq.title}</h2>
                        <Badge className="mb-2">{workflow.name}</Badge>
                      </div>
                      <StatusBadge status="pending" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{selectedReq.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileCheck className="w-4 h-4" />
                        <span>{selectedReq.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedReq.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Est. {workflow.estimatedDays} days</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Approval Progress</h3>
                    <WorkflowStepper stages={workflowStages} />
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      {workflow.stages.map((stage, index) => (
                        <div 
                          key={stage.name}
                          className={`p-3 rounded-md text-sm ${
                            index === selectedReq.currentStageIndex 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'bg-muted/30'
                          }`}
                        >
                          <div className="font-semibold">{stage.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{stage.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Request Details</h3>
                    <div className="space-y-2 text-sm bg-muted/30 p-4 rounded-lg">
                      {Object.entries(selectedReq.details).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4">
                          <span className="text-muted-foreground capitalize font-medium">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="col-span-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Required Documents</h3>
                    <ul className="text-sm space-y-1">
                      {workflow.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Your Comments / Feedback</Label>
                    <Textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add your comments or feedback for this approval stage..."
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
                      Approve & Forward
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={handleReject}
                      data-testid="button-reject"
                    >
                      Reject Request
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
