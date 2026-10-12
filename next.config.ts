import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // Production hardening
  productionBrowserSourceMaps: false, // never ship .map files that reveal original source
  poweredByHeader: false, // drop the `x-powered-by: Next.js` response header
  compiler: {
    // strip console.log/info/debug from production bundles; keep errors for monitoring
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
