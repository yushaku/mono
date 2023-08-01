"use client";

import { Warper } from "./IntroBlock";
import { TopicTitle } from "./TopicTitle";
import { TableOfContent } from "@/app/[slug]/page";
import Link from "next/link";
import { useState } from "react";
import { IconDot, IconArrowRight } from "ui";

const BlogOutline = ({ outline }: { outline: TableOfContent[] }) => {
  const [active, setActive] = useState(outline[0].href);

  const handleClick = (event: any, el: TableOfContent) => {
    event.preventDefault();
    const a = document.getElementById(el.href);
    setActive(el.href);
    a?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Warper className="sticky top-20">
      <TopicTitle title="Table of Contents" />
      <ul className="w-full">
        {outline.map((el) => {
          const styledActive =
            active === el.href
              ? "text-primaryColor dark:text-secondColor"
              : "group-hover:text-primaryColor dark:group-hover:text-secondColor";

          return (
            <li
              key={el.id}
              className={`group text-start ${
                el.type === "heading_3" ? "pl-3" : "pl-0"
              }`}
            >
              <Link
                href={`#${el.href}`}
                className="flex items-center py-2"
                onClick={(e) => handleClick(e, el)}
              >
                {el.type === "heading_3" ? (
                  <IconDot
                    width="10px"
                    height="10px"
                    className="animationShow stroke-primaryColor dark:stroke-teal-200 mr-1 group-hover:mr-3"
                  />
                ) : (
                  <IconArrowRight
                    className="animationShow mr-2 rotate-180 w-3 h-3 
                    stroke-primaryColor dark:stroke-teal-200 group-hover:mr-4"
                  />
                )}
                <span
                  className={`${styledActive} animationShow group-hover:font-medium`}
                >
                  {el.title}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="group pl-0">
          <Link href="#related_posts" className="flex items-center py-2">
            <IconArrowRight className="animationShow mr-2 rotate-180 w-3 h-3 stroke-primaryColor dark:stroke-teal-200 group-hover:mr-4" />
            <span className="group-hover:text-primaryColor dark:group-hover:text-secondColor animationShow group-hover:font-medium">
              Related Posts
            </span>
          </Link>
        </li>
      </ul>
    </Warper>
  );
};
export default BlogOutline;
