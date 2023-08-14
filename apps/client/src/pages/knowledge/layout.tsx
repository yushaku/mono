import { TopPage } from "@/components/TopPage";
import ListProject from "@/components/knowledge/listPropject";
import React from "react";
import { IconArrowRight } from "ui";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[296px] -left-3 bg-white rounded-lg border-4 border-strokeColor animate-fade-left animate-once animate-duration-300 animate-ease-linear">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <ListProject />

      <article className="mx-4 my-4 w-full">
        <div className="bg-white dark:bg-dark rounded-2xl px-6">
          <TopPage title="Knowledge" />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};

export default Layout;
