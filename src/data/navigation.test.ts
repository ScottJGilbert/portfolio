import { describe, expect, it } from "vitest";
import { coreNav, externalNav, footerColumns, utilityNav } from "./navigation";

describe("navigation data contracts", () => {
  it("keeps core route map order", () => {
    expect(coreNav.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/projects",
      "/blog",
    ]);
  });

  it("defines required external links with safe protocols", () => {
    expect(externalNav).toEqual([
      { label: "GitHub", href: "https://github.com/ScottJGilbert", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/scottgilbert", external: true },
      { label: "X/Twitter", href: "https://x.com", external: true },
      { label: "Email", href: "mailto:hello@scottgilbert.dev", external: true },
    ]);

    for (const item of externalNav) {
      expect(item.external).toBe(true);
      expect(item.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });

  it("provides titled footer columns with expected membership", () => {
    expect(footerColumns.map((column) => column.title)).toEqual([
      "Sitemap",
      "Legal",
      "Elsewhere",
    ]);

    expect(footerColumns[0]?.links).toEqual(coreNav);
    expect(footerColumns[1]?.links).toEqual(utilityNav);
    expect(footerColumns[2]?.links).toEqual(externalNav);

    expect(footerColumns[0]?.links).not.toBe(coreNav);
    expect(footerColumns[1]?.links).not.toBe(utilityNav);
    expect(footerColumns[2]?.links).not.toBe(externalNav);
  });
});
