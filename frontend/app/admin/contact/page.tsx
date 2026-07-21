import { getSection } from "../../api-client";
import ContactForm from "./ContactForm";

export default async function Page() {
  const [en, id] = await Promise.all([
    getSection("contact", "en"),
    getSection("contact", "id"),
  ]);
  return <ContactForm en={en} id={id} />;
}
