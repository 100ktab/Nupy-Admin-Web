/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    STABILITY_API_KEY: process.env.STABILITY_API_KEY,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_ACCESS_KEY: process.env.AWS_PERSONAL_SECRET_KEY,
    AWS_REGION_KEY: process.env.AWS_REGION_KEY,
    WEB3_STORAGE_API_KEY: process.env.WEB3_STORAGE_API_KEY
  }
}

module.exports = nextConfig
