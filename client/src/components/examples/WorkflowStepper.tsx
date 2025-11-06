import WorkflowStepper from '../WorkflowStepper';

export default function WorkflowStepperExample() {
  const stages = [
    { name: "Faculty", status: "approved" as const },
    { name: "HOD", status: "current" as const },
    { name: "Principal", status: "pending" as const },
  ];

  return (
    <div className="p-8">
      <WorkflowStepper stages={stages} />
    </div>
  );
}
