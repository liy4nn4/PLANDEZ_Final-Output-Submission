/** @type {import('next').NextConfig} */

const withImages = require('next-images');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "**",
                port: "3000",
                protocol: "http",

            }
        ]
    },
}

module.exports = nextConfig