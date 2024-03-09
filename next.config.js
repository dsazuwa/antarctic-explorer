/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'assets.lindblad.com',
      'www.aurora-expeditions.com',
      'images.ctfassets.net',
      'kaptiotravel.s3.amazonaws.com',
      'www.auroraexpeditions.com.au',
    ],
  },
};

module.exports = nextConfig;
