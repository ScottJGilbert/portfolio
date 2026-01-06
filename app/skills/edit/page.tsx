import EditExpertise from "../components/edit-expertise";
import { Suspense } from "react";

export const metadata = {
  title: "Edit Skills",
  description: "Edit skills in your expertise list.",
  robots: "noindex,nofollow",
};

export default function Page() {
  return (
    <div>
      <h1 className="mt-4">Edit Skills</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExpertise />
      </Suspense>
    </div>
  );
}
