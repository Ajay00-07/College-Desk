import TaskCard from '../TaskCard';

export default function TaskCardExample() {
  return (
    <div className="space-y-4 p-8 max-w-2xl">
      <TaskCard
        id="1"
        title="Attendance Condonation Request"
        type="Attendance Report"
        submittedBy="Priya Singh"
        date="Nov 5, 2025"
        status="pending"
        onApprove={(id) => console.log('Approved:', id)}
        onReject={(id) => console.log('Rejected:', id)}
        onView={(id) => console.log('Viewing:', id)}
      />
      <TaskCard
        id="2"
        title="Medical Leave Request"
        type="Leave Application"
        submittedBy="Rahul Kumar"
        date="Nov 4, 2025"
        status="approved"
      />
    </div>
  );
}
