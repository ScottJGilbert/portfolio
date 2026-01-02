"use client";

import { useState, useEffect } from "react";
import { fetchPosts, fetchProjects } from "@/lib/db";
import { Post, Project } from "@/lib/definitions";
import Category from "../../ui/category";
import { AnimatedLink } from "@/app/ui/buffered-link";

export function Projects() {
  const [projects, setProjects] = useState([] as Project[]);
  useEffect(() => {
    async function fetchAndSet() {
      const fetchedProjects = await fetchProjects("", []);
      setProjects(fetchedProjects);
    }
    fetchAndSet();
  }, []);

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((item, index) => {
          // Show more items on desktop, fewer on mobile
          const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
          const maxItems = isMobile ? 2 : 3;
          if (index >= maxItems) return null;

          return (
            <div
              key={item.title + "item"}
              className="p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]"
            >
              <h3 className="mt-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {item.start_date.toDateString() +
                  " - " +
                  (item.end_date ? item.end_date.toDateString() : "Ongoing")}
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
              <AnimatedLink
                className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
                href={"/projects/" + item.slug}
              >
                Read More →
              </AnimatedLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Posts() {
  const [posts, setPosts] = useState([] as Post[]);
  useEffect(() => {
    async function fetchAndSet() {
      const fetchedPosts = await fetchPosts("", []);
      setPosts(fetchedPosts);
    }
    fetchAndSet();
  }, []);

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((item, index) => {
          // Show more items on desktop, fewer on mobile
          const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
          const maxItems = isMobile ? 2 : 3;
          if (index >= maxItems) return null;

          return (
            <div
              key={item.title + "item"}
              className="p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]"
            >
              <h3 className="mt-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {item.creation_date.toDateString()}
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
              <AnimatedLink
                className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
                href={"/blog/" + item.slug}
              >
                Read More →
              </AnimatedLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
