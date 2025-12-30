import { Suspense } from "react";
import { Metadata } from "next";
import PostsDisplay from "./components/posts-display";

export const metadata: Metadata = {
  title: "Blog",
  description: "A searchable collection of all of my blog posts.",
};

export default async function Page() {
  return (
    <div className="mt-4">
      <h1 className="text-center">Blog</h1>
      <hr className="mt-1 mb-3"></hr>
      <Suspense>
        <PostsDisplay />
      </Suspense>
    </div>
  );
}
