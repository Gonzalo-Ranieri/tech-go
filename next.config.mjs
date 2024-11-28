import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(), // Resuelve '@' al directorio raíz del proyecto
    };
    return config;
  },
};

export default nextConfig;
