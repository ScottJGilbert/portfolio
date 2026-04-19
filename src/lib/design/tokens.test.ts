import { describe, expect, it } from "vitest";
import { semanticScale, themeTokens } from "./tokens";

const forbidden = new Set(["#000000", "#808080", "#7f7f7f"]);

describe("design tokens", () => {
  it("exposes required semantic scales", () => {
    expect(semanticScale.surface.base).toBe("surface");
    expect(semanticScale.typography.display).toBeDefined();
  });

  it("does not contain forbidden neutrals", () => {
    const all = [...Object.values(themeTokens.light), ...Object.values(themeTokens.dark)];
    for (const value of all) {
      expect(forbidden.has(value.toLowerCase())).toBe(false);
    }
  });
});
