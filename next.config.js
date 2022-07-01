/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "api.ubicor.alvarezcristian.com", "host.docker.internal"]
  },
  experimental: {
    outputStandalone: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  }
}

module.exports = nextConfig
