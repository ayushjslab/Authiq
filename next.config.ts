import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",  // or set e.g. "lh3.googleusercontent.com"
      },
    ],
  },
};

export default nextConfig;
