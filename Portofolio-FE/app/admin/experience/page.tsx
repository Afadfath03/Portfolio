import ExperienceForm from "./ExperienceForm";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/experience`);
  const { en, id } = await res.json();
  return <ExperienceForm en={en} id={id} />;
}
