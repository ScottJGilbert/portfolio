"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchPostCategories, fetchProjectCategories } from "@/lib/db";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import Search from "../../ui/search";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
          {pathname === "/projects" ? <NewProjectButton /> : <NewPostButton />}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
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

function NewProjectButton() {
  const { data: session } = useSession();
  if (session?.user?.email !== "scott7gilbert@gmail.com") {
    return null;
  }
  return (
    <div className="m-auto z-0">
      <Link
        href="/projects/new"
        className="z-0 p-3 rounded-2xl bg-green-950 my-auto"
      >
        <span> + New</span>
      </Link>
    </div>
  );
}

function NewPostButton() {
  const { data: session } = useSession();
  if (session?.user?.email !== "scott7gilbert@gmail.com") {
    return null;
  }
  return (
    <div className="m-auto z-0">
      <Link
        href="/blog/new"
        className="z-0 p-3 rounded-2xl bg-green-950 my-auto"
      >
        <span> + New</span>
      </Link>
    </div>
  );
}
