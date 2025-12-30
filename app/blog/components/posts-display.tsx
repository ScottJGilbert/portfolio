"use client";

import { fetchPostCategories } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Filter from "@/app/components/grid/filter";
import Grid from "@/app/components/grid/grid";
import type { GridItem, Post } from "@/lib/definitions";

export default function PostsDisplay() {
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<GridItem[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetchPostCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/fetch-posts?" + searchParams.toString());
      const posts = (await res.json()) as Post[];

      const itemsTemp: GridItem[] = posts.map((post: Post) => ({
        title: post.title,
        description: post.description,
        categories: post.categories,
        link: "/blog/" + post.slug,
        date_one: new Date(post.creation_date).toDateString(),
        date_two: "",
        image_url: post.image_url,
      }));

      setItems(itemsTemp);
    }
    fetchItems();
  }, [searchParams]);

  return (
    <Suspense>
      <Filter placeholder="Search blogs..." categories={categories} />
      <Grid items={items} />
    </Suspense>
  );
}
