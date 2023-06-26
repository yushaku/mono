"use client";

import { topBar } from "@/utils/constants";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "ui";

export const Warper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <section className="flex">
        <Navbar topItems={topBar} />

        <div className="mx-auto w-full bg-strokeColor my-4 mr-4 rounded-lg dark:bg-dark flex px-6 pt-[15vh]">
          <Toaster position="top-center" />
          {children}
        </div>
      </section>
    </ThemeProvider>
  );
};
