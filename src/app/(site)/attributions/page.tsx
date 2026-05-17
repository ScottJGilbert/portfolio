import { Metadata } from "next";

type AttributionBlock =
  | {
      type: "intro";
      paragraphs: string[];
      email?: string;
    }
  | {
      type: "section";
      title: string;
      url?: string;
      description: string;
    }
  | {
      type: "footer";
      text: string;
    };

const attributionBlocks: AttributionBlock[] = [
  {
    type: "intro",
    paragraphs: [
      "The use of any logo, trademark, or other branding on this website does not imply endorsement by its respective owner. I have done my best to comply with all U.S. fair use doctrines regarding use of copyrighted/trademarked material. If you wish to submit a complaint regarding the use of a copyrighted/trademarked branding, please email me at",
    ],
    email: "hello@scottgilbert.dev",
  },
  {
    type: "section",
    title: "Icons",
    url: "https://simpleicons.org",
    description:
      "Most expertise icons have been fetched via either the Simple Icon CDN or through the React Icons library. All trademarks, brands, logos, and otherwise are property of their respective owners. If more detailed attributions are required for any logos, they are listed below.",
  },
  {
    type: "section",
    title: "Vercel/Next.js",
    description:
      "This website is built with Next.js and is hosted on the Vercel platform. Vercel, the Vercel design, Next.js and related marks, designs and logos are trademarks or registered trademarks of Vercel, Inc. or its affiliates in the US and other countries.",
  },
  // {
  //   type: "section",
  //   title: "Java",
  //   description:
  //     "Java is a licensed trademark of the Oracle Corporation. The Duke Java mascot is used under BSD license and has been modified to fit the necessary aspect ratio for this site. Copyright © Oracle Corporation.",
  // },
  {
    type: "section",
    title: "Marching Illini",
    description:
      "Any overhead formation photos of the band (i.e. photos of pregame, halftime, and the Three-In-One as seen from the press box) have been taken from official Marching Illini social media sources and are being used in accordance with fair use. The photo of the Marching Illini performing at Quad Day is provided courtesy of Scott W. Schwartz and is used with permission.",
  },
  // {
  //   type: "section",
  //   title: "Engineering Hall",
  //   url: "https://creativecommons.org/licenses/by-sa/4.0/",
  //   description:
  //     "Image provided courtesy of Amphylite on Wikimedia Commons. This photo is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.",
  // },
  // {
  //   type: "section",
  //   title: "SQL Logo",
  //   url: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
  //   description:
  //     "Image provided courtesy of alaa kadour on Wikimedia Commons. This photo is licensed under the Creative Commons Attribution-Share Alike 4.0 International license. This image has been modified to fit the necessary aspect ratio for this site.",
  // },
  // {
  //   type: "section",
  //   title: "ChatGPT/OpenAI",
  //   url: "https://openai.com/brand/",
  //   description:
  //     'The "ChatGPT" and "OpenAI" names are property of OpenAI, and I do not claim ownership over either of these names.',
  // },
  {
    type: "footer",
    text: '...and a "little bit" of help from Google, W3Schools, ChatGPT, Gemini, Reddit, GitHub Copilot, and a lot more.',
  },
];

export const metadata: Metadata = {
  title: "Attributions",
  description:
    "A list of attributions for the resources used in building this website.",
};

function AttributionsContent({ blocks }: { blocks: AttributionBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "intro") {
          return (
            <div key={`intro-${index}`} className="mb-8">
              {block.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={`intro-p-${pIndex}`}
                  className="text-muted italic leading-relaxed"
                >
                  {paragraph}{" "}
                  {block.email ? (
                    <a className="underline" href={`mailto:${block.email}`}>
                      {block.email}
                    </a>
                  ) : null}
                  .
                </p>
              ))}
            </div>
          );
        }

        if (block.type === "section") {
          return (
            <section
              key={`section-${index}`}
              className="border-b border-border/60 py-6 first:pt-0"
            >
              <h2 className="mb-1 text-xl font-semibold">
                {block.title}{" "}
                {block.url ? (
                  <a
                    className="text-base font-normal underline"
                    href={block.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {block.url}
                  </a>
                ) : null}
              </h2>
              <p className="text-muted leading-relaxed">{block.description}</p>
            </section>
          );
        }

        return (
          <p
            key={`footer-${index}`}
            className="pt-8 text-center text-sm text-muted/80"
          >
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export default function AttributionsPage() {
  return (
    <div className="px-6 py-12 md:px-12">
      <h1 className="text-2xl font-bold mb-4">Attributions</h1>
      <AttributionsContent blocks={attributionBlocks} />
    </div>
  );
}
