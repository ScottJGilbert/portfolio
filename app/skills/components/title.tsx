import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/methods";
import { SkillGroup } from "@/lib/definitions";

export default function Title({ group }: { group: SkillGroup }) {
  const url = group.parent.image_url;

  return (
    <>
      <span className="relative h-full w-auto">
        {url && (
          <Image
            src={url}
            alt={group.parent.name}
            width={16}
            height={16}
            loading="lazy"
            className="w-12 h-12 bg-zinc-600 p-2 rounded-lg"
          />
        )}
      </span>
      <h2>{capitalizeFirstLetter(group.parent.name)}</h2>
    </>
  );
}
