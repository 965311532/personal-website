const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Kpi {
  key: string;
  value: string;
}

export interface BulletinRun {
  id: string;
  user_id: string;
  window_days: number;
  start_at: string;
  end_at: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

export interface BulletinStory {
  id: string;
  bulletin_run_id: string;
  slug: string;
  title: string;
  summary: string;
  content_md: string;
  theme_tags: string[];
  created_at: string;
}

export interface LatestBulletin {
  run: BulletinRun | null;
  stories: BulletinStory[];
  kpis: Kpi[];
}

export interface StoryResponse {
  story: BulletinStory;
  run: BulletinRun;
}

export interface AdminStatus {
  total_threads: number;
  total_messages: number;
  last_import: string | null;
  latest_bulletin: BulletinRun | null;
  recent_bulletins: BulletinRun[];
}

export interface UserSettings {
  window_days: number;
  public_mode: boolean;
  redaction_level: string;
}

export interface ImportResponse {
  success: boolean;
  threads_parsed: number;
  threads_created: number;
  threads_skipped: number;
  messages_created: number;
  messages_skipped: number;
}

export interface GenerateResponse {
  success: boolean;
  bulletin_run_id: string;
  status: string;
}

// Public API
export async function getLatestBulletin(handle: string): Promise<LatestBulletin> {
  const res = await fetch(`${API_BASE}/api/public/latest?handle=${handle}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch bulletin: ${res.status}`);
  }
  return res.json();
}

export async function getStory(slug: string): Promise<StoryResponse> {
  const res = await fetch(`${API_BASE}/api/public/story/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch story: ${res.status}`);
  }
  return res.json();
}

// Admin API
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("admin_token")
    : "";
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getAdminStatus(): Promise<AdminStatus> {
  const res = await fetch(`${API_BASE}/api/admin/status`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch status: ${res.status}`);
  }
  return res.json();
}

export async function getSettings(): Promise<UserSettings> {
  const res = await fetch(`${API_BASE}/api/admin/settings`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch settings: ${res.status}`);
  }
  return res.json();
}

export async function updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
  const res = await fetch(`${API_BASE}/api/admin/settings`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (!res.ok) {
    throw new Error(`Failed to update settings: ${res.status}`);
  }
  return res.json();
}

export async function uploadExport(file: File): Promise<ImportResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/admin/import`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(error.detail || `Upload failed: ${res.status}`);
  }
  return res.json();
}

export async function generateBulletin(windowDays: number): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/api/admin/generate`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ window_days: windowDays }),
  });
  if (!res.ok) {
    throw new Error(`Failed to generate: ${res.status}`);
  }
  return res.json();
}
