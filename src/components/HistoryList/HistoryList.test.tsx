import { render, screen, fireEvent } from "@testing-library/react";
import { HistoryList } from "./HistoryList";

describe("HistoryList", () => {
  const mockEntries = [
    { id: 1, text: "Test document 1" },
    {
      id: 2,
      text: "Test document 2 with a long text that should be truncated...",
    },
  ];

  const setPdfUrl = vi.fn();
  const onDelete = vi.fn();
  const onClearAll = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all entries", () => {
    render(
      <HistoryList
        entries={mockEntries}
        setPdfUrl={setPdfUrl}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />,
    );

    expect(screen.getByText("Історія конвертацій")).toBeInTheDocument();
    expect(screen.getByText("Test document 1")).toBeInTheDocument();
    expect(screen.getByText(/Test document 2/)).toBeInTheDocument();
  });

  it("calls setPdfUrl on item click", () => {
    render(
      <HistoryList
        entries={mockEntries}
        setPdfUrl={setPdfUrl}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getByText("Test document 1"));
    expect(setPdfUrl).toHaveBeenCalledWith(1);
  });

  it("calls onDelete on delete button click", () => {
    render(
      <HistoryList
        entries={mockEntries}
        setPdfUrl={setPdfUrl}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getAllByTitle("Видалити")[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('calls onClearAll when "Очистити все" is clicked', () => {
    render(
      <HistoryList
        entries={mockEntries}
        setPdfUrl={setPdfUrl}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getByText("Очистити все"));
    expect(onClearAll).toHaveBeenCalled();
  });

  it("renders nothing if entries are empty", () => {
    const { container } = render(
      <HistoryList
        entries={[]}
        setPdfUrl={setPdfUrl}
        onDelete={onDelete}
        onClearAll={onClearAll}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
