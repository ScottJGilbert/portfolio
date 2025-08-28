"use server";

import { MDXRemote } from "next-mdx-remote-client/rsc";
import { fetchProject, fetchPost } from "@/lib/db";
import { Project, Post, Item } from "@/lib/definitions";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import clsx from "clsx";

const components = {
  img: (props: ImageProps) => (
    <Image
      {...props}
      className="rounded-2xl"
      layout="responsive"
      width={props.width || 800}
      height={props.height || 600}
      alt={props.alt || ""}
    />
  ),
};

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
      date_one: new Date(project.start_date).toDateString(),
      date_two:
        project.end_date === null
          ? "Ongoing"
          : new Date(project.end_date).toDateString(),
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
      date_one: new Date(post.creation_date).toDateString(),
      date_two: new Date(post.edit_date).toDateString(),
      image_url: post.image_url,
    };
    item.push(newItem);
    rawText = markdown as string;
  }

  let href = "";
  let disabled = true;

  const session = await auth();
  if (session?.user?.email === "scott7gilbert@gmail.com") {
    href = "/new";
    disabled = false;
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1>{item[0].title}</h1>
          <div>
            <div className="flex gap-2">
              <span>
                {type === "project"
                  ? "Start Date: " + item[0].date_one
                  : item[0].date_one}
              </span>
              |
              <span>
                {type === "project"
                  ? item[0].date_two === "Ongoing"
                    ? "Ongoing"
                    : "Date Completed: " + item[0].date_two
                  : "Last Edited " + item[0].date_two}
              </span>
            </div>
            <div className="flex gap-2">
              <>{item[0].categories.length === 0 ? "" : "Categories: "}</>
              {item[0].categories.map((category) => {
                return <span key={category + "category"}>{category}</span>;
              })}
              <span className="m-1"> </span>
            </div>
          </div>
        </div>
        <div className="z-0 flex flex-col justify-center">
          <Link
            href={href}
            className={clsx("z-0 p-3 rounded-2xl bg-green-950 my-auto", {
              "brightness-50 hover:cursor-not-allowed": disabled === true,
            })}
          >
            <span>Edit</span>
          </Link>
        </div>
      </div>
      <hr className="my-2"></hr>
      <div className="space-y-4 [&>img]:w-full">
        <MDXRemote components={components} source={rawText} />
      </div>
    </div>
  );
}
