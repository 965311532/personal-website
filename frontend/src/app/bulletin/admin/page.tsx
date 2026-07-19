"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UploadDropzone } from "@/components/bulletin/upload-dropzone";
import { GenerateButton } from "@/components/bulletin/generate-button";
import { SettingsPanel } from "@/components/bulletin/settings-panel";
import { BulletinList } from "@/components/bulletin/bulletin-list";
import { getAdminStatus, type AdminStatus } from "@/lib/api";
import {
  LogOut,
  RefreshCw,
  MessageSquare,
  Hash,
  Clock,
  FileText,
  KeyRound,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminStatus();
      setStatus(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check for existing token
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadStatus();
    }
  }, [isAuthenticated, loadStatus]);

  const handleLogin = () => {
    localStorage.setItem("admin_token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setToken("");
    setStatus(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto pt-12">
        <Card className="border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
                <KeyRound className="size-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm font-medium">
                Admin Token
              </label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter admin token"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your bulletin settings and content
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2"
          size="sm"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>

      {/* Status Overview */}
      {status && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Import Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="size-4" />
                  <p className="text-sm">Total Threads</p>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {status.total_threads}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="size-4" />
                  <p className="text-sm">Total Messages</p>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {status.total_messages}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  <p className="text-sm">Last Import</p>
                </div>
                <p className="text-lg font-mono">
                  {status.last_import
                    ? new Date(status.last_import).toLocaleDateString()
                    : "Never"}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="size-4" />
                  <p className="text-sm">Latest Bulletin</p>
                </div>
                <p className="text-lg font-mono">
                  {status.latest_bulletin
                    ? status.latest_bulletin.status
                    : "None"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      <Separator className="bg-border/40" />

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadDropzone onUploadComplete={() => loadStatus()} />
        <GenerateButton onGenerateStarted={() => loadStatus()} />
      </div>

      <Separator className="bg-border/40" />

      {/* Settings and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsPanel />
        <BulletinList bulletins={status?.recent_bulletins || []} />
      </div>

      {/* Refresh button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={loadStatus}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw
            className={`size-4 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Refreshing..." : "Refresh Status"}
        </Button>
      </div>
    </div>
  );
}
