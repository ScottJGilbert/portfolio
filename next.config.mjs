import createMDX from "@next/mdx";
import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m9mv2a6pya.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "brand.illinois.edu",
      },
      {
        protocol: "https",
        hostname: "www.scouting.org",
      },
    ],
  },
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
