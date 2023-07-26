"use client";

import { logout } from "@/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "ui";

export const TopPage = ({ title = "header" }: { title: string }) => {
  const router = useRouter();
  return (
    <article className="w-full flex items-center justify-between pt-5">
      <h3 className="text-primaryColor text-2xl font-semibold">{title}</h3>
      <div className="flex">
        <button
          className="flexCenter"
          onClick={async () => {
            await logout();
            router.push("/auth/login");
          }}
        >
          <Image src="/man.png" alt="avatar" width={70} height={70} />
        </button>

        <Button
          title="help"
          className="px-12 bg-primaryColor text-white ml-2"
        />
      </div>
    </article>
  );
};
