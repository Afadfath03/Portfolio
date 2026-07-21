import { getAllContent } from "./api-client";
import PageClient from "./PageClient";

export const revalidate = 60;

export default async function Page() {
  const { en, id } = await getAllContent();
  return <PageClient initial={{ en, id }} />;
}
