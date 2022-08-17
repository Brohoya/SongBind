/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/Library',
  //       destination: '/library',
  //     },
  //   ];
  // }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://localhost:3000/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
