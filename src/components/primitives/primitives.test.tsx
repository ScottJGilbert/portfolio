import { render, screen } from "@testing-library/react";
import { BentoCard } from "./BentoCard";
import { Button } from "./Button";
import { EditorialListItem } from "./EditorialListItem";
import { MetaRow } from "./MetaRow";
import { SocialLinkChip } from "./SocialLinkChip";
import { StatPill } from "./StatPill";
import { TagChip } from "./TagChip";
import { TimelineItem } from "./TimelineItem";

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

  it("supports bento variant styles and timeline primitive", () => {
    render(
      <>
        <BentoCard title="Metric card" variant="metric">
          42
        </BentoCard>
        <BentoCard title="Quote card" variant="quote">
          Clarity compounds.
        </BentoCard>
        <TimelineItem title="Milestone" detail="Shipped v1" year="2026" />
        <MetaRow
          category="Engineering Notes"
          date="2026-04-01"
          readingTime="6 min"
          impact="High"
          platform="Web"
        />
        <EditorialListItem
          title="Case Study"
          summary="Structured delivery under tight constraints."
          date="2026"
          category="Project"
          variant="project"
          readingTime="8 min"
        />
        <StatPill label="Systems shipped" value="20+" />
        <SocialLinkChip href="https://example.com" label="GitHub" sublabel="@scott" />
      </>
    );

    expect(
      screen.getByRole("heading", { name: "Metric card" }).closest("article")
    ).toHaveClass("bg-[var(--surface-low)]");
    expect(
      screen.getByRole("heading", { name: "Quote card" }).closest("article")
    ).toHaveClass("bg-[var(--accent)]");
    expect(screen.getByText("Milestone")).toBeInTheDocument();
    expect(
      screen.getByText("Engineering Notes · 2026-04-01 · 6 min · High · Web")
    ).toBeInTheDocument();
    expect(screen.getByText("Project · 2026 · 8 min")).toBeInTheDocument();
    expect(screen.getByText("Systems shipped")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });
});
