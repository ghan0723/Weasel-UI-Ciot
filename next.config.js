/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites(){
      return [
        {
          source : '/api/:path*',
          destination : 'http://localhost:8000/api/:path*'
        },

      ]
  },
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
};

// module.exports = withTM(nextConfig);
module.exports = nextConfig;
