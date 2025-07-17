import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.noburestaurants.com",
      "www.elevenmadisonpark.com",
      "static01.nyt.com",
      "www.quincerestaurant.com",
      "cdn.vox-cdn.com",
      "media.cntraveler.com",
      "media-cdn.tripadvisor.com",
      "example.com", // ✅ add this
    ],
  },
};

export default nextConfig;