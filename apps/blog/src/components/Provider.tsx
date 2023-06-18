"use client";

import { topItems } from "@/utils/constants";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Header, Footer, Sidebar } from "ui";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ThemeProvider>
      <section>
        <Header
          topItems={topItems}
          ontoggleSideBar={() => setShowSidebar(!showSidebar)}
        />

        <Sidebar
          topItems={topItems}
          showSidebar={showSidebar}
          ontoggleSideBar={() => setShowSidebar(!showSidebar)}
        />
        <div className="mx-auto mt-[15vh] min-h-[100vh] max-w-[1110px] px-6">
          <Toaster position="bottom-center" />
          {children}
        </div>
        <Footer />
      </section>
    </ThemeProvider>
  );
};
