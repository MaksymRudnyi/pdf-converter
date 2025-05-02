interface Props {
  entries: { id: number; text: string }[];
  setPdfUrl: (id: number) => void;
  onDelete: (id: number) => void;
  onClearAll: () => void;
}

export function HistoryList({
  entries,
  setPdfUrl,
  onDelete,
  onClearAll,
}: Props) {
  if (!entries.length) return null;

  return (
    <div className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Історія конвертацій</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:underline"
        >
          Очистити все
        </button>
      </div>
      <ul className="space-y-2">
        {entries.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between rounded border bg-white p-3 transition hover:bg-gray-100"
          >
            <div
              className="flex-1 cursor-pointer"
              onClick={() => setPdfUrl(item.id)}
            >
              <div className="line-clamp-2 text-sm text-gray-700">
                {item.text.slice(0, 200)}
                {item.text.length > 200 && "..."}
              </div>
              <div className="text-xs text-gray-400">
                {item.text.length} символів •{" "}
                {new Date(item.id).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="ml-4 text-gray-400 hover:text-red-600"
              title="Видалити"
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
