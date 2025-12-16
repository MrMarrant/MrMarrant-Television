/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net', 'i.imgur.com', 'www.transparenttextures.com'],
  },
};

export default nextConfig;