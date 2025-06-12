import { Suspense } from "react";
import GridDisplay from "../ui/grid/grid-display";

export default function Page() {
  return (
    <div>
      <h1>Projects</h1>
      <hr className="mt-1 mb-3"></hr>
      <Suspense>
        <GridDisplay type="project" />
      </Suspense>
    </div>
  );
}
