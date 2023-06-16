import React from "react";
import Link from "next/link";
import { SocialMedia } from ".";

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

  return (
    <section>
      <div
        className={`${positionStyle} animationShow fixed top-0 z-50 flex h-screen w-[300px] flex-col justify-between bg-white px-8 py-10 shadow-lg`}
      >
        <ul className="flex flex-col gap-6">
          <h3 className="text-primaryColor mb-4 text-xl font-semibold">
            Dev &quot;phèn&quot;
          </h3>
          {topItems.map((el, index) => {
            return (
              <li
                key={index}
                className="hover:text-primaryColor"
                onClick={ontoggleSideBar}
              >
                <Link href={el.href}>{el.title}</Link>
              </li>
            );
          })}
        </ul>

        <SocialMedia />
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
