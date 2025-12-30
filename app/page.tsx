"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { fetchPosts, fetchProjects } from "@/lib/db";
import { Post, Project } from "@/lib/definitions";
import Image from "next/image";
import Category from "./ui/category";
import { motion } from "motion/react";
import { FadeUp } from "./components/motion/transitions";
import { RotateWords } from "./ui/rotate-words";
import Expertise from "./components/expertise";
import Button from "./ui/button";

//Make these look different

/* Make each section (especially the first one) look different from everything else */

const strings = [
  "I'm a trombone player",
  "I'm a full-stack developer",
  "I'm a cross-country runner",
  "I'm an avid volunteer",
  "I'm a Minecraft gamer",
  "I'm a tinkerer",
];

export default function Page() {
  return (
    <div>
      <div>
        <div className="flex flex-col">
          <FadeUp>
            <div className="md:min-h-screen min-h-[calc(100vh-7.5rem)] flex flex-col items-center justify-center gap-4 md:gap-0">
              <div className="">
                <p className="text-4xl md:text-8xl text-center">
                  Hi, I&apos;m{" "}
                  <b className="block text-7xl md:inline md:text-8xl bg-linear-to-b from-zinc-700 via-zinc-800 to-black bg-clip-text tracking-wide text-transparent dark:from-zinc-400 dark:via-zinc-200 dark:to-zinc-50">
                    Scott Gilbert
                  </b>
                </p>
                <h2 className="block text-3xl md:text-4xl text-center mt-4">
                  <RotateWords
                    text={""}
                    words={strings}
                    className="h-16 md:h-auto"
                  />
                  and computer engineer trying to help make tomorrow a little
                  brighter.
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
      <div className="text-center relative md:min-h-screen min-h-[calc(100vh-7.5rem)] max-w-screen md:max-w-[calc(100vw-10.5rem)] overflow-hidden">
        <h1>Experience That Matters</h1>
        <p className="pb-4">
          Prepared for the toughest challenges with a depth of skills learned in
          industry, in academia, and more.
        </p>
        <div>
          <div>
            <div className="py-4 h-full text-center mb-8 bg-[var(--background-secondary)] rounded-4xl border-[var(--border)] border-1">
              <h2 id="expertise" className="mb-4">
                Expertise Across Fields
              </h2>
              <div className="relative overflow-hidden">
                <Expertise />
              </div>
              <Link href="/skills" className="mt-4 block">
                <Button>See all →</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-stretch gap-4">
            <div className="grow h-full relative p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]">
              <div>
                <h4>I&apos;m a student at...</h4>
                <div className="my-4 flex justify-center">
                  <Image
                    src="https://brand.illinois.edu/wp-content/uploads/2025/02/Illinois_logo_fullcolor_%C2%AE_rgb.png"
                    className="inline object-contain max-h-20"
                    alt="UIUC Logo"
                    height={284}
                    width={350}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-center">
                  <h3>The University of Illinois</h3>
                  <h4>B.S, Computer Engineering</h4>
                </div>
                <Link
                  href="/about#Education"
                  className="block hover:text-gray-500 mt-2"
                >
                  See all education →
                </Link>
              </div>
            </div>
            <div className="grow h-full relative p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]">
              <div>
                <h4>I&apos;m working as a...</h4>
                <div className="my-4 flex justify-center">
                  <Image
                    src="https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSfUPiKdP2OkrGivuB5YZznLWoy4qtmIjDpwAEl"
                    className="inline object-contain max-h-20"
                    alt="Illini Solar Car Logo"
                    height={284}
                    width={350}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-center">
                  <h3>Electrical Team Member</h3>
                  <h4>Illini Solar Car</h4>
                </div>
                <Link
                  href="/about#Experience"
                  className="block hover:text-gray-500 mt-2"
                >
                  See everywhere I&apos;ve been →
                </Link>
              </div>
            </div>
            <div className="grow h-full relative p-4 rounded-2xl bg-[var(--background-secondary)] border-solid border-1 border-[var(--border)]">
              <div>
                <h4>I&apos;m working on...</h4>
                <div className="my-4 flex justify-center">
                  <Image
                    src="/profileIcon.svg"
                    className="inline object-contain max-h-20"
                    alt="Profile Icon"
                    height={284}
                    width={350}
                  />
                </div>
                <div className="flex-1 inline-flex flex-col justify-center">
                  <h3>My Personal Portfolio</h3>
                  <h4>You&apos;re on it right now!</h4>
                </div>
                <Link
                  href="/projects"
                  className="block hover:text-gray-500 mt-2"
                >
                  See all of my projects →
                </Link>
              </div>
            </div>
          </div>
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
