import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: boolean;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, accentColor }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className={`text-3xl font-bold ${accentColor ? 'text-accent' : 'text-foreground'}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};
