import { SearchBox } from "@/components/SearchBox";
import { TopPage } from "@/components/TopPage";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex w-full ml-7">
      <article className="my-[2dvh] h-[96dvh] p-4 bg-white w-1/4 rounded-2xl">
        <SearchBox />
      </article>

      <article className="ml-4 w-full">
        <div className="mx-auto w-full bg-white my-4 mr-4 rounded-lg dark:bg-dark px-6 ml-4">
          <TopPage />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};

export default Layout;
