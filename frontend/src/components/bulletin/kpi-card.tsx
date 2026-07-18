"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, Clock, Hash } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  description?: string;
}

const KPI_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  threads_count: { label: "Conversations", icon: MessageSquare },
  messages_count: { label: "Messages", icon: Hash },
  active_days_count: { label: "Active Days", icon: Calendar },
  window_days: { label: "Time Window", icon: Clock },
};

export function KpiCard({ title, value, description }: KpiCardProps) {
  const config = KPI_CONFIG[title];
  const displayTitle = config?.label || title.replace(/_/g, " ");
  const Icon = config?.icon;

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex items-center justify-center size-7 rounded-md bg-primary/10">
              <Icon className="size-3.5 text-primary" />
            </div>
          )}
          <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
            {displayTitle}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-2xl font-bold font-mono tracking-tight">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
