import { getStory } from "@/lib/api";
import { MarkdownRenderer } from "@/components/bulletin/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;

  let data;
  try {
    data = await getStory(slug);
  } catch {
    notFound();
  }

  const { story, run } = data;

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/bulletin">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2"
          >
            <ArrowLeft className="size-4" />
            Back to Bulletin
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {story.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(story.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {run.window_days} day window
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {story.theme_tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Summary */}
      <div className="bg-muted/40 rounded-xl p-6 mb-10 border border-border/50">
        <p className="text-muted-foreground leading-relaxed italic text-lg">
          {story.summary}
        </p>
      </div>

      <Separator className="bg-border/40 mb-10" />

      {/* Content */}
      <div className="mb-14 prose-container">
        <MarkdownRenderer content={story.content_md} />
      </div>

      <Separator className="bg-border/40 mb-10" />

      {/* Footer */}
      <footer className="text-center pb-8">
        <Link href="/bulletin">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            View All Stories
          </Button>
        </Link>
      </footer>
    </article>
  );
}
