/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['/techAndGuitar'] },
  env: { PUBLIC_URL: 'https://techAndGuitar.com/techAndGuitar' },
  basePath: '/techAndGuitar',
  output: 'export',
};

module.exports = nextConfig;
