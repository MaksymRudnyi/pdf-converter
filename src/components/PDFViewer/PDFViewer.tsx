interface PDFViewerProps {
  file: string;
}

export function PDFViewer({ file }: PDFViewerProps) {
  return (
    <div className="my-6 rounded border bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Результат</h2>
      <iframe title="PDF preview" src={file} width="100%" height="600px" />
    </div>
  );
}
