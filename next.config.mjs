// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações
  rewrites: async () => {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
