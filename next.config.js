/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
        'i.scdn.co', 
        'mosaic.scdn.co', 
        'dailymix-images.scdn.co', 
        'seeded-session-images.scdn.co', 
        'thisis-images.scdn.co',
        'seed-mix-image.spotifycdn.com',
        'mixed-media-images.spotifycdn.com',
        'newjams-images.scdn.co',
        'lineup-images.scdn.co'
    ]
  }
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
