import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    // Disable static rendered symbol that covers map button
    appIsrStatus: false,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
};

export default nextConfig;
