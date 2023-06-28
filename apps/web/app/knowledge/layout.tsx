import { TopPage } from "@/components/TopPage";
import ListProject from "@/components/knowledge/listPropject";
import React from "react";
import { IconArrowRight } from "ui";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[30%] -left-3 bg-white rounded-lg border-4 border-strokeColor">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <ListProject />

      <article className="ml-4 w-full">
        <div className="mx-auto w-full bg-white my-4 mr-4 rounded-2xl dark:bg-dark px-6 ml-4">
          <TopPage title="Knowledge" />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};

export default Layout;
