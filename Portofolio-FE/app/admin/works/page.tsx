import WorksForm from "./WorksForm";

const BE_URL = process.env.BE_URL || "http://localhost:3001";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/works`);
  const { en, id } = await res.json();
  return <WorksForm en={en} id={id} />;
}
