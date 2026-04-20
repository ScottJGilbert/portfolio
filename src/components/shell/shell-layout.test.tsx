import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell navigation chrome", () => {
  it("renders external links in desktop shell", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
  });

  it("adds safe external link attributes for absolute URLs", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const githubLink = screen.getAllByRole("link", { name: "GitHub" })[0];
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer noopener");
  });
});
