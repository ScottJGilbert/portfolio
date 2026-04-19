import { render, screen } from "@testing-library/react";
import { BentoCard } from "./BentoCard";
import { Button } from "./Button";
import { TagChip } from "./TagChip";

describe("primitives", () => {
  it("renders variant classes and semantics", () => {
    render(
      <>
        <Button variant="primary">Action</Button>
        <BentoCard title="Card title">Body</BentoCard>
        <TagChip>Rust</TagChip>
      </>
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Card title" })).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
  });
});
