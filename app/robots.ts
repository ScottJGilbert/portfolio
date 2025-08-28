import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/images/", "/edit", "/new", "/login", "/api/", "/no-access"],
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
