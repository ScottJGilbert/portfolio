import { Suspense } from "react";
import ImageDisplay from "../components/images/image-display";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Images",
  robots: "noindex,nofollow",
};

export default function Page() {
  return (
    <div>
      <Suspense>
        <ImageDisplay />
      </Suspense>
    </div>
  );
}
