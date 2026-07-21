import { NextResponse } from "next/server";
import { isAuthenticated, clearSession } from "@/lib/auth";

export async function POST() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clearSession();
  return NextResponse.json({ ok: true });
}
