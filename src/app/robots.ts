import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://scottgilbert.dev";
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /attributions has no unique indexable content; /r/* are vanity
      // recruiter-tracking redirects, not canonical pages.
      disallow: ["/attributions", "/r/"],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
