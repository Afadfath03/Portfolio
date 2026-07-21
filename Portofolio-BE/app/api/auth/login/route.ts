import { NextResponse, type NextRequest } from "next/server";
import { verifyPassword, setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const ok = await verifyPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setSession();
  return NextResponse.json({ ok: true });
}
