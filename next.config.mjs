import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

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
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unpkg.com",
        pathname: "/feather-icons/icons/dist/**",
      },
      {
        protocol: "https",
        hostname: "unpkg.com",
        pathname: "/feather-icons/dist/icons/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],

    dangerouslyAllowSVG: true,
  },
  experimental: {
    mdxRs: true,
  },
  // Optionally, add any other Next.js config below
  transpilePackages: ["@exodus/bytes", "html-encoding-sniffer"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
  extension: /\.(md|mdx)$/,
});
export default withMDX(nextConfig);
