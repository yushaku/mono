/* eslint-disable turbo/no-undeclared-env-vars */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "images.unsplash.com",
      "www.notion.so",
      "s3.us-west-2.amazonaws.com",
    ],
  },
  env: {
    NOTION_DATABSE: process.env.NOTION_DATABSE,
    NOTION_SECRET: process.env.NOTION_SECRET,
    BLOG_URL: process.env.BLOG_URL,
  },
};

module.exports = nextConfig;
