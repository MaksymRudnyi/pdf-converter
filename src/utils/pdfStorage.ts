import { set, get, del, keys } from "idb-keyval";

const prefix = "pdf:";

export async function savePdf(id: number, text: string, blob: Blob) {
  await set(`${prefix}${id}`, { text, blob });
}

export async function loadPdf(
  id: number,
): Promise<{ text: string; blob: Blob } | null> {
  return await get(`${prefix}${id}`);
}

export async function getAllPdfs(): Promise<{ id: number; text: string }[]> {
  const allKeys = await keys();
  const pdfKeys = allKeys.filter(
    (k) => typeof k === "string" && (k as string).startsWith(prefix),
  ) as string[];

  const entries: { id: number; text: string }[] = [];

  for (const key of pdfKeys) {
    const id = parseInt(key.replace(prefix, ""), 10);
    const data = await get<{ text: string; blob: Blob }>(key);
    if (data) entries.push({ id, text: data.text });
  }

  return entries.sort((a, b) => b.id - a.id);
}

export async function delPdf(id: number) {
  await del(`${prefix}${id}`);
}

export async function clearAllPdfs() {
  const allKeys = await keys();
  const deletions = allKeys
    .filter((k) => typeof k === "string" && k.startsWith("pdf:"))
    .map((key) => del(key));
  await Promise.all(deletions);
}
