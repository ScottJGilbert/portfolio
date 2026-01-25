import { Skill } from "@/lib/definitions";
import Image from "next/image";

export default function SkillBox({
  area,
  className,
}: {
  area: Skill;
  className?: string;
}) {
  const url = area.image_url;

  return (
    <span
      key={area.name + "area"}
      className={
        "inline-flex rounded-xl border-1 border-[var(--border)] overflow-hidden max-w-[90vw] shrink-0 " +
        className
      }
      style={{ minWidth: 0 }}
    >
      {/* Constant color side */}
      {url && (
        <div
          className="flex items-center justify-center p-1 bg-zinc-600 border-r"
          style={{ minWidth: 40 }}
        >
          <Image
            src={url}
            alt={area.name}
            width={16}
            height={16}
            loading="lazy"
            className="w-4 h-4"
            unoptimized
          />
        </div>
      )}
      {/* Dynamic color side */}
      <div
        className="flex items-center px-2 py-1"
        style={{ background: "var(--background-secondary)" }}
      >
        <p className="truncate">{area.name}</p>
      </div>
    </span>
  );
}
