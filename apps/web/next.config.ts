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
    {
      source: "/manifest.webmanifest",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
    },
    {
      source: "/icons/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, immutable" }],
    },
    {
      source: "/lottie/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, immutable" }],
    },
  ],
};

export default nextConfig;
