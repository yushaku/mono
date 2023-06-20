"use client";

import { topBar } from "@/utils/constants";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Header, Footer, Sidebar } from "ui";

export const Warper = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ThemeProvider attribute="class">
      <section className="">
        <Header
          isAuth={true}
          topItems={topBar}
          ontoggleSideBar={() => setShowSidebar(!showSidebar)}
        />

        <Sidebar
          topItems={topBar}
          showSidebar={showSidebar}
          ontoggleSideBar={() => setShowSidebar(!showSidebar)}
        />
        <div className="mx-auto min-h-[100vh] max-w-[1110px] px-6 pt-[15vh]">
          <Toaster position="top-center" />
          {children}
        </div>
        <Footer />
      </section>
    </ThemeProvider>
  );
};
