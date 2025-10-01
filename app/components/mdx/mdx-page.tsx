import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { fetchProject, fetchPost } from "@/lib/db";
import { Project, Post, Item } from "@/lib/definitions";
import Link from "next/link";
import { auth } from "@/auth";
import clsx from "clsx";
import Category from "@/app/ui/category";
import { components } from "@/lib/mdx";
import MdxLink from "@/lib/mdx-link";
import SkillBox from "@/app/ui/skill-box";

export const revalidate = 600;

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
      skills: project.skills,
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

  let disabled = true;

  const session = await auth();
  if (session?.user?.email === "scott7gilbert@gmail.com") {
    disabled = false;
  }

  const mdxResult = await compileMDX({
    source: rawText,
    components: { ...components, a: MdxLink },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <div className="max-w-[calc(100vw-3rem)] md:max-w-6xl mt-4 mx-auto">
      <div className="flex justify-between">
        <div>
          <h1 className="mb-0">{item[0].title}</h1>
          <div>
            <div className="flex gap-2">
              <i>
                <span>
                  {type === "project"
                    ? "Start Date: " + item[0].date_one
                    : item[0].date_one}
                </span>
                {" | "}
                <span>
                  {type === "project"
                    ? item[0].date_two === "Ongoing"
                      ? "Ongoing"
                      : "Date Completed: " + item[0].date_two
                    : "Last Edited " + item[0].date_two}
                </span>
              </i>
            </div>
            <div className="mt-2 flex gap-2">
              {item[0].categories.map((category) => {
                return <Category key={category + "category"} area={category} />;
              })}
              <span className="m-1"> </span>
            </div>
            {item[0].skills && item[0].skills.length > 0 && (
              <div className="mt-4 flex gap-2 flex-wrap">
                {item[0].skills.map((skill) => {
                  return <SkillBox key={skill.name + "skill"} area={skill} />;
                })}
              </div>
            )}
          </div>
        </div>
        <div className="z-0 flex flex-col justify-center">
          <Link
            href={
              disabled
                ? ""
                : (type === "project" ? "/projects/" : "/blog/") +
                  slug +
                  "/edit"
            }
            className={clsx(
              "z-0 p-3 rounded-2xl bg-[var(--background-secondary)] my-auto",
              {
                "brightness-50 hover:cursor-not-allowed hidden":
                  disabled === true,
              }
            )}
          >
            <span>Edit</span>
          </Link>
        </div>
      </div>
      <hr className="my-2"></hr>
      <div className="max-w-full space-y-4 [&>*]:text-wrap">
        {mdxResult.content}
      </div>
    </div>
  );
}
