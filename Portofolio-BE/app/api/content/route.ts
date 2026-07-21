import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/db";

export async function GET() {
  const en = getAllContent("en");
  const id = getAllContent("id");
  return NextResponse.json({ en, id });
}
