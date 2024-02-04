/** @type {import('next').NextConfig} */

const repo = 'techAndGuitar';
const pageLink = 'https://petermyrobot.github.io/';
const assetPrefix = `${pageLink}/${repo}/`;
const basePath = `/${pageLink}/${repo}`;
const nextConfig = {
  assetPrefix: 'https://petermyrobot.github.io/techAndGuitar',
  // basePath: '/techAndGuitar',
  output: 'export',
};

module.exports = nextConfig;
