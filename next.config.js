/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/app',
  sw: 'service-worker.js'
})
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemmap/:slug*.xml",
        destination: "/sitemap/:slug*"
      }
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com'
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
