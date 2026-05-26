import { TechStackElement } from "@/lib/tech-stack";

export default function TechStackComponent({
  element,
}: {
  element: TechStackElement;
}) {
  return (
    <span className="bg-gray-400 flex items-center rounded-md overflow-clip border">
      <span className="bg-gray-400 p-1">
        <element.icon
          className="text-accent text-sm mx-0.5"
          color={element.color}
        />
      </span>
      <span className="text-sm bg-surface-alt px-1 py-0.5">{element.name}</span>
    </span>
  );
}
