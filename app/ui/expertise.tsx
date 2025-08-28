import { Expertise } from "@/lib/definitions";
import Image from "next/image";

export default function ExpertiseBox({ area }: { area: Expertise }) {
  return (
    <span
      key={area.name + "area"}
      className="p-2 rounded-xl border-1 border-gray-50 inline-flex gap-2"
    >
      <Image
        src={area.image_url || "/icon.png"}
        height={20}
        width={20}
        alt={area.name}
        className="w-auto h-auto"
      ></Image>
      <p>{area.name}</p>
    </span>
  );
}
