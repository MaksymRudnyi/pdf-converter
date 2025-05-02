import { render, screen } from "@testing-library/react";
import { PDFViewer } from "./PDFViewer";

describe("PDFViewer", () => {
  const testUrl = "blob:http://localhost/fake-pdf-url";

  it('renders heading "Результат"', () => {
    render(<PDFViewer file={testUrl} />);
    expect(screen.getByText("Результат")).toBeInTheDocument();
  });

  it("renders iframe with correct src", () => {
    render(<PDFViewer file={testUrl} />);
    const iframe = screen.getByTitle("PDF preview");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", testUrl);
    expect(iframe).toHaveAttribute("width", "100%");
    expect(iframe).toHaveAttribute("height", "600px");
  });
});
