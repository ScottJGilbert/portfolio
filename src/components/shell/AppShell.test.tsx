import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders core landmarks and core links", () => {
    render(
      <AppShell>
        <div>Body</div>
      </AppShell>
    );
    expect(screen.getByRole("navigation", { name: "Desktop Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Blog" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Legal" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Attributions" }).length).toBeGreaterThan(0);
  });
});
