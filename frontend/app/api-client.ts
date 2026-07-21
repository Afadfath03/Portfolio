// ponytail: thin fetch wrapper around backend API.
// /api/* is proxied to backend via next.config.ts rewrites (same-origin).
// On the server, relative fetch triggers the rewrite internally.
// On the client, the browser hits the rewrite which forwards to backend.

import type { Dict } from "./types";

export async function getAllContent(): Promise<{ en: Dict; id: Dict }> {
  const res = await fetch("/api/content", { cache: "no-store" });
  if (!res.ok) throw new Error(`getAllContent failed: ${res.status}`);
  return res.json();
}

export async function getSection<K extends keyof Dict>(
  section: K,
  lang: "en" | "id"
): Promise<Dict[K]> {
  const res = await fetch(`/api/content/${section}?lang=${lang}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`getSection failed: ${res.status}`);
  return res.json();
}

export async function saveContentPair<K extends keyof Dict>(
  section: K,
  enData: Dict[K],
  idData: Dict[K]
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/content/${section}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ en: enData, id: idData }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function login(
  password: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
