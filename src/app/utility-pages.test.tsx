import { render, screen } from "@testing-library/react";
import AttributionsPage from "./attributions/page";
import LegalPage from "./legal/page";

describe("utility pages", () => {
  it("renders legal page with policy sections", () => {
    render(<LegalPage />);
    expect(screen.getByRole("heading", { name: /legal/i })).toBeInTheDocument();
    expect(screen.getByText(/privacy/i)).toBeInTheDocument();
  });

  it("renders attributions with source list", () => {
    render(<AttributionsPage />);
    expect(screen.getByRole("heading", { name: /attributions/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
