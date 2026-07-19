"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateBulletin, type GenerateResponse } from "@/lib/api";
import { Sparkles, Wand2, CheckCircle2, AlertCircle } from "lucide-react";

interface GenerateButtonProps {
  onGenerateStarted?: (result: GenerateResponse) => void;
}

export function GenerateButton({ onGenerateStarted }: GenerateButtonProps) {
  const [windowDays, setWindowDays] = useState("7");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateBulletin(parseInt(windowDays));
      setResult(response);
      onGenerateStarted?.(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </div>
          <CardTitle className="text-base">Generate Bulletin</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Select value={windowDays} onValueChange={setWindowDays}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2"
          >
            <Wand2 className={`size-4 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating..." : "Generate Bulletin"}
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              <p className="font-medium text-foreground">Generation Started</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-1 pl-7">
              <p>Bulletin ID: {result.bulletin_run_id.slice(0, 8)}...</p>
              <p>Status: {result.status}</p>
              <p className="text-xs mt-2">
                Refresh the page in a few moments to see results.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
