import ContactForm from "./ContactForm";

const BE_URL = process.env.BE_URL || "http://localhost:3001";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/contact`);
  const { en, id } = await res.json();
  return <ContactForm en={en} id={id} />;
}
