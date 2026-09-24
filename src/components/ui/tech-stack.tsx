import { TechStackElement } from "@/lib/tech-stack";

export default function TechStackComponent({
  element,
}: {
  element: TechStackElement;
}) {
  return (
    <span className="bg-surface-alt flex items-center rounded-md overflow-clip border border-outline-ghost">
      <span className="bg-surface p-1">
        <element.icon
          className="text-accent text-sm mx-0.5"
          color={element.color}
          aria-hidden="true"
        />
      </span>
      <span className="text-sm bg-surface-alt px-1 py-0.5">{element.name}</span>
    </span>
  );
}
