/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET
    // Add other environment variables here
  },
}

module.exports = nextConfig
