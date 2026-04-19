import { describe, expect, it } from "vitest";
import pkg from "../../package.json";

describe("dependency audit", () => {
  it("removes unused Radix packages from public stack", () => {
    const deps = pkg.dependencies ?? {};
    expect(deps["@radix-ui/react-dialog"]).toBeUndefined();
    expect(deps["@radix-ui/react-dropdown-menu"]).toBeUndefined();
  });
});
