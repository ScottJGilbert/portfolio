import { render, screen } from "@testing-library/react";
import { MotionSection } from "./MotionSection";

describe("MotionSection", () => {
  it("renders children inside a deterministic section test id", () => {
    render(
      <MotionSection>
        <p>Motion-safe content</p>
      </MotionSection>
    );

    const section = screen.getByTestId("motion-section");
    expect(section).toContainElement(screen.getByText("Motion-safe content"));
  });
});
