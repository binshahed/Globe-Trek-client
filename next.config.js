/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    unoptimized: true // Allow images from any source without optimization
  }
};

module.exports = nextConfig;
