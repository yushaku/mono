/* eslint-disable turbo/no-undeclared-env-vars */
import "server-only";

import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { BlogList } from "types";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const fetchPages = cache(async () => {
  const post = await notion.databases.query({
    database_id:
      process.env.NOTION_DATABASE ?? "0f8d661ce22e4d6cafeb974f048c0f91",
    // filter: {
    //   property: "Status",
    //   select: {
    //     equals: "Published",
    //   },
    // },
  });
  return post as unknown as BlogList;
});

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    // sorts: [
    //   {
    //     timestamp: "created_time",
    //     direction: "descending",
    //   },
    // ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
};

export const fetchPageBySlug = cache(async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE!,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return res.results[0] as PageObjectResponse | undefined;
});

export const fetchPageBlocks = cache(async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId });
  return res.results as any;
});
