"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { upsertContent, type ContentKey } from "./db";
import { clearSession, isAuthenticated, setSession, verifyPassword } from "./auth";
import { type Dict } from "../app/i18n";

export async function login(password: string): Promise<{ error?: string }> {
  const ok = await verifyPassword(password);
  if (!ok) return { error: "Invalid password" };

  await setSession();
  redirect("/admin/hero");
}

export async function logout(): Promise<void> {
  const authed = await isAuthenticated();
  if (!authed) return;
  await clearSession();
  redirect("/admin");
}

export async function saveContentPair<K extends ContentKey>(
  section: K,
  enData: Dict[K],
  idData: Dict[K]
): Promise<{ ok: boolean; error?: string }> {
  const authed = await isAuthenticated();
  if (!authed) return { ok: false, error: "Unauthorized" };

  try {
    upsertContent(section, "en", enData);
    upsertContent(section, "id", idData);
    revalidatePath("/");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
