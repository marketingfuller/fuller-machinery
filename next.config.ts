import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/emprende", permanent: true },
      { source: "/blog/:slug*", destination: "/emprende/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
