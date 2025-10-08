import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during build (due to known circular structure issue with Next.js 15 + ESLint 9)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
