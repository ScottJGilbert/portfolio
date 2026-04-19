import { describe, expect, it } from "vitest";
import { coreNav, utilityNav } from "@/data/navigation";
import { themeTokens } from "@/lib/design/tokens";

describe("smoke", () => {
  it("loads token module", () => {
    expect(themeTokens).toBeDefined();
  });

  it("keeps the public route map intact", () => {
    const hrefs = [...coreNav, ...utilityNav].map((item) => item.href);
    expect(hrefs).toEqual([
      "/",
      "/about",
      "/projects",
      "/blog",
      "/legal",
      "/attributions",
    ]);
  });
});
