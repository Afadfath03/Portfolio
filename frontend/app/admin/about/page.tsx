import { getSection } from "../../api-client";
import AboutForm from "./AboutForm";

export default async function Page() {
  const [en, id] = await Promise.all([
    getSection("about", "en"),
    getSection("about", "id"),
  ]);
  return <AboutForm en={en} id={id} />;
}
