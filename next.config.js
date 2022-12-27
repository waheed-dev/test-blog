/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify : true,
  images : {
    dangerouslyAllowSVG  :true,
    domains : ["tailwindui.com","i.pinimg.com","images.unsplash.com","eincode.com","thrangra.sirv.com","img.freepik.com"],
    formats: ['image/avif', 'image/webp'], }
}

module.exports = nextConfig
