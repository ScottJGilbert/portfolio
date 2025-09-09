"use client";

import Filter from "./filter";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Item } from "@/lib/definitions";
import Category from "@/app/ui/category";
import { motion } from "motion/react";
import BufferedLink from "@/app/ui/buffered-link";
import { usePageLoading } from "@/providers/loading-provider";

export default function GridDisplay({ type }: { type: string }) {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const searchParams = useSearchParams();

  const { setIsLoading } = usePageLoading();

  useEffect(() => {
    async function fetchAndSet() {
      setItems([]);
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
            {items.map((item, index) => {
              return (
                <motion.div
                  key={item.title + "item"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.75,
                    delay: index * 0.2,
                  }}
                  className="p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]"
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
                  <p className="text-gray-700 dark:text-gray-400">
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
                  <BufferedLink
                    doOnClick={() => {
                      setIsLoading(true);
                    }}
                    className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
                    href={pathname + "/" + item.slug}
                  >
                    Read More →
                  </BufferedLink>
                </motion.div>
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
