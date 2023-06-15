"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, IconMenu } from ".";

type Props = {
  topItems: {
    href: string;
    title: string;
  }[];
};

export const Header = ({ topItems }: Props) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5) &&
        scrollY > 50
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 140) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dynamicHeaderStyle = scrollDirection === "up" ? "top-0" : "-top-[11vh]";
  const transparentStyle = !transparent
    ? "bg-transparent shadow-md mt-0"
    : `shadow-lg bg-white/70`;

  return (
    <header
      className={`${dynamicHeaderStyle} ${transparentStyle} animationShow fixed left-0 right-0 z-50 mx-auto`}
    >
      <div
        className={`mx-auto flex max-w-[1110px] items-center justify-between gap-4 py-4`}
      >
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              alt="yushaku"
              src="/logo.png"
              width={35}
              height={35}
              loading="lazy"
            />
            <span className="text-primaryColor text-[24px] font-semibold">
              Yushaku
            </span>
          </div>
        </Link>

        <div className="max-w-[600px] flex-1">
          <ul className="relative hidden items-center justify-between md:flex">
            {topItems.map(({ href, title }, index: number) => {
              return (
                <li key={index} className="group">
                  <Link
                    href={href}
                    className="animationShow hover:text-primaryColor text-grayColor relative cursor-pointer text-lg font-medium"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}

            <li>
              <Link href={"/auth/login"}>
                <Button
                  title="Login"
                  className="bg-primaryColor text-white lg:w-20"
                />
              </Link>
            </li>
          </ul>

          <div
            className="px-6 md:hidden"
            onClick={() => setShowNavbar((prev) => !prev)}
          >
            <IconMenu color="#132150" />
          </div>
        </div>
      </div>
    </header>
  );
};
