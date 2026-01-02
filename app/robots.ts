import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/admin/",
        "/edit",
        "/new",
        "/login",
        "/api/",
        "/no-access",
      ],
    },
    sitemap: `https://scott-gilbert.vercel.app/sitemap.xml`,
  };
}
