"use server";

import { MDXRemote } from "next-mdx-remote-client/rsc";
import { fetchProject, fetchPost } from "@/lib/db";
import { Project, Post, Item } from "@/lib/definitions";

export default async function MDXPage({
  type,
  slug,
}: {
  type: string;
  slug: string;
}) {
  const item: Item[] = [];
  let rawText: string = "";

  if (type === "project") {
    const [data, markdown] = await fetchProject(slug);
    const project = data as Project;
    const newItem: Item = {
      title: project.title,
      description: project.description,
      categories: project.categories,
      slug: project.slug,
      creation_date: "",
      edit_date: "",
      image_url: project.image_url,
    };
    item.push(newItem);
    rawText = markdown as string;
  } else if (type === "post") {
    const [data, markdown] = await fetchPost(slug);
    const post = data as Post;
    const newItem: Item = {
      title: post.title,
      description: post.description,
      categories: post.categories,
      slug: post.slug,
      creation_date: post.creation_date.toISOString(),
      edit_date: post.edit_date.toISOString(),
      image_url: post.image_url,
    };
    item.push(newItem);
    rawText = markdown as string;
  }

  return (
    <div>
      <div>
        <h1>{item[0].title}</h1>
        <div className="flex gap-2">
          <span>
            {item[0].creation_date === ""
              ? ""
              : "Date created: " + item[0].creation_date}
          </span>
          <span>
            {item[0].creation_date === ""
              ? ""
              : "Date edited: " + item[0].edit_date}
          </span>
        </div>
        <div className="flex gap-2">
          <>{item[0].categories.length === 0 ? "" : "Categories: "}</>
          {item[0].categories.map((category) => {
            return <span key={category + "category"}>{category}</span>;
          })}
          <span className="m-1"> </span>
        </div>
        <hr className="my-2"></hr>
      </div>
      <div className="space-y-4">
        <MDXRemote source={rawText} />
      </div>
    </div>
  );
}
