import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // use cache for faster public reads
  token: process.env.SANITY_API_TOKEN,
});


export async function getNotes() {
  const query = `*[_type == "note"] | order(createdAt desc) {
    _id,
    title,
    description,
    teacher,
    "fileUrl": file.asset->url,
    createdAt
  }`;

  const notes = await client.fetch(query);
  return notes;
}
