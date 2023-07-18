"use client";

import { ButtonSwitch, SocialMedia } from ".";
import { IconMoon } from "./Icons/IconMoon";
import { IconSun } from "./Icons/IconSun";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

type Props = {
  ontoggleSideBar: () => void;
  showSidebar: boolean;
  topItems: {
    href: string;
    title: string;
  }[];
};

export const Sidebar = ({ topItems, ontoggleSideBar, showSidebar }: Props) => {
  const positionStyle = showSidebar ? "right-0" : "right-[-22rem]";
  const { theme, setTheme } = useTheme();

  return (
    <section>
      <div
        className={`${positionStyle} animationShow dark:shadow-darkShadow fixed top-0 z-50 flex h-screen w-[300px] flex-col justify-between bg-white px-8 py-10 shadow-lg dark:bg-dark-100`}
      >
        <ul className="flex flex-col gap-6">
          <h3 className="text-primaryColor dark:text-secondColor mb-4 text-xl font-semibold">
            Dev &quot;phèn&quot;
          </h3>
          {topItems.map((el, index) => {
            return (
              <li
                key={index}
                className="hover:text-primaryColor dark:hover:text-secondColor text-lg"
                onClick={ontoggleSideBar}
              >
                <Link href={el.href}>{el.title}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flexCenter justify-between">
          <SocialMedia />
          <span className="flexCenter gap-2">
            <IconSun
              color={theme === "dark" ? "#ffffff" : "#000000"}
              width="20px"
              height="20px"
            />
            <ButtonSwitch
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <IconMoon
              color={theme === "dark" ? "#ffffff" : "#000000"}
              width="20px"
              height="20px"
            />
          </span>
        </div>
      </div>

      <div
        className={`fixed top-0 z-10 h-screen w-screen bg-white/30 ${
          showSidebar ? "block" : "hidden"
        }`}
        onClick={ontoggleSideBar}
      ></div>
    </section>
  );
};
