import AllExperience from "./components/all-experience";
import { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Button from "../ui/button";

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
      "Activities and Societies: Marching Illini, Illini Solar Car, Project: Code UIUC, IEEE UIUC, Engineers without Borders, Campus Honors Program",
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center">Biography</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:space-between mb-8 gap-4">
            <Image
              src="/portrait.jpg"
              alt="portrait"
              height={375}
              width={300}
              className="rounded-2xl border-[var(--border)] border-1 w-full lg:w-auto h-auto"
            />
            <div className="[&>*]:mb-4 text-lg">
              <p>
                Hello! I&apos;m Scott, an undergraduate computer engineering
                student at the University of Illinois at Urbana-Champaign and a
                graduate of James B. Conant High School in Hoffman Estates,
                Illinois.
              </p>
              <p>
                I am a hard-working full-stack developer, problem-solver, and
                computer engineer who is dedicated to deploying information
                technology, computing, and electrical engineering solutions to
                both solve complex problems and make a difference in
                peoples&apos; lives.
              </p>
              <p>...I also REALLY like the color green.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 id="Experience" className="text-center">
          Professional Experience
        </h1>
        <AllExperience />
        {session?.user?.admin === true && (
          <div className="flex justify-center">
            <Link href="/about/edit">
              <Button>Edit Experience</Button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <h1 id="Education" className="text-center">
          Education
        </h1>
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
              <hr />
              <p className="mt-2">{school.description}</p>
              </div>

              <div className="w-full max-w-xs mx-auto lg:min-w-24 lg:mx-0 relative mb-4 md:mb-0 aspect-[4/1] lg:aspect-auto">
              <Image
                src={school.image_url}
                alt={school.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 150px"
              />
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
