/* eslint-disable turbo/no-undeclared-env-vars */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: ["images.unsplash.com", "www.notion.so"],
  },
  env: {
    NOTION_DATABSE: process.env.NOTION_DATABSE,
    NOTION_SECRET: process.env.NOTION_SECRET,
  },
};
