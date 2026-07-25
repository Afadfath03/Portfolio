import StackForm from "./StackForm";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

export default async function Page() {
  const res = await fetch(`${BE_URL}/api/content/stack`);
  const { en, id } = await res.json();
  return <StackForm en={en} id={id} />;
}
