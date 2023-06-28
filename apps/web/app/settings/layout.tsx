"use client";

import { TopPage } from "@/components/TopPage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconArrowRight } from "ui";

const settingPages = [
  { href: "", title: "Group" },
  { href: "/users", title: "User" },
  { href: "/billing", title: "billing" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[500px] -left-3 bg-white rounded-lg border-4 border-strokeColor">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <article className="my-[2dvh] h-[96dvh] p-4 bg-white w-1/4 rounded-2xl">
        <ul className="mt-4 flex flex-col gap-3">
          {settingPages.map((el, index) => {
            const isSelected = pathName === `/settings${el.href}`;

            return (
              <li key={index}>
                <Link
                  href={`/settings/${el.href}`}
                  className={`${
                    isSelected
                      ? "border-2 border-primaryColor/50 text-primaryColor font-semibold"
                      : "text-grayColor"
                  } bg-strokeColor flex justify-between items-center px-4 py-3 rounded-lg  w-full`}
                >
                  {el.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </article>

      <article className="ml-4 w-full">
        <div className="mx-auto w-full bg-white my-4 mr-4 rounded-2xl dark:bg-dark px-6 ml-4">
          <TopPage title="Settings" />
          <hr className="my-2" />

          {children}
        </div>
      </article>
    </section>
  );
};

export default Layout;
