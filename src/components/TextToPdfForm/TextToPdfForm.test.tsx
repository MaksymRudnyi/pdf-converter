import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TextToPdfForm } from "./TextToPdfForm";
import { vi } from "vitest";

// Мокаємо зовнішні залежності
vi.mock("../../utils/api", () => ({
  createPdf: vi.fn(() =>
    Promise.resolve(new Blob(["test"], { type: "application/pdf" })),
  ),
}));

vi.mock("../../utils/pdfStorage", () => ({
  savePdf: vi.fn(() => Promise.resolve()),
}));

describe("TextToPdfForm", () => {
  const mockOnChange = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders textarea and button", () => {
    render(
      <TextToPdfForm value="" onChange={mockOnChange} onSave={mockOnSave} />,
    );

    expect(
      screen.getByPlaceholderText("Введіть текст для конвертації..."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Конвертувати в PDF/i }),
    ).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(
      <TextToPdfForm value="" onChange={mockOnChange} onSave={mockOnSave} />,
    );

    fireEvent.change(screen.getByPlaceholderText(/Введіть текст/i), {
      target: { value: "Новий текст" },
    });

    expect(mockOnChange).toHaveBeenCalledWith("Новий текст");
  });

  it("calls onSave after successful conversion", async () => {
    render(
      <TextToPdfForm
        value="PDF content"
        onChange={mockOnChange}
        onSave={mockOnSave}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Конвертувати в PDF/i }),
    );

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
      const [id, text, blob] = mockOnSave.mock.calls[0];
      expect(typeof id).toBe("number");
      expect(text).toBe("PDF content");
      expect(blob instanceof Blob).toBe(true);
    });
  });

  it("disables button while loading", async () => {
    render(
      <TextToPdfForm
        value="PDF content"
        onChange={mockOnChange}
        onSave={mockOnSave}
      />,
    );

    const button = screen.getByRole("button", { name: /Конвертувати в PDF/i });
    fireEvent.click(button);
    expect(button).toBeDisabled();

    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
