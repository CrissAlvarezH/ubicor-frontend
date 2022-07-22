/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: "anonymous",
  images: {
    domains: [
      "localhost", "api.ubicor.alvarezcristian.com", "host.docker.internal",
      "avatars.githubusercontent.com", "lh3.googleusercontent.com"
    ]
  },
  experimental: {
    outputStandalone: true,
    scrollRestoration: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  }
}

module.exports = nextConfig
