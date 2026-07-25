import EducationForm from "./EducationForm";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/education`);
  const { en, id } = await res.json();
  return <EducationForm en={en} id={id} />;
}
