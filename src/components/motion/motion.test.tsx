import { render, screen } from "@testing-library/react";
import { useReducedMotion } from "framer-motion";
import { MotionSection } from "./MotionSection";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  );

  return {
    ...actual,
    useReducedMotion: vi.fn(() => false),
  };
});

describe("MotionSection", () => {
  const useReducedMotionMock = vi.mocked(useReducedMotion);

  afterEach(() => {
    useReducedMotionMock.mockReset();
  });

  it("renders reduced-motion mode as a static section", () => {
    useReducedMotionMock.mockReturnValue(true);

    render(
      <MotionSection>
        <p>Motion-safe content</p>
      </MotionSection>
    );

    const section = screen.getByTestId("motion-section");
    expect(section).toContainElement(screen.getByText("Motion-safe content"));
    expect(section).toHaveAttribute("data-motion-mode", "static");
    expect(section).not.toHaveStyle({ opacity: "0" });
    expect(section.style.transform).toBe("");
  });

  it("renders animated mode without hidden initial styles", () => {
    useReducedMotionMock.mockReturnValue(false);

    render(
      <MotionSection>
        <p>Animated content</p>
      </MotionSection>
    );

    const section = screen.getByTestId("motion-section");
    expect(section).toContainElement(screen.getByText("Animated content"));
    expect(section).toHaveAttribute("data-motion-mode", "animated");
    expect(section).not.toHaveStyle({ opacity: "0" });
    expect(section.style.transform).not.toContain("translateY(10px)");
  });
});
