import { useState } from "react";
import { createPdf } from "../../utils/api";
import { savePdf } from "../../utils/pdfStorage";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSave: (id: number, text: string, blob: Blob) => void;
}

export function TextToPdfForm({ value, onChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!value.trim()) return;
    setLoading(true);

    try {
      const blob = await createPdf(value);
      const id = Date.now();
      await savePdf(id, value, blob);
      onSave(id, value, blob);
    } catch {
      alert("Помилка при конвертації PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="h-40 w-full resize-none rounded border p-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть текст для конвертації..."
      />
      <button
        onClick={handleConvert}
        disabled={loading}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        {loading ? "Конвертація..." : "Конвертувати в PDF"}
      </button>
    </div>
  );
}
