/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: ['images.unsplash.com', 'dummyimage.com', 'res.cloudinary.com', 'api.mapbox.com'],
  },
  env: {
    MAPS: 'pk.eyJ1Ijoia2F6YWtvdmtpcmlsbGl5IiwiYSI6ImNsMWV6aXc2YTBueG8zaWxubmwxb3V0N3QifQ.bjZkUjBK0K1qfY-63VpWIg'
  },
}

module.exports = nextConfig
