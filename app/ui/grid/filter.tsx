"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import NewButton from "./new-button";
import { fetchPostCategories, fetchProjectCategories } from "@/lib/db";
import clsx from "clsx";
import { BsX } from "react-icons/bs";

export default function Filter({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState("");
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
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    const updated = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];

    setSelected(updated);

    handleSearch(inputValue, updated);
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setInputValue(query);
  }, [searchParams]);

  const handleSearch = useDebouncedCallback(
    (term: string, categories: string[]) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      // Handle category filters
      if (categories.length > 0) {
        params.set("categories", categories.join(",")); // comma-separated
      } else {
        params.delete("categories");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-1 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleSearch(e.target.value, selected);
            }}
            value={inputValue}
            id="search"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
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
                    ? "bg-slate-800 text-white"
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
    </div>
  );
}
