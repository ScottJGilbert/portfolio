"use client";

import Filter from "./filter";
import Link from "next/link";
import Image from "next/image";
import { fetchProjects, fetchPosts } from "@/lib/db";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Item } from "@/lib/definitions";

export default function GridDisplay({ type }: { type: string }) {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const categoryString = searchParams.get("categories") || "";
  const selectedCategories = categoryString.split(",").filter(Boolean);

  useEffect(() => {
    async function fetchAndSetProjects() {
      const itemsTemp: Item[] = [];
      if (type === "project") {
        const projects = await fetchProjects(query, selectedCategories);
        for (const project of projects) {
          const item: Item = {
            title: project.title,
            description: project.description,
            categories: project.categories,
            slug: project.slug,
            creation_date: "",
            edit_date: "",
            image_url: project.image_url,
          };
          itemsTemp.push(item);
        }
      } else if (type === "blog") {
        const posts = await fetchPosts(query, selectedCategories);
        for (const post of posts) {
          const item: Item = {
            title: post.title,
            description: post.description,
            categories: post.categories,
            slug: post.slug,
            creation_date: post.creation_date.toISOString(),
            edit_date: post.edit_date.toISOString(),
            image_url: post.image_url,
          };
          itemsTemp.push(item);
        }
      }
      setItems(itemsTemp);
    }

    fetchAndSetProjects();
  }, [searchParams]);

  return (
    <div>
      <div>
        <Filter placeholder={"Search " + type + "s..."} />
        <Suspense>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              return (
                <div
                  key={item.title + "item"}
                  className="p-4 rounded-2xl bg-slate-800 border-solid border-1 border-gray-50"
                >
                  <Image
                    src={item.image_url === "" ? "/icon.png" : item.image_url}
                    alt="new file"
                    height="144"
                    width="273"
                    className="rounded-2xl w-full"
                  ></Image>
                  <h2 className="my-2">{item.title}</h2>
                  <div>
                    <span>Categories: </span>
                    {item.categories.map((categoryString) => {
                      return (
                        <span
                          key={categoryString + "category"}
                          className="mx-1 text-gray-500"
                        >
                          {categoryString}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mb-2">{item.description}</p>
                  <Link
                    className="text-blue-300 hover:text-blue-400"
                    href={pathname + "/" + item.slug}
                  >
                    Read More →
                  </Link>
                </div>
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
