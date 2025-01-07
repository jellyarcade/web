/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'api.jellyarcade.com',
    ],
  },
};

module.exports = withNextIntl(nextConfig);
