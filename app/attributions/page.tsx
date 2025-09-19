import { Metadata } from "next";
import { fetchAttributions } from "@/lib/db";

export const metadata: Metadata = {
  title: "Attributions",
  // description: "",
};

export const revalidate = 7200; // Revalidate every 2 hours

export default async function Page() {
  const attributions = await fetchAttributions();

  return (
    <div className="mt-4">
      <h1>Attributions</h1>
      <p className="mb-4">
        <i>
          The use of any logo, trademark, or other branding on this website does
          not imply endorsement by its respective owner. I have done my best to
          comply with all U.S. fair use doctrines regarding use of
          copyrighted/tradmarked material. If you wish to submit a complaint
          regarding the use of a copyrighted/trademarked branding, please email
          me at{" "}
          <a
            href="mailto:scott7gilbert@gmail.com"
            target="_blank"
            className="text-blue-400 hover:text-blue-600"
          >
            scott7gilbert@gmail.com
          </a>
          .
        </i>
      </p>
      {attributions.map((attr) => (
        <div key={attr.name} className="my-2">
          <span className="mr-2 font-bold">{attr.name}</span>
          <a href={attr.url} className="text-blue-400 hover:text-blue-600">
            {attr.url === "" ? "" : attr.url + " →"}
          </a>
          <p>{attr.description}</p>
          <hr className="mt-2"></hr>
        </div>
      ))}
      <p className="my-2">
        ...and a &quot;little bit&quot; of help from Google, W3Schools, and
        ChatGPT.
      </p>
    </div>
  );
}
