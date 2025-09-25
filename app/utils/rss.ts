import { fetchPosts } from "@/lib/db";
import fs from "fs";
import RSS from "rss";

export default async function generateRssFeed() {
  const posts = await fetchPosts("", []);

  const site_url =
    process.env.NODE_ENV === "production"
      ? "https://scott-gilbert.vercel.app"
      : "http://localhost:3000";

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to my blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/_next/image?url=%2FprofileIcon.svg&w=1920&q=75`,
    pubDate: new Date(),
    copyright: `©${new Date().getFullYear()}. All rights reserved.`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/blog/${post.slug}`,
      date: post.creation_date,
    });
  });

  return feed;

  // Write the RSS feed to a file as XML.
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
