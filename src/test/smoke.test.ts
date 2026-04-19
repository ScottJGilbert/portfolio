import { describe, expect, it } from "vitest";
import { themeTokens } from "@/lib/design/tokens";

describe("smoke", () => {
  it("loads token module", () => {
    expect(themeTokens).toBeDefined();
  });
});
