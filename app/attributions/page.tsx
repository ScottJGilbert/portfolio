import { Metadata } from "next";
import { fetchAttributions } from "@/lib/db";
import Link from "next/link";
import Button from "../ui/button";

export const metadata: Metadata = {
  title: "Attributions",
  // description: "",
};

export const revalidate = 7200; // Revalidate every 2 hours

export default async function Page() {
  const attributions = await fetchAttributions();

  return (
    <div className="flex flex-col items-center min-h-screen mt-4 md:px-4">
      <div className="w-full bg-[var(--background-secondary)] rounded-3xl shadow-xl p-6 sm:p-10 border border-[var(--border-secondary)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Attributions
          </h1>
          <Link href="/attributions/edit">
            <Button>Edit</Button>
          </Link>
        </div>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-sm">
          <i>
            The use of any logo, trademark, or other branding on this website
            does not imply endorsement by its respective owner. I have done my
            best to comply with all U.S. fair use doctrines regarding use of
            copyrighted/tradmarked material. If you wish to submit a complaint
            regarding the use of a copyrighted/trademarked branding, please
            email me at{" "}
            <a
              href="mailto:scott7gilbert@gmail.com"
              target="_blank"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              scott7gilbert@gmail.com
            </a>
            .
          </i>
        </p>
        <div className="space-y-6">
          {attributions.map((attr) => (
            <div key={attr.name}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {attr.name}
                </span>
                {attr.url && (
                  <a
                    href={attr.url}
                    className="group text-blue-500 hover:text-blue-700 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attr.url}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="inline"
                    >
                      <path
                        d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0-7 7"
                        className="stroke-blue-500 group-hover:stroke-blue-700"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                {attr.description}
              </p>
              <hr className="mt-4 border-zinc-200 dark:border-zinc-700" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-zinc-500 text-center text-xs">
          ...and a &quot;little bit&quot; of help from Google, W3Schools, and
          ChatGPT.
        </p>
      </div>
    </div>
  );
}
