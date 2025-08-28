"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NewButton from "../../ui/new-button";
import { fetchPostCategories, fetchProjectCategories } from "@/lib/db";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import Search from "../../ui/search";

export default function Filter({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [categories, setCategories] = useState([] as string[]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      if (placeholder === "Search projects...") {
        setCategories(await fetchProjectCategories());
      } else if (placeholder === "Search blogs...") {
        setCategories(await fetchPostCategories());
      }
    }
    fetchCategories();
  }, [searchParams, placeholder]);

  const toggleCategory = (category: string) => {
    const updated = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];

    setSelected(updated);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Handle category filters
    if (selected.length > 0) {
      params.set("categories", selected.join(",")); // comma-separated
    } else {
      params.delete("categories");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [selected, pathname, searchParams, replace]);

  return (
    <div>
      <Suspense>
        <div className="flex justify-between gap-4">
          <Suspense>
            <Search placeholder={placeholder} />
          </Suspense>
          <NewButton />
        </div>
        <div className="flex gap-2 mt-4">
          {categories.map((category) => {
            const Icon = BsX;
            return (
              <button
                key={category + "button"}
                className={clsx(
                  `"m-1 py-2 px-4 rounded-xl " ${
                    selected.includes(category)
                      ? "bg-green-950 text-white"
                      : "bg-sky-100 text-black"
                  }`
                )}
                onClick={() => {
                  toggleCategory(category);
                }}
              >
                {category}
                <Icon
                  className={`${
                    selected.includes(category)
                      ? "inline ml-1 -translate-y-[1px]"
                      : "hidden"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
