import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@spinwheels/ui",
    "@spinwheels/config",
    "@spinwheels/types",
    "@spinwheels/validation",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  headers: async () => [
    {
      source: "/sw.js",
      headers: [
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        { key: "Service-Worker-Allowed", value: "/" },
      ],
    },
  ],
};

export default nextConfig;
