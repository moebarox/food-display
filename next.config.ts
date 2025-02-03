import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'zen.wego.com',
      },
    ],
  },
};

export default nextConfig;
