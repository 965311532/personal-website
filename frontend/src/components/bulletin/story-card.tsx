"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { BulletinStory } from "@/lib/api";

interface StoryCardProps {
  story: BulletinStory;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/bulletin/story/${story.slug}`} className="group">
      <Card className="border-border/50 hover:border-border hover:shadow-md h-full flex flex-col transition-all duration-200 group-hover:-translate-y-0.5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {story.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {story.summary}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0">
          <div className="flex flex-wrap gap-1.5">
            {story.theme_tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {story.theme_tags.length > 2 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{story.theme_tags.length - 2}
              </Badge>
            )}
          </div>
          <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
        </CardFooter>
      </Card>
    </Link>
  );
}
