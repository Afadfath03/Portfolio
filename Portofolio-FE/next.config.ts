import type { NextConfig } from "next";

const BE_URL = process.env.BE_URL || "http://localhost:8888";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
