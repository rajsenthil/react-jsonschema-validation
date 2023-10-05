/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/product-schema',
        destination: 'http://localhost:8080/product-schema'
      }
    ]
  }, 
  reactStrictMode: true,
}

module.exports = nextConfig
