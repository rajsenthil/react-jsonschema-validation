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
  plugins: [
        require('flowbite/plugin')
    ],
  reactStrictMode: true,
}

module.exports = nextConfig
