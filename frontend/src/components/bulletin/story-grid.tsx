"use client";

import { StoryCard } from "./story-card";
import { FileText } from "lucide-react";
import type { BulletinStory } from "@/lib/api";

interface StoryGridProps {
  stories: BulletinStory[];
}

export function StoryGrid({ stories }: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center size-14 rounded-full bg-muted mb-4">
          <FileText className="size-7 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          No stories yet. Generate a bulletin to see your digest.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
