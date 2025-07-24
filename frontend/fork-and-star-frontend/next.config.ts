import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Skip ESLint during build for Docker
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Skip TypeScript checking during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Other config options
  experimental: {
    // Add any experimental features you're using
  },
  
  // Image optimization for Docker
  images: {
    unoptimized: true, // Disable image optimization for Docker
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};

export default nextConfig;