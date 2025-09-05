import Awards from "../components/about/awards";
import AllExperience from "../components/about/all-experience";
import { Metadata } from "next";
import Biography from "../components/about/biography";

export const metadata: Metadata = {
  title: "About",
  // description: "",
};

export const revalidate = 600; // Revalidate every ten minutes - MAKE SURE TO REPLACE THIS WITH 600 LATER

export default async function Page() {
  return (
    <div>
      <div className="mt-4">
        <h1>Biography</h1>
        <Biography />
      </div>
      <div>
        <h1>Professional Experience</h1>
        <AllExperience />
      </div>
      <div>
        <h1>Awards</h1>
        <Awards />
      </div>
    </div>
  );
}
