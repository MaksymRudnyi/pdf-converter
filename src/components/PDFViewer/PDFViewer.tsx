interface PDFViewerProps {
  file: string;
}

export function PDFViewer({ file }: PDFViewerProps) {
  console.log("file: ", file);
  return (
    <div className="my-6 rounded border bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Результат</h2>
      <iframe src={file} width="100%" height="600px" />
    </div>
  );
}
