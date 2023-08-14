import { TopPage } from "@/components/TopPage";
import { SettingItems } from "@/components/settings/SettingItem";
import React from "react";
import { IconArrowRight } from "ui";

export const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex w-full ml-8">
      <div className="absolute top-[500px] -left-3 bg-white rounded-lg border-4 border-strokeColor animate-fade-left animate-once animate-duration-300 animate-ease-linear">
        <IconArrowRight className="stroke-primaryColor rotate-180 w-4 h-4" />
      </div>

      <article className="my-[2dvh] h-[96dvh] pr-4 bg-white w-1/4 rounded-2xl">
        <SettingItems />
      </article>

      <article className="ml-4 w-full">
        <div className="mx-auto w-full bg-white my-4 mr-4 rounded-2xl dark:bg-dark px-6 ml-4">
          <TopPage title="Settings" />
          <hr className="my-2" />
          {children}
        </div>
      </article>
    </section>
  );
};
