import { describe, expect, it } from "vitest";
import { coreNav, externalNav, footerColumns, utilityNav } from "@/data/navigation";
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

  it("keeps shell contracts wired", () => {
    expect(externalNav).toHaveLength(4);
    expect(footerColumns).toHaveLength(3);
  });
});
