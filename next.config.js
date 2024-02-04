/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['/techAndGuitar'] },
  env: { PUBLIC_URL: 'https://petermyrobot.github.io/techAndGuitar' },
  output: 'export',
};

module.exports = nextConfig;
