import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apicodez.monmoto.com",
      },
    ],
  },
};

export default nextConfig;
