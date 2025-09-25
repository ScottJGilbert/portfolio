// components/CategoryToggle.tsx
"use client";

import { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/methods";
import clsx from "clsx";
import { Bounce } from "@/app/components/motion/transitions";

export default function CategoryToggle({
  categories,
  children,
}: {
  categories: string[];
  children: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex justify-between flex-wrap max-w-32 mb-4">
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
      </div>

      <div>{children[active]}</div>
    </div>
  );
}
