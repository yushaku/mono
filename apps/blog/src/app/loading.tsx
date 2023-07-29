import { IntroBlock, CategoryList } from "@/components/IntroBlock";
import { TopicTitle } from "@/components/TopicTitle";
import React from "react";

function LoadingPage() {
  return (
    <section className="animate-pulse gap-x-10 px-6 md:px-3 lg:p-0">
      <div className="">
        <div className="w-[700px] h-[500px] block"></div>

        <ul className="animate-pulse flex flex-wrap justify-center gap-6 md:flex-nowrap">
          {[1, 2, 3, 4].map((el) => (
            <li key={el} className="w-[350px] h-[450px] block"></li>
          ))}
        </ul>
      </div>

      <div className="md:hidden">
        <TopicTitle title="Relate Topics" className="my-12 text-2xl" />
      </div>
    </section>
  );
}

export default LoadingPage;
