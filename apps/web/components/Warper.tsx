"use client";

import { topBar } from "@/utils/constants";
import React from "react";
import { Navbar } from "ui";

export const Warper = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="flex dark:bg-dark-300">
      <Navbar topItems={topBar} />

      <div className="mx-auto w-full bg-strokeColor my-4 mr-4 rounded-lg dark:bg-dark flex px-6 pt-[15vh]">
        {children}
      </div>
    </section>
  );
};
