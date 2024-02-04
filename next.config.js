/** @type {import('next').NextConfig} */

const repo = 'techAndGuitar';
const pageLink = 'https://petermyrobot.github.io/';
const assetPrefix = `${pageLink}/${repo}/`;
const basePath = `/${pageLink}/${repo}`;
const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: 'export',
};

module.exports = nextConfig;
