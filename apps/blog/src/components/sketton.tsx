import React from "react";

const CardSkeleton = () => {
  return (
    <div className="relative rounded-2xl w-[200px] h-[300px] ">
      <section
        id="ArticleItem"
        className="absolute flex flex-col items-center justify-center 
        animate-pulse px-4 rounded-2xl"
      >
        <div>
          <div className="rounded-full bg-slate-700 h-5 w-[150px] mb-5"></div>
          <div className="rounded-full bg-slate-700 h-5 w-[310px] my-2"></div>
          <div className="rounded-full bg-slate-700 h-5 w-[310px] my-2"></div>
          <div className="rounded-lg bg-slate-700 h-[200px] w-[310px] my-5"></div>
        </div>

        <div>
          <ul className="flex gap-4 items-start">
            <li className="rounded-full bg-slate-700 h-7 w-[80px] my-2"></li>
            <li className="rounded-full bg-slate-700 h-7 w-[80px] my-2"></li>
            <li className="rounded-full bg-slate-700 h-7 w-[80px] my-2"></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export const LoadingSkeleton = ({ num = 3 }) => {
  return (
    <div className="h-[80dvh] container mx-auto">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        {[...Array(num)].map((_it, index) => {
          return <CardSkeleton key={index} />;
        })}
      </div>
    </div>
  );
};
