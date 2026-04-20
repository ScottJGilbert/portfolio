import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { externalNav } from "@/data/navigation";
import { AppShell } from "./AppShell";

describe("AppShell navigation chrome", () => {
  it("applies responsive shell visibility classes", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const desktopSidebar = screen.getByRole("complementary", { name: "Desktop Navigation" });
    const mobileHeader = screen.getByRole("banner", { name: "Mobile Navigation" });

    expect(desktopSidebar).toHaveClass("hidden", "md:block");
    expect(mobileHeader).toHaveClass("md:hidden");
  });

  it("renders external links in desktop shell", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const desktopExternalNav = screen.getByRole("navigation", { name: "Desktop External Links" });

    expect(within(desktopExternalNav).getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(within(desktopExternalNav).getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
  });

  it("adds safe external link attributes for absolute URLs", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const desktopExternalNav = screen.getByRole("navigation", { name: "Desktop External Links" });
    const githubLink = within(desktopExternalNav).getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("renders mobile external link labels exactly as nav labels", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const mobileExternalNav = screen.getByRole("navigation", { name: "Mobile External Links" });

    for (const item of externalNav) {
      expect(within(mobileExternalNav).getByRole("link", { name: item.label })).toBeInTheDocument();
      expect(within(mobileExternalNav).queryByRole("link", { name: `${item.label} ↗` })).not.toBeInTheDocument();
    }
  });

  it("renders three-column footer headings", () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    const footer = screen.getByRole("contentinfo");

    expect(within(footer).getByRole("heading", { name: "Sitemap" })).toBeInTheDocument();
    expect(within(footer).getByRole("heading", { name: "Legal" })).toBeInTheDocument();
    expect(within(footer).getByRole("heading", { name: "Elsewhere" })).toBeInTheDocument();
  });
});
