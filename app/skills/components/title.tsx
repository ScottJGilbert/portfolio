import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";

export default function Title({ group }: { group: SkillGroup }) {
  const url = group.parent.image_url;

  return (
    <div className="mb-4 flex gap-4 items-center">
      <span
        className="relative flex-shrink-0 w-12 h-12"
        style={{ minWidth: 48, minHeight: 48 }}
      >
        {url && (
          <Image
            src={url}
            alt={group.parent.name}
            width={48}
            height={48}
            loading="lazy"
            className="w-12 h-12 bg-zinc-600 p-2 rounded-lg object-cover"
            style={{ objectFit: "cover" }}
          />
        )}
      </span>
      <h2>{capitalizeFirstLetter(group.parent.name)}</h2>
    </div>
  );
}
