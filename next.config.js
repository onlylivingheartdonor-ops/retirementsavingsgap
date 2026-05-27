/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'retirementsavingsgap.com' }],
        destination: 'https://www.retirementsavingsgap.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
