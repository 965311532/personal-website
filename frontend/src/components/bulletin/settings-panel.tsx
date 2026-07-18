"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSettings, updateSettings, type UserSettings } from "@/lib/api";
import { Settings, Loader2 } from "lucide-react";

export function SettingsPanel() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (updates: Partial<UserSettings>) => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const updated = await updateSettings(updates);
      setSettings(updated);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
              <Settings className="size-4 text-primary" />
            </div>
            <CardTitle className="text-base">Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 text-muted-foreground animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !settings) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
              <Settings className="size-4 text-primary" />
            </div>
            <CardTitle className="text-base">Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <Settings className="size-4 text-primary" />
          </div>
          <CardTitle className="text-base">Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="public-mode" className="font-medium">
              Public Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Enable redaction for public viewing
            </p>
          </div>
          <Switch
            id="public-mode"
            checked={settings?.public_mode ?? true}
            onCheckedChange={(checked) => handleUpdate({ public_mode: checked })}
            disabled={isSaving}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="redaction-level" className="font-medium">
              Redaction Level
            </Label>
            <p className="text-xs text-muted-foreground">
              How aggressively to redact personal info
            </p>
          </div>
          <Select
            value={settings?.redaction_level ?? "medium"}
            onValueChange={(value) => handleUpdate({ redaction_level: value })}
            disabled={isSaving}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="window-days" className="font-medium">
              Default Window
            </Label>
            <p className="text-xs text-muted-foreground">
              Default time window for bulletin generation
            </p>
          </div>
          <Select
            value={String(settings?.window_days ?? 7)}
            onValueChange={(value) =>
              handleUpdate({ window_days: parseInt(value) })
            }
            disabled={isSaving}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
