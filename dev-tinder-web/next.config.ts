import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.freeimages.com',
      "geographyandyou.com",   // <— add your hostname here
      // e.g. 'picsum.photos', 'cdn.example.com'
    ],
  },
};

export default nextConfig;
