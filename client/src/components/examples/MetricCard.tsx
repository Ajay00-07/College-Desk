import MetricCard from '../MetricCard';
import { FileText, Users, CheckCircle, Clock } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <MetricCard 
        title="Pending Approvals" 
        value={12} 
        icon={Clock}
        trend="3 new today"
        accentColor="border-amber-500"
      />
      <MetricCard 
        title="Total Documents" 
        value={234} 
        icon={FileText}
        accentColor="border-blue-500"
      />
      <MetricCard 
        title="Approved Requests" 
        value={189} 
        icon={CheckCircle}
        trend="+12 this week"
        accentColor="border-green-500"
      />
      <MetricCard 
        title="Active Students" 
        value={1250} 
        icon={Users}
        accentColor="border-purple-500"
      />
    </div>
  );
}
