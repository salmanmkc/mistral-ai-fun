import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: This app uses API routes and requires a server runtime
  // For GitHub Pages, consider deploying to Vercel or a similar platform
  // Alternatively, convert to client-side API calls (not recommended for production)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
