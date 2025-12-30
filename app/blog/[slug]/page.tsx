import MDXPage from "@/app/components/mdx/mdx-page";
import { fetchPostSlugs, fetchPost, fetchItem } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import Category from "@/app/ui/category";
import Link from "next/dist/client/link";
import { clsx } from "clsx";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/app/components/comments/comment-section";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await fetchPost(slug);

  if (!data) {
    return {
      title: "Post Not Found",
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
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const slugs = await fetchPostSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const post_data = await fetchPost(slug);
  if (!post_data) {
    notFound();
  }

  const post_item = await fetchItem(post_data?.item_id);

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
              <h1 className="mb-0">{post_data.title}</h1>
              <div>
                <div className="flex gap-2">
                  <i>
                    <span>
                      {"Last Edited " + post_data.edit_date.toDateString()}
                    </span>
                  </i>
                </div>
                <div className="mt-2 flex gap-2">
                  {post_data.categories.map((category) => {
                    return (
                      <Category key={category + "category"} area={category} />
                    );
                  })}
                  <span className="m-1"> </span>
                </div>
              </div>
            </div>
            <div className="z-0 flex flex-col justify-center">
              <Link
                href={disabled ? "" : "/blog/" + slug + "/edit"}
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
          <MDXPage markdown={post_item?.markdown ?? ""} />
        </div>
        <hr className="my-6"></hr>
        <div>
          <CommentSection item_id={post_data.item_id} user={session?.user} />
        </div>
      </Suspense>
    </div>
  );
}
