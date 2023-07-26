import { TopPage } from "@/components/TopPage";
import React from "react";

const loading = () => {
  return (
    <section className="relative flex w-full ml-8 animate-pulse">
      <div className="absolute top-[500px] -left-3 bg-white rounded-lg border-4 border-strokeColor animate-fade-left animate-once animate-duration-300 animate-ease-linear"></div>

      <article className="my-[2dvh] h-[96dvh] pr-4 bg-gray-200 dark:bg-gray-700 w-1/4 rounded-2xl animate-pulse">
        <ul className="mt-4 flex flex-col gap-3">
          {[1, 2, 3].map((el) => {
            return (
              <li key={el} className="w-full h-[50px] rounded-xl bg-white"></li>
            );
          })}
        </ul>
      </article>

      <article className="ml-4 w-full animate-pulse">
        <div className="mx-auto w-full bg-gray-200 dark:bg-gray-700 my-4 mr-4 rounded-2xl px-6 ml-4">
          <TopPage title="Settings" />
          <hr className="my-2" />
          <div className="flex-1"></div>
        </div>
      </article>
    </section>
  );
};

export default loading;
