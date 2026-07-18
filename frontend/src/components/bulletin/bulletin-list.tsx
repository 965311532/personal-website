"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { BulletinRun } from "@/lib/api";
import { History, ArrowRight, FileText } from "lucide-react";

interface BulletinListProps {
  bulletins: BulletinRun[];
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "processing":
    case "pending":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "outline";
  }
}

export function BulletinList({ bulletins }: BulletinListProps) {
  if (bulletins.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
              <History className="size-4 text-primary" />
            </div>
            <CardTitle className="text-base">Recent Bulletins</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex items-center justify-center size-12 rounded-full bg-muted mb-3">
              <FileText className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No bulletins generated yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <History className="size-4 text-primary" />
          </div>
          <CardTitle className="text-base">Recent Bulletins</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {bulletins.map((bulletin) => (
            <div
              key={bulletin.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {bulletin.window_days} day bulletin
                  </span>
                  <Badge variant={getStatusVariant(bulletin.status)}>
                    {bulletin.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(bulletin.created_at).toLocaleString()}
                </p>
                {bulletin.error_message && (
                  <p className="text-xs text-destructive">
                    {bulletin.error_message}
                  </p>
                )}
              </div>
              {bulletin.status === "completed" && (
                <Link
                  href="/bulletin"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
