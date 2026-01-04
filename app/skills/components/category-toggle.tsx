// components/CategoryToggle.tsx
"use client";

import { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/methods";
import clsx from "clsx";
import { Bounce } from "@/app/components/motion/transitions";
import { authClient } from "@/lib/auth-client";
import Button from "@/app/ui/button";
import Link from "next/link";

export default function CategoryToggle({
  categories,
  children,
}: {
  categories: string[];
  children: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const { data: session } = authClient.useSession();

  return (
    <div>
      <div className="flex justify-center gap-4 flex-wrap mx-auto mb-8">
        {categories.map((cat, index) => (
          <Bounce key={cat}>
            <button
              className={clsx(
                `"m-1 py-2 px-4 rounded-xl border-[var(--border)] border-1 text-black " ${
                  active === index
                    ? "bg-[var(--background-tertiary)] border-[var(--border)] dark:bg-gray-300"
                    : "bg-sky-100"
                }`
              )}
              onClick={() => setActive(index)}
            >
              {capitalizeFirstLetter(cat)}
            </button>
          </Bounce>
        ))}
        {session?.user?.admin === true && (
          <Bounce key={"allskills"}>
            <Link href="/skills/edit">
              <Button className="m-0 mx-0 my-0 py-2 px-4 rounded-xl border-[var(--border)] border-1">
                Edit Skills
              </Button>
            </Link>
          </Bounce>
        )}
      </div>

      <div>{children[active]}</div>
    </div>
  );
}
