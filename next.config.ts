import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
