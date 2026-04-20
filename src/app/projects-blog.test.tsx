import { render, screen } from "@testing-library/react";
import BlogPage from "./blog/page";
import ProjectsPage from "./projects/page";

describe("projects and blog", () => {
  it("renders project list with metadata", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getAllByText(/case study/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /^outcome$/i }).length).toBeGreaterThan(0);
  });

  it("renders blog list with category and date", () => {
    render(<BlogPage />);
    expect(screen.getByRole("heading", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getAllByText(/engineering notes/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /^featured essay$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^archive$/i })).toBeInTheDocument();
  });
});
