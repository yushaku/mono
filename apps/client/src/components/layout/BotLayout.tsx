import { TopPage } from "@/components/TopPage";
import React from "react";

export const BotLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-[95dvh] bg-white dark:bg-dark w-full rounded-xl mx-16 my-6 overflow-scroll">
      <article>
        <div className="rounded-2xl px-6">
          <TopPage title="Your Bots" />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};
