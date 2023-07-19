import { IntroBlock, CategoryList } from "@/components/IntroBlock";
import { TopicTitle } from "@/components/TopicTitle";
import React from "react";

function LoadingPage() {
  return (
    <section className="grid grid-cols-1 gap-x-10 px-6 md:grid-cols-2 md:px-3 lg:grid-cols-3 lg:p-0">
      <div className="md:col-span-2 animate-pulse">
        <div className="w-[700px] h-[500px] block"></div>

        <TopicTitle title="Latest Posts" className="my-12" />

        <ul className="flex flex-wrap justify-center gap-6 md:flex-nowrap">
          {[1, 2, 3, 4].map((el) => (
            <li key={el} className="w-[350px] h-[450px] block"></li>
          ))}
        </ul>
      </div>

      <div className="md:hidden">
        <TopicTitle title="Relate Topics" className="my-12 text-2xl" />
      </div>

      <div className="col-span-1 flex flex-wrap md:col-span-2 lg:col-span-1">
        <IntroBlock />
        <CategoryList />
      </div>
    </section>
  );
}

export default LoadingPage;
