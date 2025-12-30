"use client";

import { fetchProjectCategories } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Filter from "@/app/components/grid/filter";
import Grid from "@/app/components/grid/grid";
import type { GridItem, Project } from "@/lib/definitions";

export default function ProjectsDisplay() {
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<GridItem[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetchProjectCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(
        "/api/items/fetch-projects?" + searchParams.toString()
      );
      const projects = (await res.json()) as Project[];

      const itemsTemp: GridItem[] = projects.map((project: Project) => ({
        title: project.title,
        description: project.description,
        categories: project.categories,
        link: "/projects/" + project.slug,
        date_one: new Date(project.start_date).toDateString(),
        date_two:
          " - " +
          (project.end_date
            ? new Date(project.end_date).toDateString()
            : "Ongoing"),
        image_url: project.image_url,
      }));

      setItems(itemsTemp);
    }
    fetchItems();
  }, [searchParams]);

  return (
    <Suspense>
      <Filter placeholder="Search projects..." categories={categories} />
      <Grid items={items} />
    </Suspense>
  );
}
