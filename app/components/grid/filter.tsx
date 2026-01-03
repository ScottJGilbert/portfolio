"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import Search from "../../ui/search";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Bounce } from "../motion/transitions";
import Button from "@/app/ui/button";

export default function Filter({
  placeholder,
  categories,
}: {
  placeholder: string;
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

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
          {pathname === "/projects" && <NewProjectButton />}
          {pathname === "/blog" && <NewPostButton />}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => {
            const Icon = BsX;
            return (
              <Bounce key={category + "button"}>
                <button
                  className={clsx(
                    `"m-1 py-2 px-4 rounded-xl border-[var(--border)] border-1 text-black " ${
                      selected.includes(category)
                        ? "bg-[var(--background-tertiary)] border-[var(--border)] dark:bg-gray-300"
                        : "bg-sky-100"
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
              </Bounce>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}

function NewProjectButton() {
  const { data: session } = authClient.useSession();
  if (!session?.user?.admin) {
    return null;
  }
  return (
    <div className="m-auto z-0">
      <Link href="/projects/new">
        <Button className="z-0 p-3 rounded-2xl bg-[var(--background-secondary)] my-auto">
          <span> + New</span>
        </Button>
      </Link>
    </div>
  );
}

function NewPostButton() {
  const { data: session } = authClient.useSession();
  if (!session?.user?.admin) {
    return null;
  }
  return (
    <div className="m-auto z-0">
      <Link href="/blog/new">
        <Button className="z-0 p-3 rounded-2xl bg-[var(--background-secondary)] my-auto">
          <span> + New</span>
        </Button>
      </Link>
    </div>
  );
}
