import { Expertise } from "@/lib/definitions";
import Image from "next/image";

export default function ExpertiseBox({ area }: { area: Expertise }) {
  return (
    <span
      key={area.name + "area"}
      className="p-2 rounded-xl border-1 border-gray-50 inline-flex justify-between gap-4"
    >
      <Image
        src={area.image_url || "/profileIcon.svg"}
        alt={area.name}
        width={16}
        height={16}
        className=""
      ></Image>
      <p>{area.name}</p>
    </span>
  );
}
