import { Suspense } from "react";
import GridDisplay from "../components/grid/grid-display";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  // description: "",
};

export default function Page() {
  return (
    <div className="mt-4">
      <h1 className="text-center">Blog</h1>
      <hr className="mt-1 mb-3"></hr>
      <Suspense>
        <GridDisplay type="blog" />
      </Suspense>
    </div>
  );
}
