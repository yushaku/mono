"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "ui";

export const TopPage = () => {
  return (
    <article className="w-full flex items-center justify-between pt-2">
      <h3 className="text-primaryColor text-2xl font-semibold">Header</h3>
      <div className="flex">
        <button className="flexCenter" onClick={() => signOut()}>
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
