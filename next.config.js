/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: [
            "placehold.co",
            "localhost",
            "sarangsayang.up.railway.app",
            "i.giphy.com",
            "www.sarangsayang.com",
            "sarangsayang.com",
            "tiktok.com"
        ]
    },
    transpilePackages: ['html-to-text']
}

module.exports = nextConfig
