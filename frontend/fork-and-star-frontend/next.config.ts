import type { NextConfig } from "next";

// Detect deployment environment
const isDocker = process.env.DOCKER_BUILD === 'true';
const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  // Conditional Docker support
  ...(isDocker && { output: 'standalone' }),
  
  // Environment-specific error handling
  eslint: {
    ignoreDuringBuilds: isDocker, // Ignore for Docker, check for Vercel
  },
  
  typescript: {
    ignoreBuildErrors: isDocker, // Ignore for Docker, check for Vercel
  },
  
  // Conditional image optimization
  images: {
    unoptimized: isDocker, // Disable for Docker, enable for Vercel
    domains: [
      "www.noburestaurants.com",
      "www.elevenmadisonpark.com",
      "static01.nyt.com",
      "www.quincerestaurant.com",
      "cdn.vox-cdn.com",
      "media.cntraveler.com",
      "media-cdn.tripadvisor.com",
      "example.com",
    ],
  },
  
  // Environment variables only for Docker (Vercel uses dashboard)
  ...(isDocker && {
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    },
  }),
  
  // Add webpack config for Three.js and other client-side libraries
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }

    // Handle media files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });

    return config;
  },
  
  experimental: {
    esmExternals: true, // Helps with Three.js and other ESM packages
  },
  
  // Optimize for production
  swcMinify: true,
  trailingSlash: false,
};

export default nextConfig;