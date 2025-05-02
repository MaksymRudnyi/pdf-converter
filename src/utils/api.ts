export async function createPdf(text: string): Promise<Blob> {
  const apiUrl = import.meta.env.VITE_PDF_API_URL;
  const apiKey = import.meta.env.VITE_PDF_API_KEY;

  const response = await fetch(`${apiUrl}?apiKey=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) throw new Error("Failed to generate PDF");
  return await response.blob();
}
