import AboutForm from "./AboutForm";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/about`);
  const { en, id } = await res.json();
  return <AboutForm en={en} id={id} />;
}
