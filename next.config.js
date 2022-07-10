/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: "anonymous",
  images: {
    domains: [
      "localhost", "api.ubicor.alvarezcristian.com", "host.docker.internal",
      "avatars.githubusercontent.com"
    ]
  },
  experimental: {
    outputStandalone: true,
    scrollRestoration: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  }
}

module.exports = nextConfig
