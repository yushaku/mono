"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const settingPages = [
  { href: "", title: "Group" },
  { href: "/users", title: "User" },
  { href: "/billing", title: "billing" },
];

export const SettingItems = () => {
  const pathName = usePathname();

  return (
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
  );
};
