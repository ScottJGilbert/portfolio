import { describe, expect, it } from "vitest";
import { coreNav, externalNav, footerColumns } from "./navigation";

describe("navigation data contracts", () => {
  it("keeps core route map order", () => {
    expect(coreNav.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/projects",
      "/blog",
    ]);
  });

  it("defines required external links", () => {
    expect(externalNav.map((item) => item.label)).toEqual([
      "GitHub",
      "LinkedIn",
      "X/Twitter",
      "Email",
    ]);
  });

  it("provides three footer columns", () => {
    expect(footerColumns).toHaveLength(3);
  });
});