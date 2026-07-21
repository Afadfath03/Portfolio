import { NextResponse, type NextRequest } from "next/server";
import { getSection, upsertContent, type ContentKey } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { type Dict } from "@/app/i18n";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const key = section as ContentKey;
  const en = getSection(key, "en");
  const id = getSection(key, "id");
  return NextResponse.json({ en, id });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;
  const key = section as ContentKey;
  const body = await req.json();
  const { en, id } = body as { en: Dict[typeof key]; id: Dict[typeof key] };

  try {
    upsertContent(key, "en", en);
    upsertContent(key, "id", id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
