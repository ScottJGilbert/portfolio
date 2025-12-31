import MDXPage from "@/app/components/mdx/mdx-page";
import {
  fetchProjectSlugs,
  fetchProject,
  fetchItem,
  fetchReleases,
} from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import Category from "@/app/ui/category";
import Link from "next/link";
import clsx from "clsx";
import { auth } from "@/lib/auth";
import SkillBox from "@/app/ui/skill-box";
import { Dropdown } from "../components/dropdown";
import { Skill } from "@/lib/definitions";
import { ReleaseButton } from "../components/button";
import { headers } from "next/headers";
import CommentSection from "@/app/components/comments/comment-section";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await fetchProject(slug);
  if (!data) {
    return {
      title: "Project Not Found",
      description: "",
    };
  }
  return {
    title: data.title ?? "",
    description: data.description ?? "",
  };
}

export const revalidate = 600; // Revalidate every ten minutes - MAKE SURE TO REPLACE THIS WITH 600 LATER
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchProjectSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const project_data = await fetchProject(slug);

  if (!project_data) {
    notFound();
  }

  const project_item = await fetchItem(project_data.item_id);

  if (!project_item) {
    notFound();
  }

  const releases = await fetchReleases(project_data.slug);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const disabled = !session || !session?.user?.admin;

  return (
    <div>
      <Suspense>
        <div className="max-w-[calc(100vw-3rem)] md:max-w-6xl mt-4 mx-auto">
          <div className="flex justify-between">
            <div>
              <h1 className="mb-0">{project_data.title}</h1>
              <div>
                <div className="flex gap-2">
                  <i>
                    <span>
                      {"Start Date: " + project_data.start_date.toDateString()}
                    </span>
                    {" | "}
                    <span>
                      {project_data.end_date === null
                        ? "Ongoing"
                        : "Date Completed: " +
                          project_data.end_date.toDateString()}
                    </span>
                  </i>
                </div>
                <div className="mt-2 flex gap-2">
                  {project_data.categories.map((category) => {
                    return (
                      <Category key={category + "category"} area={category} />
                    );
                  })}
                  <span className="m-1"> </span>
                </div>
                {/* Dropdown for skills */}
                <div className="mt-4">
                  <Dropdown title="Relevant Skills">
                    {project_data.skills && project_data.skills.length > 0 && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {project_data.skills.map((skill) => {
                          return (
                            <SkillBox
                              key={
                                typeof skill === "string"
                                  ? skill + "skill"
                                  : skill.name + "skill"
                              }
                              area={skill as Skill}
                            />
                          );
                        })}
                      </div>
                    )}
                  </Dropdown>
                </div>
                {/* Dropdown for releases */}
                {releases.length > 0 && (
                  <Dropdown title="Releases">
                    <div className="mt-2 space-y-2 flex">
                      {releases.map((release) => (
                        <div key={release.key} className="pb-2">
                          <div className="flex gap-3">
                            <span>
                              <h3 className="font-semibold">
                                {release.version}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(release.release_date).toDateString()}
                              </p>
                            </span>
                            {release.url && (
                              <ReleaseButton
                                url={release.url}
                                text={release.text}
                                external={release.external}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                )}
              </div>
            </div>
            <div className="z-0 flex flex-col justify-center">
              <Link
                href={disabled ? "" : "/projects/" + slug + "/edit"}
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
          <MDXPage markdown={project_item.markdown} />
        </div>
        <hr className="my-6"></hr>
        <div>
          <CommentSection item_id={project_data.item_id} user={session?.user} />
        </div>
      </Suspense>
    </div>
  );
}
