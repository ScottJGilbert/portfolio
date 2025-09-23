import EditExpertise from "../../components/edit-expertise";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h1 className="mt-4">Edit Homepage</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExpertise />
      </Suspense>
    </div>
  );
}
