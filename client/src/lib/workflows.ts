export type WorkflowType = 
  | "attendance_condonation"
  | "medical_leave"
  | "exam_revaluation"
  | "project_approval"
  | "fee_concession"
  | "transfer_certificate"
  | "scholarship";

export type ApprovalStage = {
  name: string;
  role: string;
  description: string;
};

export type WorkflowTemplate = {
  id: WorkflowType;
  name: string;
  description: string;
  stages: ApprovalStage[];
  estimatedDays: number;
  requiredDocuments: string[];
};

export const WORKFLOW_TEMPLATES: Record<WorkflowType, WorkflowTemplate> = {
  attendance_condonation: {
    id: "attendance_condonation",
    name: "Attendance Condonation",
    description: "Request for condonation of attendance shortage",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty Advisor reviews and recommends" },
      { name: "HOD", role: "hod", description: "Head of Department approves condonation" },
      { name: "Principal", role: "principal", description: "Principal gives final approval" },
    ],
    estimatedDays: 3,
    requiredDocuments: ["Medical certificate (if applicable)", "Written explanation"],
  },
  medical_leave: {
    id: "medical_leave",
    name: "Medical Leave Application",
    description: "Application for medical leave with documentation",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty Advisor acknowledges" },
      { name: "HOD", role: "hod", description: "HOD approves leave duration" },
      { name: "Medical Officer", role: "medical", description: "Medical Officer verifies certificate" },
      { name: "Registrar", role: "registrar", description: "Registrar records in system" },
    ],
    estimatedDays: 2,
    requiredDocuments: ["Medical certificate from registered practitioner", "Leave application form"],
  },
  exam_revaluation: {
    id: "exam_revaluation",
    name: "Exam Revaluation Request",
    description: "Request for revaluation of examination results",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty confirms eligibility" },
      { name: "Exam Controller", role: "exam_controller", description: "Controller assigns evaluator" },
      { name: "Dean", role: "dean", description: "Dean approves revaluation" },
      { name: "Principal", role: "principal", description: "Principal authorizes final decision" },
    ],
    estimatedDays: 15,
    requiredDocuments: ["Revaluation fee receipt", "Original answer script request"],
  },
  project_approval: {
    id: "project_approval",
    name: "Project Approval",
    description: "Approval for final year project proposal",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty Advisor reviews proposal" },
      { name: "HOD", role: "hod", description: "HOD checks feasibility and resources" },
      { name: "Dean", role: "dean", description: "Dean evaluates innovation and scope" },
      { name: "Principal", role: "principal", description: "Principal approves resource allocation" },
    ],
    estimatedDays: 5,
    requiredDocuments: ["Project proposal document", "Resource requirement list", "Team member details"],
  },
  fee_concession: {
    id: "fee_concession",
    name: "Fee Concession Request",
    description: "Request for fee reduction or waiver",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty recommends based on merit" },
      { name: "HOD", role: "hod", description: "HOD verifies academic performance" },
      { name: "Accounts", role: "accounts", description: "Accounts Officer checks eligibility" },
      { name: "Dean", role: "dean", description: "Dean evaluates financial need" },
      { name: "Principal", role: "principal", description: "Principal authorizes concession" },
    ],
    estimatedDays: 7,
    requiredDocuments: ["Income certificate", "Academic transcripts", "Fee concession application"],
  },
  transfer_certificate: {
    id: "transfer_certificate",
    name: "Transfer Certificate",
    description: "Request for transfer certificate for college change",
    stages: [
      { name: "HOD", role: "hod", description: "HOD clears department dues" },
      { name: "Library", role: "library", description: "Library clears book dues" },
      { name: "Accounts", role: "accounts", description: "Accounts clears fee dues" },
      { name: "Registrar", role: "registrar", description: "Registrar issues TC" },
      { name: "Principal", role: "principal", description: "Principal signs and releases TC" },
    ],
    estimatedDays: 10,
    requiredDocuments: ["No dues certificates from all departments", "Original admission receipt", "ID card"],
  },
  scholarship: {
    id: "scholarship",
    name: "Scholarship Application",
    description: "Application for merit or need-based scholarship",
    stages: [
      { name: "Faculty", role: "faculty", description: "Faculty certifies academic performance" },
      { name: "HOD", role: "hod", description: "HOD recommends scholarship" },
      { name: "Scholarship Committee", role: "committee", description: "Committee evaluates application" },
      { name: "Dean", role: "dean", description: "Dean approves scholarship amount" },
      { name: "Principal", role: "principal", description: "Principal authorizes disbursement" },
    ],
    estimatedDays: 14,
    requiredDocuments: ["Income certificate", "Academic transcripts", "Scholarship application form", "Bank details"],
  },
};

export function getWorkflowByType(type: WorkflowType): WorkflowTemplate {
  return WORKFLOW_TEMPLATES[type];
}

export function getAllWorkflowTypes(): WorkflowType[] {
  return Object.keys(WORKFLOW_TEMPLATES) as WorkflowType[];
}
