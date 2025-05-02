import { useEffect, useState } from "react";
import { TextToPdfForm, PDFViewer, HistoryList } from "./components";
import { getAllPdfs, loadPdf, delPdf, clearAllPdfs } from "./utils/pdfStorage";

export default function App() {
  const [text, setText] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [entries, setEntries] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    getAllPdfs().then(setEntries);
  }, []);

  const handleSave = (id: number, text: string, blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setEntries((prev) => [{ id, text }, ...prev]);
  };

  const handleSelect = async (id: number) => {
    const data = await loadPdf(id);
    if (data) {
      const url = URL.createObjectURL(data.blob);
      setPdfUrl(url);
    }
  };

  const handleDelete = async (id: number) => {
    await delPdf(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleClearAll = async () => {
    await clearAllPdfs();
    setEntries([]);
    setPdfUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold">Text to PDF Converter</h1>
      <TextToPdfForm value={text} onChange={setText} onSave={handleSave} />
      {pdfUrl && <PDFViewer file={pdfUrl} />}
      <HistoryList
        entries={entries}
        setPdfUrl={handleSelect}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
