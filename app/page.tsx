import { getAllContent } from "@/lib/db";
import PageClient from "./PageClient";

export const revalidate = 60;

export default async function Page() {
  const [en, id] = await Promise.all([getAllContent("en"), getAllContent("id")]);

  return <PageClient initial={{ en, id }} />;
}
