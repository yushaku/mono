import { TableOfContent } from "@/app/[slug]/page";
import { topics } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { Result } from "types";
import { IconArrowRight, IconDot, SocialMedia } from "ui";
import { ListItem } from "./ListItem";
import { TopicTitle } from "./TopicTitle";
import Image from "next/image";

export const IntroBlock = () => {
  return (
    <Warper className="relative">
      <Image
        src="/map-doted.png"
        alt="dot_map_world"
        loading="lazy"
        placeholder="empty"
        object-fit="cover"
        quality={100}
        fill={true}
      />
      <h3 className="text-primaryColor text-xl font-semibold">
        Dev &quot;phèn&quot;
      </h3>
      <p className="text-grayColor text-sm">
        From &quot;Phèn&quot; developer Become better Full-stack developer.
        Following our tips, tricks and real life experiences.
      </p>

      <SocialMedia />
    </Warper>
  );
};

export const Warper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classes = `mx-auto mb-10 py-6 flex max-w-[350px] flex-col items-center justify-center gap-y-4 rounded-lg px-6 text-center shadow-lg ${
    className ?? ""
  }`;
  return <article className={classes}>{children}</article>;
};

export const BlogOutline = ({ outline }: { outline: TableOfContent[] }) => {
  return (
    <Warper className="sticky top-20">
      <TopicTitle title="Page Outline" />
      <ul className="w-full">
        {outline.map((el) => {
          return (
            <li
              key={el.id}
              className={`group ${el.type === "heading_3" ? "pl-3" : "pl-0"}`}
            >
              <Link href={`#${el.href}`} className="flex items-center py-2">
                {el.type === "heading_3" ? (
                  <IconDot
                    width="15px"
                    height="15px"
                    className="animationShow mr-1 group-hover:mr-3"
                    color="#234f66"
                  />
                ) : (
                  <IconArrowRight
                    className="animationShow mr-2 rotate-180 group-hover:mr-4"
                    color="#234f66"
                  />
                )}
                <span className="group-hover:text-primaryColor animationShow group-hover:font-medium">
                  {el.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Warper>
  );
};

export const CategoryList = () => {
  return (
    <Warper className="w-[350px]">
      <TopicTitle title="Explore Topics" />

      <ul className="w-full divide-y">
        {topics.map((el, index) => {
          return (
            <li key={index} className="group">
              <Link href={el.href} className="flex items-center py-3 ">
                <IconArrowRight
                  className="animationShow mr-2 rotate-180 group-hover:mr-4"
                  color="#234f66"
                />
                <span className="group-hover:text-primaryColor animationShow group-hover:font-bold">
                  {el.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Warper>
  );
};

export const RelatePosts = ({ blogList }: { blogList: Result[] }) => {
  return (
    <Warper>
      <TopicTitle title="Popular Posts" />

      <ul className="divide-y">
        {blogList.map((el) => {
          return (
            <li key={el.id}>
              <ListItem
                slug={el.properties.slug.id}
                imageUrl={el.cover.external.url}
                name={el.properties.Name.title[0].plain_text}
                date={el.created_time}
                category={el.properties.category.select.name}
              />
            </li>
          );
        })}
      </ul>
    </Warper>
  );
};
