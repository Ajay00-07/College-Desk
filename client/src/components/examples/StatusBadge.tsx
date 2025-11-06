import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="pending" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
      <StatusBadge status="below_threshold" />
      <StatusBadge status="completed" />
      <StatusBadge status="in_progress" />
    </div>
  );
}
