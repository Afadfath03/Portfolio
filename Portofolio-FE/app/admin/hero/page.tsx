import HeroForm from "./HeroForm";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/hero`);
  const { en, id } = await res.json();
  return <HeroForm en={en} id={id} />;
}
