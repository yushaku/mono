import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import "server-only";
import { BlogList, Result } from "types";

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const fetchPages = cache(async () => {
  const post = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE,
    filter: {
      property: "status",
      select: {
        equals: "published",
      },
    },
  });
  return post as unknown as BlogList;
});

export const fetchPagesByCategory = cache(async (category: string) => {
  const post = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE,
    filter: {
      and: [
        {
          property: "category",
          select: {
            equals: category,
          },
        },
        {
          property: "status",
          select: {
            equals: "published",
          },
        },
      ],
    },
  });

  return post as unknown as BlogList;
});

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
  return res.results[0] as Result;
});

export const fetchPageBlocks = cache(async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId });
  return res.results as any;
});