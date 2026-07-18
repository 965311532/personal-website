import { getLatestBulletin } from "@/lib/api";
import { KpiCard } from "@/components/bulletin/kpi-card";
import { StoryGrid } from "@/components/bulletin/story-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Sparkles, AlertCircle } from "lucide-react";

// Default handle for MVP (configurable via environment)
const DEFAULT_HANDLE = process.env.NEXT_PUBLIC_DEFAULT_HANDLE || "gabriele";

export const dynamic = "force-dynamic";

export default async function BulletinHomePage() {
  let bulletin;
  let error = null;

  try {
    bulletin = await getLatestBulletin(DEFAULT_HANDLE);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load bulletin";
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Bulletin</h1>
          <p className="text-muted-foreground">
            AI-powered digest of your conversations
          </p>
        </div>
        <Card className="border-border/50">
          <CardContent className="py-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center size-12 rounded-full bg-muted">
                <AlertCircle className="size-6 text-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              {error.includes("404")
                ? "No bulletin found. Upload your ChatGPT export in the admin panel to get started."
                : `Error: ${error}`}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const kpis = bulletin?.kpis || [];
  const stories = bulletin?.stories || [];
  const run = bulletin?.run;

  // Filter out top_themes from KPI cards (shown in stories instead)
  const displayKpis = kpis.filter((k) => k.key !== "top_themes");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Bulletin</h1>
        <p className="text-muted-foreground">
          AI-powered digest of your conversations
          {run && (
            <span className="text-xs ml-2">
              • Generated {new Date(run.created_at).toLocaleDateString()} •{" "}
              {run.window_days} day window
            </span>
          )}
        </p>
      </div>

      {/* KPI Cards */}
      {displayKpis.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayKpis.map((kpi) => (
              <KpiCard key={kpi.key} title={kpi.key} value={kpi.value} />
            ))}
          </div>
        </section>
      )}

      <Separator className="bg-border/40" />

      {/* Stories */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-primary" />
          <h2 className="text-lg font-semibold">Stories</h2>
        </div>
        <StoryGrid stories={stories} />
      </section>

      <Separator className="bg-border/40" />

      {/* Recommended Reading Placeholder */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recommended Reading</h2>
        <Card className="border-border/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-base text-muted-foreground">
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Based on your conversations, we&apos;ll recommend relevant
              articles, papers, and resources to explore. This feature is coming
              in a future update.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
