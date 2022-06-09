/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"]
  },
  experimental: {
    outputStandalone: true
  }
}

module.exports = nextConfig
