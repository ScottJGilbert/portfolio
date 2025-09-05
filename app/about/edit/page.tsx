import EditAllExperience from "@/app/components/about/edit-all-experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Expertise",
  robots: "noindex,nofollow",
};

export const dynamic = "force-dynamic";

//Categories: Languages, frameworks, tools(?)
export default function Page() {
  return (
    <div>
      <EditAllExperience />
    </div>
  );
}
