import generateRssFeed from "../utils/rss";

export async function GET() {
  return new Response((await generateRssFeed()).xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
