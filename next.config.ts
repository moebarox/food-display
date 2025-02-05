import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zen.wego.com',
      },
    ],
  },
};

export default nextConfig;
