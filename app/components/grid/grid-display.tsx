"use client";

import Filter from "./filter";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Item } from "@/lib/definitions";
import Category from "@/app/ui/category";

export default function GridDisplay({ type }: { type: string }) {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchAndSet() {
      const itemsTemp: Item[] = [];
      if (type === "project") {
        const res = await fetch(
          "/api/fetch-projects?" + searchParams.toString()
        );
        const projects = await res.json();
        for (const project of projects) {
          const item: Item = {
            title: project.title,
            description: project.description,
            categories: project.categories,
            slug: project.slug,
            date_one: new Date(project.start_date).toDateString(),
            date_two:
              project.end_date === null
                ? "Ongoing"
                : new Date(project.end_date).toDateString(),
            image_url: project.image_url,
          };
          itemsTemp.push(item);
        }
      } else if (type === "blog") {
        const res = await fetch("/api/fetch-posts?" + searchParams.toString());
        const posts = await res.json();
        for (const post of posts) {
          console.log(post);
          const item: Item = {
            title: post.title,
            description: post.description,
            categories: post.categories,
            slug: post.slug,
            date_one: new Date(post.creation_date).toDateString(),
            date_two: new Date(post.edit_date).toDateString(),
            image_url: post.image_url,
          };
          itemsTemp.push(item);
        }
      }
      setItems(itemsTemp);
    }

    fetchAndSet();
    /* eslint-disable */
  }, [searchParams.toString()]);

  /*eslint-enable */

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
                  className="p-4 rounded-2xl bg-green-950 border-solid border-1 border-gray-50"
                >
                  <Image
                    src={
                      item.image_url === ""
                        ? "/profileIcon.svg"
                        : item.image_url
                    }
                    alt="new file"
                    height="144"
                    width="273"
                    className="rounded-2xl w-full h-auto"
                  ></Image>
                  <h3 className="mt-2">{item.title}</h3>
                  <p className="text-gray-400">
                    {item.date_one +
                      (type === "project" ? " - " + item.date_two : "")}
                  </p>
                  <div className="flex flex-wrap gap-2 my-2">
                    {item.categories.map((categoryString) => {
                      return (
                        <Category
                          key={categoryString + "category"}
                          area={categoryString}
                        />
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
