import { getSection } from "../../api-client";
import HeroForm from "./HeroForm";

export default async function Page() {
  const [en, id] = await Promise.all([
    getSection("hero", "en"),
    getSection("hero", "id"),
  ]);
  return <HeroForm en={en} id={id} />;
}
