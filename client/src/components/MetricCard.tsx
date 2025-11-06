import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  accentColor?: string;
  className?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  accentColor = "border-primary",
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("p-6 border-l-4 smooth-transition hover:shadow-lg", accentColor, className)} data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold smooth-transition hover:scale-105 inline-block" data-testid="text-metric-value">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg smooth-transition group-hover:bg-primary/20">
          <Icon className="w-6 h-6 text-primary smooth-transition group-hover:scale-110" />
        </div>
      </div>
    </Card>
  );
}
