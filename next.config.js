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
    },
}

module.exports = nextConfig
