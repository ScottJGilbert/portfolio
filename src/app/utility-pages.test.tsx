import { render, screen } from "@testing-library/react";
import AttributionsPage from "./attributions/page";
import LegalPage from "./legal/page";

describe("utility pages", () => {
  it("renders legal page with policy sections", () => {
    render(<LegalPage />);
    expect(screen.getByRole("heading", { name: /legal/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /privacy and data handling/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /content usage and licensing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /accuracy and availability/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /contact and policy updates/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });

  it("renders attributions with source list and source links", () => {
    render(<AttributionsPage />);
    expect(screen.getByRole("heading", { name: /attributions/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next\.js documentation/i })).toHaveAttribute(
      "href",
      "https://nextjs.org/docs",
    );
    expect(
      screen.getByRole("link", { name: /tailwind css documentation/i }),
    ).toHaveAttribute("href", "https://tailwindcss.com/docs");
    expect(screen.getByRole("link", { name: /heroicons/i })).toHaveAttribute(
      "href",
      "https://heroicons.com",
    );
  });
});
