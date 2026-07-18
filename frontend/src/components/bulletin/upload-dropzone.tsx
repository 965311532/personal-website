"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadExport, type ImportResponse } from "@/lib/api";
import { Upload, FileUp, CheckCircle2, AlertCircle } from "lucide-react";

interface UploadDropzoneProps {
  onUploadComplete?: (result: ImportResponse) => void;
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImportResponse | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".zip") && !file.name.endsWith(".json")) {
        setError("Please upload a .zip or .json file");
        return;
      }

      setIsUploading(true);
      setError(null);
      setResult(null);

      try {
        const response = await uploadExport(file);
        setResult(response);
        onUploadComplete?.(response);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <Upload className="size-4 text-primary" />
          </div>
          <CardTitle className="text-base">Upload ChatGPT Export</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border/50 hover:border-border hover:bg-muted/30"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
                  <FileUp className="size-6 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Uploading and processing...
              </p>
              <Progress value={undefined} className="w-full max-w-xs mx-auto" />
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center size-12 rounded-full bg-muted">
                  <FileUp className="size-6 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your ChatGPT export file here, or click to browse
              </p>
              <input
                type="file"
                accept=".zip,.json"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Accepts .zip (full export) or conversations.json
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              <p className="font-medium text-foreground">Import Complete</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-1 pl-7">
              <p>Parsed {result.threads_parsed} conversations</p>
              <p>
                Created: {result.threads_created} threads,{" "}
                {result.messages_created} messages
              </p>
              <p>
                Skipped: {result.threads_skipped} threads,{" "}
                {result.messages_skipped} messages (duplicates)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
