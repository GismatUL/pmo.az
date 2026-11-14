import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/pmo.az"); empty for a domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
