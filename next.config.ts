import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "d4lgxe9bm8juw.cloudfront.net",
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
      }
    ]
  }
};

export default nextConfig;
