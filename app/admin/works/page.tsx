import { getSection } from "@/lib/db";
import WorksForm from "./WorksForm";

export default async function Page() {
  const [en, id] = await Promise.all([
    getSection("works", "en"),
    getSection("works", "id"),
  ]);
  return <WorksForm en={en} id={id} />;
}
