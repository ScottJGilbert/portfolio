"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { fetchPosts, fetchProjects } from "@/lib/db";
import { Item } from "@/lib/definitions";
import Image from "next/image";
import Category from "./ui/category";
import { motion } from "motion/react";
import { FadeUp } from "./components/motion/transitions";

const Expertise = dynamic(() => import("./components/expertise"), {
  ssr: false,
});

const strings = [
  "a trombone player",
  "a full-stack developer",
  "a cross-country runner",
  "an avid volunteer",
  "a Minecraft gamer",
  "a tinkerer",
];

const places = [
  {
    name: "University of Illinois at Urbana-Champaign",
    imageUrl:
      "https://brand.illinois.edu/wp-content/uploads/2025/02/Illinois_logo_fullcolor_%C2%AE_rgb.png",
    width: 284,
    height: 350,
  },
  {
    name: "Scouting America",
    imageUrl:
      "https://www.scouting.org/wp-content/uploads/2023/05/BSA_Logo.png",
    width: 220,
    height: 220,
  },
];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentString = strings[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <FadeUp>
            <div className="md:min-h-screen flex flex-col items-center justify-center">
              <div className="">
                <p className="text-4xl md:text-8xl text-center">
                  Hi, I&apos;m{" "}
                  <b className="block md:inline text-8xl bg-linear-to-b from-zinc-700 via-zinc-800 to-black bg-clip-text tracking-wide text-transparent dark:from-zinc-400 dark:via-zinc-200 dark:to-zinc-50">
                    Scott Gilbert
                  </b>
                </p>
                <h2 className="block text-3xl md:text-4xl text-center mt-4">
                  <span className="flex h-20 items-baseline justify-center md:block md:h-auto">
                    I&apos;m {currentString}
                  </span>{" "}
                  and computer engineer ready to make tomorrow <i>just</i> a
                  little brighter.
                </h2>
              </div>
              <motion.span
                initial={{ scale: 1 }} // Initial state
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Scale down on tap/click
                transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation settings
              >
                <Link
                  href="#expertise"
                  className="m-8 group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/30 bg-black/20 py-[3px] pr-[3px] pl-2 text-base font-medium opacity-85 backdrop-blur-xs transition-all hover:bg-transparent md:py-1 md:pr-1 md:pl-3 dark:border-white/10 dark:bg-white"
                >
                  <span className="z-10 px-3 text-black transition-colors duration-300 group-hover:text-white dark:text-black dark:group-hover:text-white">
                    Learn More
                  </span>
                  <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10"></span>
                  <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2 transition-colors duration-300 md:p-2.5 dark:bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0 dark:text-black"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="rotate-90 absolute -translate-x-5 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </motion.span>
            </div>
          </FadeUp>
        </div>
      </div>
      <div className="text-center mb-16">
        <h1 id="expertise">Expertise Across Fields</h1>
        <p className="pb-4">
          Well-versed in a wide range of tools used in Computer Engineering,
          Electrical Engineering, Computer Science, and everything in between.
        </p>
        <Expertise />
      </div>
      <div className="py-4 min-h-full">
        <h1>Experience That Matters</h1>
        <p className="pb-4">
          Prepared for the toughest challenges with a depth of skills learned in
          industry, in academia, and in the not-for-profit sector.
        </p>
        <div className="inline-flex md:flex-row flex-col basis-0 gap-4">
          {places.map((place) => {
            return (
              <div
                className="inline-flex gap-4 relative p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]"
                key={place.name}
              >
                <div className="inline-flex flex-col justify-center">
                  <Image
                    src={place.imageUrl}
                    className="inline object-contain max-h-20"
                    alt={place.name}
                    height={place.height}
                    width={place.width}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-center">
                  <h3>{place.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4">
          <Link href="/about" className="hover:text-gray-400">
            See everywhere I&apos;ve been →
          </Link>
        </div>
      </div>
      <div className="py-4">
        <h2>Curated Projects</h2> {/* Link to header for experience */}
        <Suspense fallback={<div>Loading projects...</div>}>
          <Projects />
        </Suspense>
        <div className="pt-4">
          <Link href="/projects" className="hover:text-gray-400">
            See More →
          </Link>
        </div>
      </div>
      <div className="py-4">
        <h2>Recent Blog Posts</h2> {/* Link to header for experience */}
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <Posts />
        </Suspense>
        <div className="pt-4">
          <Link href="/blog" className="hover:text-gray-400">
            See All →
          </Link>
        </div>
      </div>
      {/* <div className="py-4">
        <h1>Testimonials</h1>
        <References />
      </div> */}
    </div>
  );
}

function Projects() {
  const [items, setItems] = useState([] as Item[]);
  useEffect(() => {
    async function fetchAndSet() {
      const projects = await fetchProjects("", []);
      setItems(
        projects.map((project) => {
          return {
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
        })
      );
    }
    fetchAndSet();
  }, []);

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
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
                {item.date_one + " - " + item.date_two}
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
                className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
                href={"/projects/" + item.slug}
              >
                Read More →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Posts() {
  const [items, setItems] = useState([] as Item[]);
  useEffect(() => {
    async function fetchAndSet() {
      const posts = await fetchPosts("", []);
      setItems(
        posts.map((post) => {
          return {
            title: post.title,
            description: post.description,
            categories: post.categories,
            slug: post.slug,
            date_one: new Date(post.creation_date).toDateString(),
            date_two: new Date(post.edit_date).toDateString(),
            image_url: post.image_url,
          };
        })
      );
    }
    fetchAndSet();
  }, []);

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
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
              <Link
                className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
                href={"/blog/" + item.slug}
              >
                Read More →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
