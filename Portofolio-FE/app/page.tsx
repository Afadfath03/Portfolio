import PageClient from "./PageClient";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const res = await fetch(`${BE_URL}/api/content`, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status}`);
    const { en, id } = await res.json();
    return <PageClient initial={{ en, id }} />;
  } catch {
    return <PageClient initial={null} />;
  }
}
