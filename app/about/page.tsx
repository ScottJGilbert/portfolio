import Awards from "../components/about/awards";
import AllExperience from "../components/about/all-experience";
import { Metadata } from "next";
import Biography from "../components/about/biography";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  // description: "",
};

const schools = [
  {
    name: "University of Illinois at Urbana-Champaign",
    degree: "B.S. Computer Engineering",
    image_url:
      "https://brand.illinois.edu/wp-content/uploads/2025/02/Illinois_logo_fullcolor_%C2%AE_rgb.png",
    description:
      "Activities and Societies: Marching Illini, Illini Solar Car, IEEE UIUC, Campus Honors Program",
  },
  {
    name: "James B. Conant High School",
    degree: "High School Diploma",
    date: "Graduated: May 2025",
    image_url:
      "https://m9mv2a6pya.ufs.sh/f/W9HqZMlcXCSf1W9N8trkmsAYKxlIyvuFWoMT6qCJLZbre4Qd",
    description:
      "Academic Scholar, GPA: 4.911./4.00 (Weighted), 4.00/4.00 (Unweighted)",
  },
];

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
        <h1>Education</h1>
        <div>
          {schools.map((school) => (
            <div
              key={school.name}
              className="mb-8 p-4 border-[var(--border)] border-1 bg-[var(--background-secondary)] rounded-3xl flex flex-col justify-between lg:flex-row gap-8"
            >
              <div>
                <h2>{school.name}</h2>
                <p className="my-2">
                  <i>
                    {school.degree + (school.date ? " | " + school.date : "")}
                  </i>
                </p>
                <hr></hr>
                <p className="mt-2">{school.description}</p>
              </div>

              <div className="min-w-24 relative mb-4 md:mb-0">
                <Image
                  src={school.image_url}
                  alt={school.name}
                  layout="fill"
                  className="relative h-24 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Awards</h1>
        <Awards />
      </div>
    </div>
  );
}
