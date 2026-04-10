/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/survey', 
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
