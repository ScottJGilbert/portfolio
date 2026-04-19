import { render, screen } from "@testing-library/react";
import AboutPage from "./about/page";
import HomePage from "./page";

describe("home and about", () => {
  it("renders home editorial headline and CTA", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /systems engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view selected work/i })).toBeInTheDocument();
  });

  it("renders about story sections", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /about scott gilbert/i })).toBeInTheDocument();
    expect(screen.getByText(/engineering discipline and editorial clarity/i)).toBeInTheDocument();
  });
});
