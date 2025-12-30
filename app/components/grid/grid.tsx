"use client";

import { GridItem } from "@/lib/definitions";
import { motion } from "motion/react";
import Image from "next/image";
import Category from "@/app/ui/category";
import BufferedLink from "@/app/ui/buffered-link";
import { usePageLoading } from "@/app/providers/loading-provider";

export default function Grid({ items }: { items: GridItem[] }) {
  const { setIsLoading } = usePageLoading();

  return (
    <div>
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
                  item.image_url === "" ? "/profileIcon.svg" : item.image_url
                }
                alt="new file"
                height="144"
                width="273"
                className="rounded-2xl w-full h-auto"
              />
              <h3 className="mt-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {item.date_one}
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
                href={item.link}
              >
                Read More →
              </BufferedLink>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
