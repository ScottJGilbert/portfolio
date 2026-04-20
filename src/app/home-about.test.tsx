import { render, screen } from "@testing-library/react";
import AboutPage from "./about/page";
import HomePage from "./page";

describe("home and about", () => {
  it("renders home editorial headline and mapped content", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /systems engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view selected work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /selected work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /impact metrics/i })).toBeInTheDocument();

    expect(screen.getByText("Portfolio System Redesign")).toBeInTheDocument();
    expect(
      screen.getByText(/token-driven primitives and regression coverage for every core page/i)
    ).toBeInTheDocument();

    const metricLabel = screen.getByText("Availability", { selector: "dt" });
    const metricValue = screen.getByText("99.95%", { selector: "dd" });
    expect(metricValue.closest("dl")).toContainElement(metricLabel);

    expect(screen.getByText("Backend Resilience")).toBeInTheDocument();
    expect(
      screen.getByText(/design apis and background workers around graceful degradation/i)
    ).toBeInTheDocument();
  });

  it("renders about story sections and timeline details", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: /about scott gilbert/i })).toBeInTheDocument();
    expect(screen.getByText(/engineering discipline and editorial clarity/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /timeline/i })).toBeInTheDocument();

    expect(screen.getByText("Portfolio Platform Relaunch")).toBeInTheDocument();
    expect(
      screen.getByText(/strict design tokens, route contracts, and automated page coverage/i)
    ).toBeInTheDocument();
  });
});
