/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['tuiaidbeprmyyjrfpcfo.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
