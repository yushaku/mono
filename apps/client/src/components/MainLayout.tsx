import { Navbar } from "@/components/Navbar";
import React from "react";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex dark:bg-dark-300 bg-strokeColor">
      <Navbar />
      {children}
    </section>
  );
};
