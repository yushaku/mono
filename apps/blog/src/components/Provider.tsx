"use client";

import { topItems } from "@/utils/constants";
import React from "react";
import { Header, Footer } from "ui";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header topItems={topItems} />
      <div className="mx-auto mt-[15vh] min-h-[100vh] max-w-[1110px]">
        {children}
      </div>
      <Footer />
    </section>
  );
};
