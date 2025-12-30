import { Suspense } from "react";
import ProjectsDisplay from "./components/projects-display";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A searchable collection of all of my projects.",
};

export default function Page() {
  return (
    <div className="mt-4">
      <h1 className="text-center">Projects</h1>
      <hr className="mt-1 mb-3"></hr>
      <Suspense>
        <ProjectsDisplay />
      </Suspense>
    </div>
  );
}
